/*
 * OrdersHistory Messages
 *
 * This contains all the text for the OrdersHistory container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.OrdersHistory';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'OrdersHistory',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the OrdersHistory container!',
  },
});
