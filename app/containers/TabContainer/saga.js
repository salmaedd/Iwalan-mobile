import Axios from 'axios';
import { takeEvery, all, put, call, takeLatest } from 'redux-saga/effects';
import { path } from '../../utils/apiPath';
import { getToken } from '../../utils/MainMethods';
import request from '../../utils/request';
import { isLoading } from '../Login/actions';
import { getBannerDataSuccess, getBestSellingDataSuccess, getBrandsDataSuccess } from './actions';
import { GET_BANNER_DATA, GET_BEST_SELLING_DATA, GET_BRANDS_DATA } from './constants';
import { select } from 'redux-saga/effects';

let myLanguage = '';

export function* getBanners(action) {
  const url = path + '/banners';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      langue: myLanguage,
    },
  };
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    const resp = yield request(url, options).then(response => response.json());
    yield put(getBannerDataSuccess(resp));
  } catch (e) {
    //  console.log(e);
  }
}

function brandsApi({ token }) {
  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + '/brands',
  });
}

export function* getBrands() {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(brandsApi, JSON.parse(userdata));
    yield put(getBrandsDataSuccess(data.data));
    yield put(isLoading(false));
  } catch (e) {
    yield put(isLoading(false));
    // console.log(e);
  }
}

export function* getBestSelling(action) {
  const url = path + '/best-selling';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      langue: myLanguage,
    },
  };
  try {
    const resp = yield request(url, options).then(response => response.json());
    yield put(getBestSellingDataSuccess(resp));
  } catch (e) {
    // console.log(e);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_BANNER_DATA, getBanners),
    takeLatest(GET_BRANDS_DATA, getBrands),
    takeEvery(GET_BEST_SELLING_DATA, getBestSelling),
  ]);
}
