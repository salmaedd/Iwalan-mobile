import Axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import Accessory from '../../models/Accessory';
import Brand from '../../models/Brand';
import ProductsForYou from '../../models/ProductsForYou';
import ProductSlide from '../../models/ProductSlide';
import Recommended from '../../models/Recommended';
import TopSeller from '../../models/TopSeller';
import {
  getBrands as getBrandsQuery,
  getProductsForYouRaw,
  /*getProductSlidesWithProducts*/ getProductSlides as getProductSlidesQuery,
  getRecommendedRaw,
  getTopSellersRaw,
} from '../../services/queries';
import {
  syncAccessories,
  syncBrands,
  syncProductsForYou,
  syncProductSlides,
  syncRecommended,
  syncTopSellers,
} from '../../services/synchronisation';
import { path } from '../../utils/apiPath';
import { TIMEOUT } from '../../utils/constants';
import { getToken, timeout } from '../../utils/MainMethods';
//import { IntlProvider, defineMessages } from 'react-intl';
import { isLoading } from '../Login/actions';
import { addMsg } from '../message/actions';
import { getOrdersSuccess, getOrdersTrackingSuccess } from '../OrdersHistory/actions';
import { GET_ORDERS, GET_ORDERS_TRACKING } from '../OrdersHistory/constants';
//import { getOrdersSaga } from '../OrdersHistory/saga';
import {
  getBrandsDataSuccess,
  getProductsDataSuccess,
  getProductSlidesSuccess,
  getRecommendedProductsSuccess,
  gettopSellersSuccess,
} from './actions';
import {
  GET_BRANDS_DATA,
  GET_DATA,
  GET_DATA_REFRESH,
  GET_PRODUCT_DATA,
  GET_PRODUCT_SLIDES,
  GET_RECOMMENDED_PRODUCTS,
  GET_TOP_SELLERS,
} from './constants';
import { select } from 'redux-saga/effects';

let mode = 'online';
let myLanguage = '';

function productsApi({ token, id }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/customers/${id}/products`,
    cancelToken: source.token,
  });
}
function accessoriesApi({ token }) {
  // used for sync : don't add timeout
  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/accessories`,
  });
}
// function ProductViewed({ id, list }) {
//   let mydata = { event: `products list viewed (${list})`, userId: id, timestamp: new Date() };
//   return segment('track', mydata);
// }

