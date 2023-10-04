/**
 *
 * Change password
 *
 */

import React, { memo } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectChangePassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changePassword } from './actions';

import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import NavigationHeader from '../../components/NavigationHeader';
import PasswordInput from '../../components/PasswordInput';
import { Spacing, Typography, Mixins } from '../../styles';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: Mixins.WINDOW_HEIGHT,
    backgroundColor: '#e4e8ef',
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
  },
  buttonStyle: {
    position: 'relative',
    borderRadius: Spacing.SCALE_20,
    height: Spacing.SCALE_56,
    backgroundColor: '#fb4896',
    marginVertical: Spacing.SCALE_8,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: 'bold',
  },
  labelContainer: {
    marginStart: Spacing.SCALE_4,
  },
  label: {
    color: '#7a879d',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },
  bottomStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: Spacing.SCALE_28,
    marginVertical: Spacing.SCALE_48,
  },
  fillFormErrorBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: Spacing.SCALE_19,
  },
});

export function ChangePassword(props) {
  useInjectReducer({ key: 'changePassword', reducer });
  useInjectSaga({ key: 'changePassword', saga });
  const language = useSelector(state => state?.login?.myLang);

  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState({});
  const [errorsVisible, setErrorsVisible] = React.useState(false);

  const { changePassword } = props;

  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      <View style={styles.bg}>
        <ImageBackground source={require('../../assets/background-pattern.png')} style={styles.backgroundImage} />
      </View>

      <NavigationHeader
        language={language}
        title={props.intl.formatMessage({ id: 'app.containers.ChangePassword.titre' })}
        onPress={() => props.navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: '70%' }}>
          <Alert
            isVisible={visible}
            text={props.intl.formatMessage({ id: 'app.containers.ChangePassword.alert' })}
            onPress={() => {
              changePassword(data);
              props.navigation.navigate('Account');
            }}
            onCancelPressed={() => setVisible(false)}
          />

          <Formik
            enableReinitialize={true}
            initialValues={{
              oldPassword: '',
              newPassword: '',
            }}
            validationSchema={Yup.object().shape({
              oldPassword: Yup.string()
                .required(props.intl.formatMessage({ id: 'app.containers.ChangePassword.required' }))
                .min(8, props.intl.formatMessage({ id: 'app.containers.NewPassword.legthErr' })),
              newPassword: Yup.string()
                .required(props.intl.formatMessage({ id: 'app.containers.ChangePassword.required' }))
                .min(8, props.intl.formatMessage({ id: 'app.containers.NewPassword.legthErr' })),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              setVisible(true);
              setData(values);
            }}>
            {({ values, handleChange, errors, handleSubmit }) => (
              <>
                <View style={styles.formWrapper}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>
                      {props.intl.formatMessage({ id: 'app.containers.ChangePassword.oldPassword' })}
                    </Text>
                  </View>
                  <View style={{ marginTop: Spacing.SCALE_6, marginBottom: Spacing.SCALE_20 }}>
                    <PasswordInput
                      lang={language}
                      placeholder={props.intl.formatMessage({ id: 'app.containers.ChangePassword.currentPassword' })}
                      errorsVisible={errorsVisible}
                      errors={errors.oldPassword}
                      handleChange={handleChange('oldPassword')}
                    />
                  </View>

                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>
                      {props.intl.formatMessage({ id: 'app.containers.ChangePassword.newPassword' })}
                    </Text>
                  </View>
                  <View style={{ marginTop: Spacing.SCALE_6, marginBottom: Spacing.SCALE_20 }}>
                    <PasswordInput
                      lang={language}
                      placeholder={props.intl.formatMessage({ id: 'app.containers.ChangePassword.newPassword' })}
                      errorsVisible={errorsVisible}
                      errors={errors.newPassword}
                      handleChange={handleChange('newPassword')}
                    />
                  </View>
                </View>

                <View style={styles.bottomStyle}>
                  {errorsVisible && errors && Object.keys(errors).length > 0 && (
                    <View style={styles.fillFormErrorBox}>
                      <Alert
                        height={Spacing.SCALE_24}
                        width={Spacing.SCALE_24}
                        style={{ marginRight: Spacing.SCALE_8 }}
                      />
                      <Text style={styles.fillFormErrorText}>
                        {props.intl.formatMessage({ id: 'app.containers.NewPassword.fill' })}
                      </Text>
                    </View>
                  )}
                  <Button
                    title={props.intl.formatMessage({ id: 'app.containers.ChangePassword.confirm' })}
                    buttonStyle={styles.buttonStyle}
                    containerStyle={{ marginTop: 20 }}
                    onPress={() => {
                      handleSubmit(values);
                      setErrorsVisible(true);
                    }}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>

        {props.changePassword.isLoading && <Loader />}
      </ScrollView>
    </View>
  );
}

ChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  changePassword: makeSelectChangePassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: userInfo => {
      dispatch(changePassword(userInfo));
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
)(injectIntl(ChangePassword));
