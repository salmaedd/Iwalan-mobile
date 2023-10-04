/**
 *
 * ProductCart
 *
 */

import analytics from '@segment/analytics-react-native';
import { sumBy } from 'lodash';
import { lang } from 'moment';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useRef } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import {
  FlatList,
  Image,
  Keyboard,
  LogBox,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Back from '../../assets/back.png';
import Check from '../../assets/svg/check';
import Cart from '../../assets/svg/shoppingCart';
import Alert from '../../components/Alert';
import Badge from '../../components/Badge';
import CartElement from '../../components/CartElement';
import Loader from '../../components/Loader';
import { pointsCalculator } from '../../Helpers/HelperFunctions';
import { Colors, Spacing, Typography } from '../../styles';
import { getToken, isLandscape } from '../../utils/MainMethods';
import { addMsg } from '../message/actions';
import {
  addProductToCart,
  removeProductFromCart,
  updateProductCart,
  updateProductQuantity,
} from '../ProductDetails/actions';
import { makeSelectProductsCart } from '../ProductDetails/selectors';
import { getCoupon, getCouponSuccess } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectProductCart from './selectors';
import { Icon } from 'react-native-elements';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export const styles = StyleSheet.create({
  header: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.SCALE_20,
    marginVertical: !isLandscape() ? Spacing.SCALE_20 : 0,
  },
  containerStyle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: Spacing.SCALE_20,
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: '500',
    color: Colors.DARK_GRAY,
    textAlign: 'center',
  },
  addToCart: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // width: Mixins.WINDOW_WIDTH * 0.4,
    flex: 1,
    height: Spacing.SCALE_40,
    borderRadius: Spacing.SCALE_20,
    backgroundColor: '#fb4896',
  },
  floatingCart: {
    width: '100%',
    position: 'absolute',
    bottom: Spacing.SCALE_18,
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    overflow: 'hidden',
  },
  floatingCartTop: {
    width: '100%',
    // backgroundColor: "#f9fafc",
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafc',
    paddingLeft: Spacing.SCALE_19,
    paddingRight: Spacing.SCALE_18,
    paddingTop: Spacing.SCALE_16,
    paddingBottom: Spacing.SCALE_16,
  },
  floatingCartMiddle: {
    width: '100%',
    alignSelf: 'center',
    paddingLeft: Spacing.SCALE_23,
    paddingRight: Spacing.SCALE_24,
    paddingTop: Spacing.SCALE_15,
  },
  floatingCartBottom: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingLeft: Spacing.SCALE_20,
    paddingRight: Spacing.SCALE_24,
    paddingTop: Spacing.SCALE_22,
    paddingBottom: Spacing.SCALE_16,
  },
  check: {
    color: '#fb4896',
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  textView: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: Spacing.SCALE_10,
    paddingTop: Spacing.SCALE_10,
    marginRight: Spacing.SCALE_10,
  },
  priceTotal: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: '500',
    color: '#3b3b3b',
  },
  priceMad: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_10,
    color: '#7a879d',
    marginRight: Spacing.SCALE_5,
  },
  emptyCart: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: '#b0b8c6',
  },
  textOverlay: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: '#5a6880',
    fontSize: Typography.FONT_SIZE_14,
    textAlign: 'center',
    fontWeight: '500',
  },
  cancel: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: '#24378b',
    fontSize: Typography.FONT_SIZE_14,
  },
  overlayStyle: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    borderRadius: Spacing.SCALE_20,
    backgroundColor: Colors.WHITE,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: Spacing.SCALE_20,
    height: Spacing.SCALE_200,
  },
  couponInput: {
    flex: 1,
    marginRight: Spacing.SCALE_10,
    paddingVertical: 0,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: '#7a879d',
    height: Spacing.SCALE_30,
  },
  coupon: { fontFamily: Typography.FONT_FAMILY_MEDIUM, fontSize: Typography.FONT_SIZE_14, color: '#7a879d' },
  total: { fontFamily: Typography.FONT_FAMILY_BOLD, fontSize: Typography.FONT_SIZE_14, color: '#424a57' },
});

