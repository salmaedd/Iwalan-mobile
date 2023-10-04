/*
 *
 * ProductSummary actions
 *
 */

import {
  CONFIRM_ORDER, CONFIRM_ORDER_SUCCESS, GET_PROFILE,
  GET_PROFILE_SUCCESS
} from './constants';

export function confirmOrder(products,coupon,totalPoints,address,successCallback) {
  return {
    type: CONFIRM_ORDER,
    products,
    coupon,
    totalPoints,
    address,
    successCallback
  };
}

export function confirmOrderSuccess(response) {
  return {
    type: CONFIRM_ORDER_SUCCESS,
    response,
  };
}
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