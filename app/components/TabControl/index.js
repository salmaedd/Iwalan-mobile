/**
 *
 * TabControl
 *
 */

import React, { memo } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f2f4f8',
  },
  main: {
    //flex: 1,
    width: '100%',
    backgroundColor: '#e4e8ef',
    paddingVertical: Spacing.SCALE_20,
    borderTopLeftRadius: Spacing.SCALE_20,
    borderTopRightRadius: Spacing.SCALE_20,
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabElement: {
    borderBottomWidth: 2,
    borderColor: '#fb4896',
    paddingBottom: Spacing.SCALE_10,
    borderStyle: 'solid',
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: '#7a879d',
  },
  selectedTitle: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: '#fb4896',
  },
  description: {
    textAlign: 'justify',
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: '#7a879d',
    lineHeight: Spacing.SCALE_25,
    paddingHorizontal: Spacing.SCALE_20,
  },
  technicaldescription1: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: '#7a879d',
    lineHeight: Spacing.SCALE_24,
    position: 'absolute',
    left: Spacing.SCALE_27,
    top: Spacing.SCALE_10,
  },
  technicaldescription2: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: '#5a6880',
    lineHeight: Spacing.SCALE_24,
    position: 'absolute',
    left: Spacing.SCALE_186,
    top: Spacing.SCALE_10,
  },
});
function TabControl(
  {
    firstTitle,
    secondTitle,
    index,
    onTabOnePress,
    onTabTwoPress,
    firstDescription,
    firstDescriptionNone,
    secondDescription,
  },
  props,
) {
  return (
    <View style={styles.root}>
      <View style={styles.tab}>
        <TouchableOpacity style={index === 0 ? styles.tabElement : {}} onPress={onTabOnePress}>
          <Text style={index === 0 ? styles.selectedTitle : styles.title}>{firstTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={index === 1 ? styles.tabElement : {}} onPress={onTabTwoPress}>
          <Text style={index === 1 ? styles.selectedTitle : styles.title}>{secondTitle}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        {index === 0 && !firstDescriptionNone && (
          <View style={{ height: Spacing.SCALE_48 /*, backgroundColor: "#eff2f7"*/ }}>
            <Text style={styles.technicaldescription1}>Mémoire vive</Text>
            <Text style={styles.technicaldescription2}>{firstDescription}</Text>
          </View>
        )}
        {(index !== 0 || firstDescriptionNone) && (
          <Text style={styles.description}>{index === 0 ? firstDescription : secondDescription}</Text>
        )}
      </View>
    </View>
  );
}

TabControl.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(TabControl));
