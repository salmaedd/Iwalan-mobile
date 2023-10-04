import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profileContainer state domain
 */

const selectProfileContainerDomain = state => state.profileContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProfileContainer
 */

const makeSelectProfileContainer = () =>
  createSelector(
    selectProfileContainerDomain,
    substate => substate,
  );

export default makeSelectProfileContainer;
export { selectProfileContainerDomain };
