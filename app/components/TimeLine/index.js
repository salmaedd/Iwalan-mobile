/**
 *
 * TimeLine
 *
 */

import React, { memo } from 'react';

import { View, Text, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacing, Typography, Mixins } from '../../styles';
import Check from '../../assets/svg/check';
import Lock from '../../assets/svg/lock';

const styles = StyleSheet.create({
  timeline: {
    display: 'flex',
    flexDirection: 'row',
  },
  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    top: 5,
  },
  darkLine: {
    height: 2,
    backgroundColor: '#ffac0b',
    top: 33,
    left: -12,
  },
  label: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontWeight: '500',
    color: Colors.WHITE,
  },
  icon: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontWeight: 'bold',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Spacing.SCALE_16,
    height: Spacing.SCALE_16,
    borderRadius: Spacing.SCALE_50,
    marginTop: 5,
    marginBottom: 5,
  },
});

function Mark(props) {
  return (
    <View style={[styles.div, { left: props.left }]}>
      <Text style={styles.label}>{props.level}</Text>

      <LinearGradient
        style={styles.iconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[props.backgroundColor, props.name === 'lock-closed' ? '#ffffff' : props.backgroundColor]}>
        {props.name === 'checkmark' && <Check fill={props.color} width={Spacing.SCALE_12} height={Spacing.SCALE_12} />}
        {props.name === 'lock-closed' && <Lock fill={props.color} width={Spacing.SCALE_12} height={Spacing.SCALE_12} />}
      </LinearGradient>

      <Text style={styles.label}>{props.totalPoints}</Text>
    </View>
  );
}

function TimeLine(props) {
  const [width, setWidth] = React.useState(0);

  const onLayout = event => {
    let { width } = event.nativeEvent.layout;
    setWidth((width - 80) / 3);
  };

  const calculateWidth = point => {
    let currentWidth = 0;
    let step = 0;

    if (point > 0) {
      if (point <= 200) {
        currentWidth = (point * width) / 200;
        step = 0;
      } else if (point <= 1000) {
        currentWidth = (point * width) / 1000;
        step = 1;
      } else {
        currentWidth = (point * width) / (point <= 5000 ? 5000 : point);
        step = 2;
      }
    }
    return { currentWidth, step };
  };

  const step = calculateWidth(props.points).step;
  const divWidth = calculateWidth(props.points).currentWidth;

  return (
    <View style={styles.timeline} onLayout={event => onLayout(event)}>
      <Mark
        name="checkmark"
        color={Colors.WHITE}
        level="Bronze"
        // totalPoints="0"
        backgroundColor="#ffac0b"
      />
      <View style={[styles.darkLine, { width: step === 0 ? divWidth : width, backgroundColor: '#ffac0b' }]} />
      <View style={[styles.darkLine, { width: step === 0 ? width - divWidth : 0, backgroundColor: Colors.WHITE }]} />
      <Mark
        name={props.points >= 200 ? 'checkmark' : 'lock-closed'}
        backgroundColor={props.points >= 200 ? '#ffac0b' : '#cbcbcb'}
        color={props.points >= 200 ? '#ffffff' : '#cbcbcb'}
        level="Silver"
        // totalPoints="200"
        left={-22}
      />
      <View style={[styles.darkLine, { width: step === 1 ? divWidth : 0, backgroundColor: '#ffac0b', left: -30 }]} />
      <View
        style={[
          styles.darkLine,
          {
            width: step === 1 ? width - divWidth : width,
            backgroundColor: step > 1 ? '#ffac0b' : '#ffffff',
            left: -30,
          },
        ]}
      />
      <Mark
        name={props.points >= 1000 ? 'checkmark' : 'lock-closed'}
        backgroundColor={props.points >= 1000 ? '#ffac0b' : '#cbcbcb'}
        color={props.points >= 1000 ? '#ffffff' : '#9a9a9a'}
        level="Gold"
        // totalPoints="1000"
        left={-38}
      />
      <View style={[styles.darkLine, { width: step === 2 ? divWidth : 0, backgroundColor: '#ffac0b', left: -44 }]} />
      <View
        style={[
          styles.darkLine,
          { width: step === 2 ? width - divWidth : width, backgroundColor: Colors.WHITE, left: -44 },
        ]}
      />
      <Mark
        name={props.points >= 5000 ? 'checkmark' : 'lock-closed'}
        backgroundColor={props.points >= 5000 ? '#ffac0b' : '#cbcbcb'}
        color={props.points >= 5000 ? '#ffffff' : '#9a9a9a'}
        level="Platinum"
        // totalPoints="5000"
        left={-64}
      />
    </View>
  );
}

TimeLine.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(TimeLine));
