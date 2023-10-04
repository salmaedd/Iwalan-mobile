/*
 *
 * Gifts reducer
 *
 */
import produce from 'immer';
import { GET_GIFTS_CATEGORY_SUCCESS, GET_CATEGORIES_SUCCESS, GET_GIFTS_SUCCESS } from './constants';
//import { GET_CATEGORIES_SUCCESS, GET_GIFTS_SUCCESS } from '../GiftsContainer/constants';

export const initialState = {
  categories: [],
  gifts: [],
  giftsByCategory: [],
};

/* eslint-disable default-case, no-param-reassign */
const giftsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CATEGORIES_SUCCESS:
        draft.categories = action.response;
        break;
      case GET_GIFTS_SUCCESS:
        draft.gifts = action.response;
        break;
      case GET_GIFTS_CATEGORY_SUCCESS:
        {
          draft.giftsByCategory = action.response;
        }
        break;
    }
  });

export default giftsReducer;
