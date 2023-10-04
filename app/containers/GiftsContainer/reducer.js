/*
 *
 * GiftsContainer reducer
 *
 */
import produce from 'immer';
import { GET_GIFT_SLIDES_SUCCESS } from './constants';
import { GET_PROFILE_SUCCESS } from '../ProfileContainer/constants';
import { GET_GIFTS_SUCCESS, GET_OPEN_GIFTS_SUCCESS, GET_LOCKED_GIFTS_SUCCESS, GET_CATEGORIES_SUCCESS } from './constants';

export const initialState = {
  gifts: [],
  openGifts: [],
  lockedGifts: [],
  banners: [],
  categories: [],
  profile: {},
};

/* eslint-disable default-case, no-param-reassign */
const giftsContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_GIFTS_SUCCESS:
        draft.gifts = action.response;
        break;
      case GET_OPEN_GIFTS_SUCCESS:
        draft.openGifts = action.response;
        break;
      case GET_LOCKED_GIFTS_SUCCESS:
        draft.lockedGifts = action.response;
        break;
      case GET_GIFT_SLIDES_SUCCESS:
        draft.banners = action.data;
        break;
      case GET_PROFILE_SUCCESS:
        draft.profile = action.data;
        break;
      case GET_CATEGORIES_SUCCESS:
        draft.categories = action.response;
        break;
    }
  });

export default giftsContainerReducer;
