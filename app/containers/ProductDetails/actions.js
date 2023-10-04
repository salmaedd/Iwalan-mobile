/*
 *
 * ProductDetails actions
 *
 */

import {
  ADD_PRODUCT_CART,
  EMPTY_PRODUCT_CART,
  GET_ACCESSORIES,
  GET_ACCESSORIES_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  REMOVE_FROM_CART,
  UPDATE_PRODUCT_CART,
  UPDATE_PRODUCT_CART_QUANTITY,
} from './constants';

export function getProduct(id) {
  return {
    type: GET_PRODUCT,
    id,
  };
}

export function getProductSuccess(response) {
  return {
    type: GET_PRODUCT_SUCCESS,
    response,
  };
}

export function getAccessories() {
  return {
    type: GET_ACCESSORIES,
  };
}

export function getAccessoriesSuccess(response) {
  return {
    type: GET_ACCESSORIES_SUCCESS,
    response,
  };
}

export function addProductToCart(product, userId) {
  return {
    type: ADD_PRODUCT_CART,
    product,
    userId
  };
}

export function removeProductFromCart(productId, userId) {
  return {
    type: REMOVE_FROM_CART,
    productId,
    userId
  };
}

export function emptyProductCart() {
  return {
    type: EMPTY_PRODUCT_CART,
  };
}

export function updateProductCart(index, product) {
  return {
    type: UPDATE_PRODUCT_CART,
    index,
    product,
  };
}

export function updateProductQuantity(quantity, id) {
  return {
    type: UPDATE_PRODUCT_CART_QUANTITY,
    quantity,
    id,
  };
}