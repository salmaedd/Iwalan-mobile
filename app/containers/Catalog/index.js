/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * Catalog
 *
 */

import { useNavigation } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import BrandElement from '../../components/BrandElement';
import EmptyState from '../../components/EmptyState';
import Filter from '../../components/Filter';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Product from '../../components/Product';
import { pointsCalculator } from '../../Helpers/HelperFunctions';
import { Mixins, Spacing, Typography } from '../../styles';
import { getToken } from '../../utils/MainMethods';
import { makeSelectLoading } from '../Login/selectors';
import { getBrandsData, getProducts, getProductsByBrand, setFilterCriteria, setProducts } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectCatalog, { makeSelectBrands } from './selectors';
import produit from '../../assets/produit.png';
import { Icon } from 'react-native-elements';
import Layer from '../../assets/whiteLayer.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMsg } from '../message/actions';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    paddingHorizontal: Spacing.SCALE_10,
  },
  mainTopView: {
    //flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: Spacing.SCALE_10,
    marginBottom: -Spacing.SCALE_20,
  },
  serachBar: {
    marginTop: Platform.OS === 'ios' ? Spacing.SCALE_40 : Spacing.SCALE_10,
    width: Mixins.WINDOW_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  searchBarStyle: {
    height: Spacing.SCALE_60,
    borderColor: '#e4e8ef',
    borderStyle: 'solid',
    backgroundColor: '#e4e8ef',
    borderWidth: 1,
    borderRadius: Spacing.SCALE_20,
    color: '#7a879d',
    padding: Platform.OS === 'ios' ? Spacing.SCALE_20 : 0,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginBottom: 0,
  },
  searchBarContainer: {
    width: '70%',
    backgroundColor: '#f2f4f8',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  iconsView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleStyle: {
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_20,
    color: '#7a879d',
    paddingLeft: Spacing.SCALE_20,
    paddingBottom: Spacing.SCALE_20,
  },
  avatars: {
    marginHorizontal: Spacing.SCALE_10,
    marginBottom: Spacing.SCALE_20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productContainer: {
    width: Spacing.SCALE_90,
    height: Spacing.SCALE_110,
  },
  filter: {
    color: '#24378b',
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_LIGHT,
  },
  backIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  selectedText: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: '#fb4896',
    width: Dimensions.get('window').width / 3,
  },
  disabledText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: '#7a879d',
    width: Dimensions.get('window').width / 3,
  },
  LineActive: {
    borderBottomColor: '#fb4896',
    borderBottomWidth: 1.8,
    width: Spacing.SCALE_120,
    marginLeft: -Spacing.SCALE_10,
    marginTop: Spacing.SCALE_20,
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

export function Catalog(props) {
  useInjectReducer({ key: 'catalog', reducer });
  useInjectSaga({ key: 'catalog', saga });

  const [search, setSearch] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const multiSliderInitialValue = [0, 15000];
  const [multiSliderValue, setMultiSliderValue] = React.useState(multiSliderInitialValue);
  const [filterCount, setFilterCount] = React.useState(0);
  const { fromBrand, index, bestSelling, bestProducts, filterSelected } = props?.route?.params;
  const [brandId, setBrandId] = React.useState(props?.route?.params?.brandId);
  const [brand, setBrand] = React.useState(fromBrand);
  const [activeBrand, setActiveBrand] = React.useState(index);
  const { getProducts, getBrands, setFilter, getProductsBrand, setProductsData } = props;
  const { criteria } = props.catalog;
  const [capacity, setCapacity] = React.useState('');
  const [ram, setRam] = React.useState('');
  const [flag, setFlag] = React.useState(false);
  const [removeBrandFlag, setRemoveBrandFlag] = React.useState(false);
  const [sort, setSort] = React.useState('');
  const [productsToShow, setProductsToShow] = React.useState(props?.catalog?.products);
  const [refreshing, setRefreshing] = React.useState(false);
  const [filters, setFilters] = React.useState({ brandId, multiSliderValue, capacity, ram, sort, search });
  const [smartphoneClicked, setSmartphoneClicked] = React.useState(
    filterSelected === 'smartphone' ? true : filterSelected !== 'smartphone' && filterSelected !== null ? false : true,
  );
  const [featureClicked, setFeatureClicked] = React.useState(filterSelected === 'feature' ? true : false);
  const [accessoriesClicked, setAccessoriesClicked] = React.useState(filterSelected === 'accessories' ? true : false);
  const [productsFiltred, setProductsFiltred] = React.useState();
  const [selectedReminder, setSelectedReminder] = React.useState(false);

  const language = useSelector(state => state?.login?.myLang);
  const brandPageEvent = () => {
    getToken().then(value => {
      if (value) {
        var code = JSON.parse(value).code;
        analytics.screen('Catalog page', {
          userId: code,
        });
      }
    });
  };

  useEffect(() => {
    brandPageEvent();
  }, []);

  const multiSliderValuesChange = values => {
    setMultiSliderValue(values);
  };
  /*
  const onValuesChangeFinish = values => {
    setFilter({
      // minPrice: values[0],
      // maxPrice: values[1],
      ...props?.sortCriteria,
    });
    getProductsByBrand();
    getProducts(criteria);
  };
*/
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const navigation = useNavigation();

  function updateSearch(text) {
    setSearch(text);
  }
  /*
  useEffect(() => {
    if (bestSelling === true || removeBrandFlag === true) {
      setProductsToShow(props?.catalog?.products);
    } else if (flag === false || removeBrandFlag !== true) {
      setProductsToShow(props?.catalog?.products);
    }
  }, [props]);*/
  function searchProducts(elements, searchString) {
    if (searchString?.length >= 3) {
      let foundElements = [];
      elements?.map(element => {
        element?.designation && element?.designation?.toUpperCase().includes(searchString.toUpperCase())
          ? foundElements.push(element)
          : element?.price && JSON.stringify(element?.price).includes(searchString)
          ? foundElements.push(element)
          : element?.brand?.name?.fr &&
            JSON.stringify(element?.brand?.name?.fr)
              .toUpperCase()
              .includes(searchString.toUpperCase())
          ? foundElements.push(element)
          : null;
      });
      return foundElements;
    }
    return elements;
  }
  function sortProducts(elements, order) {
    if (order === 'price') {
      return elements.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price));
    } else if (order === 'newest') {
      let tabNewest = [];
      let dformat = '';
      let currentTime = new Date();
      dformat = [currentTime.getFullYear(), ('0' + (currentTime.getMonth() + 1)).slice(-2), currentTime.getDate()].join(
        '-',
      );
      tabNewest = elements.filter(element => dformat > element?.newTo?.slice(0, 10));
      tabNewest.sort((a, b) => b?.newFrom?.slice(0, 10) - a?.newFrom?.slice(0, 10));
      const oldElements = elements.filter(element => !tabNewest.includes(element));
      return [...tabNewest, ...oldElements];
    } else if (order === 'highPrice') {
      return elements.sort((a, b) => parseFloat(b?.price) - parseFloat(a?.price));
    } else if (order === 'loyaltyPoints') {
      return elements.sort((a, b) => parseFloat(b?.generosity) - parseFloat(a?.generosity));
    }
    return elements;
  } /*).toUpperCase().includes(search.toUpperCase())
          ? tabProducts.push(element)
          : null;
      });
      setProductsToShow(tabProducts);
    } else {
    /*  setProductsToShow(props?.catalog?.products.filter( product => 
        ( !brandId || product.BrandId == brandId ) && 
        (product.price >= multiSliderValue[0] && product.price <= multiSliderValue[1]) ) &&

      );*/ /*
    }
  }, [search]);*/
  /* useEffect(() => {
    if (search?.length >= 3) {
      let tabProducts = [];
     // props?.catalog?.products.map(element => {
      productsToShow.map(element => {
        element?.designation && element?.designation?.toUpperCase().includes(search.toUpperCase())
          ? tabProducts.push(element)
          : element?.price && JSON.stringify(element?.price).includes(search)
          ? tabProducts.push(element)
          : element?.brand?.name?.fr && JSON.stringify(element?.brand?.name?.fr/* && element?.brand*/

  function filter(products) {
    const regex = /gb|g|G|GB/gi;
    if (multiSliderValue && capacity && ram && sort) {
      setFilterCount(4);
      let tabProducts = [];
      products?.map(elements => {
        elements?.Variants &&
          elements?.Variants?.map(element => {
            if (element?.price >= multiSliderValue[0] && element?.price <= multiSliderValue[1]) {
              if (element?.RAM && element?.RAM.replaceAll(regex, '') === ram) {
                if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= 256) {
                  if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= capacity) {
                    tabProducts.push(elements);
                  }
                } else {
                  if (element?.Capacite && element?.Capacite.replaceAll(regex, '') === capacity) {
                    tabProducts.push(elements);
                  }
                }
              } else if (element?.RAM && element?.RAM.replaceAll(regex, '') >= 16) {
                if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= 256) {
                  if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= capacity) {
                    tabProducts.push(elements);
                  }
                } else {
                  if (element?.Capacite && element?.Capacite.replaceAll(regex, '') === capacity) {
                    tabProducts?.push(elements);
                  }
                }
              }
            }
          });
      });

      let uniqueArray = [...new Set(tabProducts)];

      if (uniqueArray?.length !== 0) {
        if (sort === 'price') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price)));
        } else if (sort === 'newest') {
          var tabNewest = [];
          var dformat = '';
          var currentTime = new Date();
          (dformat = [
            currentTime.getFullYear(),
            ('0' + (currentTime.getMonth() + 1)).slice(-2),
            currentTime.getDate(),
          ].join('-')),
            uniqueArray.map(element => {
              dformat > element?.newTo?.slice(0, 10) ? tabNewest?.push(element) : null;
            });
          if (tabNewest?.length !== 0) {
            tabNewest.sort((a, b) => b?.newFrom?.slice(0, 10) - a?.newFrom?.slice(0, 10));
            setProductsToShow(tabNewest);
          } else {
            setProductsToShow([]);
          }
        } else if (sort === 'highPrice') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(b?.price) - parseFloat(a?.price)));
        } else if (sort === 'loyaltyPoints') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(b?.generosity) - parseFloat(a?.generosity)));
        }
      }
    } else if (multiSliderValue && capacity?.length === 0 && ram?.length === 0 && sort?.length === 0) {
      setFilterCount(1);
      let tabProductsPrice = [];
      products?.map(elements => {
        elements?.Variants &&
          elements?.Variants?.map(element => {
            if (element?.price >= multiSliderValue[0] && element?.price <= multiSliderValue[1]) {
              tabProductsPrice.push(elements);
            }
          });
      });
      let uniqueArray = [...new Set(tabProductsPrice)];

      setProductsToShow(uniqueArray);
    } else if (multiSliderValue && capacity && ram?.length === 0 && sort?.length === 0) {
      setFilterCount(2);
      let tabProducts = [];

      products?.map(elements => {
        elements?.Variants &&
          elements?.Variants?.map(element => {
            if (element?.price >= multiSliderValue[0] && element?.price <= multiSliderValue[1]) {
              if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= 256) {
                if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= capacity) {
                  tabProducts?.push(elements);
                }
              } else {
                if (element?.Capacite && element?.Capacite.replaceAll(regex, '') === capacity) {
                  tabProducts.push(elements);
                }
              }
            }
          });
      });

      let uniqueArray = [...new Set(tabProducts)];

      setProductsToShow(uniqueArray);
    } else if (multiSliderValue && capacity && ram && sort?.length === 0) {
      setFilterCount(3);
      let tabProducts = [];
      products?.map(elements => {
        elements?.Variants &&
          elements?.Variants?.map(element => {
            if (element?.price >= multiSliderValue[0] && element?.price <= multiSliderValue[1]) {
              if (element?.RAM && element?.RAM.replaceAll(regex, '') === ram) {
                if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= 256) {
                  if (element.s(0, -2) >= capacity) {
                    tabProducts.push(elements);
                  }
                } else {
                  if (element?.Capacite && element?.Capacite.replaceAll(regex, '') === capacity) {
                    tabProducts.push(elements);
                  }
                }
              } else if (element?.RAM && element?.RAM.replaceAll(regex, '') >= 16) {
                if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= 256) {
                  if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= capacity) {
                    tabProducts.push(elements);
                  }
                } else {
                  if (element?.Capacite && element?.Capacite.replaceAll(regex, '') === capacity) {
                    tabProducts.push(elements);
                  }
                }
              }
            }
          });
      });

      let uniqueArray = [...new Set(tabProducts)];

      setProductsToShow(uniqueArray);
    } else if (multiSliderValue && capacity?.length === 0 && ram && sort?.length === 0) {
      setFilterCount(2);
      let tabProducts = [];
      products?.map(elements => {
        elements?.Variants &&
          elements?.Variants?.map(element => {
            if (element?.price >= multiSliderValue[0] && element?.price <= multiSliderValue[1]) {
              if (element?.RAM && element?.RAM.replaceAll(regex, '') === ram) {
                tabProducts.push(elements);
              } else if (element?.RAM && element?.RAM.replaceAll(regex, '') >= 16) {
                tabProducts.push(elements);
              }
            }
          });
      });

      let uniqueArray = [...new Set(tabProducts)];

      setProductsToShow(uniqueArray);
    } else if (multiSliderValue && capacity?.length === 0 && ram?.length === 0 && sort) {
      setFilterCount(2);
      let tabProducts = [];
      products?.map(elements => {
        elements?.Variants &&
          elements?.Variants?.map(element => {
            if (element?.price >= multiSliderValue[0] && element?.price <= multiSliderValue[1]) {
              tabProducts.push(elements);
            }
          });
      });

      let uniqueArray = [...new Set(tabProducts)];

      if (uniqueArray?.length !== 0) {
        if (sort === 'price') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price)));
        } else if (sort === 'newest') {
          var tabNewest = [];
          var dformat = '';
          var currentTime = new Date();
          (dformat = [
            currentTime.getFullYear(),
            ('0' + (currentTime.getMonth() + 1)).slice(-2),
            currentTime.getDate(),
          ].join('-')),
            uniqueArray.map(element => {
              dformat > element?.newTo.slice(0, 10) ? tabNewest.push(element) : null;
            });
          if (tabNewest?.length !== 0) {
            tabNewest.sort((a, b) => b?.newFrom.slice(0, 10) - a?.newFrom.slice(0, 10));
            setProductsToShow(tabNewest);
          } else {
            setProductsToShow([]);
          }
        } else if (sort === 'highPrice') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(b?.price) - parseFloat(a?.price)));
        } else if (sort === 'loyaltyPoints') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(b?.generosity) - parseFloat(a?.generosity)));
        }
      }
    } else if (multiSliderValue && capacity && ram?.length === 0 && sort) {
      setFilterCount(3);
      let tabProducts = [];
      products?.map(elements => {
        elements?.Variants &&
          elements?.Variants?.map(element => {
            if (element?.price >= multiSliderValue[0] && element?.price <= multiSliderValue[1]) {
              if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= 256) {
                if (element?.Capacite && element?.Capacite.replaceAll(regex, '') >= capacity) {
                  tabProducts.push(elements);
                }
              } else {
                if (element?.Capacite && element?.Capacite.replaceAll(regex, '') === capacity) {
                  tabProducts.push(elements);
                }
              }
            }
          });
      });

      let uniqueArray = [...new Set(tabProducts)];

      if (uniqueArray?.length !== 0) {
        if (sort === 'price') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price)));
        } else if (sort === 'newest') {
          var tabNewest = [];
          var dformat = '';
          var currentTime = new Date();
          (dformat = [
            currentTime.getFullYear(),
            ('0' + (currentTime.getMonth() + 1)).slice(-2),
            currentTime.getDate(),
          ].join('-')),
            uniqueArray.map(element => {
              dformat > element?.newTo.slice(0, 10) ? tabNewest.push(element) : null;
            });
          if (tabNewest?.length !== 0) {
            tabNewest.sort((a, b) => b.newFrom.slice(0, 10) - a.newFrom.slice(0, 10));
            setProductsToShow(tabNewest);
          } else {
            setProductsToShow([]);
          }
        } else if (sort === 'highPrice') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(b?.price) - parseFloat(a?.price)));
        } else if (sort === 'loyaltyPoints') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(b?.generosity) - parseFloat(a?.generosity)));
        }
      }
    } else if (multiSliderValue && capacity?.length === 0 && ram && sort) {
      setFilterCount(3);
      let tabProducts = [];
      products?.map(elements => {
        elements?.Variants &&
          elements?.Variants?.map(element => {
            if (element?.price >= multiSliderValue[0] && element?.price <= multiSliderValue[1]) {
              if (element?.RAM && element?.RAM.replaceAll(regex, '') === ram) {
                tabProducts.push(elements);
              } else if (element?.RAM && element?.RAM.replaceAll(regex, '') >= 16) {
                tabProducts.push(elements);
              }
            }
          });
      });

      let uniqueArray = [...new Set(tabProducts)];

      if (uniqueArray?.length !== 0) {
        if (sort === 'price') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
        } else if (sort === 'newest') {
          var tabNewest = [];
          var dformat = '';
          var currentTime = new Date();
          (dformat = [
            currentTime.getFullYear(),
            ('0' + (currentTime.getMonth() + 1)).slice(-2),
            currentTime.getDate(),
          ].join('-')),
            uniqueArray.map(element => {
              dformat > element?.newTo?.slice(0, 10) ? tabNewest?.push(element) : null;
            });
          if (tabNewest?.length !== 0) {
            tabNewest.sort((a, b) => b.newFrom.slice(0, 10) - a?.newFrom?.slice(0, 10));
            setProductsToShow(tabNewest);
          } else {
            setProductsToShow([]);
          }
        } else if (sort === 'highPrice') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(b?.price) - parseFloat(a?.price)));
        } else if (sort === 'loyaltyPoints') {
          setProductsToShow(uniqueArray.sort((a, b) => parseFloat(b?.generosity) - parseFloat(a?.generosity)));
        }
      }
    } else {
      setProductsToShow(products);
    }
  }
  /*
  useEffect(() => {
    if (props?.catalog?.products?.length !== 0) {
      setFlag(true);
    }
    filter(props?.catalog?.products);
  }, [multiSliderValue, capacity, ram, sort]);
*/
  useEffect(() => {
    getBrands();
    setFilter({
      minPrice: multiSliderValue[0],
      maxPrice: multiSliderValue[1],
    });
    if (brand) {
      setBrand(false);
      getProducts(criteria);
      //  getProductsBrand(brandId);
    } else if (bestSelling) {
      // setBestSellingBool(false);
      setProductsData(bestProducts);
    } else {
      getProducts(criteria);
    }
  }, []);

  useEffect(() => {
    setFilters({ ...filters });
  }, [props]);

  useEffect(() => {
    if (selectedReminder) {
      props.toastMsg(props.intl.formatMessage({ id: 'app.containers.ProductDetails.reminderSuccess' }), 'success');
    }
  }, [selectedReminder]);

  useEffect(() => {
    let tabOfProducts = [];
    if (smartphoneClicked === true) {
      productsToShow.map(element => {
        element?.Category?.name?.fr === 'SMARTPHONE' ? tabOfProducts.push(element) : null;
      });
    } else if (featureClicked === true) {
      productsToShow.map(element => {
        element?.Category?.name?.fr !== 'SMARTPHONE' ? tabOfProducts.push(element) : null;
      });
    } else if (accessoriesClicked === true) {
      productsToShow.map(element => {
        element?.Category?.name?.fr !== 'SMARTPHONE' ? tabOfProducts.push(element) : null;
      });
    }
    setProductsFiltred(tabOfProducts);
  }, [smartphoneClicked, featureClicked, accessoriesClicked, productsToShow]);

  useEffect(() => {
    let tabOfProducts = [];
    if (smartphoneClicked === true) {
      productsToShow.map(element => {
        element?.Category?.name?.fr === 'SMARTPHONE' ? tabOfProducts.push(element) : null;
      });
    } else if (featureClicked === true) {
      productsToShow.map(element => {
        element?.Category?.name?.fr !== 'SMARTPHONE' ? tabOfProducts.push(element) : null;
      });
    } else if (accessoriesClicked === true) {
      productsToShow.map(element => {
        element?.Category?.name?.fr !== 'SMARTPHONE' ? tabOfProducts.push(element) : null;
      });
    }

    setProductsFiltred(tabOfProducts);
  }, []);

  const removeBrandProducts = () => {
    setBrandId(null);
    setActiveBrand(null);
    /*  setRemoveBrandFlag(true);
    if (bestProducts) {
      setProductsData(bestProducts);
    } else {
      getProducts(criteria);
    }*/
  };
  const setBrandToReminder = async brandId => {
    let myArrayofBrands = [];
    try {
      const value = await AsyncStorage.getItem('brandIdForReminder');
      if (value !== null) {
        myArrayofBrands = JSON.parse(value);
        if (!myArrayofBrands.includes(brandId)) {
          myArrayofBrands.push(brandId);
        }
        await AsyncStorage.setItem('brandIdForReminder', JSON.stringify(myArrayofBrands));
      } else {
        await AsyncStorage.setItem('brandIdForReminder', JSON.stringify([brandId]));
      }
    } catch (e) {
      console.log('AsyncStorage', e);
    }
  };
  function isNumber(variable) {
    return !isNaN(variable);
  }
  const brandClickedSegment = (item, index) => {
    getToken().then(value => {
      if (value) {
        var code = JSON.parse(value).code;
        analytics.track('Brand Clicked', {
          userId: code,
          brand_id: item.id,
          created_at: item.createdAt,
          brand: item.name.fr,
          position: index,
        });

        analytics.track('Product List Filtered', {
          list_id: '',
          filters: [
            {
              type: 'capacity',
              value: filters.capacity,
            },
            {
              type: 'range',
              value: filters.multiSliderValue,
            },
            {
              type: 'Ram',
              value: filters.ram,
            },
          ],
          sorts: [
            {
              type: 'sort',
              value: filters.sort,
            },
          ],
          brand: [
            {
              type: 'brand',
              brand_id: item.id,
              name: item.name.fr,
              position: index,
            },
          ],
          products: productsToShow?.map((element, index) => {
            return {
              product_id: element?.id,
              sku: element?.code,
              name: element?.designation,
              price: element?.price,
              position: index,
              category: element?.Category?.name?.fr,
              url: '',
              image_url: element?.images.main.m,
              brand: element?.Brand?.name?.fr,
            };
          }),
        });
      }
    });
  };
  useEffect(() => {
    //    console.log('filters---------------------------',filters);
    const unitRegex = /gb|g/gi;
    const filteredProducts = props?.catalog?.products.filter(product => {
      //console.log(product);
      let productCapacity = product.Capacite
        ? isNumber(product.Capacite)
          ? product.Capacite
          : product.Capacite?.replace(unitRegex, '')
        : 0;
      let productRAM = product.ram ? (isNumber(product.ram) ? product.ram : product.ram?.replace(unitRegex, '')) : 0;
      return (
        (!brandId || product.BrandId == brandId) &&
        (product.price >= multiSliderValue[0] && product.price <= multiSliderValue[1]) &&
        (capacity?.length == 0 ||
          (productCapacity == capacity && capacity != 256) ||
          (productCapacity >= capacity && capacity == 256)) &&
        (ram?.length == 0 || (productRAM == ram && ram != 16) || (productRAM >= ram && ram == 16))
      );
    });
    const searchedProducts = searchProducts(filteredProducts, search);
    const sortedProducts = sortProducts(searchedProducts, sort);
    setProductsToShow(sortedProducts);
    if (
      (filters.multiSliderValue !== '[0, 15000]' ||
        filters.capacity !== '' ||
        filters.ram !== '' ||
        filters.sort !== '') &&
      visible === true
    ) {
      productListFilteredSegement(filters, sortedProducts);
    }
  }, [filters]);

  useEffect(() => {
    setFilterCount(
      [
        multiSliderValue.join() !== multiSliderInitialValue.join(),
        sort?.length !== 0,
        ram?.length !== 0,
        capacity?.length !== 0,
      ].filter(isFiltered => isFiltered)?.length,
    );
    setFilters({ multiSliderValue, capacity, ram, sort, brandId, search });
  }, [multiSliderValue, capacity, ram, sort, brandId, search]);

  const searchSegement = () => {
    analytics.track('Products Searched', {
      query: search,
    });
  };

  const productListFilteredSegement = (filters, products) => {
    analytics.track('Product List Filtered', {
      list_id: '',
      filters: [
        {
          type: 'capacity',
          value: filters.capacity,
        },
        {
          type: 'range',
          value: filters.multiSliderValue,
        },
        {
          type: 'Ram',
          value: filters.ram,
        },
      ],
      sorts: [
        {
          type: 'sort',
          value: filters.sort,
        },
      ],
      products: products?.map((element, index) => {
        return {
          product_id: element?.id,
          sku: element?.code,
          name: element?.designation,
          price: element?.price,
          position: index,
          category: element?.Category?.name?.fr,
          url: '',
          image_url: element?.images.main.m,
          brand: element?.Brand?.name?.fr,
        };
      }),
    });
  };
  return (
    <>
      <View style={styles.mainTopView}>
        <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

        <Header
          lang={language}
          placeholder={props.intl.formatMessage({ id: 'app.containers.Catalogue.searchBar' })}
          onChangeText={text => {
            updateSearch(text);
          }}
          onBlur={() => {
            searchSegement();
          }}
          value={search}
          hasBack={true}
          hasFilter={true}
          hasNotifications={false}
          goToNotifications={() => props.navigation.navigate('Notifications')}
          goBack={() => navigation.goBack()}
          toggleFilter={toggleOverlay}
          filterCount={filterCount}
        />

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: Spacing.SCALE_20,
            marginBottom: Spacing.SCALE_20,
            // backgroundColor: 'pink',
          }}>
          <TouchableOpacity
            onPress={() => {
              setSmartphoneClicked(true);
              setFeatureClicked(false);
              setAccessoriesClicked(false);
            }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{}}>
                <Text style={smartphoneClicked === true ? styles.selectedText : styles.disabledText}>
                  {props.intl.formatMessage({ id: 'app.containers.Catalogue.Smartphone' })}
                </Text>
              </View>

              {smartphoneClicked === true && <View style={styles.LineActive} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSmartphoneClicked(false);
              setFeatureClicked(true);
              setAccessoriesClicked(false);
            }}>
            <View style={{}}>
              <Text style={featureClicked === true ? styles.selectedText : styles.disabledText}>
                {props.intl.formatMessage({ id: 'app.containers.Catalogue.Feature' })}
              </Text>
            </View>

            {featureClicked === true && <View style={styles.LineActive} />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSmartphoneClicked(false);
              setFeatureClicked(false);
              setAccessoriesClicked(true);
            }}>
            <View style={{}}>
              <Text style={accessoriesClicked === true ? styles.selectedText : styles.disabledText}>
                {props.intl.formatMessage({ id: 'app.containers.Catalogue.Accessories' })}
              </Text>
            </View>

            {accessoriesClicked === true && <View style={styles.LineActive} />}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainView}>
        <View
          style={{
            borderBottomColor: '#e4e8ef',
            borderBottomWidth: 1,
            marginBottom: 10,
            //  marginTop: 10,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={props.brands}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <BrandElement
                id={item?.id}
                onPress={() => {
                  //   getProductsBrand(item.id);
                  setBrandId(item.id);
                  setActiveBrand(index);
                  brandClickedSegment(item, index);
                }}
                image={item.images && item?.images?.png}
                isActive={activeBrand === index}
                onRemove={removeBrandProducts}
              />
            )}
            keyExtractor={item => item?.id_brand}
          />
          <View
            style={{
              borderBottomColor: '#e4e8ef',
              borderBottomWidth: 1,
              marginBottom: Spacing.SCALE_10,
              marginTop: Spacing.SCALE_10,
            }}
          />
          <FlatList
            data={productsFiltred}
            numColumns="2"
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Product
                boxShadow
                key={item?.id_product}
                designation={item?.designation}
                oldPrice={item?.oldPrice}
                price={item?.price}
                imageURL={item?.images && item?.images?.main && item?.images?.main?.m}
                score={pointsCalculator(item?.price, item?.generosity)}
                onPress={() => props.navigation.navigate('Product', { product: item })}
              />
            )}
          />

          {productsToShow?.length === 0 && productsFiltred?.length === 0 && search === '' && filterCount === 0 && (
            <View
              style={{
                alignItems: 'center',
                marginTop: '20%',
                justifyContent: 'center',
              }}>
              <Image source={produit} style={{ width: Spacing.SCALE_80, height: Spacing.SCALE_80 }} />
              <View style={{ textAlign: 'center', alignSelf: 'center' }}>
                <Text
                  style={{
                    color: '#5a6880',
                    fontSize: Typography.FONT_SIZE_24,
                    fontFamily: Typography.FONT_FAMILY_MEDIUM,
                    width: Dimensions.get('window').width / 1.2,
                    textAlign: 'center',
                  }}>
                  {props.intl.formatMessage({ id: 'app.containers.Catalogue.notAvailable' })}
                </Text>
              </View>

              <Text
                style={{
                  color: '#5a6880',
                  fontSize: Typography.FONT_SIZE_16,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  textAlign: 'center',
                  width: 280,
                  marginTop: 10,
                }}>
                {props.intl.formatMessage({ id: 'app.containers.Catalogue.setReminder' })}
              </Text>

              {selectedReminder ? (
                <>
                  <TouchableOpacity
                    style={{
                      width: Spacing.SCALE_288,
                      height: Spacing.SCALE_56,
                      borderRadius: Spacing.SCALE_20,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      marginTop: 30,
                      borderColor: '#43b11b',
                      borderWidth: 1.6,
                      borderBottomWidth: 1.6,
                      marginBottom: Spacing.SCALE_30,
                      shadowColor: '#43b11b',
                      shadowOffset: { height: 1, width: 1 },
                      shadowOpacity: 1,
                      shadowRadius: 1,
                      elevation: 6,
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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

                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#7a879d',
                          fontFamily: Typography.FONT_FAMILY_REGULAR,
                          fontSize: Typography.FONT_SIZE_16,
                          marginTop: 4,
                          marginLeft: 4,
                        }}>
                        {props.intl.formatMessage({ id: 'app.containers.Catalogue.reminderIsSet' })}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={{
                      width: Spacing.SCALE_288,
                      height: Spacing.SCALE_56,
                      borderRadius: Spacing.SCALE_20,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      marginTop: Spacing.SCALE_30,
                      marginBottom: Spacing.SCALE_30,
                    }}
                    onPress={() => {
                      setSelectedReminder(true);
                      setBrandToReminder(brandId);
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                      <Icon name="notifications" type="Ionicons" color={'#7a879d'} style={{ marginTop: 4 }} />
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#7a879d',
                          fontFamily: Typography.FONT_FAMILY_REGULAR,
                          fontSize: Typography.FONT_SIZE_16,
                          marginTop: 4,
                          marginLeft: 4,
                        }}>
                        {props.intl.formatMessage({ id: 'app.containers.Catalogue.reminder' })}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}

          {search?.length !== 0 && productsFiltred?.length === 0 && (
            <EmptyState
              style={{ alignItems: 'center', marginTop: '40%' }}
              noResults={props.intl.formatMessage({ id: 'app.containers.GiftsContainer.noResults' })}
              forCount={props.intl.formatMessage({ id: 'app.containers.GiftsContainer.for' })}
              search={search}
            />
          )}

          {search === '' && productsFiltred?.length === 0 && productsToShow?.length !== 0 && (
            <EmptyState
              style={{ alignItems: 'center', marginTop: '30%' }}
              noResults={props.intl.formatMessage({ id: 'app.containers.GiftsContainer.noResults' })}
              forCount={''}
            />
          )}

          <Filter
            lang={language}
            visible={visible}
            toggleOverlay={toggleOverlay}
            multiSliderValue={multiSliderValue}
            multiSliderValuesChange={multiSliderValuesChange}
            // onValuesChangeFinish={onValuesChangeFinish}
            // filterCount={count}
            // setFilterCount={setFilterCount}
            setMultiSliderValue={setMultiSliderValue}
            setCapacity={setCapacity}
            setRam={setRam}
            setSort={setSort}
          />
        </ScrollView>
        {props.isLoading && <Loader />}
      </View>
    </>
  );
}

Catalog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  catalog: makeSelectCatalog(),
  brands: makeSelectBrands(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProducts: criteria => {
      dispatch(getProducts(criteria));
    },
    setFilter: data => {
      dispatch(setFilterCriteria(data));
    },
    getBrands: () => {
      dispatch(getBrandsData());
    },
    getProductsBrand: id => {
      dispatch(getProductsByBrand(id));
    },
    setProductsData: data => {
      dispatch(setProducts(data));
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
)(injectIntl(Catalog));
