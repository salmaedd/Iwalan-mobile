import Axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import Gift from '../../models/Gift';
import GiftCategory from '../../models/GiftCategory';
import GiftSlide from '../../models/GiftSlide';
import {
  getGiftCategories,
  getGifts as getGiftsQuery,
  /*getGiftSlidesWithGifts*/ getGiftSlides as getGiftSlidesQuery,
  getOpenGifts as getOpenGiftsQuery,
} from '../../services/queries';
import { syncGiftCategories, syncGifts, syncGiftSlides, syncOpenGifts } from '../../services/synchronisation';
import { path } from '../../utils/apiPath';
import { TIMEOUT } from '../../utils/constants';
import { getToken, getUserInfo, setUserInfo, timeout } from '../../utils/MainMethods';
import { segment } from '../../utils/segment';
import { isLoading } from '../Login/actions';
import { addMsg } from '../message/actions';
import { getProfileSuccess } from '../ProfileContainer/actions';
import { GET_PROFILE } from '../ProfileContainer/constants';
import {
  getCategoriesSuccess,
  getGiftSlidesSuccess,
  getGiftsSuccess,
  getLockedGiftsSuccess,
  getOpenGiftsSuccess,
} from './actions';
import { GET_CATEGORIES, GET_DATA, GET_GIFTS, GET_GIFT_SLIDES, GET_LOCKED_GIFTS, GET_OPEN_GIFTS } from './constants';

import { select } from 'redux-saga/effects';

let myLanguage = '';
let mode = 'online';

//segment
function GiftHomePagetoSegment(data) {
  let mydata = {
    userId: data.code,
    event: 'Gift Homepage',
    properties: {
      name: 'Gift Homepage viewed ',
    },
    timestamp: new Date(),
  };
  return segment('track', mydata);
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
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(giftsApi, JSON.parse(userdata));
      if (data.data) {
        //   console.log('getGifts success -------------------');
        mode = 'online';
        yield GiftHomePagetoSegment(JSON.parse(userdata));
        yield put(getGiftsSuccess(data.data?.rows));
        yield put(isLoading(false));
        if (data.data.rows) {
          const gifts = data.data.rows.map(row => new Gift(row));
          yield syncGifts(gifts);
        }
      }
    } else {
      yield getGiftsOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    // console.log(e);
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getGifts fail -------------------');
      mode = 'offline';
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

function giftsOpenApi({ token }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + '/gifts?open=true',
    cancelToken: source.token,
  });
}

export function* getOpenGiftsOffline() {
  const data = (yield getOpenGiftsQuery()).map(row => new Gift(row));
  yield put(getOpenGiftsSuccess(data));
  // console.log('offline open gifts', data?.length);
}
export function* getOpenGifts() {
  try {
    yield put(isLoading(true));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(giftsOpenApi, JSON.parse(userdata));
      if (data.data) {
        mode = 'online';
        yield put(getOpenGiftsSuccess(data.data?.rows));
        //console.log('data data data data  *******************', data.data.rows);
        yield put(isLoading(false));
        if (data.data.rows) {
          const gifts = data.data.rows.map(row => new Gift(row));
          yield syncOpenGifts(gifts);
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
    } else {
      yield getOpenGiftsOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    // console.log(e);
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getOpenGifts fail -------------------');
      mode = 'offline';
      yield getOpenGiftsOffline();
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

function giftsLockedApi({ token }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + '/gifts?locked=true',
    cancelToken: source.token,
  });
}

export function* getLockedGifts() {
  try {
    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(giftsLockedApi, JSON.parse(userdata));
    yield put(getLockedGiftsSuccess(data.data.rows));
    yield put(isLoading(false));
  } catch (e) {
    yield put(isLoading(false));
    //   console.log(e);
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
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(getCategoriesApi, JSON.parse(userdata));
      if (data.data) {
        //  console.log('getCategories success -------------------');
        mode = 'online';
        yield put(getCategoriesSuccess(data.data?.rows));
        yield put(isLoading(false));
        if (data.data.rows) {
          const giftCategories = data.data.rows.map(row => new GiftCategory(row));
          yield syncGiftCategories(giftCategories);
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
    } else {
      yield getCategoriesOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      //   console.log('getCategories fail -------------------');
      mode = 'offline';
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

export function* getGiftSlidesOffline() {
  const data = { rows: [] };
  data.rows = (yield getGiftSlidesQuery()).map(row => new GiftSlide(row));
  yield put(getGiftSlidesSuccess(data));
  //  console.log('offline gift slides', data.rows?.length);
}
export function* getGiftSlides(action) {
  try {
    yield put(isLoading(true));
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(slidesApi, { token: JSON.parse(userdata).token, type: action.slideType });
      if (data.data) {
        // console.log('getGiftSlides success -------------------');
        mode = 'online';
        yield put(getGiftSlidesSuccess(data.data));
        yield put(isLoading(false));
        if (data.data.rows) {
          const slides = data.data.rows.map(row => new GiftSlide(row));
          yield syncGiftSlides(slides);
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
    } else {
      yield getGiftSlidesOffline();
      yield put(isLoading(false));
    }
  } catch (e) {
    // console.log(e);
    const network_error = !e.status;
    if (network_error) {
      //  console.log('getGiftSlides fail -------------------');
      mode = 'offline';
      yield getGiftSlidesOffline();
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
export function* getProfileOffline() {
  // with sync
  // const data = new Profile(yield getProfileQuery());
  let data = JSON.parse(yield getUserInfo());
  //  console.log('offline Profile', data);
  yield put(getProfileSuccess(data));
}
export function* getProfile() {
  try {
    if (mode == 'online') {
      const userdata = yield getToken();
      const { data } = yield call(profileApi, JSON.parse(userdata));
      if (data.data) {
        //   console.log('getProfile success -------------------');
        mode = 'online';
        setUserInfo(data.data);
        yield put(getProfileSuccess(data.data));
        yield put(isLoading(false));

        //No sync needed for now as user data is stored in asyncStorage with setUserInfo
        /* const profile = new Profile(data.data);
        yield syncProfile(profile);*/
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
    } else {
      yield getProfileOffline();
    }
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      //   console.log('getProfile fail -------------------');
      mode = 'offline';
      yield getProfileOffline();
    }
  }
}

export function* getData(action) {
  try {
    mode = 'online';
    //  console.log('mooooooooooode -------------', mode);
    yield getGiftSlides(action.data);
    //  console.log('mooooooooooode -------------', mode);
    yield getCategories(action.data);
    //  console.log('mooooooooooode -------------', mode);
    yield getProfile(action.data);
    // console.log('mooooooooooode -------------', mode);
    yield getGifts(action.data);
    //  console.log('mooooooooooode -------------', mode);
    yield getOpenGifts(action.data);
    //  console.log('mooooooooooode -------------', mode);
  } catch (e) {
    //  console.log(e);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_GIFTS, getGifts),
    takeLatest(GET_OPEN_GIFTS, getOpenGifts),
    takeLatest(GET_LOCKED_GIFTS, getLockedGifts),
    takeLatest(GET_GIFT_SLIDES, getGiftSlides),
    takeLatest(GET_PROFILE, getProfile),
    takeLatest(GET_CATEGORIES, getCategories),
    takeLatest(GET_DATA, getData),
  ]);
}
