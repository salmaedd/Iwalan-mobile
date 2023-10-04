import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notifications state domain
 */

const selectNotificationsDomain = state => state.notifications || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Notifications
 */

const makeSelectNotifications = () =>
  createSelector(
    selectNotificationsDomain,
    substate => substate,
  );

export default makeSelectNotifications;
export { selectNotificationsDomain };
