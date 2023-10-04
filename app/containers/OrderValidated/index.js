/**
 *
 * OrderValidated
 *
 */

import React, { memo, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar, BackHandler, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOrderValidated from './selectors';
import reducer from './reducer';
import saga from './saga';
import Picon from '../../assets/goldCoin.png';
import giftImage from '../../assets/giftImage.png';

import { isLandscape } from '../../utils/MainMethods';
import { Colors, Spacing, Typography, Mixins } from '../../styles';
import Moto from '../../assets/svg/motor';
import Shop from '../../assets/svg/shopping';
import ManGift from '../../assets/svg/bigMan';
import Man from '../../assets/svg/bigmanForGift';
import { segment } from '../../utils/segment';
import { getToken } from '../../utils/MainMethods';

import { getData } from '../GiftsContainer/actions';
import makeSelectGiftsContainer from '../GiftsContainer/selectors';

export const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_24,
    color: '#5a6880',
    marginBottom: Spacing.SCALE_20,
    textAlign: 'center',
  },
  secondTitle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
    marginBottom: Spacing.SCALE_40,
    textAlign: 'center',
  },
  orderValue: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: '#5a6880',
  },
  track: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
    lineHeight: Typography.LINE_HEIGHT_16,
  },
  buttonContainer: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    width: Spacing.SCALE_288,
    height: Spacing.SCALE_54,
    borderRadius: Spacing.SCALE_20,
    backgroundColor: Colors.WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: Spacing.SCALE_16,
    paddingHorizontal: Spacing.SCALE_26,
    // justifyContent: 'space-evenly',
  },
  iconContainer: { width: Spacing.SCALE_50, alignItems: 'center' },
  image: {
    width: Spacing.SCALE_104,
    height: Spacing.SCALE_88,
    borderTopLeftRadius: Spacing.SCALE_20,
    borderBottomLeftRadius: Spacing.SCALE_20,
    left: 0,
  },
  imageAR: {
    width: Spacing.SCALE_104,
    height: Spacing.SCALE_88,
    borderTopRightRadius: Spacing.SCALE_20,
    borderBottomRightRadius: Spacing.SCALE_20,
    left: Spacing.SCALE_10,
  },
  location: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: '500',
    color: '#24378b',
    paddingBottom: Spacing.SCALE_10,
  },
  iconText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#fbae18',
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginLeft: Spacing.SCALE_5,
  },
  iconView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  useButton: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    width: Spacing.SCALE_88,
    height: Spacing.SCALE_70,
    borderRadius: Spacing.SCALE_16,
    backgroundColor: '#fb4896',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  useLabel: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  giftView: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginHorizontal: Spacing.SCALE_20,
    display: 'flex',
    borderTopRightRadius: Spacing.SCALE_20,
    borderBottomRightRadius: Spacing.SCALE_20,
    borderTopLeftRadius: Spacing.SCALE_20,
    borderBottomLeftRadius: Spacing.SCALE_20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    paddingRight: Spacing.SCALE_10,
  },
  secondView: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: Spacing.SCALE_10,
  },
  mainView: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    paddingTop: isLandscape() ? Spacing.SCALE_40 : 0,
    paddingBottom: Spacing.SCALE_20,
    backgroundColor: '#f2f4f8',
  },
});

