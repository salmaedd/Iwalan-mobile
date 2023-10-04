/**
 *
 * GiftDetails
 *
 */

import analytics from '@segment/analytics-react-native';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Divider, Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Picon from '../../assets/goldCoin.png';
import Lock from '../../assets/lock.png';
import PiconGrey from '../../assets/pgrey.png';
import PiconPink from '../../assets/ppink.png';
import Gift from '../../assets/svg/gift';
import Alert from '../../components/Alert';
import QuantityBox from '../../components/QuantityBox';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import { getToken, isLandscape } from '../../utils/MainMethods';
import { addMsg } from '../message/actions';
import { addGiftToCart, updateGiftQuantity } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectGiftDetails from './selectors';

export const styles = StyleSheet.create({
  header: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.SCALE_20,
    marginTop: Platform.OS === 'ios' ? Spacing.SCALE_40 : Spacing.SCALE_10,
    paddingTop: !isLandscape()
      ? Platform.ios
        ? Spacing.SCALE_50
        : Spacing.SCALE_10
      : Platform.ios
      ? Spacing.SCALE_14
      : Spacing.SCALE_10,
  },
  iconContainer: {
    width: Spacing.SCALE_40,
    height: Spacing.SCALE_40,
    borderRadius: Spacing.SCALE_20,
    backgroundColor: Colors.WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notif: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.WHITE,
  },
  notifContainer: {
    position: 'absolute',
    right: Spacing.SCALE_2,
    top: -Spacing.SCALE_14,
    width: Spacing.SCALE_22,
    height: Spacing.SCALE_22,
    borderRadius: Spacing.SCALE_10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PINK,
    shadowColor: 'rgba(251, 72, 150, 0.31)',
    shadowOffset: { width: -1, height: 6 },
    shadowOpacity: 11,
    shadowRadius: 6,
    elevation: 6,
  },
  subView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.SCALE_16,
    marginTop: Spacing.SCALE_16,
  },
  firstText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.DARK_GRAY,
    fontSize: Typography.FONT_SIZE_12,
    fontWeight: '500',
    marginBottom: Spacing.SCALE_10,
  },
  secondText: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    color: '#24378b',
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  contact: {
    color: Colors.DARK_GRAY,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginLeft: Spacing.SCALE_10,
  },
  points: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    color: '#fbae18',
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginLeft: Spacing.SCALE_10,
  },
  div: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: Mixins.WINDOW_WIDTH,
    height: Mixins.WINDOW_HEIGHT * 0.45,
    top: -Spacing.SCALE_30,
    borderTopLeftRadius: Spacing.SCALE_20,
    borderTopRightRadius: Spacing.SCALE_20,
    backgroundColor: '#f2f4f8',
  },
  desc: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: '#3b3b3b',
    fontSize: Typography.FONT_SIZE_16,
    marginBottom: Spacing.SCALE_10,
    marginHorizontal: Spacing.SCALE_16,
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.DARK_GRAY,
    fontSize: Typography.FONT_SIZE_16,
    lineHeight: Spacing.SCALE_25,
    marginHorizontal: Spacing.SCALE_16,
  },
  quantity: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
    marginVertical: Spacing.SCALE_8,
  },
  innerView: {
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    paddingHorizontal: Spacing.SCALE_18,
    marginTop: Spacing.SCALE_10,
    marginHorizontal: Spacing.SCALE_16,
  },
  iconText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: Spacing.SCALE_10,
  },
  avatarView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  floatingDiv: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: Spacing.SCALE_72,
    width: Spacing.SCALE_400,
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    padding: Spacing.SCALE_20,
    position: 'absolute',
    bottom: Spacing.SCALE_20,
    shadowColor: Mixins.boxShadow().color,
    shadowOffset: Mixins.boxShadow().shadowOffset,
    shadowOpacity: Mixins.boxShadow().shadowOpacity,
    shadowRadius: Mixins.boxShadow().shadowRadius,
    elevation: Mixins.boxShadow().elevation,
  },
  useButton: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    backgroundColor: Colors.PINK,
    borderRadius: Spacing.SCALE_20,
    height: Spacing.SCALE_40,
    width: Spacing.SCALE_160,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usetTite: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  yourPoint: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.DARK_GRAY,
    fontSize: Typography.FONT_SIZE_14,
    marginBottom: 5,
  },
  totalpoints: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.DARK_GRAY,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginLeft: Spacing.SCALE_4,
  },
  slideNumber: {
    width: Spacing.SCALE_56,
    height: Spacing.SCALE_32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(12, 24, 80, 0.2)',
    top: Mixins.WINDOW_HEIGHT * 0.4,
    bottom: 0,
    right: Spacing.SCALE_20,
    borderRadius: Spacing.SCALE_16,
    // marginBottom: Spacing.SCALE_20,
  },
  slideNumberAR: {
    width: Spacing.SCALE_56,
    height: Spacing.SCALE_32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(12, 24, 80, 0.2)',
    top: Mixins.WINDOW_HEIGHT * 0.4,
    bottom: 0,
    left: Spacing.SCALE_20,
    borderRadius: Spacing.SCALE_16,
    // marginBottom: Spacing.SCALE_20,
  },
  number: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    opacity: 1,
  },
});

