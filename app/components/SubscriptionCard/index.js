/**
 *
 * SubscriptionCard
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { injectIntl, intlShape } from 'react-intl';
import Picon from '../../assets/goldCoin.png';
import TimeLine from '../TimeLine';

import { Colors, Spacing, Typography, Mixins } from '../../styles';

import BadgeBronze from '../../assets/svg/badgeBronze';
import BadgeSilver from '../../assets/svg/badgeSilver';
import BadgeGold from '../../assets/svg/badgeGold';
import BadgePlatinum from '../../assets/svg/badgePlatinum';
import { capitalize } from '../../Helpers/HelperFunctions';

const styles = StyleSheet.create({
  root: {
    padding: Spacing.SCALE_16,
    marginBottom: Platform.OS === 'ios' ? Spacing.SCALE_30 : 0,
  },
  nameStyle: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: Colors.WHITE,
    marginBottom: 5,
  },
  level: {
    width: Spacing.SCALE_134,
    height: Spacing.SCALE_32,
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leveltext: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#898989',
    marginLeft: 2,
  },
  leftDiv: {},
  points: {
    fontSize: Typography.FONT_SIZE_22,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: Colors.WHITE,
    marginLeft: 5,
  },
  PointDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  code: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.WHITE,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  firstSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.SCALE_20,
  },
  bg: {
    position: 'absolute',
  },
  backgroundImage: {
    flex: 1,
    width: Spacing.SCALE_384,
    height: Spacing.SCALE_180,
    borderRadius: Spacing.SCALE_20,
  },
});

function SubscriptionCard(props) {
  const bg = {
    silver: require('../../assets/profileSilver.png'),
    bronze: require('../../assets/profileBronze.png'),
    gold: require('../../assets/profileGold.png'),
    platinum: require('../../assets/profilePlatinum.png'),
  };

  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (props.sumPoints >= 0 && props.sumPoints < 200) {
      setProfile({ color: '#ca9362', bgImage: bg.bronze, title: 'Bronze' });
    } else if (props.sumPoints >= 200 && props.sumPoints < 1000) {
      setProfile({ color: '#a9a9a9', bgImage: bg.silver, title: 'Silver' });
    } else if (props.sumPoints >= 1000 && props.sumPoints < 5000) {
      setProfile({ color: '#d1ab6d', bgImage: bg.gold, title: 'Gold' });
    } else if (props.sumPoints >= 5000) {
      setProfile({ color: '#80b9c6', bgImage: bg.platinum, title: 'Platinum' });
    } else {
      setProfile({ color: '#eee', bgImage: bg.bronze, title: 'Default' });
    }
  }, [props]);

  function Badge() {
    return props?.Customer_profils?.label?.fr === 'Bronze' ? (
      <BadgeBronze fill={profile.color} width={Spacing.SCALE_18} height={Spacing.SCALE_18} />
    ) : props?.Customer_profils?.label?.fr === 'Silver' ? (
      <BadgeSilver fill={profile.color} width={Spacing.SCALE_18} height={Spacing.SCALE_18} />
    ) : props?.Customer_profils?.label?.fr === 'Gold' ? (
      <BadgeGold fill={profile.color} width={Spacing.SCALE_18} height={Spacing.SCALE_18} />
    ) : props?.Customer_profils?.label?.fr === 'Platinum' ? (
      <BadgePlatinum fill={profile.color} width={Spacing.SCALE_18} height={Spacing.SCALE_18} />
    ) : (
      <></>
    );
  }

  return (
    <>
      <View style={styles.root}>
        <View style={styles.bg}>
          <Image
            source={{
              uri: props?.Customer_profils?.image,
            }}
            resizeMode="cover"
            style={styles.backgroundImage}
          />
        </View>

        <View style={styles.firstSection}>
          {props.language === 'ar' ? (
            <>
              <View style={styles.info}>
                <View style={styles.PointDiv}>
                  <Image source={Picon} style={{ width: Spacing.SCALE_32, height: Spacing.SCALE_32 }} />
                  <Text style={styles.points}>{props.sumPoints}</Text>
                </View>
                <Text style={styles.code}>
                  {props.intl.formatMessage({ id: 'app.containers.Profil.subscriptionCard.member' })}: {props.code}
                </Text>
              </View>

              <View style={styles.leftDiv}>
                <Text style={{ ...styles.nameStyle, marginLeft: Spacing.SCALE_80 }}>
                  {capitalize(props.store_name)}
                </Text>
                <View style={styles.level}>
                  <Badge />

                  <Text style={styles.leveltext}>
                    {props?.Customer_profils?.label?.fr + ' '}
                    {props.intl.formatMessage({ id: 'app.containers.Profil.subscriptionCard.member' })}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.leftDiv}>
                <Text style={styles.nameStyle}>{capitalize(props.store_name)}</Text>
                <View style={styles.level}>
                  <Badge />

                  <Text style={styles.leveltext}>
                    {props?.Customer_profils?.label?.fr + ' '}
                    {props.intl.formatMessage({ id: 'app.containers.Profil.subscriptionCard.member' })}
                  </Text>
                </View>
              </View>

              <View style={styles.info}>
                <View style={styles.PointDiv}>
                  <Image source={Picon} style={{ width: Spacing.SCALE_32, height: Spacing.SCALE_32 }} />
                  <Text style={styles.points}>{props.sumPoints}</Text>
                </View>
                <Text style={styles.code}>
                  {props.intl.formatMessage({ id: 'app.containers.Profil.subscriptionCard.member' })}: {props.code}
                </Text>
              </View>
            </>
          )}
        </View>
        <TimeLine
          points={
            props?.Customer_profils?.label?.fr === 'Bronze'
              ? 0
              : props?.Customer_profils?.label?.fr === 'Silver'
              ? 200
              : props?.Customer_profils?.label?.fr === 'Gold'
              ? 1000
              : props?.Customer_profils?.label?.fr === 'Platinum'
              ? 50000
              : null
          }
          profile={props?.Customer_profils?.label?.fr}
        />
      </View>
    </>
  );
}

SubscriptionCard.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(SubscriptionCard));
