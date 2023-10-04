import Axios from 'axios';
import { all, put, call, takeLeading } from 'redux-saga/effects';
import { path } from '../../utils/apiPath';
import { getToken, timeout } from '../../utils/MainMethods';
import { TIMEOUT } from '../../utils/constants';
import { isLoading } from '../Login/actions';
import { getOrdersSuccess, getOrdersTrackingSuccess, getGiftsSuccess, getGiftsTrackingSuccess } from './actions';
import { GET_ORDERS, GET_ORDERS_TRACKING, GET_ORDERS_GIFT, GET_GIFTS_TRACKING } from './constants';
import { addMsg } from '../message/actions';
import { select } from 'redux-saga/effects';
let myLanguage = '';

function ordersApi({ token }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + '/orders',
    cancelToken: source.token,
  });
}

function ordersTrackingApi({ token, id }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/orders/id/${id}`,
    cancelToken: source.token,
  });
}

export function* getOrdersSaga() {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(ordersApi, JSON.parse(userdata));

    if (data) {
      if (data.success) {
        yield put(getOrdersSuccess(data.data));
        if (data.count !== 0) {
          const dataTracking = yield call(ordersTrackingApi, {
            token: JSON.parse(userdata).token,
            id: data.data?.[0].id,
          });
          yield put(getOrdersTrackingSuccess(dataTracking.data));
        } else {
          yield put(getOrdersTrackingSuccess([]));
        }
      } else {
        yield put(addMsg( myLanguage==="ar" ?  data?.message?.ar : data?.message?.fr, 'danger'));
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
    // console.log(e);
  }
}

function giftsApi({ token }) {
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

function giftsTrackingApi({ token, id }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/orderGifts/id/${id}`,
    cancelToken: source.token,
  });
}

export function* getGiftsSaga() {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(giftsApi, JSON.parse(userdata));

    if (data) {
      if (data.success) {
        if (data.count !== 0) {
          yield put(getGiftsSuccess(data.data));
          const dataTracking = yield call(giftsTrackingApi, {
            token: JSON.parse(userdata).token,
            id: data.data?.[0].id,
          });
          yield put(getGiftsTrackingSuccess(dataTracking.data));
        } else {
          yield put(getGiftsTrackingSuccess([]));
        }
        yield put(isLoading(false));
      } else {
        yield put(addMsg( myLanguage==="ar" ?  data?.message?.ar : data?.message?.fr, 'danger'));
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
    // console.log(e);
  }
}

export default function* rootSaga() {
  yield all([takeLeading(GET_ORDERS, getOrdersSaga)]);
  yield all([takeLeading(GET_ORDERS_TRACKING, getOrdersSaga)]);

  yield all([takeLeading(GET_ORDERS_GIFT, getGiftsSaga)]);
  yield all([takeLeading(GET_GIFTS_TRACKING, getGiftsSaga)]);
}
