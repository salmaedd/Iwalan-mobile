/*
 *
 * GiftSummary reducer
 *
 */
import produce from 'immer';
import { CONFIRM_GIFT_ORDER_SUCCESS, GIFT_HISTORY_SUCCESS, EMPTY_PRODUCT_CART } from './constants';

export const initialState = {
  giftsHistory: [],
};

/* eslint-disable default-case, no-param-reassign */
const giftSummaryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONFIRM_GIFT_ORDER_SUCCESS:
        break;
      case GIFT_HISTORY_SUCCESS:
        draft.giftsHistory = action.data;
        break;
    }
  });

export default giftSummaryReducer;
