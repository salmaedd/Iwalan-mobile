/*
 *
 * GiftDetails reducer
 *
 */
import produce from 'immer';
// import { personalizedGift } from '../../Mocks/gifts';
import { filter, findIndex } from 'lodash';
import {
    ADD_GIFT_CART, EMPTY_GIFT_CART, GET_GIFT_SUCCESS, REMOVE_FROM_CART,
    UPDATE_GIFT_CART_QUANTITY
} from './constants';

export const initialState = {
  gift: {},
  cart: [],
};

/* eslint-disable default-case, no-param-reassign */
const giftDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_GIFT_SUCCESS:
        draft.gift = action.response;
        break;
      case ADD_GIFT_CART:
        const giftsCart = draft.cart;
        const giftCart = filter(giftsCart, element => element.id === action.addedGift.id);
        const giftIndex = findIndex(giftsCart, element => element.id === action.addedGift.id);
        if (giftCart?.length === 0) {
          draft.cart = [...draft.cart, action.addedGift];
        } else {
          giftsCart[giftIndex] = action.addedGift;
          draft.cart = giftsCart; //replace
        }
        break;
      case REMOVE_FROM_CART:
        draft.cart = draft.cart.filter(element => element.id !== action.giftId);
        break;
      case EMPTY_GIFT_CART:
        draft.cart = [];
        break;
      case UPDATE_GIFT_CART_QUANTITY:
        {
          const existingGift = filter(draft.cart, element => element.id === action.id);
          const newProduct = {
            ...existingGift[0],
            quantity: action.quantity,
          };
          const giftIndex = findIndex(draft.cart, element => element.id === action.id);
          const giftsCart = draft.cart;
          giftsCart[giftIndex] = newProduct;
          draft.cart = giftsCart; //replace
        }
        break;
    }
  });

export default giftDetailsReducer;
