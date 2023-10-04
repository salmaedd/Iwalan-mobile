/**
 *
 * NavigationHeader
 *
 */

import React, { memo } from 'react';

import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import Back from '../../assets/back.png';
import { Icon } from 'react-native-elements';

import { isLandscape } from '../../utils/MainMethods';

import { Colors, Spacing, Typography, Mixins } from '../../styles';

export const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.SCALE_16,
    marginVertical: !isLandscape() ? Spacing.SCALE_20 : 0,
  },
  headerTitle: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: '500',
    color: '#7a879d',
    textAlign: 'center',
  },
});
function NavigationHeader(props) {
  return (
    <View style={styles.header}>
      {props?.language === 'ar' ? (
        <>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>{props.title}</Text>
          </View>
          <TouchableOpacity underlayColor="transparent" onPress={props.onPress}>
          <Icon name="chevron-forward" type="ionicon" color="#7a879d" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity underlayColor="transparent" onPress={props.onPress}>
            <Image source={Back} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>{props.title}</Text>
          </View>
        </>
      )}
    </View>
  );
}

NavigationHeader.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(NavigationHeader));
