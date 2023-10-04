/*
 * TabContainer Messages
 *
 * This contains all the text for the TabContainer container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TabContainer';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'TabContainer',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TabContainer container!',
  },
});
