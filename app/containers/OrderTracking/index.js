/**
 *
 * OrderTracking
 *
 */

import moment from 'moment';
import { lang } from 'moment';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Picon from '../../assets/goldCoin.png';
import NavigationHeader from '../../components/NavigationHeader';
import OrderTrackingTimeline from '../../components/OrderTrackingTimeline';
import { Colors, Spacing, Typography } from '../../styles';
import { getToken } from '../../utils/MainMethods';
import { segment } from '../../utils/segment';
import reducer from './reducer';
import saga from './saga';
import makeSelectOrderTracking from './selectors';

export const styles = StyleSheet.create({
  container: {
    //width: isPortrait() ? '100%' : '49%',
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    borderStyle: 'solid',
    borderColor: '#e4e8ef',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    padding: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_10,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  status: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DARK_GRAY,
    textAlign: 'center',
  },
  date: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
    marginTop: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_4,
    marginLeft: Spacing.SCALE_10,
  },
  tracking: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
    marginTop: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_4,
  },
  image: {
    width: Spacing.SCALE_70,
    height: Spacing.SCALE_70,
    marginRight: Spacing.SCALE_20,
    alignSelf: 'flex-start',
  },
  designation: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
    marginBottom: Spacing.SCALE_10,
    width: Spacing.SCALE_260,
  },
  price: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: '#3b3b3b',
    fontWeight: 'bold',
    marginRight: Spacing.SCALE_4,
    marginBottom: Spacing.SCALE_10,
  },
  mad: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_10,
    color: Colors.DARK_GRAY,
    fontWeight: 'bold',
  },
  criteria: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: '#5a6880',
    marginRight: Spacing.SCALE_30,
  },
  qty: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DARK_GRAY,
  },
  number: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: '#5a6880',
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  innerContainer: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  outerContainer: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  element: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  montant: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
  },
  totalAmount: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PINK,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: 'bold',
  },
  points: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#fbae18',
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: 'bold',
    marginLeft: Spacing.SCALE_4,
  },
  iconDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.SCALE_10,
  },
});

export function ProductItem(props) {
  return (
    <View style={styles.element}>
      {props.language === 'ar' ? (
        <>
          <View style={styles.outerContainer}>
            <Text style={styles.designation}>{props.Product.designation}</Text>
            <Text style={styles.price}>
              <Text style={styles.mad}>MAD </Text>
              {props.unitPriceDiscounted}
            </Text>
            <View style={styles.innerContainer}>
              <Text style={styles.criteria}>
                {props?.ordersTracking?.data?.[0]?.Product?.Attributes?.Color}
                {props?.ordersTracking?.data?.[0]?.Product?.Attributes?.Capacite}
              </Text>
              <Text style={{ ...styles.qty, marginLeft: -Spacing.SCALE_30 }}>
                Qty: <Text style={styles.number}>{props.quantity}</Text>
              </Text>
            </View>
          </View>
          <Image source={{ uri: props.Product?.images?.main?.m }} style={styles.image} />
        </>
      ) : (
        <>
          <Image source={{ uri: props.Product?.images?.main?.m }} style={styles.image} />
          <View style={styles.outerContainer}>
            <Text style={styles.designation}>{props.Product.designation}</Text>
            <Text style={styles.price}>
              {props.unitPriceDiscounted} <Text style={styles.mad}>MAD</Text>
            </Text>
            <View style={styles.innerContainer}>
              <Text style={styles.criteria}>
                {props?.ordersTracking?.data?.[0]?.Product?.Attributes?.Color}-
                {props?.ordersTracking?.data?.[0]?.Product?.Attributes?.Capacite}
              </Text>
              <Text style={styles.qty}>
                Qty: <Text style={styles.number}>{props.quantity}</Text>
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
export function OrderTracking(props) {
  useInjectReducer({ key: 'orderTracking', reducer });
  useInjectSaga({ key: 'orderTracking', saga });

  const language = useSelector(state => state?.login?.myLang);

  const { order } = props.route.params;
  const orderTrackingEvent = async () => {
    const dataUser = await getToken();
    let mydata = {
      userId: JSON.parse(dataUser).code,
      name: 'ORDER TRACKING PAGE ',
      timestamp: new Date(),
    };
    await segment('page', mydata);
  };

  useEffect(() => {
    orderTrackingEvent();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, marginHorizontal: 10, backgroundColor: '#f2f4f8', fontFamily: Typography.FONT_FAMILY_MEDIUM }}>
      <NavigationHeader
        language={language}
        style={{ fontFamily: Typography.FONT_FAMILY_MEDIUM }}
        title={`${props.intl.formatMessage({ id: 'app.containers.OrderTracking.titre' })} ${order?.orders?.[0]
          ?.invoiceCode ?? ''}`}
        onPress={() => props.navigation.goBack()}
      />
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.status}>
          {props.intl.formatMessage({ id: 'app.containers.OrderTracking.status' })}{' '}
          <Text style={{ color: '#43b11b' }}>
            {order?.ordersTracking?.data?.[0]?.Order?.Status?.[0]?.valueStatus?.fr}
          </Text>
        </Text>
        <Text style={styles.date}>
          {props.intl.formatMessage({ id: 'app.containers.OrderTracking.date' })}{' '}
          <Text style={{ color: '#5a6880' }}>
            {moment(order.orders && order?.orders?.[0]?.theDate).format('YYYY/MM/DD')}
          </Text>
        </Text>
        <View style={styles.container}>
          {order?.orders?.[0]?.details?.map(detail => (
            <View>
              <ProductItem language={language} {...detail} {...order} />
              <Divider style={{ backgroundColor: '#e4e8ef', width: '100%', marginVertical: 10 }} />
            </View>
          ))}
          <View style={styles.footer}>
            <Text style={styles.montant}>
              {props.intl.formatMessage({ id: 'app.containers.OrderTracking.price' })}{' '}
              {language === 'ar' ? (
                <>
                  <Text style={styles.totalAmount}>
                    <Text style={[styles.mad, { color: Colors.PINK }]}>MAD</Text> {order?.orders?.[0]?.paidAmount}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.totalAmount}>
                    {order?.orders?.[0]?.paidAmount} <Text style={[styles.mad, { color: Colors.PINK }]}>MAD</Text>
                  </Text>
                </>
              )}
            </Text>
            <View style={styles.iconDiv}>
              <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
              <Text style={styles.points}>{order?.orders?.[0]?.loyaltyScore}</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={[styles.tracking, { marginTop: 0, marginBottom: Spacing.SCALE_14 }]}>
            {props.intl.formatMessage({ id: 'app.containers.OrderTracking.tracking' })}
          </Text>

          {order?.orders?.[0]?.StatusList && order?.ordersTracking && (
            <OrderTrackingTimeline statusList={order?.orders?.[0]?.StatusList} orderTracking={order?.ordersTracking} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

OrderTracking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  orderTracking: makeSelectOrderTracking(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(injectIntl(OrderTracking));
