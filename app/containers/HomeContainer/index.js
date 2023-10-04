/**
 *
 * HomeContainer
 *
 */
import analytics from '@segment/analytics-react-native';
import React, { memo, useEffect } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import {
  FlatList,
  Image,
  LogBox,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import BrandElement from '../../components/BrandElement';
import EmptyState from '../../components/EmptyState';
import Header from '../../components/Header';
import OrderTimeline from '../../components/OrderTimeline';
import Product from '../../components/Product';
import { pointsCalculator } from '../../Helpers/HelperFunctions';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import { getToken } from '../../utils/MainMethods';
import { segment } from '../../utils/segment';
import { getData, getDataForRefresh } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHomeContainer from './selectors';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeModules } from 'react-native';
import { setMyLanguage } from '../Login/actions';

import { changeLocale } from './../../containers/LanguageProvider/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUp from '../../components/popUp';

LogBox.ignoreLogs(['Setting a timer']);

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#f2f4f8',
  },
  imageContainer: {
    display: 'flex',
    height: Spacing.SCALE_160,
    width: Mixins.WINDOW_WIDTH - Spacing.SCALE_60,
    borderRadius: Spacing.SCALE_20,
    overflow: 'hidden',
    borderColor: '#E4E8EF',
    borderWidth: Spacing.SCALE_2,
  },
  viewMore: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.DARK_GRAY,
    marginHorizontal: Spacing.SCALE_24,
  },
  more: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#24378b',
    marginRight: Spacing.SCALE_24,
  },
  bestSelling: {
    display: 'flex',
    borderRadius: Spacing.SCALE_20,
    backgroundColor: Colors.WHITE,
    marginHorizontal: Spacing.SCALE_16,
    marginTop: Spacing.SCALE_10,
    marginBottom: Spacing.SCALE_22,
    shadowColor: Mixins.boxShadow().color,
    shadowOffset: Mixins.boxShadow().shadowOffset,
    shadowOpacity: Mixins.boxShadow().shadowOpacity,
    shadowRadius: Mixins.boxShadow().shadowRadius,
    elevation: Mixins.boxShadow().elevation,
  },
  flatlistStyle: {
    marginHorizontal: Spacing.SCALE_16,
    marginTop: Spacing.SCALE_6,
    marginBottom: Spacing.SCALE_40,
  },
  flatlistRecommendedStyle: {
    marginTop: Spacing.SCALE_6,
    marginBottom: Spacing.SCALE_22,
    marginLeft: Spacing.SCALE_16,
  },
  showing: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DARK_GRAY,
    marginLeft: Spacing.SCALE_20,
  },
  results: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_14,
    color: '#3b3b3b',
  },
  noResults: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_22,
    color: '#5a6880',
  },
  forCount: {
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DARK_GRAY,
  },
});

