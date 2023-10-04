import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = state => state.homeContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

const makeSelectHomeContainer = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => substate,
  );
const makeSelectBrands = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => substate.brands,
  );

export default makeSelectHomeContainer;
export { selectHomeContainerDomain, makeSelectBrands };
