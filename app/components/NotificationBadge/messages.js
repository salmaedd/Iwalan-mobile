/*
 * NotificationBadge Messages
 *
 * This contains all the text for the NotificationBadge component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NotificationBadge';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NotificationBadge component!',
  },
});
