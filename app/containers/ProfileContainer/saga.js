import Axios from 'axios';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { path } from '../../utils/apiPath';
import { getToken, setUserInfo, getUserInfo, timeout } from '../../utils/MainMethods';
import { TIMEOUT } from '../../utils/constants';
import { isLoading } from '../Login/actions';
import { getProfileSuccess, changeProfileImageSuccess } from './actions';
import { GET_PROFILE, CHANGE_PROFILE_IMAGE } from './constants';
import { Platform } from 'react-native';
import { addMsg } from '../message/actions';

import { getProfile as getProfileQuery } from '../../services/queries';
import { syncProfile } from '../../services/synchronisation';
import Profile from '../../models/Profile';
import { select } from 'redux-saga/effects';
let myLanguage = '';

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

export function* getProfile() {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(profileApi, JSON.parse(userdata));
    if (data) {
      if (data.success) {
        setUserInfo(data.data);
        yield put(getProfileSuccess(data.data));
        //No sync needed for now as user data is stored in asyncStorage with setUserInfo
        /* const profile = new Profile(data.data);
        yield syncProfile(profile);*/
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
    yield put(isLoading(false));
  } catch (e) {
    //   console.log(e);
    const network_error = !e.status;
    if (network_error) {
      // With sync :
      //const data = new Profile(yield getProfileQuery());
      let data = JSON.parse(yield getUserInfo());
      yield put(getProfileSuccess(data));
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

function changeProfileImageApi({ token, id_customer, response }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  var formData = new FormData();
  formData.append('fileData', {
    uri: Platform.OS === 'android' ? response.uri : response.uri.replace('file://', ''),
    name: 'fileData',
    type: 'image/jpeg',
  });

  return Axios.request({
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    data: formData,
    url: path + `/customers/${id_customer}/changeImage`,
    cancelToken: source.token,
  });
}

export function* changeProfileImage(action) {
  try {
    yield put(isLoading(true));
    const token = yield getToken();
    const userData = yield getUserInfo();
    const { data } = yield call(changeProfileImageApi, {
      token: JSON.parse(token).token,
      id_customer: JSON.parse(userData).id,
      response: action.data,
    });
    if (data) {
      if (data.success) {
        yield put(changeProfileImageSuccess(data.data));
        yield put(addMsg( myLanguage==="ar" ?  data?.message?.ar : data?.message?.fr, 'success'));
      } else {
        yield put(addMsg( myLanguage==="ar" ?  data?.message?.ar : data?.message?.fr, 'danger'));
      }
    }
    yield put(isLoading(false));
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
    //   console.log(e);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(GET_PROFILE, getProfile), takeLatest(CHANGE_PROFILE_IMAGE, changeProfileImage)]);
}
