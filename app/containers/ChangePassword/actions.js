/*
 *
 * Change password actions
 *
 */

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
} from './constants';

export function changePassword(userInfo) {
  return {
    type: CHANGE_PASSWORD,
    userInfo
  };
}

export function changePasswordSuccess(response) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    response,
  };
}
