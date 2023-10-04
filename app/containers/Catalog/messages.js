/*
 * Catalog Messages
 *
 * This contains all the text for the Catalog container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Catalog';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Catalog',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Catalog container!',
  },
});
