/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * Catalog
 *
 */

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
} from 'react-native';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import BrandElement from '../../components/AllBrandElement';

import { Mixins, Spacing, Typography } from '../../styles';
import { getToken } from '../../utils/MainMethods';
import { makeSelectLoading } from '../Login/selectors';
import { getBrandsData } from './actions';

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
    // marginBottom: -10,
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
    marginRight: Spacing.SCALE_10,
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
    marginLeft: Spacing.SCALE_5,
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
});

export function Catalog(props) {
  // useInjectReducer({ key: 'catalog', reducer });
  // useInjectSaga({ key: 'catalog', saga });

  const [search, setSearch] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [filterCount, setFilterCount] = React.useState(0);

  const [smartphoneClicked, setSmartphoneClicked] = React.useState(true);
  const [featureClicked, setFeatureClicked] = React.useState(false);
  const [accessoriesClicked, setAccessoriesClicked] = React.useState(false);

  const language = useSelector(state => state?.login?.myLang);
  const { Brands } = props?.route?.params;
  const [listOfBrands, setListOfBrands] = React.useState([]);

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
    setListOfBrands(Brands);
    brandPageEvent();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  function updateSearch(text) {
    setSearch(text);
  }

  useEffect(() => {
    let tabResults = [];
    if (search.length !== 0 && search.length > 2) {
      props?.route?.params?.Brands.map(element => {
        element?.name?.fr.toUpperCase().includes(search.toUpperCase()) ? tabResults.push(element) : null;
      });
    } else if (search.length === 0) {
      props?.route?.params?.Brands.map(element => {
        tabResults.push(element);
      });
    }
    setListOfBrands(tabResults);
  }, [search]);

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
          value={search}
          hasBack={true}
          hasFilter={false}
          hasNotifications={false}
          goToNotifications={() => props.navigation.navigate('Notifications')}
          // goBack={() => props.navigation.navigate('Home')}
          goBack={() => props.navigation.goBack()}
          toggleFilter={toggleOverlay}
          filterCount={filterCount}
        />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: Spacing.SCALE_20,
            //  marginBottom: Spacing.SCALE_20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setSmartphoneClicked(true);
              setFeatureClicked(false);
              setAccessoriesClicked(false);
            }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={smartphoneClicked === true ? styles.selectedText : styles.disabledText}>
                {' '}
                {props.intl.formatMessage({ id: 'app.containers.Catalogue.Smartphone' })}
              </Text>
              {smartphoneClicked === true && <View style={styles.LineActive} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSmartphoneClicked(false);
              setFeatureClicked(true);
              setAccessoriesClicked(false);
            }}>
            <Text style={featureClicked === true ? styles.selectedText : styles.disabledText}>
              {props.intl.formatMessage({ id: 'app.containers.Catalogue.Feature' })}
            </Text>
            {featureClicked === true && <View style={styles.LineActive} />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSmartphoneClicked(false);
              setFeatureClicked(false);
              setAccessoriesClicked(true);
            }}>
            <Text style={accessoriesClicked === true ? styles.selectedText : styles.disabledText}>
              {props.intl.formatMessage({ id: 'app.containers.Catalogue.Accessories' })}
            </Text>
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
            //marginTop: 10,
          }}
        />
        <View>
          <Text
            style={{
              color: '#7a879d',
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: Typography.FONT_SIZE_20,
              marginHorizontal: Spacing.SCALE_20,
              marginVertical: Spacing.SCALE_10,
            }}>
            Brands
          </Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FlatList
            data={listOfBrands}
            // horizontal
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <BrandElement
                id={item?.id}
                onPress={() => {
                  props.navigation.navigate('Catalog', {
                    brandId: item.id,
                    fromBrand: true,
                    index,
                    filterSelected:
                      smartphoneClicked === true
                        ? 'smartphone'
                        : featureClicked === true
                        ? 'feature'
                        : accessoriesClicked === true
                        ? 'accessories'
                        : null,
                  });
                  //  brandEventClickSegment(item);
                }}
                image={item?.images?.png}
              />
            )}
            keyExtractor={item => item?.id_brand}
          />
        </View>
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
  // catalog: makeSelectCatalog(),
  // brands: makeSelectBrands(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBrands: () => {
      dispatch(getBrandsData());
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
