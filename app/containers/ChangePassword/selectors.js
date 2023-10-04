import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePassword state domain
 */

const selectChangePasswordDomain = state => state.changePassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChangePassword
 */

const makeSelectChangePassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate,
  );

export default makeSelectChangePassword;
export { selectChangePasswordDomain };
