/**
 *
 * GiftSummary
 *
 */

import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import NavigationHeader from '../../components/NavigationHeader';
import SummaryElement from '../../components/SummaryElement';
import { Colors, Spacing, Typography } from '../../styles';
import { getUserInfo } from '../../utils/MainMethods';
import { makeSelectLoading } from '../Login/selectors';
import { confirmGiftOrder } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectGiftSummary from './selectors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardView: {
    justifyContent: 'flex-start',
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.BACK_GRAY,
    marginHorizontal: Spacing.SCALE_16,
    marginBottom: Spacing.SCALE_20,
  },
  bottomContainer: {
    marginBottom: Spacing.SCALE_86,
  },
  address: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: '#5a6880',
    lineHeight: Spacing.SCALE_24,
    width: '90%',
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: Spacing.SCALE_20,
  },
  addressTitle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
  },
  addAddress: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: '#24378b',
  },
  addressView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.SCALE_20,
  },
  iconContainer: {
    width: Spacing.SCALE_36,
    height: Spacing.SCALE_36,
    borderRadius: Spacing.SCALE_18,
    borderWidth: Spacing.SCALE_2,
    borderStyle: 'solid',
    borderColor: Colors.BACK_GRAY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.SCALE_10,
  },
  confirm: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Spacing.SCALE_164,
    height: Spacing.SCALE_40,
    borderRadius: Spacing.SCALE_20,
    backgroundColor: Colors.PINK,
    alignSelf: 'center',
    marginTop: Spacing.SCALE_40,
    marginBottom: Spacing.SCALE_30,
  },
  confirmText: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
  },
  conditions: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
    color: '#7a879d',
    textAlign: 'center',
  },
});

export function GiftSummary(props) {
  useInjectReducer({ key: 'giftSummary', reducer });
  useInjectSaga({ key: 'giftSummary', saga });

  const language = useSelector(state => state?.login?.myLang);
  const { gifts } = props.route.params;
  const [points, setPoints] = React.useState(0);
  const [address, setAddress] = React.useState('');
  const [ordered, setOrdered] = React.useState(false);
  const [text, onChangeText] = React.useState('');

  const val = getUserInfo().then(value => {
    setAddress(JSON.parse(value).adresse);
  });

  useEffect(() => {
    gifts?.map(element => {
      setPoints(points + JSON.parse(element?.points));
    });
  }, [gifts]);

  const confirmGiftSummary = () => {
    if (!ordered) {
      setOrdered(true);
      const giftIds = [];
      gifts?.map(gift => {
        giftIds.push({ giftId: gift?.id, quantity: gift?.quantity });
      });

      props.orderGifts(giftIds, text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />
      <NavigationHeader
        language={language}
        title={props.intl.formatMessage({ id: 'app.containers.GiftSummary.title' })}
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={gifts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            ...styles.cardView,
            padding: Spacing.SCALE_8,
          }}
          renderItem={({ item, index }) => <SummaryElement language={language} {...item} />}
        />

        <View style={{ ...styles.cardView, paddingHorizontal: Spacing.SCALE_16, paddingVertical: Spacing.SCALE_20 }}>
          <Text style={{ ...styles.addressTitle, alignSelf: language === 'ar' ? 'flex-end' : 'flex-start' }}>
            {props.intl.formatMessage({ id: 'app.containers.ProductSummary.address' })}
          </Text>
          <View style={styles.addressContainer}>
            <View style={styles.iconContainer}>
              <Icon name="checkmark" type="ionicon" color="#43b11b" size={Spacing.SCALE_20} />
            </View>

            <Input placeholder={address} handleChange={onChangeText} />
            {/* <Text style={styles.address}>{address}</Text> */}
          </View>
          {/* <Divider style={{ backgroundColor: Colors.BACK_GRAY }} /> */}
          {/* <TouchableOpacity>
            <View style={styles.addressView}>
              <Icon name="add" type="ionicon" color="#24378b" />
              <Text style={styles.addAddress}>{props.intl.formatMessage({ id: 'app.containers.GiftSummary.addAdress' })}</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={confirmGiftSummary} style={styles.confirm} disabled={ordered ? true : false}>
            {!ordered ? (
              <Text style={styles.confirmText}>
                {props.intl.formatMessage({ id: 'app.containers.GiftSummary.confirm' })}
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#ffffff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('TermsOfService')}>
            <Text style={styles.conditions}>
              {props.intl.formatMessage({ id: 'app.containers.GiftSummary.conditionsParte1' })}{' '}
              <Text style={{ textDecorationLine: 'underline' }}>
                {props.intl.formatMessage({ id: 'app.containers.GiftSummary.conditionsParte2' })}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {props.isLoading && <Loader />}
    </SafeAreaView>
  );
}

GiftSummary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  giftSummary: makeSelectGiftSummary(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    orderGifts: (gifts, address) => {
      dispatch(confirmGiftOrder(gifts, address));
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
)(injectIntl(GiftSummary));
