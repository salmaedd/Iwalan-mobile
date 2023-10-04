import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordersHistory state domain
 */

const selectOrdersHistoryDomain = state => state.ordersHistory || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrdersHistory
 */

const makeSelectOrdersHistory = () =>
  createSelector(
    selectOrdersHistoryDomain,
    substate => substate,
  );

export default makeSelectOrdersHistory;
export { selectOrdersHistoryDomain };
