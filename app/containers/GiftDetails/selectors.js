import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the giftDetails state domain
 */

const selectGiftDetailsDomain = state => state.giftDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GiftDetails
 */

const makeSelectGiftDetails = () =>
  createSelector(
    selectGiftDetailsDomain,
    substate => substate,
  );

const makeSelectGiftsCart = () =>
  createSelector(
    selectGiftDetailsDomain,
    substate => substate.cart,
  );
export default makeSelectGiftDetails;
export { selectGiftDetailsDomain, makeSelectGiftsCart };
