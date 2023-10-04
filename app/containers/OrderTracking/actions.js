/*
 *
 * OrderTracking actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import { GET_ORDERS_TRACKING, GET_ORDERS_TRACKING_SUCCESS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
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