export function OrderValidated(props) {
  useInjectReducer({ key: 'orderValidated', reducer });
  useInjectSaga({ key: 'orderValidated', saga });
  // useInjectReducer({ key: 'giftsContainer', reducer });
  // useInjectSaga({ key: 'giftsContainer', saga });
  const language = useSelector(state => state?.login?.myLang);

  const { gift, invoice } = props.route.params;
  const [idCustomer, setIdCustomer] = React.useState('');
  const { getData } = props;
  const { openGifts, gifts, profile } = props.gifts;
  const [unlockedGift, setUnlockedGift] = React.useState([]);

  useEffect(() => {
    getData({ slideType: 'gifts' });
  }, [getData]);

  useEffect(() => {
    console.log(openGifts);
    if (openGifts?.length !== 0) {
      const max = openGifts?.reduce(function(prev, current) {
        return prev.points > current.points ? prev : current;
      });
      console.log('max', max, profile);
      setUnlockedGift(max);
    }
  }, [openGifts]);

  const checkoutEvent = async () => {
    const dataUser = await getToken();
    let mydata = {
      userId: JSON.parse(dataUser).code,
      name: 'CHECKOUT PAGE',
      timestamp: new Date(),
    };
    await segment('page', mydata);
  };

  useEffect(() => {
    checkoutEvent();
  }, []);
  /* 
  useEffect(() => {
    const backAction = () => {
      if (props.navigation.isFocused()) {
        props.navigation.navigate('Main');
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
*/
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainView}>
      {!gift ? (
        <Man fill="#7a879d" height={Spacing.SCALE_220} width={Spacing.SCALE_220} style={{ marginBottom: 40 }} />
      ) : (
        <ManGift fill="#7a879d" height={Spacing.SCALE_200} width={Spacing.SCALE_200} style={{ marginBottom: 40 }} />
      )}
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      <Text style={styles.mainTitle}>
        {/* {  props.intl.formatMessage({ id: 'app.containers.OrderValidated.preorder' }) } */}
        {!gift
          ? props.intl.formatMessage({ id: 'app.containers.OrderValidated.order' })
          : props.intl.formatMessage({ id: 'app.containers.OrderValidated.gift' })}{' '}
        {props.intl.formatMessage({ id: 'app.containers.OrderValidated.title' })}
      </Text>
      <Text style={styles.secondTitle}>
        {props.intl.formatMessage({ id: 'app.containers.OrderValidated.confirmation' })}{' '}
        <Text style={styles.orderValue}>{invoice?.invoiceCode ?? invoice?.code}</Text>
      </Text>

      <TouchableOpacity
        onPress={() =>
          /*props.navigation.navigate('OrdersHistory', { gift: gift })*/ props.navigation.navigate(
            'OrderTrackingFromHistory',
            { order: invoice, gift: gift },
          )
        }>
        <View style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <Moto fill="#7a879d" height={Spacing.SCALE_18} width={Spacing.SCALE_22} />
          </View>
          <View
            style={{
              textAlign: 'center',
            }}>
            <Text style={styles.track}>{props.intl.formatMessage({ id: 'app.containers.OrderValidated.track' })}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Main')}>
        <View style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <Shop fill="#7a879d" height={Spacing.SCALE_34} width={Spacing.SCALE_34} />
          </View>
          <View
            style={{
              textAlign: 'center',
            }}>
            <Text style={styles.track}>
              {props.intl.formatMessage({ id: 'app.containers.OrderValidated.continue' })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {!gift && openGifts?.length !== 0 && (
        <>
          <View
            style={{
              // backgroundColor: '#e4e8ef',
              marginTop: Spacing.SCALE_40,
              width: '100%',
              marginBottom: Spacing.SCALE_20,
              borderBottomWidth: 0.9,
              borderBottomColor: '#e4e8ef',
            }}
          />
          <Text style={[styles.mainTitle, { fontSize: Typography.FONT_SIZE_20 }]}>
            {props.intl.formatMessage({ id: 'app.containers.OrderValidated.congratulations' })}
          </Text>
          {language === 'ar' ? (
            <View style={styles.giftView}>
              <TouchableOpacity style={styles.useButton}>
                <Text style={styles.useLabel}>
                  {props.intl.formatMessage({ id: 'app.containers.OrderValidated.use' })}
                </Text>
              </TouchableOpacity>
              <View style={styles.secondView}>
                <Text style={styles.location}>{unlockedGift?.nameGift?.ar}</Text>
                <View style={{ ...styles.iconView, justifyContent: 'flex-end' }}>
                  <Text style={styles.iconText}>{unlockedGift?.points}</Text>
                  <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                </View>
              </View>
              <Image source={{ uri: unlockedGift?.images?.main?.m }} style={styles.image} />
              {/* <Image source={giftImage} style={styles.imageAR} /> */}
            </View>
          ) : (
            <View style={styles.giftView}>
              <Image source={{ uri: unlockedGift?.images?.main?.m }} style={styles.image} />
              {/* <Image source={giftImage} style={styles.image} /> */}
              <View style={styles.secondView}>
                <Text style={styles.location}>{unlockedGift?.nameGift?.fr}</Text>
                <View style={styles.iconView}>
                  <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  <Text style={styles.iconText}>{unlockedGift?.points}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.useButton}
                onPress={() => {
                  props.navigation.navigate('GiftDetails', {
                    locked: false,
                    gift: unlockedGift,
                    userPoints: profile?.sumPoints,
                    avatar: profile?.image?.avatar,
                  });
                }}>
                <Text style={styles.useLabel}>
                  {props.intl.formatMessage({ id: 'app.containers.OrderValidated.use' })}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

OrderValidated.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  orderValidated: makeSelectOrderValidated(),
  gifts: makeSelectGiftsContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    getData: params => {
      dispatch(getData(params));
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
)(injectIntl(OrderValidated));
