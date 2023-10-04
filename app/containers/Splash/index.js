/**
 *
 * Splash
 *
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, ImageBackground, StatusBar, Alert, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Logo from '../../assets/svg/logo';
import { getTokenForSplash, setToken, getInfoLogin } from '../../utils/MainMethods';
import { TOKEN_TIMEOUT } from '../../utils/constants';
import { Colors, Spacing, Typography, Mixins } from '../../styles';
import { path } from '../../utils/apiPath';
import { addMsg } from '../message/actions';
import { segment_setup } from '../../utils/segment';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: Mixins.WINDOW_HEIGHT,
    backgroundColor: '#e4e8ef',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    flexDirection: 'column',
  },
  bg: {
    position: 'absolute',
    backgroundColor: '#f2f4f8',
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Mixins.WINDOW_HEIGHT,
    width: Mixins.WINDOW_WIDTH,
  },
  logoContainer: {
    height: Mixins.WINDOW_HEIGHT,
    width: Mixins.WINDOW_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function Splash(props) {
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
              props.navigation.replace('Main');
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
                          props.navigation.replace('Main');
                        } else {
                          props.navigation.navigate('Login');
                        }
                      })
                      .catch(error => {
                        //  console.error(error);
                        const network_error = !error.status;
                        if (network_error) {
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
                    props.navigation.navigate('Login');
                  }
                })
                .catch(err => /* console.log(err)*/ {});
            }
          } else {
            props.navigation.navigate('Login');
          }
        })
        .catch(err => /*console.log(err)*/ {});
    }, 3000);
  };

  useEffect(() => {
    getResp();
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar barStyle="light-content" backgroundColor="#f2f4f8" />
      {/* <StatusBar hidden /> */}
      <View style={styles.bg}>
        <ImageBackground source={require('../../assets/background-pattern.png')} style={styles.backgroundImage} />
      </View>
      <View style={styles.logoContainer}>
        <Logo height={Spacing.SCALE_154} width={Spacing.SCALE_154} />
      </View>
    </View>
  );
}

Splash.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

export default injectIntl(Splash);
