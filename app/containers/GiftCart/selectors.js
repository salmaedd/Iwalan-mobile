import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the giftCart state domain
 */

const selectGiftCartDomain = state => state.giftCart || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GiftCart
 */

const makeSelectGiftCart = () =>
  createSelector(
    selectGiftCartDomain,
    substate => substate,
  );

export default makeSelectGiftCart;
export { selectGiftCartDomain };
