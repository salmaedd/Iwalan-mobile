/*
 *
 * TabContainer reducer
 *
 */
import produce from 'immer';
import {
  TAB_CHANGE,
  GET_BANNER_DATA_SUCCESS,
  GET_BRANDS_DATA_SUCCESS,
  GET_BEST_SELLING_DATA_SUCCESS,
  GET_SELECTED_PRODUCTS_SUCCESS,
  GET_PROFILE_SUCCESS,
} from './constants';
// import { banner, brands, bestSelling } from '../../Mocks/home';
// import { profile } from '../../Mocks/profile';

export const initialState = {
  tab: 1,
  banners: [],
  brands: [],
  bestSelling: [],
  selectedProducts: [],
  profileInfo: {},
};

/* eslint-disable default-case, no-param-reassign */
const tabContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TAB_CHANGE:
        draft.tab = action.index;
        break;
      case GET_BANNER_DATA_SUCCESS:
        draft.banners = action.data;
        break;
      case GET_BRANDS_DATA_SUCCESS:
        draft.brands = action.data;
        break;
      case GET_BEST_SELLING_DATA_SUCCESS:
        draft.bestSelling = action.data;
        break;
      case GET_SELECTED_PRODUCTS_SUCCESS:
        draft.selectedProducts = action.data;
        break;
      case GET_PROFILE_SUCCESS:
        draft.profile = action.profile;
        break;
      default:
        draft = state;
        break;
    }
  });

export default tabContainerReducer;
