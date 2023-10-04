/*
 * OrderTracking Messages
 *
 * This contains all the text for the OrderTracking container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.OrderTracking';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'OrderTracking',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the OrderTracking container!',
  },
});
