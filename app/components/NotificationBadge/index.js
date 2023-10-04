/**
 *
 * NotificationBadge
 *
 */

import React, { memo } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import { Icon } from 'react-native-elements';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

export const styles = StyleSheet.create({
  mainText: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: '#24378b',
    fontWeight: '500',
    marginBottom: Spacing.SCALE_4,
  },
  timeStyle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
    color: '#7a879d',
  },
  container: {
    backgroundColor: '#e4e8ef',
    width: '100%',
    borderRadius: Spacing.SCALE_10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_10,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

function NotificationBadge(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.innerContainer}>
          <Icon name={props.iconName} type={props.type} color={props.iconColor} />
          <View style={{ marginLeft: Spacing.SCALE_20, flexShrink: 1 }}>
            <Text style={[styles.mainText, { color: props.textColor }]}>
              {props.intl.formatMessage({ id: 'app.components.NotificationBadge' })}
            </Text>
            <Text style={styles.timeStyle}>5 hours ago</Text>
          </View>
        </View>
      </TouchableOpacity>
      {props.notif && <Icon name="fiber-manual-record" type="material" color="#fb4896" size={Spacing.SCALE_16} />}
    </View>
  );
}

NotificationBadge.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(NotificationBadge));
