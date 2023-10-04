/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

// Import root app
import App from './containers/App';
import LanguageProvider from './containers/LanguageProvider';

import configureStore from './configureStore';
import { translationMessages } from './i18n';
import { decode, encode } from 'base-64';
import Messages from './components/Messages';
import { InitialiseApp } from './initialiser';
import SplashScreen from 'react-native-splash-screen';
import { DEFAULT_LOCALE } from './i18n';
import ReactMoE from 'react-native-moengage';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

// Create redux store with history
const initialState = {};
const store = configureStore(initialState);
import { Root } from 'native-base';
function AppRoot() {
  const [initialeRoute, setInitialeRoute] = React.useState('');
  const [routeFlag, setRouteFlag] = React.useState(false);

  useEffect(() => {
    ReactMoE.initialize();
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
  }, []);

  useEffect(() => {
    console.log('initialeRoute', initialeRoute);
    setTimeout(() => {
      setRouteFlag(true);
    }, 3000);
  }, [initialeRoute]);

  return (
    <Root>
      <Provider store={store}>
        <InitialiseApp
          setRoute={route => {
            setInitialeRoute(route);
          }}
        />
        {routeFlag && (
          <LanguageProvider locale={DEFAULT_LOCALE} key={DEFAULT_LOCALE} messages={translationMessages}>
            <App initialRouteName={initialeRoute} />
            {/* {routeFlag && <App initialRouteName={initialeRoute} />} */}
          </LanguageProvider>
        )}
      </Provider>
    </Root>
  );
}

export default AppRoot;
