/**
 *
 * Account
 *
 */

import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Loader from '../../components/Loader';
import NavigationHeader from '../../components/NavigationHeader';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import { logout } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectProfileContainer from './selectors';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: Mixins.WINDOW_HEIGHT,
    backgroundColor: '#e4e8ef',
    paddingTop: Platform.OS === 'ios' ? Spacing.SCALE_40 : Spacing.SCALE_10,
    flexDirection: 'column',
  },
  bg: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Mixins.WINDOW_HEIGHT,
    width: Mixins.WINDOW_WIDTH,
  },
  listStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_16,
  },
  listStyleBottom: {
    width: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_28,
  },
  division: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.SCALE_20,
  },
  name: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#7a879d',
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
});

export function Account(props) {
  useInjectReducer({ key: 'account', reducer });
  useInjectSaga({ key: 'account', saga });
  // const [avatarSource, setAvatarSource] = React.useState(null);
  // const { getUserProfile } = props;
  // const { profile } = props.profileContainer;

  const language = useSelector(state => state?.login?.myLang);

  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    setVisible(props.account.err);
  }, [props.account.err]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.main}>
      <View style={styles.bg}>
        <ImageBackground source={require('../../assets/background-pattern.png')} style={styles.backgroundImage} />
      </View>

      <NavigationHeader
        language={language}
        title={props.intl.formatMessage({ id: 'app.containers.Account.titre' })}
        onPress={() => props.navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Overlay isVisible={visible} wrapperStyle={styles.overlay} onBackdropPress={toggleOverlay}>
          <>
            <View style={styles.mark}>
              <Text style={{ color: '#f2f4f8' }}>!</Text>
            </View>
            <Text style={styles.errorStyle}> {props.intl.formatMessage({ id: 'app.containers.Account.err' })}</Text>
          </>
        </Overlay>
        <View style={{ width: Mixins.WINDOW_WIDTH, paddingHorizontal: Spacing.SCALE_14 }}>
          <View>
            <View style={styles.listStyle}>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => props.navigation.navigate('PersonalInformation')}>
                <View style={styles.division}>
                  {language === 'ar' ? (
                    <>
                      <Icon name="chevron-back" type="ionicon" color="#7a879d" size={20} />

                      <Text style={styles.name}>
                        {props.intl.formatMessage({ id: 'app.containers.Account.personalInfo' })}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.name}>
                        {props.intl.formatMessage({ id: 'app.containers.Account.personalInfo' })}
                      </Text>
                      <Icon name="chevron-forward" type="ionicon" color="#7a879d" size={20} />
                    </>
                  )}
                </View>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomColor: '#e4e8ef',
                  borderBottomWidth: 0.8,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
              {/* <Divider
                style={{ backgroundColor: '#e4e8ef', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 10 }}
              /> */}
              <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.navigate('ChangePassword')}>
                <View style={styles.division}>
                  {language === 'ar' ? (
                    <>
                      <Icon name="chevron-back" type="ionicon" color="#7a879d" size={20} />

                      <Text style={styles.name}>
                        {props.intl.formatMessage({ id: 'app.containers.Account.changePassword' })}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.name}>
                        {props.intl.formatMessage({ id: 'app.containers.Account.changePassword' })}
                      </Text>
                      <Icon name="chevron-forward" type="ionicon" color="#7a879d" size={20} />
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.listStyle}>
              <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.navigate('TermsOfService')}>
                <View style={styles.division}>
                  {language === 'ar' ? (
                    <>
                      <Icon name="chevron-back" type="ionicon" color="#7a879d" size={20} />

                      <Text style={styles.name}>
                        {props.intl.formatMessage({ id: 'app.containers.Account.termsOfService' })}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.name}>
                        {props.intl.formatMessage({ id: 'app.containers.Account.termsOfService' })}
                      </Text>
                      <Icon name="chevron-forward" type="ionicon" color="#7a879d" size={20} />
                    </>
                  )}
                </View>
              </TouchableOpacity>
              {/* <Divider
                style={{ backgroundColor: '#e4e8ef', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 10 }}
              /> */}
              <View
                style={{
                  borderBottomColor: '#e4e8ef',
                  borderBottomWidth: 0.8,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
              <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.navigate('PrivacyPolicy')}>
                <View style={styles.division}>
                  {language === 'ar' ? (
                    <>
                      <Icon name="chevron-back" type="ionicon" color="#7a879d" size={20} />

                      <Text style={styles.name}>
                        {props.intl.formatMessage({ id: 'app.containers.Account.privacyAndPolicy' })}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.name}>
                        {props.intl.formatMessage({ id: 'app.containers.Account.privacyAndPolicy' })}
                      </Text>
                      <Icon name="chevron-forward" type="ionicon" color="#7a879d" size={20} />
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'relative',
          bottom: Spacing.SCALE_10,
          width: Mixins.WINDOW_WIDTH,
          paddingHorizontal: Spacing.SCALE_14,
        }}>
        <View style={styles.listStyleBottom}>
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => {
              props.logoutapp(
                props.navigation.navigate,
                props.intl.formatMessage({ id: 'app.containers.Account.errMessage' }),
              );
              props.navigation.navigate('Login');
            }}>
            <View style={{ ...styles.division, justifyContent: 'center' }}>
              <Text style={{ ...styles.name, color: '#ff4141' }}>
                {props.intl.formatMessage({ id: 'app.containers.Account.logout' })}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#7a879d', marginTop: Spacing.SCALE_48, textAlign: 'center' }}>Version 2.1.2</Text>
      </View>

      {props.account.isLoading && <Loader />}
    </View>
  );
}

Account.navigationOptions = {
  title: 'Account',
  headerTitleAlign: 'center',
  headerTintColor: Colors.WHITE,
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTitleStyle: {
    fontSize: Typography.FONT_SIZE_18,
    lineHeight: Typography.LINE_HEIGHT_22,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  headerBackground: () => (
    <LinearGradient colors={['#00aae0', '#0371e1']} start={[0.8, 0.75]} locations={[0.0, 1.0]} style={{ flex: 1 }} />
  ),
};

Account.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectProfileContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    logoutapp: (data, messageErrI18n) => {
      dispatch(logout(data, messageErrI18n));
    },
    // getUserProfile: () => {
    //   dispatch(getProfile());
    // },
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
)(injectIntl(Account));
