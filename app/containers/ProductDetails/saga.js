import { all, put, call, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

import { path } from '../../utils/apiPath';
import { getToken, timeout } from '../../utils/MainMethods';
import { addMsg } from '../message/actions';
import { isLoading } from '../Login/actions';
import { getAccessoriesSuccess, getProductSuccess, addProductToCart } from './actions';
import { GET_ACCESSORIES, GET_PRODUCT, ADD_PRODUCT_CART, REMOVE_FROM_CART } from './constants';
import { TIMEOUT } from '../../utils/constants';

import { syncProductDetails } from '../../services/synchronisation';
import { getProductByID, getProductDetails } from '../../services/queries';
import ProductDetail from '../../models/ProductDetail';
import Product from '../../models/Product';

import { segment } from '../../utils/segment';
import { select } from 'redux-saga/effects';
let myLanguage = '';

function getProductApi({ token, id }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + '/products/id/' + id,
    cancelToken: source.token,
  });
}

function ProductDetails({ userId, id }) {
  let mydata = { event: 'Product clicked ', userId: userId, id: id, timestamp: new Date() };
  return segment('track', mydata);
}

function addProductCart(action) {
  let mydata = {
    event: 'Product added to the cart',
    userId: action.userId,
    timestamp: new Date(),
    id: action.product.id,
  };
  return segment('track', mydata);
}
function removeFromCart(action) {
  let mydata = {
    event: 'Product removed from the cart ',
    userId: action.userId,
    timestamp: new Date(),
    id: action.productId,
  };
  return segment('track', mydata);
}

export function* getProductOffline(action) {
  const getLang = state => state?.login?.myLang;
  const Lang = yield select(getLang);
  myLanguage = Lang;

  const data = new Product(yield getProductByID(action.id));
  yield put(getProductSuccess(data));
}
export function* getProduct(action) {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(getProductApi, { token: JSON.parse(userdata).token, id: action.id });

    yield call(ProductDetails, { userId: JSON.parse(userdata).code, id: action.id });
    if (data) {
      if (data.success) {
        yield put(getProductSuccess(data.data));
        yield put(isLoading(false));
        if (data.data) {
          const productDetail = new Product(data.data);
          yield syncProductDetails(productDetail);
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
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      yield getProductOffline(action);
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

function getAccessoriesApi({ token }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/accessories`,
    cancelToken: source.token,
  });
}

export function* getAccessories() {
  //not used
  /*
  try {
    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(getAccessoriesApi, { token: JSON.parse(userdata).token });

    yield put(getAccessoriesSuccess(data.data));
    yield put(isLoading(false));
  } catch (e) {
    yield put(isLoading(false));
    console.log(e);
  }*/
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_PRODUCT, getProduct),
    takeLatest(GET_ACCESSORIES, getAccessories),
    takeLatest(ADD_PRODUCT_CART, addProductCart),
    takeLatest(REMOVE_FROM_CART, removeFromCart),
  ]);
}
