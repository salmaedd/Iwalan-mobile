/**
 *
 * Product
 *
 */

import React, { memo } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { ActivityIndicator, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Image } from 'react-native-elements';
import Badge from '../../components/Badge';
import { Colors, Mixins, Spacing, Typography } from '../../styles';

export const styles = StyleSheet.create({
  main: {
    height: Spacing.SCALE_200,
    marginVertical: Spacing.SCALE_6,
    marginHorizontal: Spacing.SCALE_6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    paddingVertical: Spacing.SCALE_10,
  },
  boxShadow: {
    shadowColor: Mixins.boxShadow().color,
    shadowOffset: Mixins.boxShadow().shadowOffset,
    shadowOpacity: Mixins.boxShadow().shadowOpacity,
    shadowRadius: Mixins.boxShadow().shadowRadius,
    elevation: Mixins.boxShadow().elevation,
  },
  productContainer: {
    width: Spacing.SCALE_90,
    height: Spacing.SCALE_110,
  },
  productNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.SCALE_10,
    marginVertical: Platform.OS === 'ios' ? Spacing.SCALE_8 : Spacing.SCALE_4,
  },
  productName: {
    color: '#24378b',
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    textAlign: 'center',
  },
  priceDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  oldPrice: {
    color: '#7a879d',
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_12,
    textDecorationLine: 'line-through',
    marginRight: Spacing.SCALE_4,
  },
  newPrice: {
    color: '#3b3b3b',
    fontFamily: 'SofiaProBold',
    fontSize: Typography.FONT_SIZE_16,
  },
  madStyle: {
    color: '#7a879d',
    fontFamily: 'SofiaProBold',
    fontSize: Typography.FONT_SIZE_10,
  },
});

function Product(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View
        style={[
          styles.main,
          props.boxShadow && styles.boxShadow,
          { width: props.isRecomandedProduct ? Spacing.SCALE_148 : Spacing.SCALE_180 },
        ]}>
        <View style={styles.productContainer}>
          <Image
            source={{ uri: props?.imageURL?.toString() }}
            style={styles.productContainer}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>

        <Badge lang={props.lang} score={props.score} secondary={props.secondary} />

        <View style={styles.productNameContainer}>
          {/* <TextTicker
            style={styles.productName}
            scrollSpeed={400}
            easing={Easing.linear}
            loop
            bounce={false}
            marqueeDelay={1000}
          >
          {props?.designation}
          </TextTicker> */}
          <Text numberOfLines={2} style={styles.productName}>
            {props?.designation}
          </Text>
        </View>
        <View style={styles.priceDiv}>
          {props.oldPrice && <Text style={styles.oldPrice}>{props.oldPrice} MAD</Text>}
          <Text style={styles.newPrice}>
            {props?.price}
            <Text style={styles.madStyle}> MAD</Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

Product.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(Product));
