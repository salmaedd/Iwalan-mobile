import Axios from 'axios';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { path } from '../../utils/apiPath';
import { getToken, timeout } from '../../utils/MainMethods';
import { TIMEOUT } from '../../utils/constants';
import { isLoading } from '../Login/actions';
// import { changeLanguage } from './actions';
import { CHANGE_LANGUAGE } from './constants';
import { addMsg } from '../message/actions';
import { select } from 'redux-saga/effects';

let myLanguage = '';
function changeLang({ token, id_customer }) {
  let source = Axios.CancelToken.source();
  setTimeout(() => timeout(source), TIMEOUT);
  return Axios.request({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer-${token}`,
      langue: myLanguage,
    },
    data: {
      langue: myLanguage,
    },

    url: path + `/customers`,
    cancelToken: source.token,
  });
}

export function* changeMyLang(payload) {
  try {
    const getLang = state => state?.login?.myLang;
    const Lang = yield select(getLang);
    myLanguage = Lang;

    yield put(isLoading(true));
    const userdata = yield getToken();
    const { data } = yield call(changeLang, JSON.parse(userdata));
    if (data) {
      if (data.success) {
        yield put(addMsg(myLanguage === 'ar' ? data?.message?.ar : data?.message?.fr, 'success'));
      } else {
        yield put(addMsg(myLanguage === 'ar' ? data?.message?.ar : data?.message?.fr, 'danger'));
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
  yield all([takeLatest(CHANGE_LANGUAGE, changeMyLang(lang))]);
}
