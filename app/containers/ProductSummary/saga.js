import Axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { path } from '../../utils/apiPath';
import { TIMEOUT } from '../../utils/constants';
import { getToken, setUserInfo, timeout } from '../../utils/MainMethods';
import * as RootNavigation from '../../utils/RootNavigation';
import { segment } from '../../utils/segment';
import { isLoading } from '../Login/actions';
import { addMsg } from '../message/actions';
import { getCouponSuccess } from '../ProductCart/actions';
import { emptyProductCart } from '../ProductDetails/actions';
import { getProfileSuccess } from './actions';
import { CONFIRM_ORDER, GET_PROFILE } from './constants';
import { select } from 'redux-saga/effects';

let myLanguage = '';

function confirmApi({ token, productIds, id_coupon, totalPoints, address }) {
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
      id_coupon,
      totalPoints,
      products: productIds,
      adresse: address,
    },
    url: path + '/orders',
    cancelToken: source.token,
  });
}

function ConfirmeOrder({ userId }) {
  let mydata = { event: 'Order completed', userId: userId, timestamp: new Date() };
  return segment('track', mydata);
}

export function* confirmOrder(action) {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(confirmApi, {
      token: JSON.parse(userdata).token,
      productIds: action.products,
      id_coupon: action.coupon,
      totalPoints: action.totalPoints,
      address: action.address,
    });
    if (data) {
      if (data.success) {
        yield call(ConfirmeOrder, { userId: JSON.parse(userdata).code, id: action.id });
        yield put(addMsg(myLanguage === 'ar' ? data?.message?.ar : data?.message?.fr, 'success'));
        action.successCallback && action.successCallback();
        yield put(emptyProductCart());
        yield put(getCouponSuccess(null));
        RootNavigation.replace('OrderValidated', { gift: false, invoice: data.data?.[0] });
      } else {
        yield put(addMsg(myLanguage === 'ar' ? data?.message?.ar : data?.message?.fr, 'danger', 5));
      }
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
    console.log('error', e);
    const network_error = !e.status;
    if (network_error) {
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
  }
}
function profileApi({ token, id_customer }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/customers/${id_customer}/me`,
    cancelToken: source.token,
  });
}

export function* getProfile() {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(profileApi, JSON.parse(userdata));

    if (data) {
      if (data.success) {
        setUserInfo(data.data);
        yield put(getProfileSuccess(data.data));
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
    }

    yield put(isLoading(false));
  } catch (e) {
    const network_error = !e.status;
    if (network_error) {
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
  yield all([takeLatest(GET_PROFILE, getProfile), takeLatest(CONFIRM_ORDER, confirmOrder)]);
}
