/*
 *
 * OrdersHistory actions
 *
 */

import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_GIFT,
  GET_ORDERS_SUCCESS_GIFT,
  GET_ORDERS_TRACKING,
  GET_ORDERS_TRACKING_SUCCESS,
  GET_GIFTS_TRACKING,
  GET_GIFTS_TRACKING_SUCCESS,
} from './constants';

export function getOrders() {
  return {
    type: GET_ORDERS,
  };
}
export function getGifts() {
  return {
    type: GET_ORDERS_GIFT,
  };
}

export function getOrdersSuccess(response) {
  return {
    type: GET_ORDERS_SUCCESS,
    response,
  };
}
export function getGiftsSuccess(response) {
  return {
    type: GET_ORDERS_SUCCESS_GIFT,
    response,
  };
}
export function getOrdersTracking() {
  return {
    type: GET_ORDERS_TRACKING,
  };
}
export function getOrdersTrackingSuccess(response) {
  return {
    type: GET_ORDERS_TRACKING_SUCCESS,
    response,
  };
}
export function getGiftsTracking() {
  return {
    type: GET_GIFTS_TRACKING,
  };
}
export function getGiftsTrackingSuccess(response) {
  return {
    type: GET_GIFTS_TRACKING_SUCCESS,
    response,
  };
}
