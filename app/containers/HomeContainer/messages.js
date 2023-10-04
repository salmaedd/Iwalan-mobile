/*
 * HomeContainer Messages
 *
 * This contains all the text for the HomeContainer container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomeContainer';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'HomeContainer',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HomeContainer container!',
  },
});
