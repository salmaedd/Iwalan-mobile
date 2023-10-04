/**
 *
 * ProductDetails
 *
 */

import analytics from '@segment/analytics-react-native';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Back from '../../assets/back.png';
import Cart from '../../assets/svg/shoppingCart';
import Badge from '../../components/Badge';
import Product from '../../components/Product';
import QuantityBox from '../../components/QuantityBox';
import TabControl from '../../components/TabControl';
import { pointsCalculator } from '../../Helpers/HelperFunctions';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import { getToken, isLandscape } from '../../utils/MainMethods';
import { segment } from '../../utils/segment';
import { addMsg } from '../message/actions';
import { addProductToCart, getAccessories, getProduct, updateProductQuantity } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectProductDetails from './selectors';
import { Icon } from 'react-native-elements';
import Layer from '../../assets/whiteLayer.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUp from '../../components/popUp';

export const styles = StyleSheet.create({
  header: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.SCALE_20,
    marginTop: Platform.OS === 'ios' ? Spacing.SCALE_40 : Spacing.SCALE_10,
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
    borderRadius: Platform.OS === 'ios' ? Spacing.SCALE_50 : Spacing.SCALE_10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PINK,
    shadowColor: 'rgba(251, 72, 150, 0.31)',
    shadowOffset: { width: -1, height: 6 },
    shadowOpacity: 11,
    shadowRadius: 6,
    elevation: 6,
    paddingBottom: 2,
    paddingLeft: 2,
  },
  main: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: Spacing.SCALE_120,
  },
  descriptionEllipse: {
    width: Spacing.SCALE_5,
    height: Spacing.SCALE_5,
    borderRadius: Spacing.SCALE_25,
    backgroundColor: Colors.PINK,
  },
  slideNumber: {
    width: Spacing.SCALE_56,
    height: Spacing.SCALE_32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(12, 24, 80, 0.2)',
    marginHorizontal: Spacing.SCALE_20,
    borderRadius: Spacing.SCALE_16,
    marginBottom: Spacing.SCALE_20,
  },
  number: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  details: {
    width: '100%',
    backgroundColor: '#f2f4f8',
    borderTopLeftRadius: Spacing.SCALE_10,
    borderTopRightRadius: Spacing.SCALE_10,
    paddingHorizontal: Spacing.SCALE_20,
    paddingVertical: Spacing.SCALE_16,
  },
  detailsFirstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Spacing.SCALE_24,
  },
  brand: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_12,
    lineHeight: Typography.LINE_HEIGHT_12,
    color: Colors.DARK_GRAY,
  },
  designation: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: '#24378b',
    marginVertical: Spacing.SCALE_6,
  },
  price: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_20,
    color: '#3b3b3b',
    marginRight: Spacing.SCALE_10,
  },
  mad: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_10,
    color: Colors.DARK_GRAY,
  },
  oldPrice: {
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.DARK_GRAY,
    textDecorationLine: 'line-through',
  },
  textView: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: Spacing.SCALE_10,
  },
  productStyle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    flex: 1,
    paddingHorizontal: Spacing.SCALE_20,
    paddingBottom: Spacing.SCALE_20,
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
  },
  productctagory: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  innerCircle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    width: Spacing.SCALE_20,
    height: Spacing.SCALE_20,
    borderRadius: Spacing.SCALE_10,
  },
  outerCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Spacing.SCALE_32,
    height: Spacing.SCALE_32,
    borderRadius: Spacing.SCALE_16,
    borderStyle: 'solid',
    borderWidth: 2,
    marginRight: Spacing.SCALE_10,
  },
  colors: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: '500',
    color: Colors.DARK_GRAY,
    marginVertical: Spacing.SCALE_10,
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Spacing.SCALE_56,
    height: Spacing.SCALE_36,
    borderStyle: 'solid',
    borderWidth: Spacing.SCALE_2,
    borderRadius: Spacing.SCALE_11,
    marginRight: Spacing.SCALE_10,
  },
  insideImage: {
    width: Mixins.WINDOW_WIDTH - 100,
    height: Spacing.SCALE_320,
  },
  imageContainer: {
    width: Mixins.WINDOW_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: Spacing.SCALE_16,
  },
  textBox: {
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: '500',
  },
  diagonal: {
    width: Spacing.SCALE_54,
    height: 2,
    position: 'absolute',
    transform: [{ rotate: '145deg' }],
  },
  accessories: {
    width: '100%',
    backgroundColor: '#f2f4f8',
    marginTop: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_80,
    paddingVertical: Spacing.SCALE_20,
  },
  floatingCart: {
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
    shadowColor: 'rgba(122, 135, 157, 0.13)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: Spacing.SCALE_12,
    elevation: Spacing.SCALE_12,
  },
  total: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DARK_GRAY,
  },
  priceTotal: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: '#3b3b3b',
    paddingTop: Spacing.SCALE_5,
  },
  priceMad: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DARK_GRAY,
    marginRight: Spacing.SCALE_5,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    marginLeft: Spacing.SCALE_8,
  },
  addToCart: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Spacing.SCALE_168,
    height: Spacing.SCALE_40,
    borderRadius: Spacing.SCALE_20,
    backgroundColor: Colors.PINK,
  },
  circle: {
    borderWidth: 1.4,
    borderColor: '#43b11b',
    backgroundColor: '#43b11b',
    borderRadius: Spacing.SCALE_50,
    width: Spacing.SCALE_32,
    height: Spacing.SCALE_32,
    justifyContent: 'center',
    marginRight: Spacing.SCALE_10,
    // marginTop: 4,
  },
});

