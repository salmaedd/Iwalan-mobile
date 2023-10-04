/**
 *
 * TabContainer
 *
 */

import PropTypes from 'prop-types';
import React, { memo, useEffect, useRef, useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Alert, BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { callClient, chatWhatsAppClient } from 'utils/call';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Gift from '../../assets/cadeaux.png';
import Cart from '../../assets/cart.png';
import CartPink from '../../assets/cartPink.png';
import Close from '../../assets/close.png';
import GiftActive from '../../assets/giftPink.png';
import Phone from '../../assets/phonePink.png';
import Person from '../../assets/profil.png';
import Whatsapp from '../../assets/whatsapp-fill.png';
import Loader from '../../components/Loader';
import { Spacing, Typography } from '../../styles';
import makeSelectGiftDetails from '../GiftDetails/selectors';
import makeSelectGifts from '../Gifts/selectors';
import GiftsContainer from '../GiftsContainer';
import HomeContainer from '../HomeContainer';
import { makeSelectLoading } from '../Login/selectors';
import makeSelectProductDetails from '../ProductDetails/selectors';
import ProfileContainer from '../ProfileContainer';
import { getBrandsData, setTab } from './actions';
import { PHONE, WHATSAPP } from './constants';
import reducer from './reducer';
import saga from './saga';
import makeSelectTabContainer from './selectors';

export const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: Spacing.SCALE_180,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    position: 'relative',
    left: 0,
    overflow: 'visible',
    // backgroundColor: 'green'
  },
  container: {
    height: Spacing.SCALE_58,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  contentContainer: {
    height: Spacing.SCALE_230,
    overflow: 'visible',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  tabs: {},
  main: {
    height: '100%',
    //backgroundColor: 'red',
  },
  activeButton: {
    width: Spacing.SCALE_100,
    height: Spacing.SCALE_100,
    borderRadius: Spacing.SCALE_50,
    backgroundColor: 'rgba(251, 72, 150, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#fb4896',
    bottom: Spacing.SCALE_20,
    overflow: 'visible',
  },
  activeIconStyle: {
    color: '#fb4896',
    overflow: 'visible',
    bottom: 2,
  },
  badge: {
    width: Spacing.SCALE_30,
    height: Spacing.SCALE_30,
    borderRadius: Spacing.SCALE_15,
    backgroundColor: '#fb4896',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: Spacing.SCALE_4,
    left: Spacing.SCALE_30,
  },
  badgeText: {
    fontSize: Typography.FONT_SIZE_16,
    color: 'white',
    fontWeight: 'bold',
  },
  touchableItem: {
    overflow: 'visible',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: Spacing.SCALE_20,
    paddingHorizontal: Spacing.SCALE_10,
  },
  labelStyle: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    lineHeight: Typography.LINE_HEIGHT_12,
    color: '#7a879d',
    marginTop: Spacing.SCALE_20,
  },
  secondaryTab: {
    color: '#fb4896',
    overflow: 'visible',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButtonSecondary: {
    width: Spacing.SCALE_100,
    height: Spacing.SCALE_100,
    borderRadius: Spacing.SCALE_50,
    backgroundColor: 'rgba(251, 72, 150, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#fb4896',
    bottom: Spacing.SCALE_30,
    overflow: 'visible',
  },
  closeButtonActive: {
    width: Spacing.SCALE_60,
    height: Spacing.SCALE_60,
    borderRadius: Spacing.SCALE_50,
    backgroundColor: 'rgba(122, 135, 157, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#7a879d',
    bottom: Spacing.SCALE_30,
    overflow: 'visible',
  },
  secondaryButton: {
    width: Spacing.SCALE_80,
    height: Spacing.SCALE_80,
    borderRadius: Spacing.SCALE_50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: Spacing.SCALE_4,
    borderStyle: 'solid',
    bottom: Spacing.SCALE_30,
    textAlign: 'center',
  },
});

