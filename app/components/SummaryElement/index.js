/**
 *
 * SubscriptionCard
 *
 */

import React, { memo } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

import { injectIntl, intlShape } from 'react-intl';

const styles = StyleSheet.create({
  elementStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.SCALE_10,
  },
  image: {
    width: Spacing.SCALE_76,
    height: Spacing.SCALE_76,
    borderRadius: Spacing.SCALE_16,
  },
  innerView: {
    marginLeft: Spacing.SCALE_16,
    marginTop: Spacing.SCALE_8,
    flex: 1,
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY,
    marginBottom: Spacing.SCALE_8,
  },
  qty: {
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DARK_GRAY,
  },
  qtyValue: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_14,
    color: '#5a6880',
  },
});

function SummaryElement(props) {
  return (
    <View style={styles.elementStyle}>
      {props.language === 'ar' ? (
        <>
          <View style={styles.innerView}>
            <Text style={styles.title}>{props?.designation || (props?.nameGift && props?.nameGift?.fr)}</Text>
            <Text style={styles.qty}>
              {props.intl.formatMessage({ id: 'app.components.SummaryElemnt.qty' })}:
              <Text style={styles.qtyValue}> {props?.quantity}</Text>
            </Text>
          </View>
          <Image
            source={{
              uri: props?.images?.images?.m?.length ? props?.images?.images?.m?.[0] : '',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </>
      ) : (
        <>
          <Image
            source={{
              uri: props?.images?.images?.m?.length ? props?.images?.images?.m?.[0] : '',
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.innerView}>
            <Text style={styles.title}>{props?.designation || (props?.nameGift && props?.nameGift?.fr)}</Text>
            <Text style={styles.qty}>
              {props.intl.formatMessage({ id: 'app.components.SummaryElemnt.qty' })}:
              <Text style={styles.qtyValue}> {props?.quantity}</Text>
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

SummaryElement.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(SummaryElement));
