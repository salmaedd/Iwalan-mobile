/*
 *
 * ProductCart actions
 *
 */

import { APP_LOADER, GET_COUPON, GET_COUPON_SUCCESS, GET_GIFT, GET_GIFT_SUCCESS } from './constants';

// export function getSuggestedProducts() {
//   return {
//     type: GET_SUGGESTED_PRODUCTS,
//   };
// }

// export function getSuggestedProductsSuccess(response) {
//   return {
//     type: GET_SUGGESTED_PRODUCTS_SUCCESS,
//     response,
//   };
// }

export function isLoading(value) {
  return {
    type: APP_LOADER,
    value,
  };
}
export function getCoupon(code) {
  return {
    type: GET_COUPON,
    code
  };
}

export function getCouponSuccess(response) {
  return {
    type: GET_COUPON_SUCCESS,
    response,
  };
}

export function getGifts() {
  return {
    type: GET_GIFT,
  };
}

export function getGiftsSuccess(response) {
  return {
    type: GET_GIFT_SUCCESS,
    response,
  };
}
