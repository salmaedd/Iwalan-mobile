/*
 * ChangePassword Messages
 *
 * This contains all the text for the ChangePassword container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ChangePassword';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'ChangePassword',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Change password container!',
  },
});
