import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the giftsContainer state domain
 */

const selectGiftsContainerDomain = state => state.giftsContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GiftsContainer
 */

const makeSelectGiftsContainer = () =>
  createSelector(
    selectGiftsContainerDomain,
    substate => substate,
  );

export default makeSelectGiftsContainer;
export { selectGiftsContainerDomain };