export function ProductCart(props) {
  useInjectReducer({ key: 'productCart', reducer });
  useInjectSaga({ key: 'productCart', saga });

  const [colorVisible, setColorVisible] = React.useState(false);
  const [capacityVisible, setCapacityVisible] = React.useState(false);
  const [color, setColor] = React.useState(null); // set color to initial product colo !!!!!
  const [capacity, setCapacity] = React.useState(null);
  // const [counter, setCounter] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [alertCouponvisible, setAlertCouponVisible] = React.useState(false);
  const [idCustomer, setIdCustomer] = React.useState('');
  const [error, setError] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [code, setcode] = React.useState(props?.productCart?.coupon?.code ?? '');
  const [codeChecked, setcodeChecked] = React.useState(false);
  const [hideFloating, setHideFloating] = React.useState(false);
  const [couponInputFocused, setCouponInputFocused] = React.useState(false);
  const [shouldConfirmOrder, setShouldConfirmOrder] = React.useState(false);
  const couponInputRef = useRef();
  const [itemToRemove, setItemToRemove] = React.useState('');
  const [index, setIndex] = React.useState('');

  const { cart } = props;
  const { suggestedProducts, gifts } = props.productCart;
  const language = useSelector(state => state?.login?.myLang);

  const changeColor = element => {
    setColor(element);
    setColorVisible(!colorVisible);
  };

  const CartPageEvent = async () => {
    const dataUser = await getToken();

    analytics.track('Cart Viewed', {
      cart_id: JSON.parse(dataUser).cartId,
      products: cart?.map((element, index) => {
        return {
          product_id: element?.id,
          sku: element?.code,
          name: element?.designation,
          price: element?.price,
          position: index,
          category: element?.Category?.name?.fr,
          url: '',
          image_url: element?.images?.main?.m,
          brand: element?.Brand?.name?.fr,
        };
      }),
    });
  };

  useEffect(() => {
    props?.productCart?.coupon && setcodeChecked(true);
  }, [props?.productCart?.coupon]);

  useEffect(() => {
    props?.productCart?.coupon && shouldConfirmOrder && confirmOrder();
  }, [props?.productCart?.coupon]);

  useEffect(() => {
    CartPageEvent();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const changeCapacity = element => {
    setCapacity(element);
    setCapacityVisible(!capacityVisible);
  };

  const calculateCoupon = coupon =>
    coupon?.type == 'MULTIPLY_POINT' ? countTotalPoints() * (coupon?.value - 1) : coupon?.value;

  const checkoutStartedSegement = async () => {
    const dataUser = await getToken();
    analytics.track('Checkout Started', {
      order_id: JSON.parse(dataUser).cartId,
      value: countTotalPrice(),
      revenue: countTotalPrice(),
      shipping: 0.0,
      coupon: props?.productCart?.coupon?.code,
      currency: 'MAD',
      products: cart?.map(element => {
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
  };

  /*
    Add to Cart => update data in store
    when clicked: append to Cart + remove from suggested
  */

  const confirmOrder = () => {
    // confirm order
    if (error) {
      props.toastMsg("Quelque chose s'est mal passé ! ", 'danger');
    } else {
      checkoutStartedSegement();
      props.navigation.navigate('ProductSummary', {
        totalPoints:
          sumBy(
            props.cart,
            element => parseInt(pointsCalculator(element.price, element.generosity), 10) * element.quantity,
          ) + (calculateCoupon(props?.productCart?.coupon) ?? 0),
        id_coupon: props?.productCart?.coupon?.id_coupon,
        coupon: props?.productCart?.coupon?.code,
      });
    }
  };

  const removeFromCartSegment = async id => {
    const dataUser = await getToken();
    analytics.track('Product Removed', {
      userId: JSON.parse(dataUser).code,
      cart_id: JSON.parse(dataUser).cartId,
      product_id: id,
      sku: itemToRemove?.code,
      category: itemToRemove?.Category?.name?.fr,
      name: itemToRemove?.designation,
      brand: itemToRemove?.Brand?.name?.fr,
      variant: itemToRemove?.designation,
      price: itemToRemove?.price,
      quantity: itemToRemove?.quantity,
      coupon: props?.productCart?.coupon?.code,
      position: index,
      url: '',
      image_url: itemToRemove?.images?.main?.m,
    });
  };
  const couponentredSegment = async () => {
    const dataUser = await getToken();
    analytics.track('Coupon Entered', {
      order_id: JSON.parse(dataUser).cartId,
      cart_id: JSON.parse(dataUser).cartId,
      coupon_id: props?.productCart?.coupon?.id_coupon,
    });
  };
  const couponRemovedSegment = async () => {
    const dataUser = await getToken();

    analytics.track('Coupon Removed', {
      order_id: JSON.parse(dataUser).cartId,
      cart_id: JSON.parse(dataUser).cartId,
      coupon_id: props?.productCart?.coupon?.id_coupon,
      coupon_name: props?.productCart?.coupon?.code,
    });
  };
  const productCartScreenSegment = async () => {
    const dataUser = await getToken();

    analytics.screen('Product Cart Page', {
      userId: JSON.parse(dataUser).code,
    });
  };

  const removeFromCart = async id => {
    // to add action to update store Cart in productDetails === change notifications as well
    const dataUser = await getToken();
    props.removeProductFromCart(id, JSON.parse(dataUser).code);
    removeFromCartSegment(id);
  };

  const editProductCriteria = (value, index) => {
    const products = props.cart;
    const product = products[index];
    const updatedProduct = {
      ...product,
      quantity: value,
    };
    props.updateproductCart(index, updatedProduct); // update product with new cart value
  };

  const countTotalPrice = () => sumBy(props.cart, element => element.price * element.quantity);
  const countTotalPoints = () =>
    sumBy(props.cart, element => parseInt(pointsCalculator(element.price, element.generosity), 10) * element.quantity);

  useEffect(() => {
    productCartScreenSegment();
    const handleKBDidHide = () => {
      setHideFloating(false);
      setCouponInputFocused(false);
    };
    const KBDidHideHandler = Keyboard.addListener('keyboardDidHide', handleKBDidHide);

    const handleKBDidShow = () => setCouponInputFocused(true);
    const KBDidShowHandler = Keyboard.addListener('keyboardDidShow', handleKBDidShow);
    return () => {
      KBDidHideHandler.remove();
      KBDidShowHandler.remove();
    };
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#f2f4f8',
        flex: 1,
        height: '100%',
        marginHorizontal: Spacing.SCALE_10,
        paddingTop: !isLandscape()
          ? Platform.ios
            ? Spacing.SCALE_50
            : Spacing.SCALE_10
          : Platform.ios
          ? Spacing.SCALE_15
          : Spacing.SCALE_14,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />
      <View style={styles.header}>
        {language === 'ar' ? (
          <>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {props.intl.formatMessage({ id: 'app.containers.ProductCart.productCart' })}
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
              <Text style={styles.title}>
                {props.intl.formatMessage({ id: 'app.containers.ProductCart.productCart' })}
              </Text>
            </View>
          </>
        )}
      </View>
      {cart && cart?.length > 0 ? (
        <FlatList
          data={cart}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: hideFloating ? 0 : Spacing.SCALE_300 }}
          renderItem={({ item, index }) => (
            <CartElement
              language={language}
              key={item.id_product}
              {...item}
              visible={colorVisible}
              visibleCapacity={capacityVisible}
              color={item.Color}
              generosity={item.generosity}
              capacity={item.Capacite}
              toggleOverlay={() => setColorVisible(!colorVisible)}
              toggleOverlayCapacity={() => setCapacityVisible(!capacityVisible)}
              onElementClick={changeColor}
              onElementClickCapacity={changeCapacity}
              counter={props.quantity}
              setError={setError}
              removeFromCart={() => {
                setVisible(true);
                setId(item.id);
                setItemToRemove(item);
                setIndex(index);
              }}
              editProduct={editProductCriteria}
              id={index}
              onQuantityPress={() => setHideFloating(true)}
            />
          )}
        />
      ) : (
        <View style={styles.emptyCart}>
          <Cart fill="#b0b8c6" height={Spacing.SCALE_64} width={Spacing.SCALE_64} />
          <Text style={styles.emptyText}>{props.intl.formatMessage({ id: 'app.containers.ProductCart.noItems' })}</Text>
        </View>
      )}

      {!hideFloating && cart && cart?.length > 0 && (
        <View style={styles.floatingCart}>
          <View style={styles.floatingCartTop}>
            <Text
              style={[
                styles.coupon,
                { alignSelf: language === 'ar' ? 'flex-end' : 'flex-start', fontSize: Typography.FONT_SIZE_16 },
              ]}>
              {props.intl.formatMessage({ id: 'app.containers.ProductCart.codeAsk' })}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              <TextInput
                ref={couponInputRef}
                style={styles.couponInput}
                placeholder={props.intl.formatMessage({ id: 'app.containers.ProductCart.code' })}
                value={code}
                onChangeText={setcode}
                onEndEditing={() => couponentredSegment()}
                placeholderTextColor="#b4b9c3"
                onPress={() => {
                  if (codeChecked) {
                    setcode('');
                    setcodeChecked(false);
                    props.cancelCouponCheck();
                    couponRemovedSegment();
                  }
                  setCouponInputFocused(true);
                }}
              />
              {!codeChecked ? (
                <Button
                  title={props.intl.formatMessage({ id: 'app.containers.ProductCart.check' })}
                  type="clear"
                  titleStyle={styles.check}
                  buttonStyle={{ paddingTop: 0, paddingHorizontal: Spacing.SCALE_10, paddingBottom: Spacing.SCALE_10 }}
                  onPress={() => {
                    if (code?.length > 0) {
                      couponentredSegment();
                      couponInputRef.current?.blur();
                      props.getCoupon(code);
                    }
                  }}
                />
              ) : (
                <View style={{ justifyContent: 'center' }}>
                  <Button
                    title={props.intl.formatMessage({ id: 'app.containers.ProductCart.checked' })}
                    type="clear"
                    titleStyle={[styles.check, { color: '#43b11b' }]}
                    buttonStyle={{
                      paddingTop: 0,
                      paddingLeft: Spacing.SCALE_10,
                      paddingRight: Spacing.SCALE_20,
                      paddingBottom: Spacing.SCALE_10,
                    }}
                    onPress={() => {
                      setcode('');
                      setcodeChecked(false);
                      props.cancelCouponCheck();
                    }}
                  />
                  <Check
                    fill="#43b11b"
                    width={Spacing.SCALE_20}
                    height={Spacing.SCALE_20}
                    style={{ position: 'absolute', right: 0 }}
                  />
                </View>
              )

              // <View style={{flexDirection:'row', alignItems:'center'}}>
              // <Text style={[styles.check,{color:"#43b11b",marginRight:Spacing.SCALE_4}]}>{props.intl.formatMessage({ id: 'app.containers.ProductCart.checked' })}</Text>
              // <Check fill='#43b11b' width={Spacing.SCALE_20} height={Spacing.SCALE_20} />
              // </View>
              }
            </View>
          </View>
          <View style={styles.floatingCartMiddle}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              {language === 'ar' ? (
                <>
                  <Badge
                    score={codeChecked && props?.productCart?.coupon ? calculateCoupon(props?.productCart?.coupon) : 0}
                    style={{ position: null, right: 0, marginTop: 0 }}
                  />
                  <Text style={styles.coupon}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductCart.coupon' })}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.coupon}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductCart.coupon' })}
                  </Text>
                  <Badge
                    score={codeChecked && props?.productCart?.coupon ? calculateCoupon(props?.productCart?.coupon) : 0}
                    style={{ position: null, right: 0, marginTop: 0 }}
                  />
                </>
              )}
            </View>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.SCALE_7 }}>
              {language === 'ar' ? (
                <>
                  <Text style={styles.coupon}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductCart.free' })}
                  </Text>
                  <Text style={styles.coupon}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductCart.delivery' })}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.coupon}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductCart.delivery' })}
                  </Text>
                  <Text style={styles.coupon}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductCart.free' })}
                  </Text>
                </>
              )}
            </View>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.SCALE_14 }}>
              {language === 'ar' ? (
                <>
                  <Text style={styles.total}>{countTotalPrice()} MAD</Text>
                  <Text style={styles.total}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductCart.total' })}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.total}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductCart.total' })}
                  </Text>
                  <Text style={styles.total}>{countTotalPrice()} MAD</Text>
                </>
              )}
            </View>
            {couponInputFocused && (
              <View
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.SCALE_7 }}>
                <Text style={styles.total}>
                  {props.intl.formatMessage({ id: 'app.containers.ProductCart.totalPts' })}
                </Text>
                <Badge
                  score={
                    countTotalPoints() +
                    (codeChecked && props?.productCart?.coupon ? calculateCoupon(props?.productCart?.coupon) : 0)
                  }
                  style={{ position: null, right: 0, marginTop: 0 }}
                />
              </View>
            )}
          </View>
          <View style={styles.floatingCartBottom}>
            {!couponInputFocused && (
              <>
                {language === 'ar' ? (
                  <>
                    <TouchableOpacity
                      style={styles.addToCart}
                      underlayColor="transparent"
                      onPress={() =>
                        code?.length > 0 && !props?.productCart?.coupon ? setAlertCouponVisible(true) : confirmOrder()
                      }>
                      <Text style={[styles.total, { color: Colors.WHITE, fontWeight: Typography.FONT_WEIGHT_BOLD }]}>
                        {props.intl.formatMessage({ id: 'app.containers.ProductCart.Confirm' })}
                      </Text>
                    </TouchableOpacity>
                    <Badge
                      score={
                        countTotalPoints() +
                        (codeChecked && props?.productCart?.coupon ? calculateCoupon(props?.productCart?.coupon) : 0)
                      }
                      style={{
                        position: null,
                        right: 0,
                        left: 20,
                        marginTop: 0,
                        marginRight: Spacing.SCALE_22,
                        alignSelf: 'center',
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Badge
                      score={
                        countTotalPoints() +
                        (codeChecked && props?.productCart?.coupon ? calculateCoupon(props?.productCart?.coupon) : 0)
                      }
                      style={{
                        position: null,
                        right: 0,
                        marginTop: 0,
                        marginRight: Spacing.SCALE_22,
                        alignSelf: 'center',
                      }}
                    />
                    <TouchableOpacity
                      style={styles.addToCart}
                      underlayColor="transparent"
                      onPress={() =>
                        code?.length > 0 && !props?.productCart?.coupon ? setAlertCouponVisible(true) : confirmOrder()
                      }>
                      <Text style={[styles.total, { color: Colors.WHITE, fontWeight: Typography.FONT_WEIGHT_BOLD }]}>
                        {props.intl.formatMessage({ id: 'app.containers.ProductCart.Confirm' })}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </View>
        </View>
      )}

      <Alert
        isVisible={visible}
        text={props.intl.formatMessage({ id: 'app.containers.ProductCart.deleteMessage' })}
        onPress={() => {
          removeFromCart(id);
          setVisible(false);
        }}
        onCancelPressed={() => setVisible(false)}
      />
      <Alert
        isVisible={alertCouponvisible}
        setIsVisible={setAlertCouponVisible}
        text={props.intl.formatMessage({ id: 'app.containers.ProductCart.couponMessage' })}
        confirmText={props.intl.formatMessage({ id: 'app.containers.ProductCart.check' })}
        cancelText={props.intl.formatMessage({ id: 'app.containers.ProductCart.Continue' })}
        onPress={() => {
          setAlertCouponVisible(false);
          props.getCoupon(code);
          setShouldConfirmOrder(true);
        }}
        onCancelPressed={() => {
          setAlertCouponVisible(false);
          confirmOrder();
        }}
      />
      {props.productCart.isLoading && <Loader />}
    </SafeAreaView>
  );
}

ProductCart.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  productCart: makeSelectProductCart(),
  cart: makeSelectProductsCart(),
});

function mapDispatchToProps(dispatch) {
  return {
    // getSuggestedProducts: () => {
    //   dispatch(getSuggestedProducts());
    // },
    cancelCouponCheck: () => {
      dispatch(getCouponSuccess(null));
    },
    getCoupon: code => {
      dispatch(getCoupon(code));
    },
    addProductToCart: (product, userId) => {
      dispatch(addProductToCart(product, userId));
    },
    removeProductFromCart: (id, userId) => {
      dispatch(removeProductFromCart(id, userId));
    },
    updateproductCart: (index, product) => {
      dispatch(updateProductCart(index, product));
    },
    updateQuantity: (quantity, id) => {
      dispatch(updateProductQuantity(quantity, id));
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
)(injectIntl(ProductCart));