export function* getProductsOffline() {
  const data = (yield getProductsForYouRaw()).map(row => new ProductsForYou(row));
  yield put(getProductsDataSuccess(data));
}
export function* getProducts() {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(productsApi, {
        token: JSON.parse(userdata).token,
        id: JSON.parse(userdata).id_customer,
      });

      if (data.data) {
        mode = 'online';
        yield put(getProductsDataSuccess(data.data));
        //    yield call(ProductViewed, { id: JSON.parse(userdata).code, list: 'Products for you' });
        const productsForYou = data.data.map(row => new ProductsForYou(row));
      }
      yield put(isLoading(false));
      const result = yield call(accessoriesApi, { token: JSON.parse(userdata).token });
      const accessories = result?.data?.data?.map(row => new Accessory(row));
      yield syncAccessories(accessories ?? []);
      yield syncProductsForYou(productsForYou);
    } else {
      yield getProductsOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      mode = 'offline';
      yield getProductsOffline();
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

export function* getProductsRefresh() {
  try {
    yield put(isLoading(false));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(productsApi, {
        token: JSON.parse(userdata).token,
        id: JSON.parse(userdata).id_customer,
      });
      if (data.data) {
        mode = 'online';
        yield put(getProductsDataSuccess(data.data));
        //    yield call(ProductViewed, { id: JSON.parse(userdata).code, list: 'Products for you' });
        const productsForYou = data.data.map(row => new ProductsForYou(row));
        const result = yield call(accessoriesApi, { token: JSON.parse(userdata).token });
        const accessories = result?.data?.data?.map(row => new Accessory(row));
        yield syncAccessories(accessories ?? []);
        yield syncProductsForYou(productsForYou);
      }
      yield put(isLoading(false));
    } else {
      yield getProductsOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      mode = 'offline';
      yield getProductsOffline();
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
  const data = (yield getBrandsQuery()).map(row => new Brand(row));
  yield put(getBrandsDataSuccess(data));
  // console.log('offline brands', data?.length);
}
export function* getBrands() {
  try {
    yield put(isLoading(true));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(brandsApi, JSON.parse(userdata));

      if (data) {
        mode = 'online';
        yield put(getBrandsDataSuccess(data.data));
        if (data.data) {
          const brands = data.data.map(row => new Brand(row));
          yield syncBrands(brands);
        }
      }
      yield put(isLoading(false));
    } else {
      yield getBrandsOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      mode = 'offline';
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
export function* getBrandsRefresh() {
  // console.log('HOME CONTAINER ----------------------------------------------------------------');
  try {
    yield put(isLoading(false));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(brandsApi, JSON.parse(userdata));
      if (data) {
        mode = 'online';
        yield put(getBrandsDataSuccess(data.data));
        if (data.data) {
          const brands = data.data.map(row => new Brand(row));
          yield syncBrands(brands);
        }
      }
      yield put(isLoading(false));
    } else {
      yield getBrandsOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getBrands fail -------------------');
      mode = 'offline';
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

function bestSellingApi({ token, id_customer }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/customers/${id_customer}/topSeller`,
    cancelToken: source.token,
  });
}

export function* getTopSellerProductsOffline() {
  const data = (yield getTopSellersRaw()).map(row => new TopSeller(row));
  // console.log('offline topSellers', data?.length);
  yield put(gettopSellersSuccess(data));
}
export function* getTopSellerProducts() {
  try {
    yield put(isLoading(true));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(bestSellingApi, JSON.parse(userdata));

      if (data) {
        //  console.log('getTopSellerProducts success -------------------');
        mode = 'online';
        if (data.data) {
          //    yield call(ProductViewed, { id: JSON.parse(userdata).code, list: 'Top Sellers' });
          yield put(gettopSellersSuccess(data.data));
          const topSellers = data.data.map(row => new TopSeller(row));
          yield syncTopSellers(topSellers);
        }
      }
      yield put(isLoading(false));
    } else {
      yield getTopSellerProductsOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //  console.log('getTopSellerProducts error', e);
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getTopSellerProducts fail -------------------');
      mode = 'offline';
      yield getTopSellerProductsOffline();
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

export function* getTopSellerProductsRefresh() {
  try {
    yield put(isLoading(false));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(bestSellingApi, JSON.parse(userdata));
      if (data) {
        //  console.log('getTopSellerProducts success -------------------');
        mode = 'online';
        if (data.data) {
          //    yield call(ProductViewed, { id: JSON.parse(userdata).code, list: 'Top Sellers' });
          yield put(gettopSellersSuccess(data.data));
          const topSellers = data.data.map(row => new TopSeller(row));
          yield syncTopSellers(topSellers);
        }
      }
      yield put(isLoading(false));
    } else {
      yield getTopSellerProductsOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //  console.log('getTopSellerProducts error', e);
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getTopSellerProducts fail -------------------');
      mode = 'offline';
      yield getTopSellerProductsOffline();
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
function slidesApi({ token, type }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/slides/${type}`,
    cancelToken: source.token,
  });
}

export function* getProductSlidesOffline() {
  const data = yield getProductSlidesQuery(); //.map(row =>{ console.log(row); new ProductSlide(row)});
  // console.log('offline product slides', data?.length);
  //  console.log('offline product slides', data);
  yield put(getProductSlidesSuccess(data));
}
export function* getProductSlides(action) {
  try {
    yield put(isLoading(true));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(slidesApi, { token: JSON.parse(userdata).token, type: action.slideType });
      if (data.data) {
        //   console.log('getProductSlides success -------------------');
        mode = 'online';
        yield put(getProductSlidesSuccess(data.data));
        if (data.data) {
          const slides = data.data.map(row => new ProductSlide(row));
          yield syncProductSlides(slides);
        }
      }
      yield put(isLoading(false));
    } else {
      yield getProductSlidesOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //   console.log(e);
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getProductSlides fail -------------------');
      mode = 'offline';
      yield getProductSlidesOffline();
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
export function* getProductSlidesRefresh(action) {
  try {
    yield put(isLoading(false));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(slidesApi, { token: JSON.parse(userdata).token, type: action.slideType });
      if (data.data) {
        //   console.log('getProductSlides success -------------------');
        mode = 'online';
        yield put(getProductSlidesSuccess(data.data));
        if (data.data) {
          const slides = data.data.map(row => new ProductSlide(row));
          yield syncProductSlides(slides);
        }
      }
      yield put(isLoading(false));
    } else {
      yield getProductSlidesOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //   console.log(e);
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getProductSlides fail -------------------');
      mode = 'offline';
      yield getProductSlidesOffline();
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

function recommendedApi({ token, id }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/customers/${id}/recommended`,
    cancelToken: source.token,
  });
}

export function* getRecommendedProductsOffline() {
  const data = (yield getRecommendedRaw()).map(row => new Recommended(row));
  //  console.log('offline Recommended', data?.length);
  //console.log('offline Recommended', data);
  yield put(getRecommendedProductsSuccess(data));
}
export function* getRecommendedProducts(action) {
  try {
    yield put(isLoading(true));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(recommendedApi, {
        token: JSON.parse(userdata).token,
        id: JSON.parse(userdata).id_customer,
      });

      if (data) {
        //  console.log('getRecommendedProducts success -------------------');
        mode = 'online';
        yield put(getRecommendedProductsSuccess(data.data));
        //  yield call(ProductViewed, { id: JSON.parse(userdata).code, list: 'Recommended Products' });
        if (data.data) {
          const recommended = data.data.map(row => new Recommended(row));
          yield syncRecommended(recommended);
        }
      }
      yield put(isLoading(false));
    } else {
      yield getRecommendedProductsOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getRecommendedProducts fail -------------------');
      mode = 'offline';
      yield getRecommendedProductsOffline();
      yield put(isLoading(false));
      yield put(
        addMsg(myLanguage === 'ar' ? ' الرجاء الاتصال بالإنترنت.' : 'Merci de se connecter à Internet.', 'danger'),
      );
    } else {
      yield put(isLoading(false));
      yield put(getRecommendedProductsSuccess([]));
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
export function* getRecommendedProductsRefresh(action) {
  try {
    yield put(isLoading(false));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(recommendedApi, {
        token: JSON.parse(userdata).token,
        id: JSON.parse(userdata).id_customer,
      });
      if (data) {
        //  console.log('getRecommendedProducts success -------------------');
        mode = 'online';
        yield put(getRecommendedProductsSuccess(data.data));
        //  yield call(ProductViewed, { id: JSON.parse(userdata).code, list: 'Recommended Products' });
        if (data.data) {
          const recommended = data.data.map(row => new Recommended(row));
          yield syncRecommended(recommended);
        }
      }
      yield put(isLoading(false));
    } else {
      yield getRecommendedProductsOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getRecommendedProducts fail -------------------');
      mode = 'offline';
      yield getRecommendedProductsOffline();
      yield put(isLoading(false));
      yield put(
        addMsg(myLanguage === 'ar' ? ' الرجاء الاتصال بالإنترنت.' : 'Merci de se connecter à Internet.', 'danger'),
      );
    } else {
      yield put(isLoading(false));
      yield put(getRecommendedProductsSuccess([]));
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
    yield put(isLoading(true));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(ordersApi, JSON.parse(userdata));
      if (data) {
        //  console.log('getOrdersSaga success -------------------');
        mode = 'online';
        if (data.success) {
          yield put(getOrdersSuccess(data.data));
          if (data.count !== 0) {
            const dataTracking = yield call(ordersTrackingApi, {
              token: JSON.parse(userdata).token,
              id: data.data?.[0].id,
            });
            yield put(getOrdersTrackingSuccess(dataTracking?.data));
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
    }
    yield put(isLoading(false));
  } catch (e) {
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getOrdersSaga fail -------------------');
      mode = 'offline';
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

export function* getOrdersSagaRefresh() {
  try {
    yield put(isLoading(false));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(ordersApi, JSON.parse(userdata));

      if (data) {
        //  console.log('getOrdersSaga success -------------------');
        mode = 'online';
        if (data.success) {
          yield put(getOrdersSuccess(data.data));
          if (data.count !== 0) {
            const dataTracking = yield call(ordersTrackingApi, {
              token: JSON.parse(userdata).token,
              id: data.data?.[0].id,
            });
            yield put(getOrdersTrackingSuccess(dataTracking?.data));
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
    }
    yield put(isLoading(false));
  } catch (e) {
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getOrdersSaga fail -------------------');
      mode = 'offline';
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

export function* getData(action) {
  try {
    mode = 'online';
    //console.log('mooooooooooode -------------', mode);
    yield getProductSlides(action.data);
    // console.log("mooooooooooode -------------",mode);
    yield getBrands(action.data);
    // // console.log("mooooooooooode -------------",mode);
    yield getProducts(action.data);
    // // console.log("mooooooooooode -------------",mode);
    // yield getRecommendedProducts(action.data);
    // // console.log("mooooooooooode -------------",mode);
    // yield getTopSellerProducts(action.data);
    // // console.log("mooooooooooode -------------",mode);
    // yield getOrdersSaga();
    // console.log("mooooooooooode -------------",mode);
  } catch (e) {
    // console.log(e);
  }
}
export function* getDataForRefresh(action) {
  try {
    mode = 'online';
    yield getProductSlidesRefresh(action.data);
    yield getBrandsRefresh(action.data);
    yield getProductsRefresh(action.data);
    yield getRecommendedProductsRefresh(action.data);
    yield getTopSellerProductsRefresh(action.data);
    yield getOrdersSagaRefresh();
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_BRANDS_DATA, getBrands),
    takeLatest(GET_PRODUCT_DATA, getProducts),
    takeLatest(GET_TOP_SELLERS, getTopSellerProducts),
    takeLatest(GET_PRODUCT_SLIDES, getProductSlides),
    takeLatest(GET_RECOMMENDED_PRODUCTS, getRecommendedProducts),
    takeLatest(GET_ORDERS, getOrdersSaga),
    takeLatest(GET_ORDERS_TRACKING, getOrdersSaga),
    takeLatest(GET_DATA, getData),
    takeLatest(GET_DATA_REFRESH, getDataForRefresh),
  ]);
}
