/*
 * Notifications Messages
 *
 * This contains all the text for the Notifications container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Notifications';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Notifications',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Notifications container!',
  },
});
