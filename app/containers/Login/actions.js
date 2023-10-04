/*
 *
 * Login actions
 *
 */

import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  APP_LOADER,
  CHANGE_LANG,
} from './constants';

export function loginUser(username, password, errLoginFaildText) {
  return {
    type: USER_LOGIN,
    username,
    password,
    errLoginFaildText,
  };
}

export function loginSuccess(response) {
  return {
    type: USER_LOGIN_SUCCESS,
    response,
  };
}

export function loginFail(value) {
  return {
    type: USER_LOGIN_FAIL,
    value,
  };
}

export function forgotPassword(userId) {
  return {
    type: FORGOT_PASSWORD,
    userId,
  };
}

export function forgotPasswordSuccess(response) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    response,
  };
}

export function isLoading(value) {
  return {
    type: APP_LOADER,
    value,
  };
}

export function setMyLanguage(value) {
  return {
    type: CHANGE_LANG,
    value,
  };
}
