/*
 * ProductSummary Messages
 *
 * This contains all the text for the ProductSummary container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductSummary';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'ProductSummary',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ProductSummary container!',
  },
});
