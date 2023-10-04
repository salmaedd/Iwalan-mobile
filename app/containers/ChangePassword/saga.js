import { all, put, call, takeLatest } from 'redux-saga/effects';
import { path } from '../../utils/apiPath';
import { isLoading } from '../Login/actions';
import { getToken, getUserInfo, timeout } from '../../utils/MainMethods';
import { TIMEOUT } from '../../utils/constants';
import { changePasswordSuccess } from './actions';
import { CHANGE_PASSWORD } from './constants';
import axios from 'axios';
import { addMsg } from '../message/actions';
import { select } from 'redux-saga/effects';

let myLanguage = '';

function changePasswordApi({ token, userName, userId, userInfo }) {
  let source = axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);

  return axios.request({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    data: {
      username: userName,
      password: userInfo.newPassword,
      oldPassword: userInfo.oldPassword,
    },
    url: path + `/customers/${userId}/resetPassword`,
    cancelToken: source.token,
  });
}

export function* changePassword(action) {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const token = yield getToken();
    const userData = yield getUserInfo();
    // console.log('******************************',userData,action.userInfo);
    const { data } = yield call(changePasswordApi, {
      token: JSON.parse(token).token,
      userName: JSON.parse(userData).code,
      userId: JSON.parse(userData).id,
      userInfo: action.userInfo,
    });
    yield put(isLoading(false));
    if (data.success) {
      yield put(changePasswordSuccess( myLanguage==="ar" ?  data?.message?.ar : data?.message?.fr));
      yield put(addMsg( myLanguage==="ar" ?  data?.message?.ar : data?.message?.fr, 'success'));
    } else {
      yield put(addMsg( myLanguage==="ar" ?  data?.message?.ar : data?.message?.fr, 'danger'));
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
  yield all([takeLatest(CHANGE_PASSWORD, changePassword)]);
}
