import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the giftSummary state domain
 */

const selectGiftSummaryDomain = state => state.giftSummary || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GiftSummary
 */

const makeSelectGiftSummary = () =>
  createSelector(
    selectGiftSummaryDomain,
    substate => substate,
  );

export default makeSelectGiftSummary;
export { selectGiftSummaryDomain };
