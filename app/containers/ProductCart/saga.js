import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { path } from '../../utils/apiPath';
import { TIMEOUT } from '../../utils/constants';
import { getToken, timeout } from '../../utils/MainMethods';
import { addMsg } from '../message/actions';
import { getCouponSuccess, isLoading } from './actions';
import { GET_COUPON, GET_GIFT, GET_SUGGESTED_PRODUCTS } from './constants';
import analytics from '@segment/analytics-react-native';
import { select } from 'redux-saga/effects';
let myLanguage = '';

function couponApi(code, token) {
  let source = axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  return axios.request({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    data: { code },
    url: path + '/coupons',
    cancelToken: source.token,
  });
}
function couponAppliedSegement(token, data) {
  analytics.track('Coupon Applied', {
    order_id: JSON.parse(token).cartId,
    cart_id: JSON.parse(token).cartId,
    coupon_id: data?.data?.id,
    coupon_name: data?.data?.code,
  });
}

export function* getCoupon(action) {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const token = yield getToken();
    const { data } = yield call(couponApi, action.code, JSON.parse(token).token);
    if (data.success) {
      const type = data.data?.type;
      const value = data.data?.obtaining[type];
      yield put(getCouponSuccess({ code: action.code, type, value, id_coupon: data.data?.id }));
      couponAppliedSegement(token, data);
      yield put(isLoading(false));
      yield put(addMsg( myLanguage==="ar" ?  data?.message?.ar : data?.message?.fr, 'success'));
    } else {
      yield put(isLoading(false));
      yield put(addMsg( myLanguage==="ar" ?  data?.message?.ar : data?.message?.fr, 'danger'));
    }
  } catch (e) {
    //  console.log(e);
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

export function* getSuggestedProducts() {
  /*
  const url = path + '/suggested-products';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const resp = yield request(url, options).then(response => response.json());
   // yield put(getSuggestedProductsSuccess(resp));
  } catch (e) {
    console.log(e);
  }*/
}

export function* getGifts() {
  /*
  const url = path + '/gifts';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const resp = yield request(url, options).then(response => response.json());
   // yield put(getGiftsSuccess(resp));
  } catch (e) {
    console.log(e);
  }*/
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_COUPON, getCoupon),
    takeEvery(GET_SUGGESTED_PRODUCTS, getSuggestedProducts),
    takeEvery(GET_GIFT, getGifts),
  ]);
}
