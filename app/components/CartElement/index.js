/**
 *
 * CartElement
 *
 */

import React, { useEffect } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Close from '../../assets/close.png';
import Badge from '../../components/Badge';
import QuantityBox from '../../components/QuantityBox';
import { pointsCalculator } from '../../Helpers/HelperFunctions';
import { Colors, Spacing, Typography } from '../../styles';

export const styles = StyleSheet.create({
  card: {
    width: Spacing.SCALE_384,
    // height: Spacing.SCALE_144,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#e4e8ef',
    padding: Platform.OS === 'ios' ? Spacing.SCALE_14 : Spacing.SCALE_6,
    marginBottom: Spacing.SCALE_10,
  },
  image: {
    width: Spacing.SCALE_70,
    height: Spacing.SCALE_90,
    // backgroundColor: 'red',
    // alignSelf: 'flex-start',
    // alignItems: 'center',
    // marginRight: Spacing.SCALE_20,
    // marginTop: Spacing.SCALE_10,
  },
  priceTotal: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: '#3b3b3b',
  },
  priceMad: {
    fontSize: Typography.FONT_SIZE_10,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: '#7a879d',
    marginRight: Spacing.SCALE_6,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: Platform.OS === 'ios' ? Spacing.SCALE_6 : Spacing.SCALE_4,
  },
  container: {
    // backgroundColor: 'teal',
    marginHorizontal: Platform.OS === 'ios' ? Spacing.SCALE_16 : Spacing.SCALE_8,
    marginVertical: Platform.OS === 'ios' ? Spacing.SCALE_10 : 0,
  },
  designation: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#7a879d',
    width: Spacing.SCALE_220,
  },
  outerDropDown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Platform.OS === 'ios' ? Spacing.SCALE_6 : Spacing.SCALE_4,
  },
  dropDown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: Typography.FONT_SIZE_14,
    color: '#7a879d',
    marginRight: Spacing.SCALE_4,
  },
  value: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: '#5a6880',
  },
});

