import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderValidated state domain
 */

const selectOrderValidatedDomain = state => state.orderValidated || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderValidated
 */

const makeSelectOrderValidated = () =>
  createSelector(
    selectOrderValidatedDomain,
    substate => substate,
  );

export default makeSelectOrderValidated;
export { selectOrderValidatedDomain };
