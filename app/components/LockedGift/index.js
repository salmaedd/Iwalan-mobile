/**
 *
 * LockedGift
 *
 */

import React, { memo } from 'react';

import { View, Text, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
// import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import Lock from '../../assets/lock.png';
import { Spacing, Typography } from '../../styles';

export const styles = StyleSheet.create({
  card: {
    width: Mixins.WINDOW_WIDTH - 20,
    height: 155,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    padding: Spacing.SCALE_15,
    marginBottom: Spacing.SCALE_10,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#fb4896',
  },
  designation: {
    fontSize: Typography.FONT_SIZE_16,
    color: '#7a879d',
    marginBottom: Spacing.SCALE_10,
  },
  message: {
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: '600',
    color: '#fb4896',
    marginBottom: Spacing.SCALE_20,
  },
  image: {
    width: Spacing.SCALE_36,
    height: Spacing.SCALE_40,
  },
  badge: {
    width: Spacing.SCALE_24,
    height: Spacing.SCALE_24,
    borderRadius: Spacing.SCALE_12,
    backgroundColor: '#fb4896',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: Spacing.SCALE_18,
    top: -5,
  },
  badgeText: {
    fontSize: Typography.FONT_SIZE_12,
    fontWeight: '600',
    color: Colors.WHITE,
  },
  thumbnail: {
    width: Spacing.SCALE_128,
    height: Spacing.SCALE_104,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
});

function LockedGift(props) {
  return (
    <View style={styles.card}>
      <View style={styles.leftView}>
        <Text style={styles.designation}>
          {props.intl.formatMessage({ id: 'app.components.LockedGift.unlockGift' })}
        </Text>
        <Text style={styles.message}>{props.intl.formatMessage({ id: 'app.components.LockedGift.addGift' })}</Text>
        <View>
          <Image source={{ uri: props.url_product && props.url_product.toString() }} style={styles.image} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>X{props.number}</Text>
          </View>
        </View>
      </View>
      <View>
        <ImageBackground
          source={{ uri: props.background_image && props.background_image.toString() }}
          style={styles.thumbnail}
          imageStyle={{ borderRadius: 9 }}>
          <Image source={Lock} />
        </ImageBackground>
      </View>
    </View>
  );
}

LockedGift.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(LockedGift));