function CartElement(props) {
  const [count, setCount] = React.useState(props.quantity);
  const [quantityError, setQuantityError] = React.useState(null);
  const messageErr1Parte1 = props.intl.formatMessage({ id: 'app.containers.ProductDetails.messageErr1Parte1' });
  const messageErr1Parte2 = props.intl.formatMessage({ id: 'app.containers.ProductDetails.messageErr1Parte2' });
  const messageErr2 = props.intl.formatMessage({ id: 'app.containers.ProductDetails.messageErr2' });

  useEffect(() => {
    if (count === 0) {
      setQuantityError(messageErr2);
      props.setError(true);
    }
  }, [count, props.Deposits]);

  return (
    <View style={styles.card}>
      {props?.language ? (
        <>
          <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
            <TouchableOpacity
              underlayColor="transparent"
              onPress={props.removeFromCart}
              style={{ width: 30, height: 30 }}>
              <Image source={Close} />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <Text style={styles.designation} numberOfLines={1}>
              {props.designation}
            </Text>

            <View style={styles.row}>
              <View style={{ justifyContent: 'center', left: Spacing.SCALE_100, top: Spacing.SCALE_4 }}>
                <Badge score={pointsCalculator(props.price, props.generosity)} />
              </View>
              <Text style={{ ...styles.priceTotal, marginLeft: Spacing.SCALE_140 }}>
                {props.price} <Text style={styles.priceMad}>MAD</Text>
              </Text>
            </View>

            <View style={styles.outerDropDown}>
              {props.color && (
                <View style={styles.dropDown}>
                  <TouchableOpacity
                    underlayColor="transparent"
                    style={{ width: Spacing.SCALE_60 }}
                    onPress={props.toggleOverlay}>
                    <Text style={styles.value} numberOfLines={1}>
                      {props.color}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.label}>
                    {props.intl.formatMessage({ id: 'app.components.CartElement.color' })}
                  </Text>
                </View>
              )}
              {props.color && typeof props.Capacite != 'undefined' && props.Capacite != null && (
                <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: Typography.FONT_SIZE_12 }}>
                  {' '}
                  -{' '}
                </Text>
              )}
              {typeof props.Capacite != 'undefined' && props.Capacite != null && (
                <View style={styles.dropDown}>
                  <Text style={{ ...styles.value, marginLeft: 10, marginRight: 10 }} numberOfLines={1}>
                    {props.Capacite}
                  </Text>
                  {/* <TouchableOpacity
                    underlayColor="transparent"
                    style={{ width: Spacing.SCALE_60 }}
                    onPress={props.toggleOverlayCapacity}>
                   
                  </TouchableOpacity> */}
                  <Text style={styles.label}>
                    {props.intl.formatMessage({ id: 'app.components.CartElement.capacity' })}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.row}>
              <QuantityBox
                //   language={props?.language}
                count={count}
                setCounter={setCount}
                updateQuantity={props.editProduct}
                onLeftPress={() => {
                  setQuantityError(null);
                  props.setError(false);
                  setCount(count > 0 ? count - 1 : count);
                  props.editProduct(count > 0 ? count - 1 : count, props.id);
                }}
                onRightPress={() => {
                  setQuantityError(null);
                  props.setError(false);
                  if (props?.Deposits?.length > 0 && count == props?.Deposits?.[0]?.Stocks?.quantity) {
                    setQuantityError(
                      `${messageErr1Parte1} ${props?.Deposits?.[0]?.Stocks?.quantity} ${messageErr1Parte2}`,
                    );
                    props.setError(false);
                  }
                  setCount(count < props?.Deposits?.[0]?.Stocks?.quantity ? count + 1 : count);
                  props.editProduct(count < props?.Deposits?.[0]?.Stocks?.quantity ? count + 1 : count, props.id);
                }}
                id={props.id}
                onMinError={() => setQuantityError(messageErr2)}
                onMaxError={() => {
                  if (props?.Deposits?.length > 0)
                    setQuantityError(`${messageErr1Parte1} ${props.Deposits[0].Stocks?.quantity} ${messageErr1Parte2}`);
                }}
                clearErrors={() => setQuantityError(null)}
                max={props?.Deposits?.[0]?.Stocks?.quantity}
                onPress={props?.onQuantityPress}
              />
              <Text style={[styles.label, { marginLeft: Spacing.SCALE_16 }]}>
                {props.intl.formatMessage({ id: 'app.components.CartElement.qty' })}
              </Text>
            </View>

            <View style={{ marginLeft: Spacing.SCALE_60 }}>
              <Text
                style={{
                  color: 'red',
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}>
                {quantityError}
              </Text>
            </View>
          </View>
          <View style={styles.image}>
            <Image
              source={{ uri: props?.images?.main?.m }}
              style={{ width: Spacing.SCALE_70, height: Spacing.SCALE_90 }}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.image}>
            <Image
              source={{ uri: props?.images?.main?.m }}
              style={{ width: Spacing.SCALE_70, height: Spacing.SCALE_90 }}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.designation} numberOfLines={1}>
              {props.designation}
            </Text>
            <View style={styles.row}>
              <Text style={styles.priceTotal}>
                {props.price} <Text style={styles.priceMad}>MAD</Text>
              </Text>
              <View style={{ justifyContent: 'center', left: Spacing.SCALE_100, top: Spacing.SCALE_4 }}>
                <Badge score={pointsCalculator(props.price, props.generosity)} />
              </View>
            </View>
            <View style={styles.outerDropDown}>
              {props.color && (
                <View style={styles.dropDown}>
                  <Text style={styles.label}>
                    {props.intl.formatMessage({ id: 'app.components.CartElement.color' })}
                  </Text>
                  <TouchableOpacity
                    underlayColor="transparent"
                    style={{ width: Spacing.SCALE_60 }}
                    onPress={props.toggleOverlay}>
                    <Text style={styles.value} numberOfLines={1}>
                      {props.color}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {props.color && typeof props.Capacite != 'undefined' && props.Capacite != null && (
                <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: Typography.FONT_SIZE_12 }}>
                  {' '}
                  -{' '}
                </Text>
              )}
              {typeof props.Capacite != 'undefined' && props.Capacite != null && (
                <View style={styles.dropDown}>
                  <Text style={styles.label}>
                    {props.intl.formatMessage({ id: 'app.components.CartElement.capacity' })}
                  </Text>
                  <TouchableOpacity
                    underlayColor="transparent"
                    style={{ width: Spacing.SCALE_60 }}
                    onPress={props.toggleOverlayCapacity}>
                    <Text style={styles.value} numberOfLines={1}>
                      {props.Capacite}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { marginRight: Spacing.SCALE_16 }]}>
                {props.intl.formatMessage({ id: 'app.components.CartElement.qty' })}
              </Text>
              <QuantityBox
                count={count}
                setCounter={setCount}
                updateQuantity={props.editProduct}
                onLeftPress={() => {
                  setQuantityError(null);
                  props.setError(false);
                  setCount(count > 0 ? count - 1 : count);
                  props.editProduct(count > 0 ? count - 1 : count, props.id);
                }}
                onRightPress={() => {
                  setQuantityError(null);
                  props.setError(false);
                  if (props?.Deposits?.length > 0 && count == props?.Deposits?.[0]?.Stocks?.quantity) {
                    setQuantityError(
                      `${messageErr1Parte1} ${props?.Deposits?.[0]?.Stocks?.quantity} ${messageErr1Parte2}`,
                    );
                    props.setError(false);
                  }
                  setCount(count < props?.Deposits?.[0]?.Stocks?.quantity ? count + 1 : count);
                  props.editProduct(count < props?.Deposits?.[0]?.Stocks?.quantity ? count + 1 : count, props.id);
                }}
                id={props.id}
                onMinError={() => setQuantityError(messageErr2)}
                onMaxError={() => {
                  if (props?.Deposits?.length > 0)
                    setQuantityError(`${messageErr1Parte1} ${props.Deposits[0].Stocks?.quantity} ${messageErr1Parte2}`);
                }}
                clearErrors={() => setQuantityError(null)}
                max={props?.Deposits?.[0]?.Stocks?.quantity}
                onPress={props?.onQuantityPress}
              />
            </View>
            <View style={{ marginLeft: Spacing.SCALE_60 }}>
              <Text
                style={{
                  color: 'red',
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}>
                {quantityError}
              </Text>
            </View>
          </View>

          <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
            <TouchableOpacity
              underlayColor="transparent"
              onPress={props.removeFromCart}
              style={{ width: 30, height: 30 }}>
              <Image source={Close} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

CartElement.propTypes = {
  intl: intlShape,
};

export default injectIntl(CartElement);
