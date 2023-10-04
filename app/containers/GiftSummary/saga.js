import analytics from '@segment/analytics-react-native';
import Axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { path } from '../../utils/apiPath';
import { TIMEOUT } from '../../utils/constants';
import { getToken, timeout } from '../../utils/MainMethods';
import * as RootNavigation from '../../utils/RootNavigation';
import { emptyGiftCart } from '../GiftDetails/actions';
import { isLoading } from '../Login/actions';
import { addMsg } from '../message/actions';
import { giftHistorySuccess } from './actions';
import { CONFIRM_GIFT_ORDER, GIFT_HISTORY } from './constants';
import { select } from 'redux-saga/effects';

let myLanguage = '';

//segment
function GiftOrderedtoSegment(code, orderId) {
  analytics.track('Gift Ordered', {
    userId: code,
    orderId: orderId,
    // name: data?.nameGift.fr,
    // active: data?.active,
    // available: data?.available,
    // points: data?.points,
    // quantity: data?.quantity,
    // category: data?.Category?.name?.fr,
    // url: '',
    // image_url: data?.images.main.m,
  });
}
function confirmApi({ token, giftsIds, address }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    data: {
      gifts: giftsIds,
      adresse: address,
    },
    url: path + '/orderGifts',
    cancelToken: source.token,
  });
}

export function* confirmMyGiftOrder(action) {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(confirmApi, {
      token: JSON.parse(userdata).token,
      giftsIds: action.giftsIds,
      address: action.address,
    });
    if (data.success) {
      yield GiftOrderedtoSegment(JSON.parse(userdata).code, action.giftsIds);
      yield put(emptyGiftCart());
      RootNavigation.replace('OrderValidated', { gift: true, invoice: data.data?.[0] });
      yield put(addMsg(myLanguage === 'ar' ? data?.message?.ar : data?.message?.fr, 'success'));
    } else {
      yield put(addMsg(myLanguage === 'ar' ? data?.message?.ar : data?.message?.fr, 'danger', 5));
    }
    yield put(isLoading(false));
  } catch (e) {
    const network_error = !e.status;
    if (network_error) {
      yield put(giftHistorySuccess([]));
      yield put(
        addMsg(myLanguage === 'ar' ? ' الرجاء الاتصال بالإنترنت.' : 'Merci de se connecter à Internet.', 'danger'),
      );
    } else {
      yield put(
        addMsg(
          myLanguage === 'ar'
            ? 'عفوا الخدمة غير متوفرة ، يرجى المحاولة مرة أخرى'
            : 'Oups service non disponible, merci de réessayer',
          'danger',
        ),
      );
    }
    yield put(isLoading(false));
    //  console.log(e);
  }
}

function giftsHistoryApi({ token }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + '/orderGifts',
    cancelToken: source.token,
  });
}

export function* getGiftsHistory() {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(giftsHistoryApi, { token: JSON.parse(userdata).token });

    if (data) {
      yield put(giftHistorySuccess(data.rows));
    } else {
      yield put(
        addMsg(
          myLanguage === 'ar'
            ? 'عفوا الخدمة غير متوفرة ، يرجى المحاولة مرة أخرى'
            : 'Oups service non disponible, merci de réessayer',
          'danger',
        ),
      );
    }
    yield put(isLoading(false));
  } catch (e) {
    const network_error = !e.status;
    if (network_error) {
      yield put(giftHistorySuccess([]));
      yield put(
        addMsg(myLanguage === 'ar' ? ' الرجاء الاتصال بالإنترنت.' : 'Merci de se connecter à Internet.', 'danger'),
      );
    } else {
      yield put(
        addMsg(
          myLanguage === 'ar'
            ? 'عفوا الخدمة غير متوفرة ، يرجى المحاولة مرة أخرى'
            : 'Oups service non disponible, merci de réessayer',
          'danger',
        ),
      );
    }
    yield put(isLoading(false));
    //  console.log(e);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(CONFIRM_GIFT_ORDER, confirmMyGiftOrder), takeLatest(GIFT_HISTORY, getGiftsHistory)]);
}
