/*
 * ProductCart Messages
 *
 * This contains all the text for the ProductCart container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductCart';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'ProductCart',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ProductCart container!',
  },
});
