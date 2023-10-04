import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productCart state domain
 */

const selectProductCartDomain = state => state.productCart || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductCart
 */

const makeSelectProductCart = () =>
  createSelector(
    selectProductCartDomain,
    substate => substate,
  );

export default makeSelectProductCart;
export { selectProductCartDomain };
