/**
 *
 * ProductSummary
 *
 */

import analytics from '@segment/analytics-react-native';
import { sumBy } from 'lodash';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Badge from '../../components/Badge';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import NavigationHeader from '../../components/NavigationHeader';
import SummaryElement from '../../components/SummaryElement';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import { getToken, setToken } from '../../utils/MainMethods';
import { makeSelectLoading } from '../Login/selectors';
import { makeSelectProductsCart } from '../ProductDetails/selectors';
import { confirmOrder, getProfile } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectProductSummary from './selectors';

export const styles = StyleSheet.create({
  image: {
    width: Spacing.SCALE_76,
    height: Spacing.SCALE_76,
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
    marginBottom: Spacing.SCALE_10,
  },
  qty: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
    fontFamily: Typography.FONT_FAMILY_LIGHT,
  },
  qtyValue: {
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: '500',
    color: '#5a6880',
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  elementStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: Spacing.SCALE_10,
  },
  innerView: {
    marginLeft: Spacing.SCALE_20,
  },
  listView: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: Spacing.SCALE_10,
    padding: Spacing.SCALE_20,
    borderRadius: Spacing.SCALE_19,
    borderColor: Colors.BACK_GRAY,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderWidth: 1.2,
    marginBottom: Spacing.SCALE_20,
  },
  score: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.SCALE_20,
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    left: -Spacing.SCALE_40,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
  },
  iconContainer: {
    width: Spacing.SCALE_36,
    height: Spacing.SCALE_36,
    borderRadius: Spacing.SCALE_18,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.BACK_GRAY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.SCALE_10,
  },
  address: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: '#5a6880',
    lineHeight: Spacing.SCALE_25,
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    alignItems: 'center',
    marginVertical: Spacing.SCALE_20,
  },
  addressTitle: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: '500',
    color: Colors.DARK_GRAY,
  },
  addAddress: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: '#24378b',
  },
  addressView: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.SCALE_20,
  },
  confirm: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Spacing.SCALE_240,
    height: Spacing.SCALE_48,
    borderRadius: Spacing.SCALE_23,
    backgroundColor: Colors.PINK,
    alignSelf: 'center',
    marginTop: Spacing.SCALE_40,
    marginBottom: Spacing.SCALE_30,
  },
  confirmContainer: {
    width: Spacing.SCALE_240,
    height: Spacing.SCALE_48,
    backgroundColor: 'red',
  },
  confirmText: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: Colors.WHITE,
  },
  conditions: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.DARK_GRAY,
    textAlign: 'center',
  },
  bg: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.1,
    width: Mixins.WINDOW_WIDTH,
    height: Mixins.WINDOW_HEIGHT,
  },
});

// function SummaryElement(props) {
//   return (
//     <View style={styles.elementStyle}>
//       <Image source={{ uri: props.images ? props.images.main.s : '' }} style={styles.image} />
//       <View style={styles.innerView}>
//         <Text style={styles.title}>{props.designation}</Text>
//         <Text style={styles.qty}>
//           qty <Text style={styles.qtyValue}>{props.quantity}</Text>
//         </Text>
//       </View>
//     </View>
//   );
// }

