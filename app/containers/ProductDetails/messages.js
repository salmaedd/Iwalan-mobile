/*
 * ProductDetails Messages
 *
 * This contains all the text for the ProductDetails container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductDetails';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'ProductDetails',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ProductDetails container!',
  },
});
