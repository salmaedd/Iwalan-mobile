/**
 *
 * Loader
 *
 */

import React, { memo } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Empty from '../../assets/svg/emptyState';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

import { injectIntl, intlShape } from 'react-intl';

export const styles = StyleSheet.create({
  noResults: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_24,
    color: '#5a6880',
    lineHeight: Typography.LINE_HEIGHT_30,
  },
  forCount: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: '#7a879d',
  },
});

function Loader(props) {
  return (
    // alignItems: 'center', marginTop: "32%"
    <View style={props.style}>
      <View style={{ marginBottom: Spacing.SCALE_36 }}>
        <Empty width={Spacing.SCALE_200} height={Spacing.SCALE_200} />
      </View>
      <Text style={styles.noResults}>{props.noResults}</Text>
      <Text style={styles.forCount}>
        {props.forCount} {props.search}
      </Text>
    </View>
  );
}

Loader.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(Loader));
