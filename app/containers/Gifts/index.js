/**
 *
 * Gifts
 *
 */

import { useNavigation } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { FlatList, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import CategoryElement from '../../components/CategoryElement';
import EmptyState from '../../components/EmptyState';
import Filter from '../../components/FilterForGifts';
import GiftCard from '../../components/GiftCard';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { Spacing } from '../../styles';
import { getToken } from '../../utils/MainMethods';
import { makeSelectLoading } from '../Login/selectors';
import { getCategories, getGifts, getGiftsByCategory } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectGifts from './selectors';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#f2f4f8',
  },
  list: {
    marginHorizontal: Spacing.SCALE_10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export function Gifts(props) {
  useInjectReducer({ key: 'gifts', reducer });
  useInjectSaga({ key: 'gifts', saga });

  const [search, setSearch] = useState('');
  const [flag, setFlag] = useState(false);

  const [visible, setVisible] = useState(false);
  const [insideCategory, setInsideCategory] = useState(false);

  const [filterCount, setFilterCount] = useState(0);
  const navigation = useNavigation();

  const [category, setCategory] = useState('');

  // const [categoriesList, setCategoriesList] = useState([]);
  const [giftsList, setGiftsList] = useState([]);
  const multiSliderInitialValue = [0, 30000];
  const [multiSliderValue, setMultiSliderValue] = React.useState(multiSliderInitialValue);
  const [sort, setSort] = React.useState('');
  const [giftsListToSearch, setGiftsListToSearch] = useState([]);
  const [giftsListToSearchBrand, setGiftsListToSearchBrand] = useState([]);
  const { getUserGifts, getGiftsByCategory, getCategoriesList } = props;
  const { gifts, giftsByCategory, categories } = props.gifts;
  const { index, profile, gift, locked } = props.route.params;
  const [activeCategory, setActiveCategory] = useState(index);
  const [categoryId, setCategoryId] = React.useState(props?.route?.params?.categoryId);
  const [refreshing, setRefreshing] = React.useState(false);
  const [filters, setFilters] = React.useState({ categoryId, multiSliderValue, sort, search });

  const language = useSelector(state => state?.login?.myLang);

  //segment
  const GiftCategoryPage = async () => {
    const dataUser = await getToken();
    analytics.screen('Gift Category Page', {
      userId: JSON.parse(dataUser).code,
      categoryId: categoryId,
    });
  };

  const giftsByCategorySegment = (category, index) => {
    analytics.track('Gift by Category ', {
      brand_id: category?.id,
      created_at: category?.createdAt,
      name: category?.name?.fr,
      position: index,
      image_url: category?.image?.svg,
    });
    analytics.track('Gift List Filtered', {
      //categoryId: category?.id,
      filters: [
        {
          type: 'range',
          value: multiSliderValue,
        },
      ],
      sorts: [
        {
          type: 'sort',
          value: sort,
        },
      ],
      category: [
        {
          type: 'category',
          brand_id: category?.id,
          name: category?.name?.fr,
          position: index,
          image_url: category?.image?.svg,
        },
      ],
      gifts: giftsList?.map((element, index) => {
        return {
          giftId: element?.id,
          active: element?.active,
          position: index,
          image_url: element?.image?.png,
        };
      }),
    });
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  function updateSearch(text) {
    setSearch(text);
  }

  useEffect(() => {
    /*if (insideCategory === false) {
      if (giftsByCategory?.length !== 0 && categoryId !== null) {
        //setGiftsList(giftsByCategory && giftsByCategory);
      } else {
        //setGiftsList(props && props.gifts && props.gifts.gifts);
        setGiftsList(gift ? gift : props?.gifts?.gifts);
        //  setGiftsList(gift);
      }
    }*/
    setGiftsList(gift ?? props?.gifts?.gifts);
  }, [props]);

  function searchGifts(elements, searchString) {
    let tabToSearch = [];
    if (searchString?.length >= 3) {
      elements?.map(element => {
        element?.nameGift?.fr?.toUpperCase().includes(searchString.toUpperCase())
          ? tabToSearch.push(element)
          : JSON.stringify(element?.points).includes(searchString)
          ? tabToSearch.push(element)
          : null;
      });
      return tabToSearch;
    }
    return elements;
  }

  function sortGifts(elements, order) {
    if (order === 'Points') {
      return elements.sort((a, b) => parseFloat(a.points) - parseFloat(b.points));
    } else if (order === 'Open') {
      let tabOpenGift = [];
      elements?.map(item => {
        profile?.sumPoints > item?.points && tabOpenGift.push(item);
      });
      return tabOpenGift;
    } else if (order === 'HighPoints') {
      return elements.sort((a, b) => parseFloat(b?.points) - parseFloat(a?.points));
    } else if (order === '') {
      return elements;
    }
  }

  useEffect(() => {
    //  console.log('filters---------------------------',filters);
    const filteredGifts = gifts.filter(gift => {
      //console.log(gift);
      return (
        (!categoryId || gift.CategoryGiftId == categoryId) &&
        (gift.points >= multiSliderValue[0] && gift.points <= multiSliderValue[1])
      );
    });
    const searchedGifts = searchGifts(filteredGifts, search);
    const sortedGifts = sortGifts(searchedGifts, sort);
    setGiftsList(sortedGifts);
  }, [filters]);

  const filterGiftSegment = (multiSliderValue, sort, Id) => {
    analytics.track('Gift List Filtered', {
      categoryId: Id,
      filters: [
        {
          type: 'range',
          value: multiSliderValue,
        },
      ],
      sorts: [
        {
          type: 'sort',
          value: sort,
        },
      ],
      gifts: gifts?.map((element, index) => {
        return {
          giftId: element?.id,
          active: element?.active,
          position: index,
          image_url: element?.image?.png,
        };
      }),
    });
  };

  useEffect(() => {
    setFilterCount(
      [multiSliderValue.join() !== multiSliderInitialValue.join(), sort?.length !== 0].filter(isFiltered => isFiltered)
        ?.length,
    );
    setFilters({ multiSliderValue, sort, categoryId, search });
    filterGiftSegment(multiSliderValue, sort, categoryId);
  }, [multiSliderValue, sort, search, categoryId]);
  /*
  useEffect(() => {
    let tabToSearch = [];

    if (search?.length >= 3) {
      giftsList.map(element => {
        element?.nameGift?.fr?.toUpperCase().includes(search.toUpperCase())
          ? tabToSearch.push(element)
          : JSON.stringify(element?.points).includes(search)
          ? tabToSearch.push(element)
          : null;
      });
      setGiftsList(tabToSearch);
    } else {
      if (flag) {
        setGiftsList(giftsListToSearch);
      } else {
        setGiftsList(giftsListToSearchBrand);
      }
    }
  }, [search]);
  */
  /*
  useEffect(() => {
    if (flag === false) {
      if (multiSliderValue && sort?.length === 0) {
        setFilterCount(1);
        let tabResult = [];
        giftsByCategory.map(element => {
          if (element.points >= multiSliderValue[0] && element.points <= multiSliderValue[1]) tabResult.push(element);
        });
        setGiftsList(tabResult);
      } else if (multiSliderValue && sort) {
        let tabResult = [];

        giftsByCategory.map(element => {
          if (element.points >= multiSliderValue[0] && element.points <= multiSliderValue[1]) tabResult.push(element);
        });

        if (sort === 'Points') {
          setGiftsList(tabResult.sort((a, b) => parseFloat(a.points) - parseFloat(b.points)));
        } else if (sort === 'Open') {
          let tabOpenGift = [];
          tabResult?.map(item => {
            profile?.sumPoints > item?.points && tabOpenGift.push(item);
          });
          setGiftsList(tabOpenGift);
        } else if (sort === 'HighPoints') {
          setGiftsList(tabResult.sort((a, b) => parseFloat(b?.points) - parseFloat(a?.points)));
        } else if (sort === '') {
          setGiftsList(tabResult);
        }
      }
    } else {
      if (multiSliderValue && sort?.length === 0) {
        setFilterCount(1);
        let tabResult = [];
        props?.gifts?.gifts.map(element => {
          if (element?.points >= multiSliderValue[0] && element?.points <= multiSliderValue[1])
            tabResult?.push(element);
        });
        setGiftsList(tabResult);
      } else if (multiSliderValue && sort) {
        setFilterCount(2);
        let tabResult = [];

        props?.gifts?.gifts?.map(element => {
          if (element?.points >= multiSliderValue[0] && element?.points <= multiSliderValue[1]) tabResult.push(element);
        });

        if (sort === 'Points') {
          setGiftsList(tabResult.sort((a, b) => parseFloat(a?.points) - parseFloat(b?.points)));
        } else if (sort === 'Open') {
          let tabOpenGift = [];
          tabResult.map(item => {
            profile?.sumPoints > item?.points && tabOpenGift.push(item);
          });

          setGiftsList(tabOpenGift);
        } else if (sort === 'HighPoints') {
          setGiftsList(tabResult.sort((a, b) => parseFloat(b?.points) - parseFloat(a?.points)));
        } else if (sort === '') {
          setGiftsList(tabResult);
        }
      }
    }
  }, [sort, multiSliderValue]);
*/
  useEffect(() => {
    GiftCategoryPage();
    // Load products on component mouting
    getCategoriesList();
    getUserGifts();
    /* if (categoryId) {
      getGiftsByCategory(categoryId);
    } else {
      getUserGifts();
    }*/
  }, []);

  const getGiftsBySelectedCateg = (category, index, item) => {
    setInsideCategory(true);
    setFlag(false);
    setActiveCategory(index);
    setCategoryId(category);
    setCategory(category);
    // getGiftsByCategory(category);
    giftsByCategorySegment(item, index);
  };

  const removeCategoryGifts = async () => {
    //  await getUserGifts();
    // removeCategory();
    setFlag(true);
    setActiveCategory(null);
    setCategoryId(null);
  };
  /*  const removeCategory = () => {
    setFlag(true);
  //  setGiftsList(props && props.gifts && props?.gifts?.gifts);
  //  setGiftsListToSearch(props && props.gifts && props?.gifts?.gifts);
    setActiveCategory(null);
    setCategoryId(null);
  };*/
  /*  useEffect(() => {
   // setGiftsListToSearchBrand(giftsByCategory && giftsByCategory?.length ? giftsByCategory : gifts);
   // setGiftsList(giftsByCategory && giftsByCategory?.length ? giftsByCategory : gifts);
  }, [giftsByCategory]);
*/
  /*useEffect(() => {
    if (categoryId !== null && index !== null) {
      getGiftsBySelectedCateg(categoryId, index);
      setCategory(categoryId);
      setActiveCategory(index);
    }
  }, [categoryId, index]);*/

  const multiSliderValuesChange = values => {
    setMultiSliderValue(values);
  };
  /*
  useEffect(() => {
    setCategoriesList(categories);
  }, [categories]);*/

  useEffect(() => {
    setFilters({ ...filters });
    // console.log('test---------------------------------',props?.gifts?.gifts);
  }, [props]);

  return (
    <View style={styles.mainView}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />
      <View style={{ flex: 1 }}>
        <Header
          lang={language}
          placeholder={props.intl.formatMessage({ id: 'app.containers.GiftsContainer.searchBar' })}
          onChangeText={text => updateSearch(text)}
          value={search}
          hasBack={true}
          hasFilter={true}
          hasNotification={false}
          goBack={() => props.navigation.goBack()}
          toggleFilter={toggleOverlay}
          filterCount={filterCount}
          filterLang={props.intl.formatMessage({ id: 'app.containers.GiftsContainer.filter' })}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: Spacing.SCALE_12 }}
            renderItem={({ item, index }) => (
              <CategoryElement
                id={item.id}
                selected={activeCategory === index}
                image={item?.image && item?.image?.svg}
                name={item?.name && item?.name?.fr}
                onPress={() => getGiftsBySelectedCateg(item?.id, index, item)}
                onRemove={removeCategoryGifts}
              />
            )}
            keyExtractor={item => item?.id}
          />

          <FlatList
            data={giftsList && giftsList?.length > 0 && giftsList}
            numColumns="2"
            showsVerticalScrollIndicator={false}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={() => {
            //       setRefreshing(false);
            //     }}
            //   />
            // }
            style={{ marginHorizontal: Spacing.SCALE_10 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity>
                <GiftCard
                  language={language}
                  locked={locked === false ? false : profile?.sumPoints > item?.points ? false : true}
                  key={item?.id_gift}
                  {...item}
                  onPress={() =>
                    navigation.navigate('GiftDetails', {
                      locked: profile?.sumPoints > item?.points ? false : true,
                      gift: item,
                      userPoints: profile.sumPoints,
                      avatar: profile?.image && profile?.image?.avatar,
                    })
                  }
                />
              </TouchableOpacity>
            )}
          />

          {search?.length !== 0 && giftsList?.length === 0 && (
            <EmptyState
              style={{ alignItems: 'center', marginTop: '20%' }}
              noResults={props.intl.formatMessage({ id: 'app.containers.GiftsContainer.noResults' })}
              forCount={props.intl.formatMessage({ id: 'app.containers.GiftsContainer.for' })}
              search={search}
            />
          )}
        </ScrollView>
      </View>

      <Filter
        language={language}
        visible={visible}
        toggleOverlay={toggleOverlay}
        multiSliderValue={multiSliderValue}
        multiSliderValuesChange={multiSliderValuesChange}
        setMultiSliderValue={setMultiSliderValue}
        setSort={setSort}
      />

      {props.isLoading && <Loader />}
    </View>
  );
}

Gifts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  gifts: makeSelectGifts(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserGifts: () => {
      dispatch(getGifts());
    },
    getGiftsByCategory: id => {
      dispatch(getGiftsByCategory(id));
    },
    getCategoriesList: () => {
      dispatch(getCategories());
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
)(injectIntl(Gifts));
