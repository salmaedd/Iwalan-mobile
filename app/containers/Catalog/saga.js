import Axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import Brand from '../../models/Brand';
import Product from '../../models/Product';
import { getBrands as getBrandsQuery, getProductsByBrandId, getProductsWithVariants } from '../../services/queries';
import { path } from '../../utils/apiPath';
import { TIMEOUT } from '../../utils/constants';
import { getToken, timeout } from '../../utils/MainMethods';
import { isLoading } from '../Login/actions';
import { addMsg } from '../message/actions';
import { getBrandsDataSuccess, getProductsSuccess } from './actions';
import { GET_BRANDS_DATA, GET_PRODUCTS, GET_PRODUCTS_BRAND } from './constants';
import { select } from 'redux-saga/effects';
let myLanguage = '';

function productsApi({ token, id_customer }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/customers/${id_customer}/products`,
    cancelToken: source.token,
  });
}

export function* getproductsOffline() {
  const getLang = state => state?.login?.myLang;
  const Lang = yield select(getLang);
  myLanguage = Lang;

  const data = yield getProductsWithVariants()?.map(row => new Product(row));
  //  console.log('offline products in catalog', data.length);
  yield put(getProductsSuccess(data));
}
export function* getproducts(action) {
  try {
    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(productsApi, {
      token: JSON.parse(userdata).token,
      id_customer: JSON.parse(userdata).id_customer,
    });
    if (data.data) {
      yield put(getProductsSuccess(data.data));
      //  const productsForYou = data.data.map(row => new ProductsForYou(row));
      //  yield syncProductsForYou(productsForYou);
    }
    yield put(isLoading(false));
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      yield getproductsOffline();
      yield put(isLoading(false));
      yield put(
        addMsg(myLanguage === 'ar' ? ' الرجاء الاتصال بالإنترنت.' : 'Merci de se connecter à Internet.', 'danger'),
      );
    } else {
      yield put(getProductsSuccess([]));
      yield put(isLoading(false));
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
}

function productBrandApi({ token, brandId }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/brands/${brandId}/products`,
    cancelToken: source.token,
  });
}

export function* getProductsBrandsOffline(action) {
  const data = yield getProductsByBrandId(action.id)?.map(row => new Product(row)); //.filter(product => (product.BrandId == action.id) );
  yield put(getProductsSuccess(data ?? []));
}
export function* getProductsBrands(action) {
  try {
    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(productBrandApi, { token: JSON.parse(userdata).token, brandId: action.id });
    if (data) {
      yield put(getProductsSuccess(data.data ?? []));
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
    // console.log(e);
    const network_error = !e.status;
    if (network_error) {
      yield getProductsBrandsOffline(action);
      yield put(isLoading(false));
      yield put(
        addMsg(myLanguage === 'ar' ? ' الرجاء الاتصال بالإنترنت.' : 'Merci de se connecter à Internet.', 'danger'),
      );
    } else {
      yield put(getProductsSuccess([]));
      yield put(isLoading(false));
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
}

function brandsApi({ token }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + '/brands',
    cancelToken: source.token,
  });
}

export function* getBrandsOffline() {
  const data = yield getBrandsQuery()?.map(row => new Brand(row));
  yield put(getBrandsDataSuccess(data));
  // console.log('offline brands', data.length);
}
export function* getBrands() {
  try {
    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(brandsApi, JSON.parse(userdata));
    if (data.data) {
      yield put(getBrandsDataSuccess(data.data));
      // No sync in catalog to avoid conflicts with homeContainer sync -- replace with sync missing
      //  const brands = data.data.map(row => new Brand(row));
      //  yield syncBrands(brands);
    }
    yield put(isLoading(false));
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      yield getBrandsOffline();
      yield put(isLoading(false));
      yield put(
        addMsg(myLanguage === 'ar' ? ' الرجاء الاتصال بالإنترنت.' : 'Merci de se connecter à Internet.', 'danger'),
      );
    } else {
      yield put(isLoading(false));
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
}
export default function* rootSaga() {
  yield all([
    takeLatest(GET_PRODUCTS, getproducts),
    takeLatest(GET_PRODUCTS_BRAND, getProductsBrands),
    takeLatest(GET_BRANDS_DATA, getBrands),
  ]);
}
