/*
 *
 * Catalog actions
 *
 */

import {
  GET_PRODUCTS,
  GET_PRODUCTS_BRAND,
  GET_PRODUCTS_BRAND_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  SET_FILTER_CRITERIA,
  SET_PRODUCTS,
  GET_BRANDS_DATA,
  GET_BRANDS_DATA_SUCCESS,
} from './constants';

export function getProducts(criteria) {
  return {
    type: GET_PRODUCTS,
    criteria,
  };
}

export function getProductsSuccess(data) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    data,
  };
}

export function setFilterCriteria(data) {
  return {
    type: SET_FILTER_CRITERIA,
    data,
  };
}

export function getProductsByBrand(id) {
  return {
    type: GET_PRODUCTS_BRAND,
    id,
  };
}

export function getProductsByBrandSuccess(data) {
  return {
    type: GET_PRODUCTS_BRAND_SUCCESS,
    data,
  };
}

export function setProducts(data) {
  return {
    type: SET_PRODUCTS,
    data,
  };
}

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