export function GiftDetails(props) {
  useInjectReducer({ key: 'giftDetails', reducer });
  useInjectSaga({ key: 'giftDetails', saga });

  const language = useSelector(state => state?.login?.myLang);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  // const { gift, userPoints, avatar } = props.route.params;
  const [counter, setCounter] = React.useState(1);
  const [quantityError, setQuantityError] = React.useState(null);
  const [pointsError, setPointsError] = React.useState(false);
  const [gift, setGift] = useState([]);
  const [userPoints, setUserPoints] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [locked, setLocked] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const giftDetailViewedSegement = data => {
    getToken().then(value => {
      if (value) {
        var code = JSON.parse(value).code;
        analytics.track('Gift Detail', {
          userId: code,
          giftId: data?.id,
          name: data?.nameGift.fr,
          active: data?.active,
          available: data?.available,
          points: data?.points,
          quantity: data?.quantity,
          category: data?.Category?.name?.fr,
          url: '',
          image_url: data?.images.main.m,
        });
        analytics.screen('Gift Detail Page', {
          userId: code,
        });
      }
    });
  };
  useEffect(() => {
    setAvatar(props?.route?.params?.avatar);
    setUserPoints(props?.route?.params?.userPoints);
    setGift(props?.route?.params?.gift);
    setLocked(props?.route?.params?.locked);
    giftDetailViewedSegement(props?.route?.params?.gift);
  }, [props]);

  const ref = React.createRef();
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ height: Mixins.WINDOW_HEIGHT, width: Mixins.WINDOW_WIDTH, backgroundColor: '#f2f4f8' }}>
        <Image
          source={{ uri: item !== undefined ? item : '' }}
          resizeMode="cover"
          style={{ width: Mixins.WINDOW_WIDTH, height: Spacing.SCALE_384 }}
        />
      </View>
    );
  };

  const quantityError1Part1 = props.intl.formatMessage({ id: 'app.containers.GiftsDetails.quantityError1Part1' });
  const quantityError1Part2 = props.intl.formatMessage({ id: 'app.containers.GiftsDetails.quantityError1Part2' });
  const quantityError2 = props.intl.formatMessage({ id: 'app.containers.GiftsDetails.quantityError2' });
  const quantityError3 = props.intl.formatMessage({ id: 'app.containers.GiftsDetails.quantityError3' });

  useEffect(() => {
    if (gift.quantity && counter > gift.quantity) {
      setQuantityError(quantityError1Part1 + '  ' + gift.quantity + '  ' + quantityError1Part2);
    } else if (counter === 0) {
      setQuantityError(quantityError2);
    } else {
      // setQuantityError(null);
    }
  }, [counter, gift.quantity]);

  const AddGiftToCartSegement = data => {
    analytics.track('Gift Added To Cart', {
      giftId: data?.id,
      name: data?.nameGift?.fr,
      active: data?.active,
      available: data?.available,
      points: data?.points,
      quantity: data?.quantity,
      category: data?.Category?.name?.fr,
      url: '',
      image_url: data?.images.main.m,
    });
  };
  const addGift = addedGift => {
    if (counter <= gift?.quantity && counter !== 0) {
      const userGift = {
        ...addedGift,
        quantity: counter,
      };
      props.addUserGiftToCart(userGift);
      AddGiftToCartSegement(userGift);
      props.navigation.navigate('GiftCart', { userPoints: userPoints });
    } else {
      props.toastMsg('Vous avez dépassé le stock disponible', 'danger');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      <Carousel
        ref={ref}
        data={
          gift?.images && gift?.images?.images && gift?.images?.images?.l && gift?.images?.images?.l?.length > 0
            ? gift?.images?.images?.l
            : []
        }
        renderItem={renderItem}
        sliderWidth={Mixins.WINDOW_WIDTH}
        itemWidth={Mixins.WINDOW_WIDTH}
        activeSlideOffset={0}
        onSnapToItem={slideIndex => setCurrentIndex(slideIndex)}
      />

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        {language === 'ar' ? (
          <View style={styles.header}>
            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.navigate('GiftCart')}>
              <View style={styles.iconContainer}>
                <Gift height={Spacing.SCALE_26} width={Spacing.SCALE_26} fill="#7a879d" />
                <View style={styles.notifContainer}>
                  <Text style={styles.notif}>
                    {props.giftDetails && props.giftDetails.cart && props?.giftDetails?.cart?.length}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.goBack()}>
              <Icon name="chevron-forward" type="ionicon" color="#7a879d" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.header}>
            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.goBack()}>
              <Icon name="chevron-back" type="ionicon" color="#7a879d" />
            </TouchableOpacity>
            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.navigate('GiftCart')}>
              <View style={styles.iconContainer}>
                <Gift height={Spacing.SCALE_26} width={Spacing.SCALE_26} fill="#7a879d" />
                <View style={styles.notifContainer}>
                  <Text style={styles.notif}>
                    {props.giftDetails && props.giftDetails.cart && props?.giftDetails?.cart?.length}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={language === 'ar' ? styles.slideNumber : styles.slideNumber}>
        <Text style={styles.number}>
          {gift?.images && gift?.images?.images && gift?.images?.images?.m?.length > 0 ? currentIndex + 1 : 0}/
          {gift?.images && gift?.images?.images && gift?.images?.images?.m?.length}
        </Text>
      </View>

      <View style={styles.mainView}>
        <View style={styles.subView}>
          {language === 'ar' ? (
            <>
              {!props.route.params.locked ? (
                <View style={styles.div}>
                  <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  <Text style={styles.points}>{gift.points}</Text>
                </View>
              ) : (
                <View style={styles.div}>
                  <Image source={PiconPink} />
                  <Text style={[styles.points, { color: Colors.PINK }]}>{gift?.points}</Text>
                </View>
              )}

              <View>
                <Text style={{ ...styles.firstText, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftsDetails.voyage' })}
                </Text>
                <Text style={styles.secondText}>{gift && gift?.nameGift && gift?.nameGift?.fr}</Text>
              </View>
            </>
          ) : (
            <>
              <View>
                <Text style={styles.firstText}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftsDetails.voyage' })}
                </Text>
                <Text style={styles.secondText}>{gift && gift?.nameGift && gift?.nameGift?.fr}</Text>
              </View>

              {!props.route.params.locked ? (
                <View style={styles.div}>
                  <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  <Text style={styles.points}>{gift.points}</Text>
                </View>
              ) : (
                <View style={styles.div}>
                  <Image source={PiconPink} />
                  <Text style={[styles.points, { color: Colors.PINK }]}>{gift?.points}</Text>
                </View>
              )}
            </>
          )}
        </View>
        <Divider style={{ backgroundColor: Colors.BACK_GRAY, marginVertical: Spacing.SCALE_20 }} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: Spacing.SCALE_100 }}>
            <Text style={{ ...styles.desc, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
              {props.intl.formatMessage({ id: 'app.containers.GiftsDetails.description' })}
            </Text>
            <Text style={styles.text}>{gift?.description}</Text>

            <View style={styles.innerView}>
              <Text style={{ ...styles.quantity, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
                {props.intl.formatMessage({ id: 'app.containers.GiftsDetails.quantity' })}
              </Text>
              <QuantityBox
                // language={language}
                count={counter}
                setCounter={setCounter}
                onLeftPress={() => {
                  setQuantityError(null);
                  setCounter(counter > 0 ? counter - 1 : counter);
                  props.updateQuantity(counter > 0 ? counter - 1 : counter, gift?.id);
                }}
                onRightPress={() => {
                  setQuantityError(null);
                  if (counter >= gift.quantity) {
                    setQuantityError(`${quantityError1Part1} ${gift.quantity} ${quantityError1Part2}`);
                  } else if (counter && (counter + 1) * gift.points > userPoints) {
                    setPointsError(true);
                    setQuantityError(`${quantityError3}`);
                  } else {
                    setQuantityError(null);
                  }
                  setCounter(
                    counter < gift.quantity && (counter + 1) * gift.points <= userPoints ? counter + 1 : counter,
                  );
                  props.updateQuantity(counter + 1, gift.id);
                  /*
                  setCounter(counter + 1);
                  props.updateQuantity(counter + 1, gift?.id);*/
                }}
                updateQuantity={props?.updateQuantity}
                id={gift.id}
                onMinError={() => setQuantityError(quantityError2)}
                onMaxError={() => {
                  if (gift.quantity && gift.quantity <= parseInt(userPoints / gift.points))
                    setQuantityError(`${quantityError1Part1} ${gift.quantity} ${quantityError1Part2}`);
                  else if (gift.quantity && gift.quantity > parseInt(userPoints / gift.points))
                    setQuantityError(`${quantityError3}`);
                }}
                clearErrors={() => setQuantityError(null)}
                max={Math.min(gift.quantity, parseInt(userPoints / gift.points)) || 1}
                min={0}
              />
              <Text
                style={{
                  ...styles.text,
                  color: 'red',
                  marginHorizontal: Spacing.SCALE_4,
                  marginVertical: Spacing.SCALE_6,
                }}>
                {quantityError}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {!locked ? (
        <View style={styles.floatingDiv}>
          {language === 'ar' ? (
            <>
              <TouchableOpacity style={styles.useButton} onPress={() => addGift(gift)}>
                <Text style={styles.usetTite}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftsDetails.use' })}
                </Text>
              </TouchableOpacity>

              <View style={styles.avatarView}>
                <View style={styles.outerText}>
                  <Text
                    style={{
                      ...styles.yourPoint,
                      alignSelf: language === 'ar' ? 'flex-end' : 'flex-start',
                      marginRight: language === 'ar' ? 4 : 0,
                    }}>
                    {props.intl.formatMessage({ id: 'app.containers.GiftsDetails.yourPoints' })}
                  </Text>
                  <View style={styles.iconText}>
                    <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                    <Text style={styles.totalpoints}>{userPoints && userPoints}</Text>
                  </View>
                </View>
                <Avatar rounded source={{ uri: avatar && avatar }} />
              </View>
            </>
          ) : (
            <>
              <View style={styles.avatarView}>
                <Avatar rounded source={{ uri: avatar && avatar }} />
                <View style={styles.outerText}>
                  <Text style={styles.yourPoint}>
                    {props.intl.formatMessage({ id: 'app.containers.GiftsDetails.yourPoints' })}
                  </Text>
                  <View style={styles.iconText}>
                    <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                    <Text style={styles.totalpoints}>{userPoints && userPoints}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.useButton} onPress={() => addGift(gift)}>
                <Text style={styles.usetTite}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftsDetails.use' })}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : (
        <View style={styles.floatingDiv}>
          <View style={styles.avatarView}>
            <Avatar rounded source={{ uri: avatar }} />
            <View style={styles.outerText}>
              <Text style={styles.yourPoint}>
                {props.intl.formatMessage({ id: 'app.containers.GiftsDetails.yourPoints' })}
              </Text>
              <View style={styles.iconText}>
                <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                <Text style={styles.totalpoints}>{userPoints}</Text>
              </View>
            </View>
          </View>
          <View style={styles.outerText}>
            <Text style={styles.yourPoint}>
              {props.intl.formatMessage({ id: 'app.containers.GiftsDetails.pointsLeft' })}
            </Text>
            <View style={styles.iconText}>
              <Image source={PiconGrey} />
              <Text style={styles.totalpoints}>{(counter || 1) * gift?.points - userPoints}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setIsAlertVisible(true)}>
            <Image source={Lock} />
          </TouchableOpacity>

          <Alert
            isVisible={isAlertVisible}
            text={props.intl.formatMessage({ id: 'app.containers.GiftsDetails.alert' })}
            onPress={() => setIsAlertVisible(false)}
            onCancelPressed={() => setIsAlertVisible(false)}
          />
        </View>
      )}
    </>
  );
}

GiftDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  giftDetails: makeSelectGiftDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    addUserGiftToCart: gift => {
      dispatch(addGiftToCart(gift));
    },
    updateQuantity: (quantity, id) => {
      dispatch(updateGiftQuantity(quantity, id));
    },
    toastMsg: (a, b) => {
      dispatch(addMsg(a, b));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(GiftDetails));
