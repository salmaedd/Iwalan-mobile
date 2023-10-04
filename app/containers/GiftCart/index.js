/**
 *
 * GiftCart
 *
 */

import analytics from '@segment/analytics-react-native';
import { sumBy } from 'lodash';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Back from '../../assets/back.png';
import Picon from '../../assets/goldCoin.png';
import Cart from '../../assets/svg/shoppingCart';
import Alert from '../../components/Alert';
import { Colors, Spacing, Typography } from '../../styles';
import { getToken, isLandscape } from '../../utils/MainMethods';
import { removeGiftFromCart } from '../GiftDetails/actions';
import { makeSelectGiftsCart } from '../GiftDetails/selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectGiftCart from './selectors';

export const styles = StyleSheet.create({
  emptyCart: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: '#b0b8c6',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  points: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: '#fbae18',
    marginLeft: Spacing.SCALE_10,
    lineHeight: Typography.LINE_HEIGHT_18,
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.SCALE_6,
  },
  contact: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.DARK_GRAY,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginLeft: Spacing.SCALE_10,
  },
  container: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    // width: Mixins.WINDOW_WIDTH - Spacing.SCALE_20,
    height: Spacing.SCALE_92,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#e4e8ef',
    padding: Spacing.SCALE_10,
    marginBottom: Spacing.SCALE_10,
    marginRight: isLandscape() ? Spacing.SCALE_10 : Spacing.SCALE_0,
  },
  img: {
    width: Spacing.SCALE_90,
    height: Spacing.SCALE_80,
    borderRadius: Spacing.SCALE_16,
    marginRight: Spacing.SCALE_10,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: Spacing.SCALE_8,
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    lineHeight: Typography.LINE_HEIGHT_18,
    color: Colors.DARK_GRAY,
  },
  qty: {
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_14,
    lineHeight: Typography.LINE_HEIGHT_14,
    color: Colors.DARK_GRAY,
  },
  number: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_14,
    lineHeight: Typography.LINE_HEIGHT_14,
    color: '#5a6880',
  },
  header: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.SCALE_20,
    marginVertical: !isLandscape() ? Spacing.SCALE_20 : Spacing.SCALE_10,
  },
  headerTitle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: '500',
    color: Colors.DARK_GRAY,
    textAlign: 'center',
  },
  innerScroll: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Spacing.SCALE_16,
  },
  floatingDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    marginHorizontal: Spacing.SCALE_10,
    borderRadius: Spacing.SCALE_20,
    padding: Spacing.SCALE_16,
  },
  useButton: {
    fontFamily: Typography.FONT_FAMILY_PRO,
    backgroundColor: Colors.PINK,
    borderRadius: Spacing.SCALE_20,
    height: Spacing.SCALE_40,
    width: Spacing.SCALE_160,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  totalpoints: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: '#fbae18',
    marginLeft: Spacing.SCALE_4,
  },
  yourPoint: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DARK_GRAY,
    marginBottom: Spacing.SCALE_4,
  },
  usetTite: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_15,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  iconText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Spacing.SCALE_96,
    height: Spacing.SCALE_80,
    borderRadius: Spacing.SCALE_16,
  },
});

