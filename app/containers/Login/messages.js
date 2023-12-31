/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Login';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Login',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Login container!',
  },
});
