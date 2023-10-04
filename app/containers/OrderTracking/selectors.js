import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderTracking state domain
 */

const selectOrderTrackingDomain = state => state.orderTracking || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderTracking
 */

const makeSelectOrderTracking = () =>
  createSelector(
    selectOrderTrackingDomain,
    substate => substate,
  );

export default makeSelectOrderTracking;
export { selectOrderTrackingDomain };
