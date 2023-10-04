/*
 *
 * ProductDetails reducer
 *
 */
import produce from 'immer';
import { filter, findIndex } from 'lodash';
import {
    ADD_PRODUCT_CART, EMPTY_PRODUCT_CART, GET_ACCESSORIES_SUCCESS,
    GET_PRODUCT_SUCCESS, REMOVE_FROM_CART, UPDATE_PRODUCT_CART,
    UPDATE_PRODUCT_CART_QUANTITY
} from './constants';

export const initialState = {
  product: {},
  accessories: [],
  cart: [],
};

/* eslint-disable default-case, no-param-reassign */
const productDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PRODUCT_SUCCESS:
        draft.product = action.response;
        break;
      case GET_ACCESSORIES_SUCCESS:
        draft.accessories = action.response;
        break;
      case ADD_PRODUCT_CART:
        {
          const productsCart = draft.cart;
          const productCart = filter(productsCart, element => element.id === action.product.id);
          const productIndex = findIndex(productsCart, element => element.id === action.product.id);
          if (productCart?.length === 0) {
            draft.cart = [...draft.cart, action.product];
          } else {
            productsCart[productIndex] = action.product;
            draft.cart = productsCart; //replace
          }
        }
        break;
      case REMOVE_FROM_CART:
        draft.cart = filter(draft.cart, element => element.id !== action.productId);
        break;
      case EMPTY_PRODUCT_CART:
        draft.cart = [];
        break;
      case UPDATE_PRODUCT_CART:
        {
          const products = draft.cart;
          products[action.index] = action.product;
          draft.cart = products;
        }
        break;
      case UPDATE_PRODUCT_CART_QUANTITY:
        {
          const existingProduct = filter(draft.cart, element => element.id === action.id);
          const newProduct = {
            ...existingProduct[0],
            quantity: action.quantity,
          };
          const productIndex = findIndex(draft.cart, element => element.id === action.id);
          const productsCart = draft.cart;
          productsCart[productIndex] = newProduct;
          draft.cart = productsCart; //replace
        }
        break;
    }
  });

export default productDetailsReducer;
