/*
 * Product Messages
 *
 * This contains all the text for the Product component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Product';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Product component!',
  },
});