export function Ellipse({ backgroundColor, borderColor, onPress }) {
  return (
    <TouchableOpacity underlayColor="transparent" onPress={onPress}>
      <View style={[styles.outerCircle, { borderColor }]}>
        <View style={[styles.innerCircle, { backgroundColor }]} />
      </View>
    </TouchableOpacity>
  );
}

export function RoundedBox({ capacity, borderColor, color, backgroundColor, onPress }) {
  return (
    <TouchableOpacity underlayColor="transparent" onPress={onPress}>
      <View style={[styles.box, { borderColor }]}>
        <Text style={[styles.textBox, { color }]}>{capacity}</Text>
        <View style={[styles.diagonal, { backgroundColor }]} />
      </View>
    </TouchableOpacity>
  );
}

export function ProductDetails(props) {
  useInjectReducer({ key: 'productDetails', reducer });
  useInjectSaga({ key: 'productDetails', saga });
  const language = useSelector(state => state?.login?.myLang);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  // const [price, setPrice] = React.useState(0);
  // const [generosity, setGenerosity] = React.useState(0);

  // const [designation, setDesignation] = React.useState('');
  const [currentAccessory, setCurrentAccessory] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [capacitiesArray, setCapacitiesArray] = React.useState([]);
  const [selectedCapacity, setSelectedCapacity] = React.useState(0);
  const [counter, setCounter] = React.useState(1);
  const [tab, setTab] = React.useState(0);
  const [quantityError, setQuantityError] = React.useState(null);
  const [product, setProduct] = React.useState({});
  const [itemToAdd, setItemToAdd] = React.useState({});
  const [reminder, setReminder] = React.useState(false);
  const [showPopUp, setShowPopUp] = React.useState(false);
  const [resteQty, setResteQty] = React.useState(0);

  useEffect(() => {
    const propsProduct = props.productDetails.product;
    const productId = props?.route?.params?.product?.id ? props.route.params.product.id : props.route.params.id;
    if (productId == propsProduct.id) setProduct(propsProduct);
  }, [props]);

  const productDetailEvent = async () => {
    const dataUser = await getToken();
    let mydata = {
      userId: JSON.parse(dataUser).code,
      name: 'PRODUCT DETAIL PAGE',
      timestamp: new Date(),
    };
    await segment('page', mydata);
  };

  useEffect(() => {
    productDetailEvent();
    productDetailScreenSegment();
  }, []);

  useEffect(() => {
    console.log('product', product);
  }, [product]);

  const productClickedSegment = () => {
    analytics.track('Product Clicked', {
      product_id: product?.id,
      sku: product?.code,
      category: product?.Category?.name?.fr,
      name: props?.productDetails?.product?.designation,
      brand: product?.Brand?.name?.fr,
      variant: product?.designation,
      price: product?.price,
      quantity: product?.quantity,
      coupon: '',
      position: props?.route?.params?.index,
      url: '',
      image_url: product?.images?.main?.m,
    });

    analytics.track('Product Viewed', {
      product_id: product?.id,
      sku: product?.code,
      category: product?.Category?.name?.fr,
      name: props?.productDetails?.product?.designation,
      brand: product?.Brand?.name?.fr,
      variant: product?.designation,
      price: product?.price,
      quantity: product?.quantity,
      coupon: '',
      position: props?.route?.params?.index,
      image_url: product?.images?.main?.m,
    });
  };

  useEffect(() => {
    if (product?.colors?.[0])
      setCapacitiesArray(product.capacityByColor[product.colors[0]].filter(capacity => capacity));
    !!product && Object.keys(product)?.length > 0 && productClickedSegment();
  }, [product]);

  function setDisplayedItemByColor() {
    if (product?.Variants && product.Variants?.length > 0) {
      product.Variants.map(item => {
        if (
          (item.hex === product.colors[selectedColor] && item.Capacite === product.Capacities[selectedCapacity]) ||
          (item.hex === product.colors[selectedColor] && product.capacityByColor?.length <= 1)
        ) {
          setItemToAdd(item);
        }
      });
    } else {
      setItemToAdd(product);
    }
  }
  function setDisplayedItemByCategory() {
    if (product?.Variants && product.Variants?.length > 0) {
      product.Variants.map(item => {
        if (item.hex === product.colors[selectedColor] && item.Capacite === product.Capacities[selectedCapacity]) {
          setItemToAdd(item);
        }
      });
    } else {
      setItemToAdd(product);
    }
  }

  useEffect(() => {
    setResteQty(itemToAdd?.rest_quantité_client !== undefined ? itemToAdd?.rest_quantité_client : 1);
  }, [itemToAdd]);

  useEffect(() => {
    setDisplayedItemByColor();
  }, [selectedColor, product]);

  useEffect(() => {
    setDisplayedItemByCategory();
  }, [selectedCapacity, product]);

  useEffect(() => {
    setCounter(product.quantity ? product.quantity : 1);
  }, [product.quantity]);

  function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj?.length > 0) return false;
    if (obj?.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== 'object') return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }
  useEffect(() => {
    setQuantityError(null);
    setCounter(1);

    if (isEmpty(itemToAdd) === false) {
      analytics.track('Product Viewed', {
        product_id: itemToAdd?.id,
        sku: itemToAdd?.code,
        category: itemToAdd?.Category?.name?.fr,
        name: props?.productDetails?.product?.designation,
        brand: itemToAdd?.Brand?.name?.fr,
        variant: itemToAdd?.designation,
        price: itemToAdd?.price,
        quantity: itemToAdd?.quantity,
        coupon: '',
        position: props?.route?.params?.index,
        image_url: itemToAdd?.images?.main?.m,
      });
    }
  }, [itemToAdd]);
  const messageErr1Parte1 = props.intl.formatMessage({ id: 'app.containers.ProductDetails.messageErr1Parte1' });
  const messageErr1Parte2 = props.intl.formatMessage({ id: 'app.containers.ProductDetails.messageErr1Parte2' });

  const messageErr2Parte1 = props.intl.formatMessage({ id: 'app.containers.ProductDetails.messageErr2Parte1' });
  const messageErr2Parte2 = props.intl.formatMessage({ id: 'app.containers.ProductDetails.messageErr2Parte2' });

  const messageErr2 = props.intl.formatMessage({ id: 'app.containers.ProductDetails.messageErr2' });

  useEffect(() => {
    if (product.Variants && counter !== 0) {
    } else if (counter === 0) {
      setQuantityError(messageErr2);
    } else {
      //  setQuantityError(null);
    }
  }, [counter, product.Deposits]);

  const { getAccessories, getProduct } = props;
  useEffect(() => {
    getAccessories();
    getProduct(props?.route?.params?.product?.id ? props.route.params.product.id : props.route.params.id);
  }, [getAccessories, getProduct]);

  const addToCart = async () => {
    if (
      itemToAdd.Deposits &&
      itemToAdd.Deposits?.length > 0 &&
      counter <= itemToAdd.Deposits[0].Stocks.quantity &&
      counter !== 0
    ) {
      let myProductCart = '';
      /*if (product.Variants) {
        product.Variants.map(item => {
          if (item.hex === product.colors[selectedColor] || item.Capacite === product.Capacities[selectedCapacity]) {
            myProductCart = item;
          }
        });
      } else {
        myProductCart = product;
      }
      const addedProduct = {
        ...myProductCart,
        quantity: counter,
      };*/

      const addedProduct = {
        ...itemToAdd,
        quantity: counter,
      };
      const dataUser = await getToken();
      props.addProductToCart(addedProduct, JSON.parse(dataUser).code);

      let index = props?.productDetails?.cart?.findIndex(product => product.id == addedProduct?.id);
      analytics.track('Product Added', {
        cart_id: JSON.parse(dataUser).cartId, //
        product_id: addedProduct?.id,
        sku: addedProduct?.code, // code
        category: addedProduct?.Category?.name?.fr,
        name: addedProduct?.designation, //parent
        brand: addedProduct?.Brand?.name?.fr, //Brand.name.fr
        variant: addedProduct?.designation, //
        price: addedProduct?.price,
        quantity: addedProduct?.quantity, //cart qty
        coupon: '', //
        position: (index != -1 ? index : props?.productDetails?.cart?.length ?? 0) + 1, // index product
        url: '', //
        image_url: addedProduct?.images?.main?.m, //
      });
      props.toastMsg(props.intl.formatMessage({ id: 'app.containers.ProductDetails.addSuccess' }), 'success');
      // props.toastMsg('Votre produit a été ajouté avec succès !', 'success');
      props.navigation.navigate('Cart');
    } else if (itemToAdd.price) {
      props.toastMsg(props.intl.formatMessage({ id: 'app.containers.ProductDetails.depasseStock' }), 'danger');

      // props.toastMsg('Vous avez dépassé le stock disponible', 'danger');
    } else {
      props.toastMsg(props.intl.formatMessage({ id: 'app.containers.ProductDetails.error' }), 'danger');
      // props.toastMsg("Quelque chose s'est mal passé !", 'danger');
    }
  };
  const productDetailScreenSegment = async () => {
    const dataUser = await getToken();
    analytics.screen('Product Details Page', {
      userId: JSON.parse(dataUser).code,
    });
  };

  const setProductToStorage = async () => {
    let myArrayofProducts = [];
    try {
      const value = await AsyncStorage.getItem('productIdForReminder');
      if (value !== null) {
        myArrayofProducts = JSON.parse(value);
        if (!myArrayofProducts.includes(product.id)) {
          myArrayofProducts.push(product.id);
        }
        await AsyncStorage.setItem('productIdForReminder', JSON.stringify(myArrayofProducts));
      } else {
        await AsyncStorage.setItem('productIdForReminder', JSON.stringify([product.id]));
      }
    } catch (e) {
      console.log('AsyncStorage', e);
    }
  };
  const ref = React.createRef();
  //console.log(product?.preorder, 'product?.preorderproduct?.preorder');
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={styles.imageContainer}
        onLayout={event => {
          var { x, y, width, height } = event.nativeEvent.layout;
          // console.log('height -----------------',height);
          // console.log('width -----------------',width);
        }}>
        <Image source={{ uri: item && item.toString() }} style={styles.insideImage} />
      </View>
    );
  };
  const renderAccessories = ({ item, index }) => {
    return (
      <Product
        boxShadow
        secondary
        key={item.id_product}
        designation={item.designation}
        oldPrice={item.oldPrice}
        price={item.price}
        imageURL={item?.images?.main?.m}
        score={pointsCalculator(item.price, item.generosity)}
        onPress={() => {
          props.navigation.push('Product', { product: item });
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.BACK_GRAY,
        paddingTop: !isLandscape()
          ? Platform.ios
            ? Spacing.SCALE_50
            : Spacing.SCALE_10
          : Platform.ios
          ? Spacing.SCALE_15
          : Spacing.SCALE_10,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      {language === 'ar' ? (
        <View style={styles.header}>
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => {
              props.navigation.navigate('Cart');
            }}>
            <View style={styles.iconContainer}>
              <Cart fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
              <View style={styles.notifContainer}>
                <Text style={styles.notif}>{props?.productDetails?.cart?.length}</Text>
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
            <Image source={Back} />
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => {
              props.navigation.navigate('Cart');
            }}>
            <View style={styles.iconContainer}>
              <Cart fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
              <View style={styles.notifContainer}>
                <Text style={styles.notif}>{props?.productDetails?.cart?.length}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.main}>
        <Carousel
          ref={ref}
          data={itemToAdd?.images?.images?.l?.length > 0 ? itemToAdd.images.images.l : []}
          renderItem={renderItem}
          sliderWidth={Mixins.WINDOW_WIDTH}
          itemWidth={Mixins.WINDOW_WIDTH}
          onSnapToItem={slideIndex => setCurrentIndex(slideIndex)}
        />
        <View style={{ ...styles.slideNumber, alignSelf: language === 'ar' ? 'flex-start' : 'flex-end' }}>
          <Text style={styles.number}>
            {itemToAdd?.images?.images?.l?.length > 0 ? currentIndex + 1 : 0}/{itemToAdd?.images?.images?.l?.length}
          </Text>
        </View>

        <View style={styles.details}>
          <View style={{ ...styles.detailsFirstLine, flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}>
            <Text style={styles.brand}>{product?.Brand?.name?.fr.toUpperCase()}</Text>
            <Badge score={pointsCalculator(itemToAdd.price, itemToAdd.generosity)} />
          </View>

          <View>
            <Text style={{ ...styles.designation, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
              {itemToAdd.designation}
            </Text>

            <View style={{ ...styles.textView, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
              <Text style={{ ...styles.price, marginRight: language === 'ar' ? 0 : Spacing.SCALE_10 }}>
                {itemToAdd.price}
                <Text style={styles.mad}> {itemToAdd.price && 'MAD'} </Text>
              </Text>
              {product.oldPrice && <Text style={styles.oldPrice}> MAD</Text>}
            </View>
          </View>

          <View style={styles.productStyle}>
            {product && product.colors && product.colors.filter(color => color)?.length !== 0 && (
              <View style={styles.productctagory}>
                <Text style={{ ...styles.title, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
                  {props.intl.formatMessage({ id: 'app.containers.ProductDetails.color' })}
                </Text>
                <View style={{ ...styles.colors, flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}>
                  {product?.colors?.length !== 0 &&
                    product.colors.map((color, index) => (
                      <Ellipse
                        backgroundColor={color}
                        borderColor={selectedColor === index ? Colors.PINK : Colors.BACK_GRAY}
                        onPress={() => {
                          setSelectedColor(index);
                          setCapacitiesArray(product.capacityByColor[color].filter(capacity => capacity));
                        }}
                      />
                    ))}
                </View>
              </View>
            )}
            {product && capacitiesArray && capacitiesArray?.length !== 0 && (
              <View style={styles.productctagory}>
                <Text style={{ ...styles.title, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
                  {props.intl.formatMessage({ id: 'app.containers.ProductDetails.capacity' })} (go)
                </Text>
                <View style={{ ...styles.colors, flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}>
                  {product &&
                    capacitiesArray &&
                    capacitiesArray?.length !== 0 &&
                    capacitiesArray.map((capacity, index) => (
                      <RoundedBox
                        capacity={capacity}
                        borderColor={selectedCapacity === index ? Colors.PINK : Colors.BACK_GRAY}
                        color={selectedCapacity === index ? Colors.PINK : Colors.DARK_GRAY}
                        onPress={() => setSelectedCapacity(index)}
                      />
                    ))}
                  {/* <RoundedBox capacity="128" borderColor="#e4e8ef" color="#e4e8ef" backgroundColor="#e4e8ef" /> */}
                </View>
              </View>
            )}
            <View style={styles.productctagory}>
              <Text style={{ ...styles.title, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
                {props.intl.formatMessage({ id: 'app.containers.ProductDetails.quantity' })}
              </Text>
              <View style={{ ...styles.colors, flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}>
                <QuantityBox
                  // language={language}
                  count={counter}
                  setCounter={setCounter}
                  onLeftPress={() => {
                    setQuantityError(null);
                    setCounter(counter > 0 ? counter - 1 : counter);
                    props.updateQuantity(counter > 0 ? counter - 1 : counter, product.id);
                  }}
                  onRightPress={() => {
                    setQuantityError(null);

                    if (itemToAdd?.preorder === true && counter >= resteQty) {
                      setQuantityError(`${messageErr2Parte1} ${resteQty} ${messageErr2Parte2}`);
                    } else if (
                      itemToAdd.Deposits &&
                      itemToAdd.Deposits?.length > 0 &&
                      itemToAdd?.preorder === false &&
                      counter >= itemToAdd?.Deposits?.[0]?.Stocks?.quantity
                    ) {
                      setQuantityError(
                        `${messageErr1Parte1} ${itemToAdd.Deposits[0].Stocks.quantity} ${messageErr1Parte2}`,
                      );
                    } else {
                      setQuantityError(null);
                    }
                    setCounter(
                      counter < (itemToAdd?.preorder === true ? resteQty : itemToAdd?.Deposits?.[0]?.Stocks?.quantity)
                        ? counter + 1
                        : counter,
                    );
                    props.updateQuantity(counter + 1, product.id);
                  }}
                  updateQuantity={props.updateQuantity}
                  id={product.id}
                  onMinError={() => setQuantityError(messageErr2)}
                  onMaxError={() => {
                    if (itemToAdd?.preorder === true && resteQty > 0) {
                      setQuantityError(`${messageErr2Parte1} ${resteQty} ${messageErr2Parte2}`);
                    } else if (itemToAdd?.Deposits?.length > 0)
                      setQuantityError(
                        `${messageErr1Parte1} ${itemToAdd.Deposits[0].Stocks?.quantity} ${messageErr1Parte2}`,
                      );
                  }}
                  clearErrors={() => setQuantityError(null)}
                  max={itemToAdd?.preorder === true ? resteQty : itemToAdd?.Deposits?.[0]?.Stocks?.quantity}
                />
              </View>
              <Text
                style={{
                  color: 'red',
                  //  height: Spacing.SCALE_20,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}>
                {quantityError}
              </Text>
            </View>
          </View>
        </View>
        <TabControl
          firstTitle={props.intl.formatMessage({ id: 'app.containers.ProductDetails.firstTitle' })}
          secondTitle={props.intl.formatMessage({ id: 'app.containers.ProductDetails.secondTitle' })}
          index={tab}
          onTabOnePress={() => setTab(0)}
          onTabTwoPress={() => setTab(1)}
          firstDescription={
            itemToAdd?.RAM
              ? itemToAdd?.RAM + ' Go RAM'
              : props.intl.formatMessage({ id: 'app.containers.ProductDetails.emptysheet' })
          }
          firstDescriptionNone={!itemToAdd?.RAM}
          secondDescription={
            itemToAdd.description
              ? itemToAdd.description
              : props.intl.formatMessage({ id: 'app.containers.ProductDetails.emptyDescription' })
          }
        />
        {props?.productDetails?.product?.Accessory?.length !== 0 && (
          <View style={styles.accessories}>
            <Text
              style={[
                styles.title,
                {
                  fontFamily: Typography.FONT_FAMILY_MEDIUM,
                  fontSize: Typography.FONT_SIZE_16,
                  marginLeft: Spacing.SCALE_20,
                },
              ]}>
              {props.intl.formatMessage({ id: 'app.containers.ProductDetails.interested' })}
            </Text>
            <Carousel
              ref={ref}
              data={props.productDetails.product.Accessory}
              renderItem={renderAccessories}
              hasParallaxImages={true}
              sliderWidth={Mixins.WINDOW_WIDTH}
              autoplay
              inactiveSlideScale={1}
              loop
              inactiveSlideOpacity={1}
              itemWidth={200}
              onSnapToItem={slideIndex => setCurrentAccessory(slideIndex)}
            />
          </View>
        )}
      </ScrollView>
      {itemToAdd && (itemToAdd?.boost === true || itemToAdd?.preorder === true) ? (
        <>
          {/* PRE-ORDER floatingCart  */}
          <View style={styles.floatingCart}>
            {language === 'ar' ? (
              <>
                <TouchableOpacity
                  style={{
                    ...styles.addToCart,
                  }}
                  underlayColor="transparent"
                  onPress={() => {
                    if (itemToAdd?.preorder === false || itemToAdd?.preorder === 0) {
                      setReminder(true);
                      setProductToStorage();
                      setShowPopUp(true);
                    } else {
                      props.navigation.navigate('OrderTrackingPreorder', {
                        order: itemToAdd,
                        gift: [],
                        quantity: counter,
                        total: itemToAdd.price * counter,
                        color: selectedColor,
                        capacity: selectedCapacity,
                        TotalPoints: pointsCalculator(itemToAdd.price, itemToAdd.generosity),
                      });
                    }
                  }}>
                  <Text
                    style={[
                      styles.total,
                      {
                        color: Colors.WHITE,
                        fontWeight: Typography.FONT_WEIGHT_BOLD,
                        fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
                      },
                    ]}>
                    {itemToAdd?.preorder === false || itemToAdd?.preorder === 0
                      ? props.intl.formatMessage({ id: 'app.containers.ProductDetails.notifyme' })
                      : props.intl.formatMessage({ id: 'app.containers.ProductDetails.préorder' })}
                  </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                  {reminder ? (
                    <>
                      <View style={{ ...styles.circle, marginRight: 14 }}>
                        <Image
                          source={Layer}
                          style={{
                            width: Spacing.SCALE_18,
                            height: Spacing.SCALE_18,
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                    </>
                  ) : (
                    <>
                      <Icon
                        name="notifications"
                        type="Ionicons"
                        color={'#7a879d'}
                        style={{ marginTop: Spacing.SCALE_10, marginRight: Spacing.SCALE_14 }}
                      />
                    </>
                  )}

                  <Text
                    style={{
                      ...styles.total,
                      marginTop: Spacing.SCALE_10,
                      alignSelf: language === 'ar' ? 'flex-end' : 'flex-start',
                    }}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductDetails.outStock' })}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...styles.total, marginTop: Spacing.SCALE_10 }}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductDetails.outStock' })}
                  </Text>
                  {reminder ? (
                    <>
                      <View style={{ ...styles.circle, marginLeft: 10 }}>
                        <Image
                          source={Layer}
                          style={{
                            width: Spacing.SCALE_18,
                            height: Spacing.SCALE_18,
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                    </>
                  ) : (
                    <>
                      <Icon
                        name="notifications"
                        type="Ionicons"
                        color={'#7a879d'}
                        style={{ marginTop: Spacing.SCALE_8, marginLeft: Spacing.SCALE_10 }}
                      />
                    </>
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    ...styles.addToCart,
                  }}
                  underlayColor="transparent"
                  onPress={() => {
                    if (itemToAdd?.preorder === false || itemToAdd?.preorder === 0) {
                      setReminder(true);
                      setProductToStorage();

                      setShowPopUp(true);
                    } else {
                      props.navigation.navigate('OrderTrackingPreorder', {
                        order: itemToAdd,
                        gift: [],
                        quantity: counter,
                        total: itemToAdd.price * counter,
                        color: selectedColor,
                        capacity: selectedCapacity,
                        TotalPoints: pointsCalculator(itemToAdd.price, itemToAdd.generosity),
                      });
                    }
                  }}>
                  <Text
                    style={[
                      styles.total,
                      {
                        color: Colors.WHITE,
                        fontWeight: Typography.FONT_WEIGHT_BOLD,
                        fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
                      },
                    ]}>
                    {itemToAdd?.preorder === false || itemToAdd?.preorder === 0
                      ? props.intl.formatMessage({ id: 'app.containers.ProductDetails.notifyme' })
                      : props.intl.formatMessage({ id: 'app.containers.ProductDetails.préorder' })}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </>
      ) : (
        <>
          <View style={styles.floatingCart}>
            {language === 'ar' ? (
              <>
                <TouchableOpacity style={styles.addToCart} underlayColor="transparent" onPress={() => addToCart()}>
                  <Text
                    style={[
                      styles.total,
                      {
                        color: Colors.WHITE,
                        fontWeight: Typography.FONT_WEIGHT_BOLD,
                        fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
                      },
                    ]}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductDetails.addToCart' })}
                  </Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...styles.total,
                      marginTop: Spacing.SCALE_10,
                      alignSelf: language === 'ar' ? 'flex-end' : 'flex-start',
                    }}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductDetails.total' })}
                  </Text>
                  <View style={{ ...styles.textView, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
                    {itemToAdd.price && counter && (
                      <Text style={styles.priceTotal}>
                        {itemToAdd.price * counter}
                        <Text style={styles.priceMad}> MAD</Text>
                      </Text>
                    )}
                    {product.oldprice && <Text style={styles.oldPrice}>{product.oldprice} MAD</Text>}
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={{ flex: 1 }}>
                  <Text style={{ ...styles.total, marginTop: Spacing.SCALE_10 }}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductDetails.total' })}
                  </Text>
                  <View style={styles.textView}>
                    {itemToAdd.price && counter && (
                      <Text style={styles.priceTotal}>
                        {itemToAdd.price * counter}
                        <Text style={styles.priceMad}> MAD</Text>
                      </Text>
                    )}
                    {product.oldprice && <Text style={styles.oldPrice}>{product.oldprice} MAD</Text>}
                  </View>
                </View>

                <TouchableOpacity style={styles.addToCart} underlayColor="transparent" onPress={() => addToCart()}>
                  <Text
                    style={[
                      styles.total,
                      {
                        color: Colors.WHITE,
                        fontWeight: Typography.FONT_WEIGHT_BOLD,
                        fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
                      },
                    ]}>
                    {props.intl.formatMessage({ id: 'app.containers.ProductDetails.addToCart' })}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </>
      )}

      {showPopUp && (
        <PopUp
          isVisible={showPopUp}
          text={props.intl.formatMessage({ id: 'app.containers.ProductDetails.reminderSuccess' })}
          onCancelPressed={() => {
            setShowPopUp(false);
          }}
          height={160}
        />
      )}
    </View>
  );
}

ProductDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  productDetails: makeSelectProductDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProduct: id => {
      dispatch(getProduct(id));
    },
    toastMsg: (a, b) => {
      dispatch(addMsg(a, b));
    },
    getAccessories: () => {
      dispatch(getAccessories());
    },
    addProductToCart: (product, userId) => {
      dispatch(addProductToCart(product, userId));
    },
    updateQuantity: (quantity, id) => {
      dispatch(updateProductQuantity(quantity, id));
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
)(injectIntl(ProductDetails));
