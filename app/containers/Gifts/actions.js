/*
 *
 * Gifts actions
 *
 */

import {
  GET_GIFTS_CATEGORY,
  GET_GIFTS_CATEGORY_SUCCESS,
  GET_GIFTS,
  GET_GIFTS_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
} from './constants';

export function getGiftsByCategory(categoryId) {
  return {
    type: GET_GIFTS_CATEGORY,
    categoryId,
  };
}

export function getGiftsByCategorySuccess(response) {
  return {
    type: GET_GIFTS_CATEGORY_SUCCESS,
    response,
  };
}

export function getGifts() {
  return {
    type: GET_GIFTS,
  };
}

export function getGiftsSuccess(response) {
  return {
    type: GET_GIFTS_SUCCESS,
    response,
  };
}

export function getCategories() {
  return {
    type: GET_CATEGORIES,
  };
}

export function getCategoriesSuccess(response) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    response,
  };
}