/*
 *
 * ProfileContainer reducer
 *
 */
import produce from 'immer';
import { GET_PROFILE_SUCCESS, CHANGE_PROFILE_IMAGE_SUCCESS } from './constants';
import { GET_ORDERS_SUCCESS, GET_ORDERS_TRACKING_SUCCESS } from '../OrdersHistory/constants';

export const initialState = {
  profile: {},
  avatar: '',
  orders: [],
  ordersTracking: [],
};

/* eslint-disable default-case, no-param-reassign */
const profileContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROFILE_SUCCESS:
        draft.profile = action.data;
        break;
      case CHANGE_PROFILE_IMAGE_SUCCESS:
        {
          draft.avatar = action.data.image.avatar;
        }
        break;
      case GET_ORDERS_SUCCESS:
        draft.orders = action.response;
        break;
      case GET_ORDERS_TRACKING_SUCCESS:
        draft.ordersTracking = action.response;
        break;
    }
  });

export default profileContainerReducer;
