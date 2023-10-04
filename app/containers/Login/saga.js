import analytics from '@segment/analytics-react-native';
import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { path } from '../../utils/apiPath';
import { LOGIN_TIMEOUT } from '../../utils/constants';
import { setInfoLogin, setToken, timeout } from '../../utils/MainMethods';
import request from '../../utils/request';
import * as RootNavigation from '../../utils/RootNavigation';
import { addMsg } from '../message/actions';
import { forgotPasswordSuccess, isLoading, loginSuccess } from './actions';
import { FORGOT_PASSWORD, USER_LOGIN } from './constants';
import { select } from 'redux-saga/effects';

let myLanguage = '';

function loginApi(authParams) {
  let source = axios.CancelToken.source();
  setTimeout(() => timeout(source), LOGIN_TIMEOUT);
  return axios.request({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      langue: myLanguage,
    },
    auth: {
      username: authParams.username,
      password: authParams.password,
    },
    url: path + '/customers/login/',
    cancelToken: source.token,
  });
}

function LoginSegment({ data }) {
  let segment_data = { userId: data.code, timestamp: new Date() };
  analytics.track('Sign_in', segment_data);
}

export function* login(action) {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    // yield put(loginFail(false));
    yield put(isLoading(true));
    const { data } = yield call(loginApi, action);
    if (data.success) {
      // yield call(IdentifyUserSegment, { data: data.data });
      yield call(LoginSegment, { data: data.data });
      setToken({
        ...data.data,
        cartId: String(Math.random()),
      });
      setInfoLogin(action);
      yield put(loginSuccess(data.data));
      yield put(isLoading(false));
      if (data.redirect === true) {
        RootNavigation.navigate('NewPassword');
      } else {
        RootNavigation.navigate('Main');
      }
    } else {
      yield put(isLoading(false));
      yield put(addMsg(myLanguage === 'ar' ? data?.message?.ar : data?.message?.fr, 'danger'));
    }
  } catch (e) {
    //  console.log(e);
    const network_error = !e.status;
    if (network_error) {
      yield put(isLoading(false));
      yield put(
        addMsg(myLanguage === 'ar' ? ' الرجاء الاتصال بالإنترنت.' : 'Merci de se connecter à Internet.', 'danger'),
      );
    } else {
      // yield put(loginFail(true));
      yield put(isLoading(false));
      yield put(addMsg(action.errLoginFaildText, 'danger'));
    }
  }
}

export function* forgotPass(action) {
  const getLang = state => state?.login?.myLang;
  const Lang = yield select(getLang);
  myLanguage = Lang;

  const { userid } = action;
  const url = path + '/forgot-password';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      langue: myLanguage,
    },
    body: JSON.stringify({ id: userid }),
  };
  try {
    const resp = yield request(url, options).then(response => response.json());
    yield put(forgotPasswordSuccess(resp));
  } catch (e) {
    //  console.log(e);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(USER_LOGIN, login), takeEvery(FORGOT_PASSWORD, forgotPass)]);
}
