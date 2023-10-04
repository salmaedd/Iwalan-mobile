/**
 *
 * OrderTimeline
 *
 */

import React, { memo } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
// import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import { Icon } from 'react-native-elements';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

const elementWidth = (Mixins.WINDOW_WIDTH - Spacing.SCALE_220) / 4;

export const styles = StyleSheet.create({
  barStyle: {
    height: Spacing.SCALE_2,
    marginRight: Spacing.SCALE_2,
  },
  timelineEl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : -Spacing.SCALE_8,
    marginBottom: Spacing.SCALE_14,
  },
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    padding: Spacing.SCALE_20,
    marginHorizontal: Spacing.SCALE_16,
    marginBottom: Spacing.SCALE_20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Spacing.SCALE_72,
    paddingVertical: Spacing.SCALE_14,
    shadowColor: Mixins.boxShadow().color,
    shadowOffset: Mixins.boxShadow().shadowOffset,
    shadowOpacity: Mixins.boxShadow().shadowOpacity,
    shadowRadius: Mixins.boxShadow().shadowRadius,
    elevation: Mixins.boxShadow().elevation,
  },
  status: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.DARK_GRAY,
  },
  orderSoon: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: '#24378b',
    marginVertical: Spacing.SCALE_10,
  },
  more: {
    width: Spacing.SCALE_40,
    height: Spacing.SCALE_40,
    backgroundColor: Colors.BACK_GRAY,
    borderRadius: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TimelineElement = ({ color, barWidth }) => {
  return (
    <View style={styles.timelineEl}>
      <View style={[styles.barStyle, { width: barWidth, backgroundColor: color }]} />
      <Icon name="ellipse" type="ionicon" color={color} size={Spacing.SCALE_6} />
    </View>
  );
};

function OrderTimeline(props) {
  const arriveSoon = props.intl.formatMessage({ id: 'app.components.OrderTimeLine.wilArriveSoon' });
  const delivered = props.intl.formatMessage({ id: 'app.components.OrderTimeLine.orderDelivred' });
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('OrderTracking', {
          order: { ...props },
          statusList: props?.orders?.[0]?.StatusList?.[0]?.fr,
        })
      }>
      <View>
        <View style={styles.container}>
          {props?.lang === 'ar' ? (
            <>
              <View style={styles.more}>
                <Icon name="chevron-back" type="ionicon" color="#fb4896" size={20} />
              </View>

              <View>
                <View style={{ marginTop: Spacing.SCALE_14, alignSelf: 'flex-end' }}>
                  <Text style={styles.status}>
                    {props.intl.formatMessage({ id: 'app.components.OrderTimeLine.status' })}{' '}
                    <Text style={[styles.status, { color: '#43b11b' }]}>{props?.orders?.[0]?.StatusList?.[0]?.fr}</Text>
                  </Text>
                </View>

                <View style={{ marginTop: Platform.OS === 'ios' ? 0 : -Spacing.SCALE_14, alignSelf: 'flex-end' }}>
                  <Text style={styles.orderSoon}>
                    {props?.orders?.[0]?.statusOrder !== 'complete' ? arriveSoon : delivered}
                  </Text>
                </View>

                {props?.orders?.[0]?.StatusList?.[0]?.fr !== 'précommandée' && (
                  <View style={styles.timeline}>
                    <TimelineElement
                      barWidth={elementWidth - Spacing.SCALE_10}
                      backgroundColor={
                        props?.orders?.[0].StatusList?.length > 0 &&
                        props?.orders?.[0].StatusList?.[props?.orders?.[0].StatusList?.length - 1]?.status === 'pending'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                      color={
                        props?.orders?.[0].StatusList?.length > 0 &&
                        props?.orders[0]?.StatusList[props?.orders?.[0]?.StatusList?.length - 1]?.status === 'pending'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                    />
                    <TimelineElement
                      barWidth={elementWidth}
                      backgroundColor={
                        props?.orders?.[0]?.StatusList?.length > 1 &&
                        props?.orders?.[0]?.StatusList?.[props?.orders?.[0]?.StatusList?.length - 2]?.status ===
                          'processing'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                      color={
                        props?.orders?.[0]?.StatusList?.length > 1 &&
                        props?.orders[0]?.StatusList[props?.orders?.[0]?.StatusList?.length - 2]?.status ===
                          'processing'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                    />
                    <TimelineElement
                      barWidth={elementWidth + Spacing.SCALE_60}
                      backgroundColor={
                        props?.orders[0]?.StatusList?.length > 2 &&
                        props?.orders[0]?.StatusList?.[props?.orders?.[0]?.StatusList?.length - 3].status ===
                          'delivering'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                      color={
                        props?.orders[0]?.StatusList?.length > 2 &&
                        props?.orders[0]?.StatusList?.[props?.orders?.[0]?.StatusList?.length - 3]?.status ===
                          'delivering'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                    />
                    <TimelineElement
                      barWidth={elementWidth + Spacing.SCALE_16}
                      backgroundColor={
                        props.orders[0]?.StatusList.length > 3 &&
                        props.orders[0]?.StatusList?.[props?.orders?.[0].StatusList?.length - 4]?.status === 'completed'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                      color={
                        props?.orders?.[0]?.StatusList?.length > 3 &&
                        props?.orders?.[0]?.StatusList?.[props?.orders?.[0]?.StatusList?.length - 4]?.status ===
                          'completed'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                    />
                  </View>
                )}
              </View>
            </>
          ) : (
            <>
              <View>
                <View style={{ marginTop: Spacing.SCALE_14 }}>
                  <Text style={styles.status}>
                    {props.intl.formatMessage({ id: 'app.components.OrderTimeLine.status' })}{' '}
                    <Text style={[styles.status, { color: '#43b11b' }]}>{props?.orders?.[0]?.StatusList?.[0]?.fr}</Text>
                  </Text>
                </View>

                <View style={{ marginTop: Platform.OS === 'ios' ? 0 : -Spacing.SCALE_14 }}>
                  <Text style={styles.orderSoon}>
                    {props?.orders?.[0]?.statusOrder !== 'complete' ? arriveSoon : delivered}
                  </Text>
                </View>
                {props?.orders?.[0]?.StatusList?.[0]?.fr !== 'précommandée' && (
                  <View style={styles.timeline}>
                    <TimelineElement
                      barWidth={elementWidth - Spacing.SCALE_10}
                      backgroundColor={
                        props?.orders?.[0].StatusList?.length > 0 &&
                        props?.orders?.[0].StatusList?.[props?.orders?.[0].StatusList?.length - 1]?.status === 'pending'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                      color={
                        props?.orders?.[0].StatusList?.length > 0 &&
                        props?.orders[0]?.StatusList[props?.orders?.[0]?.StatusList?.length - 1]?.status === 'pending'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                    />
                    <TimelineElement
                      barWidth={elementWidth}
                      backgroundColor={
                        props?.orders?.[0]?.StatusList?.length > 1 &&
                        props?.orders?.[0]?.StatusList?.[props?.orders?.[0]?.StatusList?.length - 2]?.status ===
                          'processing'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                      color={
                        props?.orders?.[0]?.StatusList?.length > 1 &&
                        props?.orders[0]?.StatusList[props?.orders?.[0]?.StatusList?.length - 2]?.status ===
                          'processing'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                    />
                    <TimelineElement
                      barWidth={elementWidth + Spacing.SCALE_60}
                      backgroundColor={
                        props?.orders[0]?.StatusList?.length > 2 &&
                        props?.orders[0]?.StatusList?.[props?.orders?.[0]?.StatusList?.length - 3].status ===
                          'delivering'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                      color={
                        props?.orders[0]?.StatusList?.length > 2 &&
                        props?.orders[0]?.StatusList?.[props?.orders?.[0]?.StatusList?.length - 3]?.status ===
                          'delivering'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                    />
                    <TimelineElement
                      barWidth={elementWidth + Spacing.SCALE_16}
                      backgroundColor={
                        props.orders[0]?.StatusList.length > 3 &&
                        props.orders[0]?.StatusList?.[props?.orders?.[0].StatusList?.length - 4]?.status === 'completed'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                      color={
                        props?.orders?.[0]?.StatusList?.length > 3 &&
                        props?.orders?.[0]?.StatusList?.[props?.orders?.[0]?.StatusList?.length - 4]?.status ===
                          'completed'
                          ? Colors.PINK
                          : Colors.BACK_GRAY
                      }
                    />
                  </View>
                )}
              </View>
              <View style={styles.more}>
                <Icon name="chevron-forward" type="ionicon" color="#fb4896" size={20} />
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

OrderTimeline.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(OrderTimeline));
