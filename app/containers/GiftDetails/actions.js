/*
 *
 * GiftDetails actions
 *
 */

import {
  ADD_GIFT_CART,
  GET_GIFT,
  EMPTY_GIFT_CART,
  GET_GIFT_SUCCESS,
  REMOVE_FROM_CART,
  UPDATE_GIFT_CART_QUANTITY,
} from './constants';

export function getGift(id) {
  return {
    type: GET_GIFT,
    id,
  };
}

export function getGiftSuccess(response) {
  return {
    type: GET_GIFT_SUCCESS,
    response,
  };
}

export function addGiftToCart(addedGift) {
  return {
    type: ADD_GIFT_CART,
    addedGift,
  };
}

export function removeGiftFromCart(giftId) {
  return {
    type: REMOVE_FROM_CART,
    giftId,
  };
}

export function updateGiftQuantity(quantity, id) {
  return {
    type: UPDATE_GIFT_CART_QUANTITY,
    quantity,
    id,
  };
}
export function emptyGiftCart() {
  return {
    type: EMPTY_GIFT_CART,
  };
}
