/**
 *
 * Splash
 *
 */

import React, { memo, useEffect } from 'react';
import { Alert, BackHandler, Platform } from 'react-native';
import { injectIntl, intlShape } from 'react-intl';
import { getTokenForSplash, setToken, getInfoLogin } from './utils/MainMethods';
import { TOKEN_TIMEOUT } from './utils/constants';
import { path } from './utils/apiPath';
import { segment_setup } from './utils/segment';
import { connect } from 'react-redux';
import { setMyLanguage } from './containers/Login/actions';
import { NativeModules } from 'react-native';
import { createStructuredSelector } from 'reselect';
import makeSelectLogin from './containers/Login/selectors';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './containers/Login/reducer';
import saga from './containers/Login/saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function InitialiseApp(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const [appLanguage, setAppLanguage] = React.useState('');

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
      setMyLanguage(appLanguage);
    } else if (appLanguage === null) {
      if (Platform.OS === 'ios') {
        // iOS:
        const locale =
          NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]; // "fr_FR"
        setMyLanguage(locale.slice(0, 2) === 'ar' ? 'ar' : 'fr');
      } else {
        // Android:
        const locale = NativeModules.I18nManager.localeIdentifier;
        setMyLanguage(locale.slice(0, 2) === 'ar' ? 'ar' : 'fr');
      }
    }
  }, [appLanguage]);

  segment_setup();
  const getResp = () => {
    setTimeout(() => {
      getTokenForSplash()
        .then(value => {
          if (value) {
            const token = JSON.parse(value).token;
            const expireIn = JSON.parse(value).expireIn;
            let date = new Date();
            if (token && expireIn * 1000 - TOKEN_TIMEOUT > date.valueOf()) {
              props.setRoute('Main');
              //  props.navigation.replace('Main');
            } else {
              getInfoLogin()
                .then(value => {
                  if (value) {
                    var username = JSON.parse(value).username;
                    var password = JSON.parse(value).password;
                    let base64 = require('base-64');
                    fetch(path + '/customers/login/', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Basic ' + base64.encode(username + ':' + password),
                      },
                    })
                      .then(response => response.json())
                      .then(data => {
                        if (data.success) {
                          setToken(data.data);
                          props.setRoute('Main');
                          // props.navigation.replace('Main');
                        } else {
                          props.setRoute('OnBoarding');
                          // props.navigation.navigate('Login');
                        }
                      })
                      .catch(error => {
                        //  console.error(error);
                        const network_error = !error.status;
                        if (network_error) {
                          //   console.log('in!');
                          /* addMsg(
                            "Merci de se connecter à Internet.",
                            'danger',
                          );*/
                          Alert.alert(
                            'Erreur de connexion',
                            "Merci de se connecter à Internet et rafraîchir l'application",
                            [
                              {
                                text: 'Cancel',
                                onPress: () => null,
                                style: 'cancel',
                              },
                              { text: 'Ok', onPress: () => BackHandler.exitApp() }, // app exit!
                            ],
                          );
                        }
                      });
                  } else {
                    props.setRoute('OnBoarding');
                    // props.navigation.navigate('Login');
                  }
                })
                .catch(err => /* console.log(err)*/ {});
            }
          } else {
            props.setRoute('OnBoarding');
            //props.navigation.navigate('Login');
          }
        })
        .catch(err => /*console.log(err)*/ {});
    }, 3000);
  };

  useEffect(() => {
    getAppLanguage();
    getResp();
  }, []);

  return null;
  // <View style={styles.main}>
  //   <StatusBar barStyle="light-content" backgroundColor="#f2f4f8" />
  //   {/* <StatusBar hidden /> */}
  //   <View style={styles.bg}>
  //     <ImageBackground source={require('../../assets/background-pattern.png')} style={styles.backgroundImage} />
  //   </View>
  //   <View style={styles.logoContainer}>
  //     <Logo height={Spacing.SCALE_154} width={Spacing.SCALE_154} />
  //   </View>
  // </View>
}

InitialiseApp.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(injectIntl(InitialiseApp));
