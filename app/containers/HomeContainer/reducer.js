/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import {
  GET_BRANDS_DATA_SUCCESS,
  GET_PRODUCT_DATA_SUCCESS,
  GET_PRODUCT_SLIDES_SUCCESS,
  GET_RECOMMENDED_PRODUCTS_SUCCESS,
  GET_TOP_SELLERS_SUCCESS,
} from './constants';
import { GET_ORDERS_SUCCESS, GET_ORDERS_TRACKING_SUCCESS } from '../OrdersHistory/constants';

export const initialState = {
  banners: [],
  brands: [],
  products: [],
  bestSelling: [],
  selectedProducts: [],
  recommendedProducts: [],
  orders: [],
  ordersTracking: [],

};

/* eslint-disable default-case, no-param-reassign */
const homeContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_BRANDS_DATA_SUCCESS:
        draft.brands = action.data;
        break;
      case GET_PRODUCT_DATA_SUCCESS:
        draft.products = action.data;
        break;
      case GET_TOP_SELLERS_SUCCESS:
        draft.bestSelling = action.data;
        break;
      case GET_PRODUCT_SLIDES_SUCCESS:
        draft.banners = action.data;
        break;
      case GET_RECOMMENDED_PRODUCTS_SUCCESS:
        draft.recommendedProducts = action.data;
        break;
      case GET_ORDERS_SUCCESS:
        draft.orders = action.response;
        break;
      case GET_ORDERS_TRACKING_SUCCESS:
        draft.ordersTracking = action.response;
        break;
    }
  });

export default homeContainerReducer;
