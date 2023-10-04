/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useEffect, useRef /*, { memo, useEffect }*/ } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../../utils/RootNavigation';
import Messages from '../../components/Messages';
import { AppState } from 'react-native';
import { getTokenForSplash } from '../../utils/MainMethods';
import { TOKEN_TIMEOUT } from '../../utils/constants';

import Profile from '../ProfileContainer';
import Account from '../Account';
import FAQ from '../FAQ';
import HowToUse from '../HowToUse';
import ChangePassword from '../ChangePassword';
import ForgotPassword from '../ForgotPassword';
import CheckPassword from '../CheckPassword';
import NewPassword from '../NewPassword';
import PersonalInformation from '../PersonalInformation';
import TermsOfService from '../TermsOfService';
import PrivacyPolicy from '../PrivacyPolicy';
import TabContainer from '../TabContainer';
import Login from '../Login';
import Home from '../HomeContainer';
import GiftContainer from '../GiftsContainer';
import Catalog from '../Catalog';
import Product from '../ProductDetails';
import Cart from '../ProductCart';
import Gifts from '../Gifts';
import GiftDetails from '../GiftDetails';
import GiftCart from '../GiftCart';
import ProductSummary from '../ProductSummary';
import OrderValidated from '../OrderValidated';
import GiftSummary from '../GiftSummary';
import OrdersHistory from '../OrdersHistory';
import Notifications from '../Notifications';
import OrderTracking from '../OrderTracking';
import OrderTrackingFromHistory from '../OrderTrackingFromHistory';
import MoreInformation from '../MoreInformation';
import VideoPage from '../Video';
import Subscribe from '../Subscribe';
import linking from '../../linking';
import Brands from '../Brands';
import Langue from '../Langue';
import ReferFriends from '../ReferFriends';
import OnBoarding from '../OnBoarding';
import OrderTrackingPreorder from '../OrderTrackingPreorder';

const Stack = createStackNavigator();
/*
async function request() {
  const userdata = await getToken();
      let source = Axios.CancelToken.source();
  setTimeout(() =>  timeout(source), 10000);

  let result =  await Axios.request({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer-${userdata.token}`,
      },
      url: path + `/customers/${userdata.id_customer}/me`,
      cancelToken: source.token,
    });
    console.log("*****************************************************************",result?.data);
}
*/
function RootStack(props) {
  /*
  const [navigating, setNavigating] = React.useState(false);
  useEffect(() => {
    if(navigating) {
      //console.log("**********************************************************************");
      //props?.getAccessState();
      
      request() ;
      setNavigating(false);
    }
  }, [navigating]);
*/
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async nextAppState => {
    const date = new Date();

    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      getTokenForSplash().then(value => {
        if (value) {
          const token = JSON.parse(value).token;
          const expireIn = JSON.parse(value).expireIn;

          if (token && expireIn * 1000 - TOKEN_TIMEOUT < date.valueOf()) {
            navigationRef.current?.navigate('Splash');
          }
        }
      });
    }

    appState.current = nextAppState;
  };

  return (
    <Stack.Navigator
      initialRouteName={props.initialRouteName === 'OnBoarding' ? 'OnBoarding' : 'Main'}
      screenOptions={{ gestureEnabled: false }}>
      {/* <Stack.Screen
         name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="CheckPassword"
        component={CheckPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="NewPassword"
        component={NewPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="FAQ"
        component={FAQ}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="HowToUse"
        component={HowToUse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="PersonalInformation"
        component={PersonalInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="TermsOfService"
        component={TermsOfService}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        // listeners={{
        //   transitionEnd: e => {
        //     setNavigating(true);
        //   },
        // }}
        name="Main"
        component={TabContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Catalog"
        component={Catalog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Product"
        component={Product}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Gifts"
        component={Gifts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="GiftDetails"
        component={GiftDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="GiftCart"
        component={GiftCart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="ProductSummary"
        component={ProductSummary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="OrderValidated"
        component={OrderValidated}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="GiftSummary"
        component={GiftSummary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="OrdersHistory"
        component={OrdersHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="OrderTracking"
        component={OrderTracking}
        options={{ headerShown: false }}
      />
      <Stack.Screen /* listeners={{transitionEnd : e => { setNavigating(true);}}} */
        name="OrderTrackingFromHistory"
        component={OrderTrackingFromHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="MoreInformation"
        component={MoreInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="VideoPage"
        component={VideoPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Subscribe"
        component={Subscribe}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Brands"
        component={Brands}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="Langue"
        component={Langue}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="ReferFriends"
        component={ReferFriends}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        /* listeners={{transitionEnd : e => { setNavigating(true);}}} */ name="OrderTrackingPreorder"
        component={OrderTrackingPreorder}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function App(props) {
  // useInjectReducer({ key: 'app', reducer });
  // useInjectSaga({ key: 'app', saga });
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Messages />
      <RootStack {...props} />
    </NavigationContainer>
  );
}

export default App;
/*
const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    getAccessState: () => {
      dispatch(getAuthorisedAccess());
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
)(injectIntl(App));
*/
