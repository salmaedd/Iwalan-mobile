/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * Catalog
 *
 */

import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { StatusBar, StyleSheet, View, Text, Dimensions, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import NavigationHeader from '../../components/NavigationHeader';

import Loader from '../../components/Loader';

import { Mixins, Spacing, Typography } from '../../styles';
import { makeSelectLoading } from '../Login/selectors';
import arab from '../../assets/arab.png';
import francais from '../../assets/francais.png';
import laye from '../../assets/laye.png';
import { changeLocale } from './../../containers/LanguageProvider/actions';
import { setMyLanguage } from '../Login/actions';
import { changeLanguage } from './actions';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    paddingHorizontal: Spacing.SCALE_10,
  },
  icon: {
    width: Spacing.SCALE_20,
    height: Spacing.SCALE_16,
  },
  iconValidated: {
    width: Spacing.SCALE_20,
    height: Spacing.SCALE_16,
    position: 'absolute',
    right: 0,
  },
  bottomButton: {
    width: Spacing.SCALE_360,
    height: Spacing.SCALE_56,
    justifyContent: 'center',
    borderRadius: Spacing.SCALE_20,
    backgroundColor: '#fb4896',
    alignSelf: 'center',
  },
  bottomButtonText: {
    color: 'white',
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    alignSelf: 'center',
  },
});

export function Langue(props) {
  // useInjectReducer({ key: 'catalog', reducer });
  // useInjectSaga({ key: 'catalog', saga });
  const { changeLoc } = props;

  const language = useSelector(state => state?.login?.myLang);

  const [frSelected, setFrSelected] = React.useState(language === 'fr' ? true : false);
  const [arSelected, setArSelected] = React.useState(language === 'ar' ? true : false);

  const saveLanguage = async lang => {
    try {
      await AsyncStorage.setItem('AppLanguage', lang);
    } catch (e) {
      console.log('AsyncStorage', e);
    }
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      <NavigationHeader
        language={language}
        title={props.intl.formatMessage({ id: 'app.containers.Profil.langue' })}
        onPress={() => props.navigation.goBack()}
      />

      <View style={{ alignSelf: 'center' }}>
        <View style={{ width: 390, height: 112, backgroundColor: 'white', borderRadius: 20 }}>
          <TouchableOpacity
            onPress={() => {
              setFrSelected(true);
              setArSelected(false);
            }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 20 }}>
              <Image source={francais} style={styles.icon} />
              <Text
                style={{
                  marginLeft: 20,
                  color: '#5a6880',
                  fontSize: Typography.FONT_SIZE_16,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}>
                {props.intl.formatMessage({ id: 'app.containers.Profil.francais' })}
              </Text>
              {frSelected && <Image source={laye} style={styles.iconValidated} />}
            </View>
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#e4e8ef', width: 350, alignSelf: 'center' }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFrSelected(false);
              setArSelected(true);
            }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 20 }}>
              <Image source={arab} style={styles.icon} />
              <Text
                style={{
                  marginLeft: 20,
                  color: '#5a6880',
                  fontSize: Typography.FONT_SIZE_16,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}>
                {props.intl.formatMessage({ id: 'app.containers.Profil.arab' })}
              </Text>
              {arSelected && <Image source={laye} style={styles.iconValidated} />}
            </View>
            {/* <View style={{ borderBottomWidth: 2, borderBottomColor: '#e4e8ef', width: 350, alignSelf: 'center' }} /> */}
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: Dimensions.get('window').height / 1.7, justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            if (arSelected === true) {
              saveLanguage('ar');
              changeLoc('ar');
              props.setMyLanguage('ar');
              props.changeMyLanguage('ar');
            } else if (frSelected === true) {
              saveLanguage('fr');
              changeLoc('fr');
              props.setMyLanguage('fr');
              props.changeMyLanguage('fr');
            }
          }}>
          <Text style={styles.bottomButtonText}>{props.intl.formatMessage({ id: 'app.containers.Profil.save' })}</Text>
        </TouchableOpacity>
      </View>

      {props.isLoading && <Loader />}
    </SafeAreaView>
  );
}

Langue.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  // catalog: makeSelectCatalog(),
  // brands: makeSelectBrands(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBrands: () => {
      dispatch(getBrandsData());
    },
    changeLoc: lang => {
      dispatch(changeLocale(lang));
    },
    setMyLanguage: L => {
      dispatch(setMyLanguage(L));
    },
    changeMyLanguage: Lang => {
      dispatch(changeLanguage(Lang));
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
)(injectIntl(Langue));
