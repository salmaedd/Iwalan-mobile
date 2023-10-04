/*
 *
 * GiftSummary actions
 *
 */

import { CONFIRM_GIFT_ORDER, CONFIRM_GIFT_ORDER_SUCCESS, GIFT_HISTORY, GIFT_HISTORY_SUCCESS } from './constants';

export function confirmGiftOrder(giftsIds,address) {
  return {
    type: CONFIRM_GIFT_ORDER,
    giftsIds,
    address
  };
}

export function confirmGiftOrderSuccess(response) {
  return {
    type: CONFIRM_GIFT_ORDER_SUCCESS,
    response,
  };
}

export function giftHistory() {
  return {
    type: GIFT_HISTORY,
  };
}

export function giftHistorySuccess(response) {
  return {
    type: GIFT_HISTORY_SUCCESS,
    response,
  };
}
