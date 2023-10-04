/**
 *
 * Notifications
 *
 */

import React, { memo } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNotifications from './selectors';
import reducer from './reducer';
import saga from './saga';
import NavigationHeader from '../../components/NavigationHeader';
import NotificationBadge from '../../components/NotificationBadge';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

export const styles = StyleSheet.create({});

export function Notifications(props) {
  useInjectReducer({ key: 'notifications', reducer });
  useInjectSaga({ key: 'notifications', saga });

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10, backgroundColor: '#f2f4f8' }}>
      <NavigationHeader
        title={props.intl.formatMessage({ id: 'app.containers.Notification.title' })}
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <NotificationBadge
          iconName="ribbon"
          type="ionicon"
          notif
          iconColor="#e1a46e"
          textColor="#24378b"
          onPress={() => props.navigation.navigate('GiftCart')}
        />
        <NotificationBadge iconName="local-shipping" type="material" notif iconColor="#24378b" textColor="#24378b" />
        <NotificationBadge iconName="person" type="material" notif iconColor="#24378b" textColor="#24378b" />
        <NotificationBadge
          iconName="gift"
          type="ionicon"
          notif={false}
          iconColor={Colors.DARK_GRAY}
          textColor={Colors.DARK_GRAY}
        />
        <NotificationBadge
          iconName="shopping-cart"
          type="material"
          notif={false}
          iconColor={Colors.DARK_GRAY}
          textColor={Colors.DARK_GRAY}
        />
        <NotificationBadge iconName="ribbon" type="ionicon" notif iconColor="#e1a46e" textColor="#24378b" />
        <NotificationBadge iconName="local-shipping" type="material" notif iconColor="#24378b" textColor="#24378b" />
        <NotificationBadge iconName="person" type="material" notif iconColor="#24378b" textColor="#24378b" />
        <NotificationBadge
          iconName="gift"
          type="ionicon"
          notif={false}
          iconColor={Colors.DARK_GRAY}
          textColor={Colors.DARK_GRAY}
        />
        <NotificationBadge
          iconName="shopping-cart"
          type="material"
          notif={false}
          iconColor={Colors.DARK_GRAY}
          textColor={Colors.DARK_GRAY}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

Notifications.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  notifications: makeSelectNotifications(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(injectIntl(Notifications));
