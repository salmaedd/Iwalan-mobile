/*
 *
 * ProductCart reducer
 *
 */
import produce from 'immer';
import { APP_LOADER, GET_COUPON_SUCCESS, GET_GIFT_SUCCESS, GET_SUGGESTED_PRODUCTS_SUCCESS } from './constants';
// import { suggestedProducts, unlockItem } from '../../Mocks/Product';

export const initialState = {
  suggestedProducts: [],
  gifts: [],
  coupon:null,
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const productCartReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SUGGESTED_PRODUCTS_SUCCESS:
        draft.suggestedProducts = action.response;
        break;
      case GET_GIFT_SUCCESS:
        draft.gifts = action.response;
        break;
      case GET_COUPON_SUCCESS:
        draft.coupon = action.response;
        break;
      case APP_LOADER:
        draft.isLoading = action.value;
    }
  });

export default productCartReducer;
