/*
 * GiftCart Messages
 *
 * This contains all the text for the GiftCart container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GiftCart';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'GiftCart',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the GiftCart container!',
  },
});
