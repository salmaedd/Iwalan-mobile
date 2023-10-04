import Axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import Gift from '../../models/Gift';
import GiftCategory from '../../models/GiftCategory';
import { getGiftCategories, getGifts as getGiftsQuery } from '../../services/queries';
import { path } from '../../utils/apiPath';
//import { GET_CATEGORIES, GET_GIFTS } from '../GiftsContainer/constants';
import { TIMEOUT } from '../../utils/constants';
import { GIFT_TABLE } from '../../utils/database';
import { getToken, timeout } from '../../utils/MainMethods';
import { segment } from '../../utils/segment';
import { isLoading } from '../Login/actions';
import { addMsg } from '../message/actions';
//import { getCategories, getGifts } from '../GiftsContainer/saga';
import { getCategoriesSuccess, getGiftsByCategorySuccess, getGiftsSuccess } from './actions';
import { GET_CATEGORIES, GET_GIFTS, GET_GIFTS_CATEGORY } from './constants';
import { select } from 'redux-saga/effects';

let myLanguage = '';

//segment
function GiftListtoSegment(data) {
  let mydata = {
    userId: data.code,
    event: 'Gifts list',
    properties: {
      name: 'Gifts list viewed',
    },
    timestamp: new Date(),
  };
  return segment('track', mydata);
}

function giftCatagoryApi({ token, categoryId }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/giftscategories/id/${categoryId}`,
    cancelToken: source.token,
  });
}

export function* getGiftsByCategoryOffline(action) {
  const getLang = state => state?.login?.myLang;
  const Lang = yield select(getLang);
  myLanguage = Lang;

  const data = (yield getGiftsQuery([[], []], `WHERE ${GIFT_TABLE}.CategoryGiftId = ${action.categoryId}`)).map(
    row => new Gift(row),
  );
  //  console.log('offline gifts by category ', data?.length);
  yield put(getGiftsByCategorySuccess(data));
}
export function* getGiftsByCategory(action) {
  try {
    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(giftCatagoryApi, { token: JSON.parse(userdata), categoryId: action.categoryId });
    if (data) {
      if (data.success) {
        yield GiftListtoSegment(JSON.parse(userdata));
        yield put(getGiftsByCategorySuccess(data?.data?.gifts ?? []));
        yield put(isLoading(false));
      } else {
        yield put(addMsg( myLanguage==="ar" ?  data?.message?.ar : data?.message?.fr, 'danger'));
      }
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
  } catch (e) {
    //   console.log(e);
    const network_error = !e.status;
    if (network_error) {
      yield getGiftsByCategoryOffline(action);
      yield put(isLoading(false));
      yield put(
        addMsg(myLanguage === 'ar' ? ' الرجاء الاتصال بالإنترنت.' : 'Merci de se connecter à Internet.', 'danger'),
      );
    } else {
      yield put(isLoading(false));
      yield put(getGiftsByCategorySuccess([]));
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
    url: path + '/gifts',
    cancelToken: source.token,
  });
}

export function* getGiftsOffline() {
  const data = (yield getGiftsQuery()).map(row => new Gift(row));
  yield put(getGiftsSuccess(data));
  //  console.log('offline all gifts', data?.length);
}
export function* getGifts() {
  try {
    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(giftsApi, JSON.parse(userdata));
    if (data) {
      yield GiftListtoSegment(JSON.parse(userdata));
      yield put(getGiftsSuccess(data?.data?.rows));
      // No sync in gift catalog to avoid conflicts with giftContainer sync -- replace with sync missing
      //  const gifts = data.data.rows.map(row => new Gift(row));
      //  yield syncGifts(gifts);
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
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      yield getGiftsOffline();
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

function getCategoriesApi({ token }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + '/giftscategories',
    cancelToken: source.token,
  });
}

export function* getCategoriesOffline() {
  const data = (yield getGiftCategories()).map(row => new GiftCategory(row));
  yield put(getCategoriesSuccess(data));
  //  console.log('offline gift categories', data?.length);
}
export function* getCategories() {
  try {
    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(getCategoriesApi, JSON.parse(userdata));
    if (data) {
      yield put(getCategoriesSuccess(data?.data?.rows));
      yield put(isLoading(false));
      // No sync in gift catalog to avoid conflicts with giftContainer sync -- replace with sync missing
      // const giftCategories = data.data.rows.map(row => new GiftCategory(row));
      // yield syncGiftCategories(giftCategories);
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
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      yield getCategoriesOffline();
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
    takeLatest(GET_GIFTS_CATEGORY, getGiftsByCategory),
    takeLatest(GET_CATEGORIES, getCategories),
    takeLatest(GET_GIFTS, getGifts),
  ]);
}
