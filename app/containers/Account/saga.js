import Axios from 'axios';
import { all, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { path } from '../../utils/apiPath';
import { getToken, clearAsyncStorage, timeout, getUserInfo } from '../../utils/MainMethods';
import { TIMEOUT } from '../../utils/constants';
import { getProfileSuccess, isLoading, err } from './actions';
import { GET_PROFILE, LOGOUT } from './constants';
import { addMsg } from '../message/actions';
import { segment } from '../../utils/segment';
import analytics from '@segment/analytics-react-native';
//segment
import { select } from 'redux-saga/effects';
let myLanguage = '';

function logoutTosegment(data) {
  let segment_data = { userId: data.code, timestamp: new Date() };
  analytics.track('Sign_out', segment_data);
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

function logoutApi({ token, id_customer }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return Axios.request({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    url: path + `/customers/${id_customer}/logout`,
    cancelToken: source.token,
  });
}

export function* getProfile() {
  /*
  try {
    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(profileApi, JSON.parse(userdata));
    if (data) {
      yield put(getProfileSuccess(data.data));
    } else {
      yield put(addMsg('Oups service non disponible, merci de réessayer', 'danger'));
    }
    yield put(isLoading(false));
  } catch (e) {
    const network_error = !e.status;
    if (network_error) {
      yield put(
        addMsg(
          "Merci de se connecter à Internet.",
          'danger',
        ),
      );
    } else {
      yield put(addMsg('Oups service non disponible, merci de réessayer', 'danger'));
    }
    yield put(isLoading(false));
    console.log(e);
  }*/
  const getLang = state => state?.login?.myLang;
  const Lang = yield select(getLang);
  myLanguage = Lang;

  const userData = yield getUserInfo();
  yield put(getProfileSuccess(userData));
}

export function* logout(action) {
  try {
    // const getLang = state => state?.login?.myLang;
    // const Lang = yield select(getLang);
    // myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { status } = yield call(logoutApi, JSON.parse(userdata));
    // console.log(status);
    if (status === 200) {
      yield logoutTosegment(JSON.parse(userdata));
      yield clearAsyncStorage();
      //  yield action.nav('Login');
    } else {
      yield put(addMsg(action.messageErrI18n, 'danger'));
      //yield put(err(true));
    }
    yield put(isLoading(false));
  } catch (e) {
    yield put(isLoading(false));
    yield put(addMsg(action.messageErrI18n, 'danger'));
    const network_error = !e.status;
    if (network_error) {
      yield put(
        addMsg(myLanguage === 'ar' ? ' الرجاء الاتصال بالإنترنت.' : 'Merci de se connecter à Internet.', 'danger'),
      );
    }
    yield put(isLoading(false));
    //  console.log(e);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(LOGOUT, logout), takeLatest(GET_PROFILE, getProfile)]);
}
