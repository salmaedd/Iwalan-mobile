/*
 *
 * OrderTracking reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_ORDERS_TRACKING_SUCCESS } from './constants';

export const initialState = {
  ordersTracking: [],
};

/* eslint-disable default-case, no-param-reassign */
const orderTrackingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_ORDERS_TRACKING_SUCCESS:
        draft.ordersTracking = action.response;
        break;
    }
  });

export default orderTrackingReducer;
