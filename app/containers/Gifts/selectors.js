import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gifts state domain
 */

const selectGiftsDomain = state => state.gifts || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Gifts
 */

const makeSelectGifts = () =>
  createSelector(
    selectGiftsDomain,
    substate => substate,
  );

export default makeSelectGifts;
export { selectGiftsDomain };
