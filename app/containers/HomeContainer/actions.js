/*
 *
 * HomeContainer actions
 *
 */

import {
  GET_BRANDS_DATA,
  GET_BRANDS_DATA_SUCCESS,
  GET_PRODUCT_DATA,
  GET_PRODUCT_DATA_SUCCESS,
  GET_PRODUCT_SLIDES,
  GET_PRODUCT_SLIDES_SUCCESS,
  GET_RECOMMENDED_PRODUCTS,
  GET_RECOMMENDED_PRODUCTS_SUCCESS,
  GET_TOP_SELLERS,
  GET_TOP_SELLERS_SUCCESS,
  GET_DATA,
  GET_DATA_REFRESH,
} from './constants';

export function getBrandsData() {
  return {
    type: GET_BRANDS_DATA,
  };
}
export function getBrandsDataSuccess(data) {
  return {
    type: GET_BRANDS_DATA_SUCCESS,
    data,
  };
}
export function getProductsData() {
  return {
    type: GET_PRODUCT_DATA,
  };
}
export function getProductsDataSuccess(data) {
  return {
    type: GET_PRODUCT_DATA_SUCCESS,
    data,
  };
}
export function gettopSellers() {
  return {
    type: GET_TOP_SELLERS,
  };
}

export function gettopSellersSuccess(data) {
  return {
    type: GET_TOP_SELLERS_SUCCESS,
    data,
  };
}

export function getProductSlides(slideType) {
  return {
    type: GET_PRODUCT_SLIDES,
    slideType,
  };
}

export function getProductSlidesSuccess(data) {
  return {
    type: GET_PRODUCT_SLIDES_SUCCESS,
    data,
  };
}

export function getRecommendedProducts() {
  return {
    type: GET_RECOMMENDED_PRODUCTS,
  };
}

export function getRecommendedProductsSuccess(data) {
  return {
    type: GET_RECOMMENDED_PRODUCTS_SUCCESS,
    data,
  };
}

export function getData(data) {
  return {
    type: GET_DATA,
    data,
  };
}
export function getDataForRefresh(data) {
  return {
    type: GET_DATA_REFRESH,
    data,
  };
}
