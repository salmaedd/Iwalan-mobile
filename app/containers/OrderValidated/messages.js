/*
 * OrderValidated Messages
 *
 * This contains all the text for the OrderValidated container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.OrderValidated';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'OrderValidated',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the OrderValidated container!',
  },
});
