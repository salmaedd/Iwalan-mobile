/*
 *
 * ProductSummary reducer
 *
 */
import produce from 'immer';
import { CONFIRM_ORDER_SUCCESS, GET_PROFILE_SUCCESS } from './constants';

export const initialState = {
  profile: {},
};

/* eslint-disable default-case, no-param-reassign */
const productSummaryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONFIRM_ORDER_SUCCESS:
        draft.invoice = action.response;
        break;
      case GET_PROFILE_SUCCESS:
        draft.profile = action.data;
        break;
    }
  });

export default productSummaryReducer;
