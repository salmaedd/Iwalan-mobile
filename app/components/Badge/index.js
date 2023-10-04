import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Point from '../../assets/itemPoints.png';
import { Colors, Spacing, Typography } from '../../styles';

const styles = StyleSheet.create({
  mainBadge: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: Spacing.SCALE_24,
    paddingHorizontal: Spacing.SCALE_2,
    backgroundColor: '#ffac0b',
    borderRadius: Spacing.SCALE_12,
    position: 'absolute',
    right: Spacing.SCALE_14,
    marginTop: Spacing.SCALE_16,
    minWidth: Spacing.SCALE_64,
  },
  secondaryBadge: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: Spacing.SCALE_24,
    paddingHorizontal: Spacing.SCALE_2,
    backgroundColor: '#ffac0b',
    borderRadius: Spacing.SCALE_12,
    position: 'absolute',
    right: 0,
    minWidth: Spacing.SCALE_64,
  },
  point: {
    width: Spacing.SCALE_20,
    height: Spacing.SCALE_20,
  },
  pointStyle: {
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_14,
    lineHeight: Typography.LINE_HEIGHT_14,
    marginLeft: Spacing.SCALE_4,
  },
});

function Badge({ score, secondary, style, lang }) {
  return (
    <LinearGradient
      start={{ x: 0, y: 3 }}
      end={{ x: 1, y: 0 }}
      colors={['#f3b43c', '#ffac0b']}
      style={[
        secondary
          ? styles.secondaryBadge
          : { ...styles.mainBadge, right: lang === 'ar' ? Spacing.SCALE_80 : Spacing.SCALE_14 },
        style,
      ]}>
      <Image source={Point} style={styles.point} />
      <Text style={styles.pointStyle} numberOfLines={1}>
        +{score}
      </Text>
    </LinearGradient>
  );
}

export default Badge;
