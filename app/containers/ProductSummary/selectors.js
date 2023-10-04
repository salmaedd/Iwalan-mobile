import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productSummary state domain
 */

const selectProductSummaryDomain = state => state.productSummary || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductSummary
 */

const makeSelectProductSummary = () =>
  createSelector(
    selectProductSummaryDomain,
    substate => substate,
  );

export default makeSelectProductSummary;
export { selectProductSummaryDomain };
