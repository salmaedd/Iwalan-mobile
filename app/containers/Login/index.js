/**
 *
 * Login
 *
 */

import analytics from '@segment/analytics-react-native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View, Platform } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as Yup from 'yup';
import Iwalane from '../../assets/svg/iwalane';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import PasswordInput from '../../components/PasswordInput';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import { addMsg } from '../message/actions';
import { forgotPassword, loginUser, setMyLanguage } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectLogin from './selectors';
import { changeLocale } from './../../containers/LanguageProvider/actions';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: Mixins.WINDOW_HEIGHT,
    backgroundColor: Colors.BACK_GRAY,
    paddingTop: Platform.OS === 'ios' ? Spacing.SCALE_40 : Spacing.SCALE_10,
  },
  bg: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.1,
    width: Mixins.WINDOW_WIDTH,
    height: Mixins.WINDOW_HEIGHT,
  },
  formWrapper: {
    paddingHorizontal: Spacing.SCALE_28,
    alignContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    marginVertical: Spacing.SCALE_40,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.DARK_GRAY,
  },
  iwaText: {
    fontSize: Typography.FONT_SIZE_24,
    fontWeight: 'bold',
    color: Colors.PINK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  input: {
    width: '100%',
    height: Spacing.SCALE_56,
    borderColor: Colors.BACK_GRAY,
    borderStyle: 'solid',
    backgroundColor: Colors.BACK_GRAY,
    borderWidth: 1,
    borderRadius: Spacing.SCALE_20,
    color: '#24378B',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  passInput: {
    width: '80%',
    backgroundColor: Colors.BACK_GRAY,
    borderRadius: Spacing.SCALE_20,
    color: '#24378B',
    paddingHorizontal: Spacing.SCALE_20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  passSection: {
    width: '100%',
    height: Spacing.SCALE_56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.BACK_GRAY,
    borderStyle: 'solid',
    backgroundColor: Colors.BACK_GRAY,
    borderRadius: Spacing.SCALE_20,
    marginVertical: Spacing.SCALE_8,
  },
  forgotSyle: {
    color: '#465c81',
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  bottomStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: Spacing.SCALE_28,
    marginTop: Spacing.SCALE_50,
  },
  buttonStyle: {
    position: 'relative',
    borderRadius: Spacing.SCALE_20,
    height: Spacing.SCALE_56,
    backgroundColor: Colors.PINK,
    marginTop: Spacing.SCALE_8,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: 'bold',
  },
  orStyle: {
    marginVertical: Spacing.SCALE_15,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DARK_GRAY,
    textAlign: 'center',
  },
  outlineStyle: {
    position: 'relative',
    borderRadius: Spacing.SCALE_20,
    height: Spacing.SCALE_56,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.PINK,
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: Colors.PINK,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  errorStyle: {
    padding: Spacing.SCALE_10,
    color: Colors.DARK_GRAY,
    textAlign: 'center',
  },
  mark: {
    textAlign: 'center',
    width: Spacing.SCALE_20,
    height: Spacing.SCALE_20,
    borderRadius: Spacing.SCALE_10,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  overlay: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.SCALE_80,
  },
  info: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.DARK_GRAY,
    marginBottom: Spacing.SCALE_12,
    textAlign: 'left',
  },
});

export function Login(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const [secure, setSecure] = React.useState(props.secure);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [inputError, setInputError] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [errorsVisible, setErrorsVisible] = React.useState(false);
  const [appLanguage, setAppLanguage] = React.useState('');

  const { changeLoc } = props;
  const toggleOverlay = () => {
    setVisible(!visible);
  };

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

  const onChangeText = (value, type) => {
    if (type === 'user') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  function handleLogin() {
    const errLoginFaildText = props.intl.formatMessage({ id: 'app.containers.Login.messageLoginFeild' });
    if (!username || !password) {
      const errText = props.intl.formatMessage({ id: 'app.containers.Login.messageErrLoginPassword' });
      // setInputError(errText);
      // setVisible(true);
      props.toastMsg(errText, 'danger');
    } else {
      props.loginUser(username, password, errLoginFaildText);
    }
  }
  function handleForgotPassword() {
    // props.forgotPassword();
    props.navigation.navigate('ForgotPassword');
  }

  function handleMoreInfo() {
    //todo: to be removed later
    props.navigation.navigate('MoreInformation');
  }

  useEffect(() => {
    setVisible(props.login.loginFail);
  }, [props.login.loginFail]);

  const loginEvents = () => {
    analytics.screen('Home Page', {
      userId: username ? username : '',
    });
  };

  useEffect(() => {
    loginEvents();
  }, [username]);

  useEffect(() => {
    getAppLanguage();
  }, []);
  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />
      <View style={styles.bg}>
        <ImageBackground source={require('../../assets/background-pattern.png')} style={styles.backgroundImage} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .required(props.intl.formatMessage({ id: 'app.containers.Login.required' }))
              .matches(
                /^(0(6|7)[0-9]{8})|(CLT[0-9]+)$/i,
                props.intl.formatMessage({ id: 'app.containers.Login.correctLogin' }),
              ),
            password: Yup.string().required(props.intl.formatMessage({ id: 'app.containers.Login.required' })),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            handleLogin();
          }}>
          {({ values, handleChange, errors, handleSubmit }) => (
            <>
              <View style={{ height: '60%' }}>
                <Overlay isVisible={visible} wrapperStyle={styles.overlay} onBackdropPress={toggleOverlay}>
                  <>
                    <View style={styles.mark}>
                      <Text style={{ color: '#f2f4f8' }}>!</Text>
                    </View>
                    <Text style={styles.errorStyle}>
                      {props.login.loginFail
                        ? props.intl.formatMessage({ id: 'app.containers.Login.messageLoginFeild' })
                        : inputError}
                    </Text>
                  </>
                </Overlay>
                <View style={styles.headerWrapper}>
                  <Iwalane height={Spacing.SCALE_94} width={Spacing.SCALE_94} />
                  <Text style={styles.welcomeText}>
                    <FormattedMessage
                      style={styles.welcomeText}
                      id="app.containers.Login.welcomLabel"
                      defaultMessage="Welcom to"
                    />
                    <Text style={styles.iwaText}>iwalane</Text>
                  </Text>
                </View>

                <View style={styles.formWrapper}>
                  <Input
                    lang={props.login.myLang}
                    style={{ marginBottom: Spacing.SCALE_8 }}
                    placeholder={props.intl.formatMessage({ id: 'app.containers.Login.username' })}
                    errorsVisible={errorsVisible}
                    errors={errors.username}
                    handleChange={text => {
                      handleChange('username')(text);
                      onChangeText(text, 'user');
                    }}
                  />
                  <View style={{ marginHorizontal: Spacing.SCALE_8, width: '100%' }} />
                  <PasswordInput
                    lang={props.login.myLang}
                    placeholder={props.intl.formatMessage({ id: 'app.containers.Login.password' })}
                    errorsVisible={errorsVisible}
                    errors={errors.password}
                    handleChange={text => {
                      handleChange('password')(text);
                      onChangeText(text, 'pass');
                    }}
                  />
                  <View style={{ marginHorizontal: Spacing.SCALE_8, width: '100%' }} />
                  <Button
                    title={props.intl.formatMessage({ id: 'app.containers.Login.forgetPassword' })}
                    type="clear"
                    titleStyle={styles.forgotSyle}
                    buttonStyle={{ paddingTop: Spacing.SCALE_0, paddingBottom: Spacing.SCALE_10 }}
                    containerStyle={{ marginTop: Spacing.SCALE_20 }}
                    onPress={handleForgotPassword}
                  />
                </View>
              </View>

              <View style={styles.bottomStyle}>
                <Button
                  title={props.intl.formatMessage({ id: 'app.containers.Login.loginButton' })}
                  buttonStyle={styles.buttonStyle}
                  onPress={() => {
                    setErrorsVisible(true);
                    handleSubmit(values);
                  }}
                  titleStyle={{ fontFamily: Typography.FONT_FAMILY_SEMI_BOLD }}
                />
                <Text style={styles.orStyle}>{props.intl.formatMessage({ id: 'app.containers.Login.or' })}</Text>
                <Button
                  title={props.intl.formatMessage({ id: 'app.containers.Login.subscribe' })}
                  buttonStyle={styles.outlineStyle}
                  titleStyle={{ fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, color: Colors.PINK }}
                  onPress={() => props.navigation.navigate('Subscribe')}
                />
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button
                    title={props.intl.formatMessage({ id: 'app.containers.Login.arabe' })}
                    titleStyle={{
                      color: Colors.PINK,
                    }}
                    buttonStyle={{ ...styles.outlineStyle, marginTop: 10, width: 170 }}
                    titleStyle={{ fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, color: Colors.PINK }}
                    onPress={() => {
                      changeLoc('ar');
                      props.setMyLanguage('ar');
                    }}
                  />
                  <Button
                    title={props.intl.formatMessage({ id: 'app.containers.Login.francais' })}
                    titleStyle={{
                      color: Colors.PINK,
                    }}
                    buttonStyle={{ ...styles.outlineStyle, marginTop: 10, width: 170 }}
                    titleStyle={{ fontFamily: Typography.FONT_FAMILY_SEMI_BOLD, color: Colors.PINK }}
                    onPress={() => {
                      changeLoc('fr');
                      props.setMyLanguage('fr');
                    }}
                  />
                </View> */}

                <Button
                  title={props.intl.formatMessage({ id: 'app.containers.Login.moreInformationButton' })}
                  type="clear"
                  titleStyle={styles.forgotSyle}
                  buttonStyle={{ paddingTop: 0, paddingHorizontal: Spacing.SCALE_10, paddingBottom: Spacing.SCALE_10 }}
                  containerStyle={{ marginTop: Spacing.SCALE_30, alignSelf: 'center' }}
                  onPress={handleMoreInfo}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
      {props.login.isLoading && <Loader />}
    </View>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    toastMsg: (a, b) => {
      dispatch(addMsg(a, b));
    },
    loginUser: (a, b, errLoginFaildText) => {
      dispatch(loginUser(a, b, errLoginFaildText));
    },
    setMyLanguage: L => {
      dispatch(setMyLanguage(L));
    },
    forgotPassword: id => {
      dispatch(forgotPassword(id));
    },
    changeLoc: lang => {
      dispatch(changeLocale(lang));
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
)(injectIntl(Login));
