import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tabContainer state domain
 */

const selectTabContainerDomain = state => state.tabContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TabContainer
 */

const makeSelectTabContainer = () =>
  createSelector(
    selectTabContainerDomain,
    substate => substate,
  );

const makeSelectBrands = () =>
  createSelector(
    selectTabContainerDomain,
    substate => substate.brands,
  );

export default makeSelectTabContainer;
export { selectTabContainerDomain, makeSelectBrands };
