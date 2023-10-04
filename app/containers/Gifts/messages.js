/*
 * Gifts Messages
 *
 * This contains all the text for the Gifts container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Gifts';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Gifts',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Gifts container!',
  },
});
