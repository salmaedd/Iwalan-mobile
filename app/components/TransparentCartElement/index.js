/**
 *
 * TransparentCartElement
 *
 */
import React, { memo } from 'react';

import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { injectIntl, intlShape } from 'react-intl';
import Badge from '../../components/Badge';
import { DropDown } from '../DropDown';
import QuantityBox from '../../components/QuantityBox';
import Close from '../../assets/close.png';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

export const styles = StyleSheet.create({
  priceTotal: {
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: 'bold',
    color: '#3b3b3b',
  },
  priceMad: {
    fontSize: Typography.FONT_SIZE_10,
    color: '#7a879d',
    marginRight: 5,
  },
  image: {
    width: Spacing.SCALE_70,
    height: Spacing.SCALE_70,
    marginRight: Spacing.SCALE_20,
    alignSelf: 'flex-start',
  },
  badgeArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    width: Mixins.WINDOW_WIDTH - 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: Spacing.SCALE_20,
    padding: Spacing.SCALE_15,
    marginBottom: Spacing.SCALE_10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#e4e8ef',
    opacity: 0.6,
  },
  designation: {
    fontSize: Typography.FONT_SIZE_16,
    color: '#7a879d',
    marginBottom: Spacing.SCALE_10,
  },
  dropDown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  outerDropDown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.SCALE_10,
  },
  label: {
    fontSize: Typography.FONT_SIZE_14,
    color: '#7a879d',
    marginRight: 5,
  },
  value: {
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: '#5a6880',
    marginRight: Spacing.SCALE_10,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  total: {
    fontSize: Typography.FONT_SIZE_14,
    color: '#7a879d',
  },
  addToCart: {
    position: 'absolute',
    top: 65,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 167,
    height: Spacing.SCALE_40,
    borderRadius: Spacing.SCALE_20,
    backgroundColor: '#fb4896',
    opacity: 1,
  },
});

function TransparentCartElement(props) {
  return (
    <View>
      <View style={styles.card}>
        <Image source={{ uri: props.url_image }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text style={styles.designation}>{props.designation}</Text>
          <View style={styles.badgeArea}>
            <Text style={styles.priceTotal}>
              {props.price} <Text style={styles.priceMad}>MAD</Text>
            </Text>
            <View style={{ display: 'flex', justifyContent: 'center', right: -90 }}>
              <Badge score={230} />
            </View>
          </View>
          <View style={styles.outerDropDown}>
            <View style={styles.dropDown}>
              <Text style={styles.label}>
                {props.intl.formatMessage({ id: 'app.components.TransparentCartElement.color' })}
              </Text>
              <TouchableOpacity underlayColor="transparent" onPress={props.toggleOverlay}>
                <Text style={styles.value}>{props.color} -</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dropDown}>
              <Text style={styles.label}>
                {props.intl.formatMessage({ id: 'app.components.TransparentCartElement.capacity' })}
              </Text>
              <TouchableOpacity underlayColor="transparent" onPress={props.toggleOverlayCapacity}>
                <Text style={styles.value}>{props.capacity} go -</Text>
              </TouchableOpacity>
            </View>
            {/* <Image source={{}} /> */}
            <DropDown
              onElementClick={props.onElementClick}
              visible={props.visible}
              toggleOverlay={props.toggleOverlay}
              list={props.colors}
            />
            <DropDown
              onElementClick={props.onElementClickCapacity}
              visible={props.visibleCapacity}
              toggleOverlay={props.toggleOverlayCapacity}
              list={props.capacities}
            />
          </View>
          <View style={styles.quantity}>
            <Text style={[styles.label, { marginRight: 15 }]}>
              {props.intl.formatMessage({ id: 'app.components.TransparentCartElement.qty' })}
            </Text>
            <QuantityBox count={props.counter} onLeftPress={props.onLeftPress} onRightPress={props.onRightPress} />
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start' }}>
          <TouchableOpacity underlayColor="transparent" onPress={props.removeFromCart}>
            <Image source={Close} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.addToCart} underlayColor="transparent" onPress={props.addToCart}>
        <Text style={[styles.total, { color: Colors.WHITE, fontWeight: Typography.FONT_WEIGHT_BOLD }]}>
          {props.intl.formatMessage({ id: 'app.components.TransparentCartElement.add' })}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

TransparentCartElement.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(TransparentCartElement));
