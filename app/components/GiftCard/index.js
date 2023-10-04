/**
 *
 * GiftCard
 *
 */

import React, { memo } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Picon from '../../assets/goldCoin.png';
import Pgrey from '../../assets/greyPicon.png';
import Lock from '../../assets/lock.png';
import Ppink from '../../assets/pinkPicon.png';
import { Colors, Mixins, Spacing, Typography } from '../../styles';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    width: Spacing.SCALE_186,
    height: Spacing.SCALE_228,
    marginBottom: Spacing.SCALE_16,
    marginHorizontal: Spacing.SCALE_6,
    shadowColor: Mixins.boxShadow().color,
    shadowOffset: Mixins.boxShadow().shadowOffset,
    shadowOpacity: Mixins.boxShadow().shadowOpacity,
    shadowRadius: Mixins.boxShadow().shadowRadius,
    elevation: Mixins.boxShadow().elevation,
  },
  image: {
    width: '100%',
    height: Spacing.SCALE_112,
    borderTopRightRadius: Spacing.SCALE_20,
    borderTopLeftRadius: Spacing.SCALE_20,
  },
  container: {
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainTitle: {
    // flex: 1,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#24378b',
    textAlign: 'center',
  },
  score: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    lineHeight: Typography.LINE_HEIGHT_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: '#fbae18',
    marginLeft: Spacing.SCALE_6,
  },
  useButton: {
    width: Spacing.SCALE_168,
    height: Spacing.SCALE_34,
    marginHorizontal: Spacing.SCALE_10,
    // marginVertical: Spacing.SCALE_8,
    marginTop: Spacing.SCALE_8,
    backgroundColor: '#fb4896',
    borderRadius: Spacing.SCALE_20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: Colors.WHITE,
  },
  nameStyle: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.SCALE_10,
    marginTop: Platform.OS === 'ios' ? Spacing.SCALE_12 : 0,
  },
  nameStyle2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.SCALE_10,
    marginTop: Platform.OS === 'ios' ? Spacing.SCALE_12 : 0,
  },
  pDiv: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: Spacing.SCALE_8,
  },
  secondaryContainer: {
    width: '100%',
    flex: 1,
    alignSelf: 'flex-end',
    height: Spacing.SCALE_40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: Spacing.SCALE_20,
    borderBottomRightRadius: Spacing.SCALE_20,
    paddingHorizontal: Spacing.SCALE_12,
  },
  lock: {
    position: 'absolute',
    right: Spacing.SCALE_6,
    top: Spacing.SCALE_6,
  },
  pointsDiv: { width: '50%', flexDirection: 'row', alignItems: 'center' },
});

function GiftCard(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.main}>
        <View>
          <Image source={{ uri: props?.images?.main?.m }} style={styles.image} />
          {props?.locked && (
            <Image
              source={Lock}
              style={{
                ...styles.lock,
                right: props?.language === 'ar' ? 0 : Spacing.SCALE_6,
                left: props?.language === 'ar' ? Spacing.SCALE_6 : 0,
              }}
            />
          )}
        </View>
        {!props.locked ? (
          <>
            <View style={styles.nameStyle}>
              {/* <TextTicker
                style={styles.mainTitle}
                scrollSpeed={400}
                easing={Easing.linear}
                loop
                bounce={false}
                marqueeDelay={1000}
              >
              {props?.nameGift?.fr}
              </TextTicker> */}
              <Text numberOfLines={2} style={styles.mainTitle}>
                {props?.nameGift?.fr}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: Spacing.SCALE_8,
              }}>
              <View style={styles.pDiv}>
                <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                <Text style={styles.score}>{props?.points}</Text>
              </View>

              <TouchableOpacity underlayColor="transparent" style={styles.useButton} onPress={props.onPress}>
                <Text style={styles.text}>{props.intl.formatMessage({ id: 'app.components.GiftsCard.use' })}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.nameStyle2}>
              {/* <TextTicker
                style={[styles.mainTitle, { color: '#a5acb9' }]}
                scrollSpeed={400}
                easing={Easing.linear}
                loop
                bounce={false}
                marqueeDelay={1000}
              >
              {props?.nameGift?.fr}
              </TextTicker> */}
              <Text numberOfLines={2} style={styles.mainTitle}>
                {props?.nameGift?.fr}
              </Text>
            </View>
            {props?.language === 'ar' ? (
              <View style={styles.secondaryContainer}>
                <View style={styles.pointsDiv}>
                  <Image source={Ppink} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  <Text style={[styles.score, { color: '#fb4896' }]}>{props?.points}</Text>
                </View>
                <View style={styles.pointsDiv}>
                  <Image source={Pgrey} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  <Text style={[styles.score, { color: '#7a879d' }]}>
                    {props?.score_missing ? props?.score_missing : 0}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.secondaryContainer}>
                <View style={styles.pointsDiv}>
                  <Image source={Pgrey} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  <Text style={[styles.score, { color: '#7a879d' }]}>
                    {props?.score_missing ? props?.score_missing : 0}
                  </Text>
                </View>
                <View style={styles.pointsDiv}>
                  <Image source={Ppink} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  <Text style={[styles.score, { color: '#fb4896' }]}>{props?.points}</Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

GiftCard.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(GiftCard));
