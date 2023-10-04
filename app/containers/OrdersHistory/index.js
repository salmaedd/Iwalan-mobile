/**
 *
 * OrdersHistory
 *
 */

import React, { memo, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, StatusBar, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOrdersHistory from './selectors';
import reducer from './reducer';
import saga from './saga';
import NavigationHeader from '../../components/NavigationHeader';
import OrderHistoryElement from '../../components/OrderHistoryElement';
import { getOrders, getGifts } from './actions';
import Loader from '../../components/Loader';
import { makeSelectLoading } from '../Login/selectors';
import { Colors, Spacing, Typography, Mixins } from '../../styles';
import { segment } from '../../utils/segment';
import { getToken } from '../../utils/MainMethods';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f2f4f8',
    paddingHorizontal: Spacing.SCALE_16,
    paddingBottom: Spacing.SCALE_100,
  },
  selectedButton: {
    width: Spacing.SCALE_120,
    height: Spacing.SCALE_40,
    backgroundColor: '#fb4896',
    borderRadius: Spacing.SCALE_20,
    marginRight: Spacing.SCALE_10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  unselectedButton: {
    width: Spacing.SCALE_120,
    height: Spacing.SCALE_40,
    borderColor: '#7a879d',
    borderWidth: 1.4,
    borderRadius: Spacing.SCALE_20,
    marginRight: Spacing.SCALE_10,
    alignSelf: 'center',

    justifyContent: 'center',
  },
  selectedText: {
    color: 'white',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    textAlign: 'center',
  },
  unselectedText: {
    color: '#7a879d',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    textAlign: 'center',
  },
});

export function OrdersHistory(props) {
  useInjectReducer({ key: 'ordersHistory', reducer });
  useInjectSaga({ key: 'ordersHistory', saga });

  const language = useSelector(state => state?.login?.myLang);

  const { getUserOrders, getUserGifts } = props;
  //const { orders } = props.ordersHistory;
  const [orders, setOrders] = React.useState([]);
  const [idCustomer, setIdCustomer] = React.useState('');
  const [selectedAll, setSelectedAll] = React.useState(true);
  const [selectedOrders, setSelectedOrders] = React.useState(false);
  const [selectedPreOrders, setSelectedPreOrders] = React.useState(false);

  const { gift } = props.route.params;

  useEffect(() => {
    if (gift) {
      setOrders(props.ordersHistory.gifts);
    } else {
      setOrders(props.ordersHistory.orders);
    }
  }, [props]);

  const orderHistoryEvent = async () => {
    const dataUser = await getToken();
    let mydata = {
      userId: JSON.parse(dataUser).code,
      name: gift ? 'GIFT HISTORY PAGE ' : 'ORDER HISTORY PAGE ',
      timestamp: new Date(),
    };
    await segment('page', mydata);
  };

  useEffect(() => {
    orderHistoryEvent();
  }, []);

  useEffect(() => {
    let tab = [];
    if (orders) {
      if (selectedAll) {
        setOrders(props.ordersHistory.orders);
      } else if (selectedOrders) {
        props.ordersHistory.orders.map(element => {
          element?.Status[0]?.valueSystem !== 'preordered' ? tab.push(element) : null;
        });
        setOrders(tab !== [] ? tab : props.ordersHistory.orders);
      } else if (selectedPreOrders) {
        props.ordersHistory.orders.map(element => {
          element?.Status[0]?.valueSystem === 'preordered' ? tab.push(element) : null;
        });
        setOrders(tab !== [] ? tab : props.ordersHistory.orders);
      }
    }
  }, [selectedAll, selectedOrders, selectedPreOrders]);

  useEffect(() => {
    if (gift) getUserGifts();
    else getUserOrders();
  }, [getUserOrders, getUserGifts]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      <NavigationHeader
        language={language}
        style={{ fontFamily: Typography.FONT_FAMILY_MEDIUM }}
        title={props.intl.formatMessage({
          id: gift ? 'app.containers.OrderHistory.titreCadeaux' : 'app.containers.OrderHistory.titre',
        })}
        onPress={() => props.navigation.goBack()}
      />
      {language === 'ar' && !gift ? (
        <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
          <TouchableOpacity
            style={selectedPreOrders ? styles.selectedButton : styles.unselectedButton}
            onPress={() => {
              setSelectedAll(false);
              setSelectedOrders(false);
              setSelectedPreOrders(true);
            }}>
            <Text style={selectedPreOrders ? styles.selectedText : styles.unselectedText}>
              {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.preorders' })}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={selectedOrders ? styles.selectedButton : styles.unselectedButton}
            onPress={() => {
              setSelectedAll(false);
              setSelectedOrders(true);
              setSelectedPreOrders(false);
            }}>
            <Text style={selectedOrders ? styles.selectedText : styles.unselectedText}>
              {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.orders' })}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={selectedAll ? styles.selectedButton : styles.unselectedButton}
            onPress={() => {
              setSelectedAll(true);
              setSelectedOrders(false);
              setSelectedPreOrders(false);
            }}>
            <Text style={selectedAll ? styles.selectedText : styles.unselectedText}>
              {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.all' })}
            </Text>
          </TouchableOpacity>
        </View>
      ) : !gift ? (
        <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
          <TouchableOpacity
            style={selectedAll ? styles.selectedButton : styles.unselectedButton}
            onPress={() => {
              setSelectedAll(true);
              setSelectedOrders(false);
              setSelectedPreOrders(false);
            }}>
            <Text style={selectedAll ? styles.selectedText : styles.unselectedText}>
              {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.all' })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedOrders ? styles.selectedButton : styles.unselectedButton}
            onPress={() => {
              setSelectedAll(false);
              setSelectedOrders(true);
              setSelectedPreOrders(false);
            }}>
            <Text style={selectedOrders ? styles.selectedText : styles.unselectedText}>
              {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.orders' })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedPreOrders ? styles.selectedButton : styles.unselectedButton}
            onPress={() => {
              setSelectedAll(false);
              setSelectedOrders(false);
              setSelectedPreOrders(true);
            }}>
            <Text style={selectedPreOrders ? styles.selectedText : styles.unselectedText}>
              {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.preorders' })}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}

      <View style={styles.container}>
        <FlatList
          data={orders}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: Spacing.SCALE_180 }}
          renderItem={({ item, index }) => (
            <OrderHistoryElement
              language={language}
              {...item}
              gift={gift}
              onPress={() => props.navigation.navigate('OrderTrackingFromHistory', { order: item, gift: gift })}
            />
          )}
        />
      </View>
      {props.isLoading && <Loader />}
    </SafeAreaView>
  );
}

OrdersHistory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  ordersHistory: makeSelectOrdersHistory(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserOrders: () => {
      dispatch(getOrders());
    },
    getUserGifts: () => {
      dispatch(getGifts());
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
)(injectIntl(OrdersHistory));
