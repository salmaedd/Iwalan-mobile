/*
 * Account Messages
 *
 * This contains all the text for the Account container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProfileContainer';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'ProfileContainer',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ProfileContainer container!',
  },
});