function TabElement({
  name,
  iconName,
  label,
  onClick,
  isFocused,
  screenName,
  productCount,
  giftCount,
  iconNameActive,
}) {
  const language = useSelector(state => state?.login?.myLang);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onClick}
      style={[
        styles.touchableItem,
        {
          width: !isFocused ? Spacing.SCALE_90 : 'auto',
          bottom: ['close', 'whatsapp', 'phone'].includes(name) ? Spacing.SCALE_20 : 0,
        },
      ]}>
      {isFocused ? (
        <View
          style={[
            screenName === 'Cart'
              ? styles.activeButton
              : name === 'close'
              ? styles.closeButtonActive
              : name !== 'Person'
              ? styles.activeButtonSecondary
              : { ...styles.activeButtonSecondary, justifyContent: 'center' },
            { marginBottom: name === 'close' ? Spacing.SCALE_12 : Spacing.SCALE_30 },
          ]}>
          {name === 'Cart' && (
            <View
              style={{
                ...styles.badge,
                left: language === 'ar' ? -Spacing.SCALE_30 : Spacing.SCALE_30,
              }}>
              <Text style={styles.badgeText}>{productCount}</Text>
            </View>
          )}
          {name === 'Gift' && (
            <View
              style={{
                ...styles.badge,
                left: language === 'ar' ? -Spacing.SCALE_30 : Spacing.SCALE_30,
              }}>
              <Text style={styles.badgeText}>{giftCount}</Text>
            </View>
          )}
          <Image
            source={!isFocused ? iconName : iconNameActive}
            style={{ width: Spacing.SCALE_30, height: Spacing.SCALE_30 }}
          />
        </View>
      ) : (
        <View
          style={
            name === 'whatsapp'
              ? { ...styles.secondaryButton, borderColor: '#00cb44' }
              : name === 'phone'
              ? { ...styles.secondaryButton, borderColor: '#fb4896' }
              : { bottom: 30, alignItems: 'center' }
          }>
          <Image
            source={iconName}
            style={{
              width: Spacing.SCALE_30,
              height: Spacing.SCALE_30,
              bottom: name === 'whatsapp' || 'phone' ? -15 : 0,
            }}
          />
          <Text style={{ ...styles.labelStyle }}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function TabContainer(props) {
  useInjectReducer({ key: 'tabContainer', reducer });
  useInjectSaga({ key: 'tabContainer', saga });
  const tabs = [
    {
      name: 'Person',
      iconName: Person,
      iconNameActive: Phone,
      label: props.intl.formatMessage({ id: 'app.containers.TabContainer.profil' }),
      screenName: 'Profile',
      component: <ProfileContainer {...props} />,
    },
    {
      name: 'Cart',
      iconName: Cart,
      iconNameActive: CartPink,
      label: props.intl.formatMessage({ id: 'app.containers.TabContainer.Products' }),
      screenName: 'Home',
      component: <HomeContainer {...props} />,
    },
    {
      name: 'Gift',
      iconName: Gift,
      iconNameActive: GiftActive,
      label: props.intl.formatMessage({ id: 'app.containers.TabContainer.gift' }),
      screenName: 'GiftsContainer',
      component: <GiftsContainer {...props} />,
    },
  ];

  const [currentTabs, setCurrentTabs] = useState(tabs);

  const [selectedTab, setSelectedTab] = useState(1);
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);

  const profileTabs = [
    {
      name: 'phone',
      iconName: Phone,
      iconNameActive: Phone,
      label: '',
      screenName: 'Profile',
      component: <ProfileContainer {...props} />,
    },
    {
      name: 'close',
      iconName: Close,
      iconNameActive: Close,
      label: '',
      screenName: 'Profile',
      component: <ProfileContainer {...props} />,
    },
    {
      name: 'whatsapp',
      iconName: Whatsapp,
      iconNameActive: Whatsapp,
      label: '',
      screenName: 'whatsapp',
      component: <ProfileContainer {...props} />,
    },
  ];

  const scrollViewRef = useRef();

  const onChangeTab = index => {
    const arr = [];

    if (selectedTab !== index) {
      if (index === 0) {
        arr[0] = currentTabs[2];
        arr[1] = currentTabs[0];
        arr[2] = currentTabs[1];
      } else if (index === 2) {
        arr[0] = currentTabs[1];
        arr[1] = currentTabs[2];
        arr[2] = currentTabs[0];
      } else {
        arr[0] = currentTabs[0];
        arr[1] = currentTabs[1];
        arr[2] = currentTabs[2];
      }
      setCurrentTabs(arr);
      // scrollViewRef.current.scrollTo({ y: 0 });
    }
  };

  useEffect(() => {
    if (isPhoneClicked) {
      setCurrentTabs(profileTabs);
    }
  }, [isPhoneClicked]);

  //const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      if (props.navigation.isFocused()) {
        Alert.alert(
          props.intl.formatMessage({ id: 'app.containers.Main.attention' }),
          props.intl.formatMessage({ id: 'app.containers.Main.leave' }),
          [
            {
              text: props.intl.formatMessage({ id: 'app.containers.Main.cancel' }),
              onPress: () => null,
              style: 'cancel',
            },
            { text: props.intl.formatMessage({ id: 'app.containers.Main.yes' }), onPress: () => BackHandler.exitApp() },
          ],
        );
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.main}>
      {/* <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} style={{ height: '100%' }}> */}
      {currentTabs[selectedTab].component}
      {/* </ScrollView> */}

      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.65)', '#ffffff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.3 }}
          style={styles.contentContainer}>
          <View style={styles.innerContainer}>
            {currentTabs.map((tab, index) => {
              const isFocused = selectedTab === index;
              const isCommunicationTab = tab.name === 'whatsapp' || tab.name === 'phone';
              const isCloseTab = tab.name === 'close';
              return (
                <View
                  style={{
                    height:
                      isFocused && !isCommunicationTab && !isCloseTab
                        ? '100%'
                        : isCommunicationTab
                        ? '75%'
                        : isCloseTab
                        ? '70%'
                        : '65%',
                  }}>
                  <TabElement
                    name={tab.name}
                    key={index}
                    screenName={tab.screenName}
                    navigation={props.navigation}
                    iconName={tab.iconName}
                    iconNameActive={tab.iconNameActive}
                    label={tab.label}
                    onClick={() => {
                      tab.name !== 'whatsapp' && tab.name !== 'phone' ? onChangeTab(index, tab.name) : -1;
                      index === 1 && tab.name === 'Person' ? setIsPhoneClicked(true) : setIsPhoneClicked(false);
                      tab.name === 'close' ? setCurrentTabs([tabs[1], tabs[0], tabs[2]]) : null;
                      tab.name === 'whatsapp' ? chatWhatsAppClient(WHATSAPP) : -1;
                      tab.name === 'phone' ? callClient(PHONE) : -1;
                      index === 1 && tab.name === 'Cart' ? props.navigation.navigate('Cart') : null;
                      index === 1 && tab.name === 'Gift' ? props.navigation.navigate('GiftCart') : null;
                    }}
                    isFocused={isFocused}
                    totalProducts={props.tabContainer.tab}
                    productCount={props.productDetails.cart?.length}
                    giftCount={props.giftDetails.cart?.length}
                  />
                </View>
              );
            })}
          </View>
        </LinearGradient>
      </View>
      {props.isLoading && <Loader />}
    </View>
  );
}

TabContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  tabContainer: makeSelectTabContainer(),
  gifts: makeSelectGifts(),
  isLoading: makeSelectLoading(),
  giftDetails: makeSelectGiftDetails(),
  productDetails: makeSelectProductDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    setTab: index => {
      dispatch(setTab(index));
    },
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
)(injectIntl(TabContainer));
