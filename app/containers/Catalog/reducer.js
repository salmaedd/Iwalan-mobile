/*
 *
 * Catalog reducer
 *
 */
import produce from 'immer';
import { GET_PRODUCTS_BRAND_SUCCESS, GET_PRODUCTS_SUCCESS, SET_FILTER_CRITERIA, SET_PRODUCTS, GET_BRANDS_DATA_SUCCESS } from './constants';

export const initialState = {
  products: [],
  brands: [],
  criteria: {
    minPrice: 0,
    maxPrice: 15000,
  },
  recommendedProducts: [],
};

/* eslint-disable default-case, no-param-reassign */
const catalogReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PRODUCTS_SUCCESS:
        draft.products = action.data;
        break;
      case SET_FILTER_CRITERIA:
        draft.criteria = action.data;
        break;
      case GET_PRODUCTS_BRAND_SUCCESS:
        draft.products = action.data;
        break;
      case SET_PRODUCTS:
        draft.products = action.data;
        break;
      case GET_BRANDS_DATA_SUCCESS:
        draft.brands = action.data;
        break;
    }
  });

export default catalogReducer;
