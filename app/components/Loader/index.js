/**
 *
 * Loader
 *
 */

import React, { memo } from 'react';

import { View, ActivityIndicator } from 'react-native';
// import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';

import { Colors, Spacing, Typography, Mixins } from '../../styles';

function Loader(props) {
  return (
    <View
      style={{
        flex: 1,
        height: Mixins.WINDOW_HEIGHT,
        width: Mixins.WINDOW_WIDTH,
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={Colors.PINK} />
    </View>
  );
}

Loader.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(Loader));