export function GiftItem({ gift, removeItemFromCrt, props }) {
  const [visible, setVisible] = React.useState(false);

  const language = useSelector(state => state?.login?.myLang);

  const GiftCartPage = async () => {
    const dataUser = await getToken();
    // let mydata = {
    //   userId: JSON.parse(dataUser).code,
    // };
    analytics.screen('Gift Cart Page', {
      userId: JSON.parse(dataUser).code,
    });
  };

  const giftdeletedFromCartSegment = async data => {
    const dataUser = await getToken();
    analytics.track('Gift Removed From Cart', {
      userId: JSON.parse(dataUser).code,
      cart_id: JSON.parse(dataUser).cartId,
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
  };

  useEffect(() => {
    GiftCartPage();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />
      <View style={styles.leftContainer}>
        {language === 'ar' ? (
          <>
            <View style={styles.innerContainer}>
              <View style={styles.div}>
                <Text style={styles.title}>{gift && gift?.nameGift && gift?.nameGift?.fr}</Text>
              </View>
              <View style={styles.details}>
                <View style={styles.div}>
                  <Text style={{ ...styles.points, marginRight: Spacing.SCALE_4, marginLeft: -Spacing.SCALE_2 }}>
                    {gift && gift?.points}
                  </Text>
                  <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                </View>
              </View>

              <View style={{ ...styles.div, marginBottom: 0 }}>
                <Text style={styles.number}>{gift?.quantity}</Text>
                <Text style={styles.qty}>{props.intl.formatMessage({ id: 'app.containers.GiftCart.qty' })}: </Text>
              </View>
            </View>
            <View style={{ ...styles.img, marginLeft: Spacing.SCALE_30 }}>
              <Image
                source={{
                  uri:
                    gift && gift.images && gift.images.images && gift.images.images.m
                      ? gift?.images?.images?.m?.[0]
                      : '',
                }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.img}>
              <Image
                source={{
                  uri:
                    gift && gift.images && gift.images.images && gift.images.images.m
                      ? gift?.images?.images?.m?.[0]
                      : '',
                }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>

            <View style={styles.innerContainer}>
              <View style={styles.div}>
                <Text style={styles.title}>{gift && gift?.nameGift && gift?.nameGift?.fr}</Text>
              </View>
              <View style={styles.details}>
                <View style={styles.div}>
                  <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  <Text style={styles.points}>{gift && gift?.points}</Text>
                </View>
              </View>

              <View style={{ ...styles.div, marginBottom: 0 }}>
                <Text style={styles.qty}>{props.intl.formatMessage({ id: 'app.containers.GiftCart.qty' })}: </Text>
                <Text style={styles.number}>{gift?.quantity}</Text>
              </View>
            </View>
          </>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
          //removeItemFromCrt(gift.id)
        }}>
        <Icon name="close" color="#7a879d" size={Spacing.SCALE_18} />
      </TouchableOpacity>
      <Alert
        isVisible={visible}
        text={props.intl.formatMessage({ id: 'app.containers.GiftCart.alertText' })}
        onPress={() => {
          removeItemFromCrt(gift?.id);
          giftdeletedFromCartSegment(gift);
        }}
        onCancelPressed={() => setVisible(false)}
      />
    </View>
  );
}

export function GiftCart(props) {
  useInjectReducer({ key: 'giftCart', reducer });
  useInjectSaga({ key: 'giftCart', saga });
  const { cart } = props;
  const language = useSelector(state => state?.login?.myLang);

  const countTotalPoints = () => sumBy(cart, element => parseInt(element.points, 10) * element.quantity);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#f2f4f8',
        flex: 1,
        height: '100%',
        paddingTop: !isLandscape()
          ? Platform.ios
            ? Spacing.SCALE_50
            : Spacing.SCALE_10
          : Platform.ios
          ? Spacing.SCALE_14
          : Spacing.SCALE_10,
      }}>
      <View style={styles.header}>
        {language === 'ar' ? (
          <>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>
                {props.intl.formatMessage({ id: 'app.containers.GiftCart.title' })}
              </Text>
            </View>
            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.goBack()}>
              <Icon name="chevron-forward" type="ionicon" color="#7a879d" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.goBack()}>
              <Image source={Back} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>
                {props.intl.formatMessage({ id: 'app.containers.GiftCart.title' })}
              </Text>
            </View>
          </>
        )}
      </View>
      {cart?.length > 0 ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.innerScroll}>
              <FlatList
                data={cart}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => props.navigation.navigate('GiftDetails', { gift: item })}>
                    <GiftItem intl={props.intl} gift={item} removeItemFromCrt={props.removeItemFromCrt} props={props} />
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>

          {language === 'ar' ? (
            <View style={styles.floatingDiv}>
              <TouchableOpacity
                style={styles.useButton}
                onPress={() => {
                  props.navigation.navigate('GiftSummary', { gifts: props?.cart });
                }}>
                <Text style={styles.usetTite}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftCart.confirm' })}
                </Text>
              </TouchableOpacity>
              <View style={styles.outerText}>
                <Text style={{ ...styles.yourPoint, alignSelf: 'flex-end' }}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftCart.total' })}
                </Text>
                <View style={styles.iconText}>
                  <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  <Text style={styles.totalpoints}>{countTotalPoints()}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.floatingDiv}>
              <View style={styles.outerText}>
                <Text style={styles.yourPoint}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftCart.total' })}
                </Text>
                <View style={styles.iconText}>
                  <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  <Text style={styles.totalpoints}>{countTotalPoints()}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.useButton}
                onPress={() => {
                  props.navigation.navigate('GiftSummary', { gifts: props?.cart });
                }}>
                <Text style={styles.usetTite}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftCart.confirm' })}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={styles.emptyCart}>
          <Cart fill="#b0b8c6" height={Spacing.SCALE_64} width={Spacing.SCALE_64} />
          <Text style={styles.emptyText}>{props.intl.formatMessage({ id: 'app.containers.GiftCart.emptyText' })}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

GiftCart.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  giftCart: makeSelectGiftCart(),
  cart: makeSelectGiftsCart(),
});

function mapDispatchToProps(dispatch) {
  return {
    removeItemFromCrt: id => {
      dispatch(removeGiftFromCart(id));
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
)(injectIntl(GiftCart));
