/*
 *
 * TabContainer actions
 *
 */

import {
  TAB_CHANGE,
  GET_BANNER_DATA,
  GET_BANNER_DATA_SUCCESS,
  GET_BRANDS_DATA,
  GET_BRANDS_DATA_SUCCESS,
  GET_BEST_SELLING_DATA,
  GET_BEST_SELLING_DATA_SUCCESS,
  GET_SELECTED_PRODUCTS_SUCCESS,
  GET_SELECTED_PRODUCTS,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
} from './constants';

export function setTab(index) {
  return {
    type: TAB_CHANGE,
    index,
  };
}

export function getBannerData() {
  return {
    type: GET_BANNER_DATA,
  };
}

export function getBannerDataSuccess(data) {
  return {
    type: GET_BANNER_DATA_SUCCESS,
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

export function getBestSellingData() {
  return {
    type: GET_BEST_SELLING_DATA,
  };
}

export function getBestSellingDataSuccess(data) {
  return {
    type: GET_BEST_SELLING_DATA_SUCCESS,
    data,
  };
}

export function getSelectedProducts() {
  return {
    type: GET_SELECTED_PRODUCTS,
  };
}

export function getSelectedProductsSuccess(data) {
  return {
    type: GET_SELECTED_PRODUCTS_SUCCESS,
    data,
  };
}

export function getProfile() {
  return {
    type: GET_PROFILE,
  };
}

export function getProfileSuccess(profile) {
  return {
    type: GET_PROFILE_SUCCESS,
    profile,
  };
}
