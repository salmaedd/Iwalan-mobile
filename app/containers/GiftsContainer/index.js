/**
 *
 * GiftsContainer
 *
 */
import { useNavigation } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import CategoryElement from '../../components/CategoryElement';
import EmptyState from '../../components/EmptyState';
import GiftCard from '../../components/GiftCard';
import Header from '../../components/Header';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import { getToken } from '../../utils/MainMethods';
import { makeSelectLoading } from '../Login/selectors';
import { getData } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectGiftsContainer from './selectors';

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
    borderWidth: 2,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.DARK_GRAY,
    marginHorizontal: Spacing.SCALE_24,
  },
  openGifts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  more: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#24378b',
    marginRight: Spacing.SCALE_24,
  },
  openGiftsList: {
    marginHorizontal: Spacing.SCALE_10,
    marginVertical: Spacing.SCALE_20,
  },
  giftsList: {
    marginHorizontal: Spacing.SCALE_12,
    marginVertical: Spacing.SCALE_20,
    paddingBottom: Spacing.SCALE_100,
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
});

export function GiftsContainer(props) {
  useInjectReducer({ key: 'giftsContainer', reducer });
  useInjectSaga({ key: 'giftsContainer', saga });

  const [search, setSearch] = useState('');
  const [searchFlag, setSearchFlag] = useState(false);
  const [searchResult, setSearchResult] = useState(0);
  const [giftsList, setGiftsList] = useState([]);
  const [openGiftsList, setOpenGiftsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const { gifts, openGifts, banners, profile, categories } = props.gifts;

  const ref = React.createRef();
  const {
    /*getUserGifts, getUserOpenGifts, getUserLockedGifts, getSlides, getUserProfile, getCategoriesList*/ getData,
  } = props;
  const navigation = useNavigation();

  const language = useSelector(state => state?.login?.myLang);

  useEffect(() => {
    getData({ slideType: 'gifts' });
  }, [getData]);
  /*  useEffect(() => {
    GiftsListPage();
    getUserGifts();
    getUserOpenGifts();
    getUserLockedGifts();
    getSlides('gifts');
    getUserProfile();
    getCategoriesList();
  }, [getUserGifts, getUserOpenGifts, getUserLockedGifts, getSlides, getUserProfile, getCategoriesList]);
*/
  useEffect(() => {
    setGiftsList(gifts);
    setOpenGiftsList(openGifts);
    setCategoriesList(categories);
  }, [gifts, openGifts, categories]);

  useEffect(() => {
    if (banners?.rows && banners?.rows?.length !== 0) {
      giftListViewedSegement();
    }
  }, [banners]);

  useEffect(() => {
    if (openGifts?.length !== 0) {
      openGiftsListSegement();
    }
  }, [openGifts]);

  useEffect(() => {
    getToken().then(value => {
      if (value) {
        var code = JSON.parse(value).code;
        analytics.screen('Gift HomePage', {
          userId: code,
        });
      }
    });
  }, []);

  const giftListViewedSegement = () => {
    getToken().then(value => {
      if (value) {
        var code = JSON.parse(value).code;
        analytics.track('Slider Gift List', {
          userId: code,
          list_id: 'Slider Gift List',
          category: '',
          gifts: banners?.rows?.map((element, index) => {
            return {
              giftId: element?.id,
              active: element?.active,
              position: index,
              image_url: element?.image?.png,
            };
          }),
        });
      }
    });
  };

  const openGiftsListSegement = () => {
    analytics.track('Open Gift List Viewed', {
      list_id: 'Gift List',
      category: '',
      gifts: openGifts?.map((element, index) => {
        return {
          giftId: element?.id,
          name: element?.nameGift.fr,
          active: element?.active,
          points: element?.points,
          quantity: element?.quantity,
          position: index,
          category: element?.Category?.name?.fr,
          url: '',
          image_url: element?.images.main.m,
        };
      }),
    });
  };
  const giftClickedSegement = (giftClicked, index) => {
    analytics.track('gift Clicked', {
      giftId: giftClicked?.id,
      name: giftClicked?.nameGift.fr,
      active: giftClicked?.active,
      available: giftClicked?.available,
      points: giftClicked?.points,
      quantity: giftClicked?.quantity,
      position: index,
      category: giftClicked?.Category?.name?.fr,
      url: '',
      image_url: giftClicked?.images.main.m,
    });
  };

  const giftSliderClickedSegement = (sliderGifts, index) => {
    analytics.track('Slider Gifts Detail', {
      giftId: sliderGifts?.id,
      active: sliderGifts?.active,
      position: index,
      image_url: sliderGifts?.image?.png,
      order: sliderGifts?.order,
    });
  };

  const giftCategoryClickedSegment = (item, index) => {
    analytics.track('Gift Category Clicked', {
      categoryId: item?.id,
      active: item?.active,
      position: index,
      image_url: item?.image?.svg,
      name: item?.name?.fr,
    });
  };
  function updateSearch(text) {
    setSearch(text);
  }
  useEffect(() => {
    let tabGifts = [];
    let tabOpenGifts = [];
    if (search?.length !== 0) {
      setSearchFlag(true);
      giftsList?.map(element => {
        element?.nameGift?.fr && element?.nameGift?.fr.toUpperCase().includes(search.toUpperCase())
          ? tabGifts.push(element)
          : JSON.stringify(element?.points).includes(search)
          ? tabGifts.push(element)
          : element?.Category?.name?.fr && element?.Category?.name?.fr.toUpperCase().includes(search.toUpperCase())
          ? tabGifts.push(element)
          : null;
      });
      setGiftsList(tabGifts);

      openGiftsList?.map(element => {
        element?.nameGift?.fr && element?.nameGift?.fr.toUpperCase().includes(search.toUpperCase())
          ? tabOpenGifts.push(element)
          : JSON.stringify(element?.points).includes(search)
          ? tabOpenGifts.push(element)
          : element?.Category?.name?.fr && element?.Category?.name?.fr.toUpperCase().includes(search.toUpperCase())
          ? tabOpenGifts.push(element)
          : null;
      });
      setOpenGiftsList(tabOpenGifts);

      setSearchResult(tabGifts?.length + tabOpenGifts?.length);
    } else {
      setSearchFlag(false);
      setGiftsList(gifts);
      setOpenGiftsList(openGifts);
    }
  }, [search]);

  const navigateTogifts = (id, index) => {
    props.navigation.navigate('Gifts', {
      categoryId: id,
      index,
      profile,
      gift: giftsList,
    });
  };

  function renderItem({ item, index }) {
    return (
      <View style={styles.imageContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />
        <TouchableOpacity
          style={{
            flex: 1,
            height: undefined,
            width: undefined,
          }}
          onPress={() => {
            giftSliderClickedSegement(item, index);
            let element = {};
            giftsList?.map(elem => (elem.id === item?.Gift?.id ? (element = elem) : null));
            if (Object.keys(element)?.length !== 0)
              navigation.navigate('GiftDetails', {
                locked: item?.available,
                gift: element,
                userPoints: profile?.sumPoints,
                avatar: profile?.image?.avatar,
              });
            else
              navigation.navigate('Gifts', {
                categoryId: null,
                index: null,
                profile: profile,
                gift: giftsList,
                locked: true,
              });
          }}>
          <Image
            source={{ uri: item.image && item.image.png ? item.image.png.toString() : '' }}
            resizeMode="cover"
            style={{
              /* height: Spacing.SCALE_160, width: Mixins.WINDOW_WIDTH - Spacing.SCALE_60,borderRadius: 20*/

              flex: 1,
              height: undefined,
              width: undefined,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const getPagination = () => {
    return (
      <View style={{ marginTop: -Spacing.SCALE_20 }}>
        <Pagination
          dotsLength={banners && banners.rows && banners.rows?.length > 0 && banners.rows?.length}
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
      <Header
        placeholder={props.intl.formatMessage({ id: 'app.containers.GiftsContainer.searchBar' })}
        onChangeText={text => updateSearch(text)}
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
              <Text style={{ ...styles.results, marginLeft: Spacing.SCALE_15 }}>
                {searchResult} {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.results' })}
              </Text>
              <Text style={{ ...styles.showing, marginLeft: 4 }}>
                {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.showing' })}{' '}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.showing}>
                {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.showing' })}{' '}
              </Text>
              <Text style={styles.results}>
                {searchResult} {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.results' })}
              </Text>
            </>
          )}
        </View>
      )}

      {search?.length !== 0 && giftsList?.length === 0 && openGiftsList?.length === 0 && (
        <EmptyState
          style={{ alignItems: 'center', marginTop: '20%' }}
          noResults={props.intl.formatMessage({ id: 'app.containers.GiftsContainer.noResults' })}
          forCount={props.intl.formatMessage({ id: 'app.containers.GiftsContainer.for' })}
          search={search}
        />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {searchFlag === false ? (
          <Carousel
            ref={ref}
            data={banners.rows}
            renderItem={renderItem}
            sliderWidth={Mixins.WINDOW_WIDTH}
            itemWidth={Mixins.WINDOW_WIDTH - 40}
            sliderHeight={Spacing.SCALE_160}
            layout={'default'}
            onSnapToItem={index => setActiveSlide(index)}
            autoplay={true}
            autoplayInterval={5000}
            loop={true}
            inactiveSlideScale={1}
          />
        ) : null}
        {searchFlag === false ? getPagination() : null}

        {searchFlag === false ? (
          <>
            <Text style={{ ...styles.titleStyle, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
              {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.categories' })}
            </Text>
            <FlatList
              data={categoriesList.slice(0, 10)}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: Spacing.SCALE_12 }}
              renderItem={({ item, index }) => (
                <CategoryElement
                  id={item?.id}
                  image={item?.image?.svg}
                  name={item?.name?.fr}
                  onPress={() => {
                    giftCategoryClickedSegment(item, index);
                    navigateTogifts(item?.id, index);
                  }}
                  onRemove={() => setActiveCategory(null)}
                />
              )}
              keyExtractor={item => item?.id}
            />
          </>
        ) : null}

        {openGiftsList?.length !== 0 ? (
          <>
            {language === 'ar' ? (
              <View style={styles.openGifts}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Gifts', {
                      categoryId: null,
                      index: null,
                      profile: profile,
                      gift: openGiftsList,
                      locked: false,
                    })
                  }>
                  <Text style={{ ...styles.more, marginLeft: 30 }}>
                    {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.viewMore' })}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.titleStyle}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.openGifts' })}
                </Text>
              </View>
            ) : (
              <View style={styles.openGifts}>
                <Text style={styles.titleStyle}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.openGifts' })}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Gifts', {
                      categoryId: null,
                      index: null,
                      profile: profile,
                      gift: openGiftsList,
                      locked: false,
                    })
                  }>
                  <Text style={styles.more}>
                    {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.viewMore' })}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <FlatList
              data={openGiftsList}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.openGiftsList}
              renderItem={({ item, index }) => (
                <GiftCard
                  language={language}
                  key={item?.id_gift}
                  {...item}
                  onPress={() => {
                    giftClickedSegement(item, index);
                    navigation.navigate('GiftDetails', {
                      locked: profile?.sumPoints >= item?.points ? false : true,
                      gift: item,
                      userPoints: profile?.sumPoints,
                      avatar: profile?.image?.avatar,
                    });
                  }}
                />
              )}
              keyExtractor={item => item?.id_brand}
            />
          </>
        ) : null}

        {giftsList?.length !== 0 ? (
          <>
            {language === 'ar' ? (
              <View style={styles.openGifts}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Gifts', {
                      categoryId: null,
                      index: null,
                      profile: profile,
                      gift: giftsList,
                      locked: true,
                    });
                  }}>
                  <Text style={{ ...styles.more, marginLeft: 30 }}>
                    {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.viewMore' })}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.titleStyle}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.giftsForYou' })}
                </Text>
              </View>
            ) : (
              <View style={styles.openGifts}>
                <Text style={styles.titleStyle}>
                  {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.giftsForYou' })}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Gifts', {
                      categoryId: null,
                      index: null,
                      profile: profile,
                      gift: giftsList,
                      locked: true,
                    });
                  }}>
                  <Text style={styles.more}>
                    {props.intl.formatMessage({ id: 'app.containers.GiftsContainer.viewMore' })}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.giftsList}>
              <FlatList
                data={giftsList}
                numColumns="2"
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <GiftCard
                    language={language}
                    key={item?.id_gift}
                    locked={profile?.sumPoints >= item?.points ? false : true}
                    {...item}
                    onPress={() => {
                      giftClickedSegement(item, index);
                      navigation.navigate('GiftDetails', {
                        locked: profile?.sumPoints >= item?.points ? false : true,
                        gift: item,
                        userPoints: profile?.sumPoints,
                        avatar: profile?.image?.avatar,
                      });
                    }}
                  />
                )}
              />
            </View>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

GiftsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  gifts: makeSelectGiftsContainer(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getData: params => {
      dispatch(getData(params));
    },
    /*getUserGifts: () => {
      dispatch(getGifts());
    },
    getUserOpenGifts: () => {
      dispatch(getOpenGifts());
    },
    getUserLockedGifts: () => {
      dispatch(getLockedGifts());
    },
    getSlides: type => {
      dispatch(getGiftSlides(type));
    },
    getUserProfile: () => {
      dispatch(getProfile());
    },
    getCategoriesList: () => {
      dispatch(getCategories());
    },*/
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
)(injectIntl(GiftsContainer));
