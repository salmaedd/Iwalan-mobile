/*
 *
 * GiftsContainer actions
 *
 */

import {
  GET_GIFTS,
  GET_GIFTS_SUCCESS,
  GET_OPEN_GIFTS,
  GET_OPEN_GIFTS_SUCCESS,
  GET_LOCKED_GIFTS,
  GET_LOCKED_GIFTS_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_GIFT_SLIDES,
  GET_GIFT_SLIDES_SUCCESS,
  GET_DATA,
} from './constants';


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

export function getOpenGifts() {
  return {
    type: GET_OPEN_GIFTS,
  };
}

export function getOpenGiftsSuccess(response) {
  return {
    type: GET_OPEN_GIFTS_SUCCESS,
    response,
  };
}

export function getLockedGifts() {
  return {
    type: GET_LOCKED_GIFTS,
  };
}

export function getLockedGiftsSuccess(response) {
  return {
    type: GET_LOCKED_GIFTS_SUCCESS,
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

export function getGiftSlides(slideType) {
  return {
    type: GET_GIFT_SLIDES,
    slideType,
  };
}

export function getGiftSlidesSuccess(data) {
  return {
    type: GET_GIFT_SLIDES_SUCCESS,
    data,
  };
}

export function getData(data) {
  return {
    type: GET_DATA,
    data,
  };
}