export function HomeContainer(props) {
  useInjectReducer({ key: 'homeContainer', reducer });
  useInjectSaga({ key: 'homeContainer', saga });
  const [search, setSearch] = React.useState('');
  const [searchFlag, setSearchFlag] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [recommendedProducts, setRecommendedProducts] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [bestSelling, setBestSelling] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [sliderId, setSliderId] = React.useState('');
  const [flag, setFlag] = React.useState(false);
  const [codeCLT, setCodeCLT] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [appLanguage, setAppLanguage] = React.useState('');
  const [brandName, setBrandName] = React.useState('');
  const [showPopUp, setShowPopUp] = React.useState(false);
  const [calledOnlyOnce, setCalledOnlyOnce] = React.useState(true);
  const [calledOnlyOnceProduct, setCalledOnlyOnceProduct] = React.useState(true);
  const [showPopUpProduct, setShowPopUpProduct] = React.useState(false);
  const [productsName, setProductsName] = React.useState('');

  const language = useSelector(state => state?.login?.myLang);

  const { getData, getDataForRefresh, changeLoc } = props;
  //const HOUR_MS = 7200000;
  const HOUR_MS = 600000;

  useEffect(() => {
    const interval = setInterval(() => {
      getDataForRefresh({ slideType: 'products' });
    }, HOUR_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const getAppLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('AppLanguage');
      if (value !== null) {
        setAppLanguage(value);
      }
    } catch (e) {
      console.log('AsyncStorage', e);
    }
  };
  useEffect(() => {
    if (appLanguage === 'ar' || appLanguage === 'fr') {
      changeLoc(appLanguage);
      props.setMyLanguage(appLanguage);
    } else if (appLanguage === null) {
      if (Platform.OS === 'ios') {
        // iOS:
        const locale =
          NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]; // "fr_FR"
        changeLoc(locale.slice(0, 2) === 'ar' ? 'ar' : 'fr');
        props.setMyLanguage(locale.slice(0, 2) === 'ar' ? 'ar' : 'fr');
      } else {
        // Android:
        const locale = NativeModules.I18nManager.localeIdentifier; // "fr_FR"
        changeLoc(locale.slice(0, 2) === 'ar' ? 'ar' : 'fr');
        props.setMyLanguage(locale.slice(0, 2) === 'ar' ? 'ar' : 'fr');
      }
    }
  }, [appLanguage]);

  const showPopUpForNewBrand = async () => {
    setCalledOnlyOnce(false);
    try {
      const value = await AsyncStorage.getItem('brandIdForReminder');
      if (value !== null) {
        // let tab = [416, 415, 417, 413];
        let find = 'false';
        let brandNames = '';
        JSON.parse(value).map(element => {
          //   tab.map(element => {
          products.map(elem => {
            if (elem?.BrandId === element) {
              find = 'true';
              brandNames = !brandNames.includes(elem?.Brand?.name?.fr)
                ? brandNames.concat(' ' + elem?.Brand?.name?.fr)
                : brandNames;
            }
          });
        });
        setBrandName(brandNames);

        setTimeout(() => {
          find === 'true' && brandNames !== '' && setShowPopUp(true);
        }, 6000);
      }
    } catch (e) {
      console.log('AsyncStorage', e);
    }
  };

  const showPopUpForNewProduct = async () => {
    setCalledOnlyOnceProduct(false);
    try {
      const value = await AsyncStorage.getItem('productIdForReminder');
      if (value !== null) {
        // let tab = [2904, 2856, 417, 413];
        let find = 'false';
        let productNames = '';

        JSON.parse(value).map(element => {
          //  tab.map(element => {
          products.map(elem => {
            if (elem?.id === element && elem?.boost !== 0) {
              //if (elem?.id === element) {
              find = 'true';
              const index = value.indexOf(element);
              if (index > -1) {
                value.splice(index, 1);
              }

              productNames = !productNames.includes(elem?.designation)
                ? productNames.concat(' , ' + elem?.designation)
                : productNames;
            }
          });
        });

        JSON.parse(value).map(element => {
          //   tab.map(element => {
          recommendedProducts.map(elem => {
            if (elem?.id === element && elem?.boost !== 0) {
              find = 'true';
              const index = value.indexOf(element);
              if (index > -1) {
                value.splice(index, 1);
              }
              productNames = !productNames.includes(elem?.designation)
                ? productNames.concat(' , ' + elem?.designation)
                : productNames;
            }
          });
        });

        JSON.parse(value).map(element => {
          //   tab.map(element => {
          bestSelling.map(elem => {
            if (elem?.id === element && elem?.boost !== 0) {
              find = 'true';
              const index = value.indexOf(element);
              if (index > -1) {
                value.splice(index, 1);
              }
              productNames = !productNames.includes(elem?.designation)
                ? productNames.concat(' , ' + elem?.designation)
                : productNames;
            }
          });
        });

        setTimeout(() => {
          setProductsName(productNames);
          find === 'true' && productNames !== '' && setShowPopUpProduct(true);
        }, 6000);
      }
    } catch (e) {
      console.log('AsyncStorage', e);
    }
  };

  const deleteBrandsFromStorage = async () => {
    try {
      await AsyncStorage.setItem('brandIdForReminder', '');
    } catch (e) {
      console.log('AsyncStorage', e);
    }
  };

  const deleteProductsFromStorage = async () => {
    try {
      await AsyncStorage.setItem('productIdForReminder', '');
    } catch (e) {
      console.log('AsyncStorage', e);
    }
  };

  useEffect(() => {
    getAppLanguage();
    getData({ slideType: 'products' });
  }, []);

  useEffect(() => {
    calledOnlyOnce && products.length !== 0 && showPopUpForNewBrand();
    calledOnlyOnceProduct && products.length !== 0 && showPopUpForNewProduct();
  }, [products]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setCalledOnlyOnce(true);
    getDataForRefresh({ slideType: 'products' });
    setTimeout(() => {
      setRefreshing(false);
    }, 10);
  }, []);

  function renderItem({ item, index }) {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          const id = item.Product?.ProductId ?? item.productId;
          setSliderId(id);
          let element = {};
          products?.map(elem => {
            if (elem.id === id) element = elem;
            else {
              elem.Variants?.map(variant => {
                if (variant.id === id) element = variant;
              });
            }
          });
          if (Object.keys(element)?.length !== 0) {
            props.navigation.navigate('Product', { product: element });

            sliderDetailClickedSegment(element);
          } else {
            sliderClickedSegment(element);
            props.navigation.navigate('Catalog', {
              fromBrand: false,
              bestSelling: true,
              bestProducts: products,
              filterSelected: null,
            });
          }
        }}>
        <Image
          source={{ uri: item?.image?.png }}
          resizeMode="cover"
          style={{
            /*height: Spacing.SCALE_160, width: Mixins.WINDOW_WIDTH - Spacing.SCALE_60 ,
        overflow: 'hidden',
         borderWidth: 2,
         borderColor: '#E4E8EF',
        borderRadius: 20,*/
            flex: 1,
            height: undefined,
            width: undefined,
          }}
        />
      </TouchableOpacity>
    );
  }
  useEffect(() => {
    //  getData({ slideType: 'products' });
    getDataForRefresh({ slideType: 'products' });

    //  getUserOrders();
  }, [getData]);

  const ref = React.createRef();

  useEffect(() => {
    let tabRecommendedProducts = [];
    let tabBestSelling = [];
    let tabProducts = [];
    if (search?.length !== 0) {
      //   searchSegement(search);
      setSearchFlag(true);
      props?.homeContainer?.recommendedProducts?.map(element => {
        element?.designation && element?.designation.toUpperCase().includes(search.toUpperCase())
          ? tabRecommendedProducts.push(element)
          : element?.price && JSON.stringify(element.price).includes(search)
          ? tabRecommendedProducts.push(element)
          : element?.Brand?.name?.fr && JSON.stringify(element.Brand.name.fr).includes(search)
          ? tabRecommendedProducts.push(element)
          : null;
      });
      setRecommendedProducts(tabRecommendedProducts);

      props?.homeContainer?.bestSelling?.map(element => {
        element?.designation && element?.designation.toUpperCase().includes(search.toUpperCase())
          ? tabBestSelling.push(element)
          : element?.price && JSON.stringify(element.price).includes(search)
          ? tabBestSelling.push(element)
          : element?.Brand?.name?.fr && JSON.stringify(element.Brand.name.fr).includes(search)
          ? tabBestSelling.push(element)
          : null;
      });
      setBestSelling(tabBestSelling);

      props?.homeContainer?.products?.map(element => {
        element?.designation && element?.designation.toUpperCase().includes(search.toUpperCase())
          ? tabProducts.push(element)
          : element?.price && JSON.stringify(element.price).includes(search)
          ? tabProducts.push(element)
          : element?.Brand?.name?.fr &&
            JSON.stringify(element.Brand.name.fr)
              .toUpperCase()
              .includes(search.toUpperCase())
          ? tabProducts.push(element)
          : null;
      });
      setProducts(tabProducts);
    } else {
      setSearchFlag(false);
      setRecommendedProducts(props?.homeContainer?.recommendedProducts);
      setProducts(props?.homeContainer?.products);
      setBestSelling(props?.homeContainer?.bestSelling);
    }
  }, [search]);

  useEffect(() => {
    let arrayRecommendedProducts = [];
    props?.homeContainer?.recommendedProducts?.map(element => {
      arrayRecommendedProducts.push(element);
    });
    setRecommendedProducts(arrayRecommendedProducts.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price)));

    let arrayProducts = [];
    props?.homeContainer?.products?.map(element => {
      arrayProducts.push(element);
    });

    setProducts(arrayProducts.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price)));

    let arrayBestSelling = [];
    props?.homeContainer?.bestSelling?.map(element => {
      arrayBestSelling.push(element);
    });

    setBestSelling(arrayBestSelling.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price)));

    setBanners(props?.homeContainer?.banners);
    setBrands(props?.homeContainer?.brands);
    //  setMode(props?.homeContainer?.mode);
  }, [props]);

  useEffect(() => {
    productListViewedSegement('Recommended Products', props?.homeContainer?.recommendedProducts);
  }, [props?.homeContainer?.recommendedProducts]);

  const sliderClickedEvent = async () => {
    const dataUser = await getToken();
    let mydata = {
      userId: JSON.parse(dataUser).code,
      name: 'SLIDER CLICKED',
      id: sliderId,
      timestamp: new Date(),
    };
    await segment('track', mydata);
  };

  useEffect(() => {
    sliderId && sliderClickedEvent();
  }, [sliderId]);

  const searchSegement = () => {
    analytics.track('Products Searched', {
      query: search,
    });
  };

  const identifySegment = () => {
    if (flag === false) {
      getToken().then(value => {
        if (value) {
          setCodeCLT(JSON.parse(value).code);
          var code = JSON.parse(value).code;
          var cityName = JSON.parse(value).cityName;
          var firstname = JSON.parse(value).firstname;
          var lastname = JSON.parse(value).lastname;
          var email = JSON.parse(value).email;
          var depot = JSON.parse(value).depositName;
          var phoneNumber = JSON.parse(value).phones?.[0]?.number;
          var address = JSON.parse(value).adresse;
          analytics.identify(code, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            langue: language,
            address: {
              city: cityName,
              adress: address,
            },
            phone: phoneNumber,
            depot: depot,
          });
        }
      });
      // setFlag(false);
    }
  };
  const brandEventClickSegment = item => {
    getToken().then(value => {
      if (value) {
        var code = JSON.parse(value).code;
        analytics.track('Brand Clicked HomePage', {
          userId: code,
          brand_id: item.id,
          created_at: item.createdAt,
          brand: item.name.fr,
        });
      }
    });
  };

  const sliderClickedSegment = item => {
    getToken().then(value => {
      if (value) {
        var code = JSON.parse(value).code;
        analytics.track('Slider Clicked', {
          userId: code,
          slider_id: item.SlideId,
          product_id: item.id,
          position: item.order,
        });
      }
    });
  };
  const sliderDetailClickedSegment = item => {
    getToken().then(value => {
      if (value) {
        var code = JSON.parse(value).code;
        analytics.track('Slider detail Clicked', {
          userId: code,
          slider_id: item.SlideId,
          product_id: item.id,
          position: item.order,
        });
      }
    });
  };

  const pageSegment = () => {
    analytics.screen('Home Page', {
      userId: codeCLT,
    });
  };
  const productListViewedSegement = (text, dataProducts) => {
    analytics.track('Product List Viewed', {
      userId: codeCLT,
      list_id: text,
      category: '',
      products: dataProducts?.map((element, index) => {
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
    pageSegment();
  }, [codeCLT]);

  useEffect(() => {
    identifySegment();
  }, []);

  const getPagination = () => {
    return (
      <View style={{ marginTop: -Spacing.SCALE_20 }}>
        <Pagination
          dotsLength={banners?.length > 0 && props.homeContainer?.banners?.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'transparent', margin: 0 }}
          dotStyle={{
            width: Spacing.SCALE_6,
            height: Spacing.SCALE_6,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: '#fb4896',
          }}
          inactiveDotStyle={{
            width: Spacing.SCALE_6,
            height: Spacing.SCALE_6,
            backgroundColor: '#c0cbdd',
          }}
          //inactiveDotOpacity={0.4}
          inactiveDotScale={1}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      <ScrollView
        nestedScrollEnabled={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        style={{ height: '100%' }}>
        <Header
          lang={language}
          placeholder={props.intl.formatMessage({ id: 'app.containers.HomeContainer.searchBar' })}
          onChangeText={text => {
            setSearch(text);
          }}
          onBlur={() => {
            searchSegement();
          }}
          value={search}
          hasBack={false}
          hasFilter={false}
          hasNotifications={true}
          goToNotifications={() => props.navigation.navigate('Notifications')}
        />

        {searchFlag === true && (
          <View style={{ flexDirection: 'row', marginBottom: Spacing.SCALE_20 }}>
            {language === 'ar' ? (
              <>
                <Text style={{ ...styles.results, marginLeft: Spacing.SCALE_15, marginRight: Spacing.SCALE_10 }}>
                  {recommendedProducts?.length + products?.length + bestSelling?.length}{' '}
                  {props.intl.formatMessage({ id: 'app.containers.HomeContainer.results' })}{' '}
                </Text>
                <Text style={{ ...styles.showing, marginLeft: 0 }}>
                  {props.intl.formatMessage({ id: 'app.containers.HomeContainer.showing' })}{' '}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.showing}>
                  {props.intl.formatMessage({ id: 'app.containers.HomeContainer.showing' })}{' '}
                </Text>
                <Text style={styles.results}>
                  {' '}
                  {recommendedProducts?.length + products?.length + bestSelling?.length}{' '}
                  {props.intl.formatMessage({ id: 'app.containers.HomeContainer.results' })}{' '}
                </Text>
              </>
            )}
          </View>
        )}
        {search?.length !== 0 &&
          recommendedProducts?.length === 0 &&
          products?.length === 0 &&
          bestSelling?.length === 0 && (
            <EmptyState
              style={{ alignItems: 'center', marginTop: '30%' }}
              noResults={language === 'ar' ? 'لا نتائج' : 'No Results'}
              forCount={language === 'ar' ? 'بالنسبة' : 'for'}
              search={search}
            />
          )}

        {searchFlag === false ? (
          <Carousel
            ref={ref}
            data={banners}
            renderItem={renderItem}
            sliderWidth={Mixins.WINDOW_WIDTH}
            itemWidth={Mixins.WINDOW_WIDTH - 40}
            sliderHeight={Spacing.SCALE_160}
            layout={'default'}
            onSnapToItem={index => setActiveSlide(index)}
            autoplay={true}
            autoplayInterval={5500}
            loop={true}
            inactiveSlideScale={1}
          />
        ) : null}
        {searchFlag === false ? getPagination() : null}

        {props?.homeContainer?.orders &&
          props?.homeContainer?.orders?.length > 0 &&
          (searchFlag === false ? (
            <OrderTimeline lang={language} {...props.homeContainer} navigation={props.navigation} />
          ) : null)}

        {recommendedProducts?.length !== 0 ? (
          <>
            <Text style={{ ...styles.titleStyle, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
              {props.intl.formatMessage({ id: 'app.containers.HomeContainer.recommended' })}
            </Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={
                recommendedProducts
                // recommendedProducts.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price))
              }
              contentContainerStyle={styles.flatlistRecommendedStyle}
              renderItem={({ item, index }) => (
                <Product
                  lang={language}
                  isRecomandedProduct={true}
                  key={item.id_product}
                  boxShadow
                  designation={item.designation}
                  oldPrice={item.oldPrice}
                  price={item.price}
                  imageURL={item?.images?.main?.m}
                  score={pointsCalculator(item.price, item.generosity)}
                  onPress={() => {
                    props.navigation.navigate('Product', { product: item, index: index });
                    recommendedProducts && productListViewedSegement('Recommended Products', recommendedProducts);
                  }}
                />
              )}
            />
          </>
        ) : null}
        {brands && searchFlag === false ? (
          <>
            <View style={styles.viewMore}>
              <Text style={{ ...styles.titleStyle, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
                {props.intl.formatMessage({ id: 'app.containers.HomeContainer.brand' })}
              </Text>
              <TouchableOpacity
                underlayColor="transparent"
                style={{ alignItems: 'flex-end', marginLeft: 20 }}
                onPress={() => {
                  props.navigation.navigate('Brands', {
                    Brands: brands,
                  });
                }}>
                <Text style={{ ...styles.more, marginLeft: 20 }}>
                  {props.intl.formatMessage({ id: 'app.containers.HomeContainer.viewMore' })}
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              contentContainerStyle={styles.flatlistStyle}
              horizontal
              //  style={{ transform: [{ scaleX:language ==="ar" ? -1 : 1 }] }}
              showsHorizontalScrollIndicator={false}
              data={brands?.length > 0 && props.homeContainer.brands}
              renderItem={({ item, index }) => (
                <BrandElement
                  id={item?.id}
                  onPress={() => {
                    props.navigation.navigate('Catalog', {
                      brandId: item.id,
                      fromBrand: true,
                      index,
                      filterSelected: null,
                    });
                    brandEventClickSegment(item);
                  }}
                  image={item?.images?.png}
                />
              )}
            />
          </>
        ) : null}
        {bestSelling?.length !== 0 ? (
          <>
            <View style={styles.viewMore}>
              {language === 'ar' ? (
                <>
                  <TouchableOpacity
                    underlayColor="transparent"
                    style={{ alignItems: 'flex-end', marginLeft: 20 }}
                    onPress={() => {
                      props.navigation.navigate('Catalog', {
                        fromBrand: false,
                        bestSelling: true,
                        bestProducts: bestSelling,
                        filterSelected: null,
                      });
                      bestSelling && productListViewedSegement('best Selling Product', bestSelling);
                    }}>
                    <Text style={{ ...styles.more, marginLeft: 20 }}>
                      {props.intl.formatMessage({ id: 'app.containers.HomeContainer.viewMore' })}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.titleStyle}>
                    {props.intl.formatMessage({ id: 'app.containers.HomeContainer.bestSellingProducts' })}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.titleStyle}>
                    {props.intl.formatMessage({ id: 'app.containers.HomeContainer.bestSellingProducts' })}
                  </Text>
                  <TouchableOpacity
                    underlayColor="transparent"
                    style={{ alignItems: 'flex-end' }}
                    onPress={() => {
                      props.navigation.navigate('Catalog', {
                        fromBrand: false,
                        bestSelling: true,
                        bestProducts: bestSelling,
                        filterSelected: null,
                      });
                      bestSelling && productListViewedSegement('best Selling Product', bestSelling);
                    }}>
                    <Text style={styles.more}>
                      {props.intl.formatMessage({ id: 'app.containers.HomeContainer.viewMore' })}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.bestSelling}>
              <FlatList
                numColumns="2"
                data={bestSelling}
                renderItem={({ item, index }) => (
                  <Product
                    lang={language}
                    key={item.id_product}
                    designation={item.designation}
                    oldPrice={item.oldPrice}
                    price={item.price}
                    imageURL={item?.images?.main?.m}
                    score={pointsCalculator(item.price, item.generosity)}
                    onPress={() => {
                      props.navigation.navigate('Product', { product: item });
                      //productListViewedSegement('Product');
                    }}
                  />
                )}
              />
            </View>
          </>
        ) : null}
        {products?.length !== 0 ? (
          <>
            {language === 'ar' ? (
              <View style={styles.viewMore}>
                <TouchableOpacity
                  underlayColor="transparent"
                  style={{ alignItems: 'flex-end' }}
                  onPress={() => {
                    props.navigation.navigate('Catalog', {
                      fromBrand: false,
                      bestSelling: true,
                      bestProducts: products,
                      filterSelected: null,
                    });
                    productListViewedSegement('Products For You', products);
                  }}>
                  <Text style={{ ...styles.more, marginLeft: 30 }}>
                    {props.intl.formatMessage({ id: 'app.containers.HomeContainer.viewMore' })}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.titleStyle}>
                  {props.intl.formatMessage({ id: 'app.containers.HomeContainer.productsForyou' })}
                </Text>
              </View>
            ) : (
              <View style={styles.viewMore}>
                <Text style={styles.titleStyle}>
                  {props.intl.formatMessage({ id: 'app.containers.HomeContainer.productsForyou' })}
                </Text>
                <TouchableOpacity
                  underlayColor="transparent"
                  style={{ alignItems: 'flex-end' }}
                  onPress={() => {
                    props.navigation.navigate('Catalog', {
                      fromBrand: false,
                      bestSelling: true,
                      bestProducts: products,
                      filterSelected: null,
                    });
                    productListViewedSegement('Products For You', products);
                  }}>
                  <Text style={styles.more}>
                    {props.intl.formatMessage({ id: 'app.containers.HomeContainer.viewMore' })}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <FlatList
              numColumns="2"
              data={products}
              style={styles.flatlistStyle}
              renderItem={({ item, index }) => (
                <Product
                  lang={language}
                  key={item.id_product}
                  boxShadow
                  designation={item.designation}
                  oldPrice={item.oldPrice}
                  price={item.price}
                  imageURL={item?.images?.main?.m}
                  score={pointsCalculator(item?.price, item?.generosity)}
                  onPress={() => {
                    props.navigation.navigate('Product', { product: item });
                    //  productListViewedSegement('Product');
                  }}
                />
              )}
            />
          </>
        ) : null}
      </ScrollView>

      {showPopUp && (
        <PopUp
          isVisible={showPopUp}
          text={
            props.intl.formatMessage({ id: 'app.containers.HomeContainer.text1' }) +
            brandName +
            props.intl.formatMessage({ id: 'app.containers.HomeContainer.text2' })
          }
          textBrand={brandName}
          onCancelPressed={() => {
            setShowPopUp(false);
            deleteBrandsFromStorage();
          }}
        />
      )}

      {showPopUpProduct && (
        <PopUp
          isVisible={showPopUpProduct}
          text={
            props.intl.formatMessage({ id: 'app.containers.HomeContainer.textProduct' }) +
            productsName +
            props.intl.formatMessage({ id: 'app.containers.HomeContainer.text2Product' })
          }
          textBrand={productsName}
          onCancelPressed={() => {
            setShowPopUpProduct(false);
            // deleteProductsFromStorage();
          }}
        />
      )}
    </View>
  );
}

HomeContainer.propTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  homeContainer: makeSelectHomeContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    getData: slideType => {
      dispatch(getData(slideType));
    },
    getDataForRefresh: slideType => {
      dispatch(getDataForRefresh(slideType));
    },
    changeLoc: lang => {
      dispatch(changeLocale(lang));
    },
    setMyLanguage: L => {
      dispatch(setMyLanguage(L));
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
)(injectIntl(HomeContainer));
