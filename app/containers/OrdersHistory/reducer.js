/*
 *
 * OrdersHistory reducer
 *
 */
import produce from 'immer';
import {
  GET_ORDERS_SUCCESS,
  GET_ORDERS_TRACKING_SUCCESS,
  GET_ORDERS_SUCCESS_GIFT,
  GET_GIFTS_TRACKING_SUCCESS,
} from './constants';

export const initialState = {
  orders: [],
  ordersTracking: [],
  gifts: [],
  giftsTracking: [],
};

/* eslint-disable default-case, no-param-reassign */
const ordersHistoryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ORDERS_SUCCESS:
        draft.orders = action.response;
        break;
      case GET_ORDERS_SUCCESS_GIFT:
        draft.gifts = action.response;
        break;
      case GET_ORDERS_TRACKING_SUCCESS:
        draft.ordersTracking = action.response;
        break;
      case GET_GIFTS_TRACKING_SUCCESS:
        draft.giftsTracking = action.response;
        break;
    }
  });

export default ordersHistoryReducer;
