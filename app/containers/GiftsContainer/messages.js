/*
 * GiftsContainer Messages
 *
 * This contains all the text for the GiftsContainer container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GiftsContainer';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'GiftsContainer',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the GiftsContainer container!',
  },
});
