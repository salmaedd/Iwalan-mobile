/**
 *
 * OrderHistoryElement
 *
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Platform } from 'react-native';
import { injectIntl, intlShape } from 'react-intl';
import Picon from '../../assets/goldCoin.png';
import moment from 'moment';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    borderStyle: 'solid',
    borderColor: '#e4e8ef',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.SCALE_14,
    paddingVertical: Platform.OS === 'ios' ? Spacing.SCALE_14 : 0,
    marginBottom: Spacing.SCALE_10,
    height: Spacing.SCALE_112,
  },
  image: {
    width: Spacing.SCALE_66,
    height: Spacing.SCALE_66,
    marginRight: Spacing.SCALE_20,
    marginTop: Spacing.SCALE_10,
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: '#7a879d',
    marginBottom: Spacing.SCALE_4,
  },
  value: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    color: '#5a6880',
  },
  amount: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_14,
    color: '#fb4896',
    marginRight: Spacing.SCALE_20,
  },
  mad: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_10,
  },
  point: {
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: '#fbae18',
    marginLeft: Spacing.SCALE_4,
  },
  pItem: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  middleItem: {
    display: 'flex',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  firstItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  firstItemAR: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //  alignSelf:"flex-start"
    //backgroundColorf: 'red',
    marginLeft: Spacing.SCALE_100,
    width: Spacing.SCALE_190,
  },
});

function OrderHistoryElement(props) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        {props.language === 'ar' ? (
          <>
            <View style={styles.firstItemAR}>
              <View
                style={{
                  ...styles.middleItem,
                  marginTop: props.gift ? Spacing.SCALE_8 : Spacing.SCALE_4,
                  /// marginRight: 40,
                  alignItems: 'flex-end',
                  //backgroundColor:"red"
                }}>
                <Text style={styles.title}>
                  {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.status' })}

                  {props.gift ? (
                    <Text style={styles.title}> {props?.statut}</Text>
                  ) : (
                    <Text style={styles.title}> {props?.Status[0]?.valueStatus?.ar}</Text>
                  )}
                </Text>
                <Text style={{ ...styles.title, marginTop: Spacing.SCALE_2 }}>
                  {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.date' })}{' '}
                  {props.gift ? (
                    <Text style={styles.value}>{moment(props?.createdAt).format('YYYY/MM/DD')}</Text>
                  ) : (
                    <Text style={styles.value}>{moment(props.theDate).format('YYYY/MM/DD')}</Text>
                  )}
                </Text>
                <Text style={{ ...styles.title, marginBottom: props.gift ? -Spacing.SCALE_4 : Spacing.SCALE_2 }}>
                  {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.confirmation' })}{' '}
                  <Text style={styles.value}>{!props.gift ? props.invoiceCode : props?.code}</Text>
                </Text>
                <View style={styles.pItem}>
                  {!props.gift && (
                    <Text style={styles.amount}>
                      {props.paidAmount.slice(0, 10)}
                      <Text style={styles.mad}>MAD</Text>
                    </Text>
                  )}

                  <View style={styles.pItem}>
                    <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                    {props.gift ? (
                      <Text style={styles.point}>{props?.points}</Text>
                    ) : (
                      <Text style={styles.point}>{props.loyaltyScore}</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>

            <View style={{ ...styles.image, alignSelf: 'flex-start' }}>
              {props.gift ? (
                <Image
                  source={{
                    uri: props?.details?.[0]?.images?.main?.s,
                  }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={{
                    uri: props?.details?.[0]?.Product?.images?.main?.s,
                  }}
                  style={styles.image}
                />
              )}
            </View>
          </>
        ) : (
          <View style={styles.firstItem}>
            <View style={styles.image}>
              {props.gift ? (
                <Image
                  source={{
                    uri: props?.details?.[0]?.images?.main?.s,
                  }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={{
                    uri: props?.details?.[0]?.Product?.images?.main?.s,
                  }}
                  style={styles.image}
                />
              )}
            </View>

            <View style={{ ...styles.middleItem, marginTop: props.gift ? Spacing.SCALE_8 : Spacing.SCALE_4 }}>
              <Text style={styles.title}>
                {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.status' })}

                {props.gift ? (
                  <Text style={styles.title}> {props?.statut}</Text>
                ) : (
                  <Text style={styles.title}> {props?.Status[0]?.valueStatus?.fr}</Text>
                )}
              </Text>
              <Text style={{ ...styles.title, marginTop: Spacing.SCALE_2 }}>
                {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.date' })}{' '}
                {props.gift ? (
                  <Text style={styles.value}>{moment(props?.createdAt).format('YYYY/MM/DD')}</Text>
                ) : (
                  <Text style={styles.value}>{moment(props.theDate).format('YYYY/MM/DD')}</Text>
                )}
              </Text>
              <Text style={{ ...styles.title, marginBottom: props.gift ? -Spacing.SCALE_4 : Spacing.SCALE_2 }}>
                {props.intl.formatMessage({ id: 'app.components.OrderHistoryElement.confirmation' })}{' '}
                <Text style={styles.value}>{!props.gift ? props.invoiceCode : props?.code}</Text>
              </Text>
              <View style={styles.pItem}>
                {!props.gift && (
                  <Text style={styles.amount}>
                    {props.paidAmount.slice(0, 10)}
                    <Text style={styles.mad}>MAD</Text>
                  </Text>
                )}

                <View style={styles.pItem}>
                  <Image source={Picon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                  {props.gift ? (
                    <Text style={styles.point}>{props?.points}</Text>
                  ) : (
                    <Text style={styles.point}>{props.loyaltyScore}</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      </TouchableWithoutFeedback>
      {/* <View>
        <Icon name="copy" type="ionicon" color="#7a879d" size={Spacing.SCALE_18} />
      </View> */}
    </View>
  );
}

OrderHistoryElement.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(OrderHistoryElement));
