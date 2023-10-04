/*
 *
 * Account actions
 *
 */

import { GET_PROFILE, GET_PROFILE_SUCCESS, LOGOUT, APP_LOADER, APP_ERR } from './constants';

export function getProfile() {
  return {
    type: GET_PROFILE,
  };
}

export function getProfileSuccess(data) {
  return {
    type: GET_PROFILE_SUCCESS,
    data,
  };
}
export function logout(data,messageErrI18n) {
  return {
    type: LOGOUT,
    nav: data,
    messageErrI18n,
  };
}

export function isLoading(value) {
  return {
    type: APP_LOADER,
    value,
  };
}
export function err(value) {
  return {
    type: APP_ERR,
    value,
  };
}