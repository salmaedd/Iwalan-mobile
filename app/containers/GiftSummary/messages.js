/*
 * GiftSummary Messages
 *
 * This contains all the text for the GiftSummary container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GiftSummary';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'GiftSummary',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the GiftSummary container!',
  },
});