export function ProductSummary(props) {
  useInjectReducer({ key: 'productSummary', reducer });
  useInjectSaga({ key: 'productSummary', saga });
  const language = useSelector(state => state?.login?.myLang);

  const { getUserOrders } = props;
  const [generosity, setGenerosity] = React.useState(0);
  const [ordered, setOrdered] = React.useState(false);
  const [text, onChangeText] = React.useState('');

  useEffect(() => {
    getUserOrders();
    productSummaryScreenSegement();
  }, []);
  useEffect(() => {
    props.productsCart?.map(element => {
      setGenerosity(generosity + JSON.parse(element.generosity));
    });
  }, [props]);

  const productSummaryScreenSegement = async () => {
    const dataUser = await getToken();
    analytics.screen('Product Summary Page', {
      userId: JSON.parse(dataUser).code,
    });
  };

  const orderConfirmedSegment = async () => {
    const dataUser = await getToken();
    analytics.track('Checkout Step Completed', {
      checkout_id: JSON.parse(dataUser).cartId,
      step: 1,
    });
    const total = sumBy(props.productsCart, element => parseInt(element?.price, 10) * element?.quantity);
    analytics.track('Order Completed', {
      userId: JSON.parse(dataUser).code,
      checkout_id: JSON.parse(dataUser).cartId,
      order_id: JSON.parse(dataUser).cartId,
      affiliation: '',
      total,
      revenue: total,
      subtotal: 0.0,
      shipping: 0.0,
      tax: 0.0,
      discount: 0.0,
      coupon: props?.route?.params?.coupon,
      currency: 'MAD',
      products: props.productsCart?.map(element => {
        return {
          product_id: element?.id,
          sku: element?.code,
          name: element?.designation,
          price: element?.price,
          quantity: element?.quantity,
          category: element?.Category?.name?.fr,
          url: '',
          image_url: element?.images?.main?.m,
          brand: element?.Brand?.name?.fr,
        };
      }),
    });
    await setToken({
      ...JSON.parse(dataUser),
      cartId: String(Math.random()),
    });
  };

  const confirmOrderSummary = () => {
    if (!ordered) {
      // props.navigation.navigate('OrderValidated', { gift: false, invoice: [] });

      setOrdered(true);
      const productIds = [];
      props.productsCart?.map(product => {
        productIds.push([product.id, product.quantity]);
      });
      props.confirmUserOrder(productIds, props?.route?.params?.id_coupon, props?.route?.params?.totalPoints, text, () =>
        orderConfirmedSegment(),
      );

      // orderConfirmedSegment(productIds, props?.route?.params?.id_coupon, props?.route?.params?.totalPoints);
    }
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />
      <View style={styles.bg}>
        <ImageBackground source={require('../../assets/background-pattern.png')} style={styles.backgroundImage} />
      </View>
      <NavigationHeader
        language={language}
        title={props.intl.formatMessage({ id: 'app.containers.ProductSummary.title' })}
        onPress={() => props.navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ borderColor: 'red', borderRadius: 20 }}>
          <View style={styles.listView}>
            {props.productsCart?.map(element => <SummaryElement language={language} {...element} />)}
            <Divider style={{ backgroundColor: Colors.BACK_GRAY }} />
            {language === 'ar' ? (
              <View style={styles.score}>
                <View style={{ display: 'flex', justifyContent: 'center' }}>
                  <Badge score={props.route.params.totalPoints} />
                </View>
                <Text style={{ ...styles.text, left: 0 }}>
                  {props.intl.formatMessage({ id: 'app.containers.ProductSummary.youWillGain' })}{' '}
                </Text>
              </View>
            ) : (
              <View style={styles.score}>
                <Text style={styles.text}>
                  {props.intl.formatMessage({ id: 'app.containers.ProductSummary.youWillGain' })}{' '}
                </Text>
                <View style={{ display: 'flex', justifyContent: 'center', right: -Spacing.SCALE_44 }}>
                  <Badge score={props.route.params.totalPoints} />
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.listView}>
          <Text style={{ ...styles.addressTitle, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
            {props.intl.formatMessage({ id: 'app.containers.ProductSummary.address' })}
          </Text>
          <View style={styles.addressContainer}>
            <View style={styles.iconContainer}>
              <Icon name="checkmark" type="ionicon" color="#43b11b" size={Spacing.SCALE_20} />
            </View>

            {/* <TextInput
              style={styles.address}
              onChangeText={onChangeText}
              value={text}
              placeholder={props?.productSummary?.profile?.adresse}
            /> */}
            <Input placeholder={props?.productSummary?.profile?.adresse} handleChange={onChangeText} />
            {/* <Text style={styles.address}>{props?.productSummary?.profile?.adresse}</Text> */}
          </View>
        </View>
        <TouchableOpacity
          containerStyle={styles.confirm}
          onPress={confirmOrderSummary}
          disabled={ordered ? true : false}>
          {!ordered ? (
            <Text style={styles.confirmText}>
              {props.intl.formatMessage({ id: 'app.containers.ProductSummary.confirm' })}
            </Text>
          ) : (
            <ActivityIndicator size="small" color="#ffffff" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('TermsOfService')}>
          <Text style={styles.conditions}>
            {props.intl.formatMessage({ id: 'app.containers.ProductSummary.conditionsParte1' })}{' '}
            <Text style={{ textDecorationLine: 'underline' }}>
              {props.intl.formatMessage({ id: 'app.containers.ProductSummary.conditionsParte2' })}
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {props.isLoading && <Loader />}
    </SafeAreaView>
  );
}

ProductSummary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  productSummary: makeSelectProductSummary(),
  productsCart: makeSelectProductsCart(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    confirmUserOrder: (products, coupon, totalPoints, address, successCallback) => {
      dispatch(confirmOrder(products, coupon, totalPoints, address, successCallback));
    },
    getUserOrders: () => {
      dispatch(getProfile());
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
)(injectIntl(ProductSummary));
