/*
 *
 * ProfileContainer actions
 *
 */

import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  CHANGE_PROFILE_IMAGE,
  CHANGE_PROFILE_IMAGE_SUCCESS
} from './constants';

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

export function changeProfileImage(data) {
  return {
    type: CHANGE_PROFILE_IMAGE,
    data
  };
}

export function changeProfileImageSuccess(data) {
  return {
    type: CHANGE_PROFILE_IMAGE_SUCCESS,
    data,
  };
}