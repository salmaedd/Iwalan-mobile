/*
 * GiftDetails Messages
 *
 * This contains all the text for the GiftDetails container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GiftDetails';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'GiftDetails',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the GiftDetails container!',
  },
});
