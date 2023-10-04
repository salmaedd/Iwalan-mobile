import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the account state domain
 */

const selectProfileContainerDomain = state => state.account || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by account
 */

const makeSelectProfileContainer = () =>
  createSelector(
    selectProfileContainerDomain,
    substate => substate,
  );

export default makeSelectProfileContainer;
export { selectProfileContainerDomain };
