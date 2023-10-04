import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Spacing, Typography } from '../../styles';

const styles = StyleSheet.create({
  quantityView: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Spacing.SCALE_40,
    height: Spacing.SCALE_40,
    borderTopLeftRadius: Spacing.SCALE_11,
    borderBottomLeftRadius: Spacing.SCALE_11,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.BACK_GRAY,
  },
  rightButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Spacing.SCALE_40,
    height: Spacing.SCALE_40,
    borderTopRightRadius: Spacing.SCALE_11,
    borderBottomRightRadius: Spacing.SCALE_11,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.BACK_GRAY,
  },
  buttonText: {
    color: Colors.DARK_GRAY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_14,
  },
  middleDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Spacing.SCALE_60,
    height: Spacing.SCALE_40,
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.BACK_GRAY,
  },
  input: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_12,
    lineHeight: Typography.LINE_HEIGHT_12,
    height: Spacing.SCALE_40,
    color: Colors.DARK_GRAY,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
function correctValue(value, min, max) {
  let correct = { value, minError: false, maxError: false };
  if (!max || value <= max) {
    if (value < min) correct.minError = true;
  } else {
    correct.maxError = true;
    correct.value = max;
  }
  return correct;
}

function QuantityBox({
  count,
  onLeftPress,
  onRightPress,
  setCounter,
  updateQuantity,
  id,
  onMinError,
  onMaxError,
  clearErrors,
  max,
  min = 1,
  onPress,
  language,
}) {
  return (
    <View style={styles.quantityView}>
      {language === 'ar' ? (
        <>
          <TouchableOpacity underlayColor="transparent" onPress={onRightPress}>
            <View style={styles.rightButton}>
              <Text style={styles.buttonText}>+</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.middleDiv}>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={count.toString()}
              onChangeText={value => {
                clearErrors();
                value = value !== '' ? parseInt(value) : 0;
                const correctedValue = correctValue(value, min, max);
                //  console.log('in in ----', correctedValue);
                setCounter(correctedValue.value);
                updateQuantity(correctedValue.value, id);

                if (correctedValue.minError) onMinError();
                else if (correctedValue.maxError) onMaxError();
              }}
              maxLength={3}
              onPress={onPress}
            />
          </View>
          <TouchableOpacity underlayColor="transparent" onPress={onLeftPress}>
            <View style={styles.leftButton}>
              <Text style={styles.buttonText}>-</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity underlayColor="transparent" onPress={onLeftPress}>
            <View style={styles.leftButton}>
              <Text style={styles.buttonText}>-</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.middleDiv}>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={count.toString()}
              onChangeText={value => {
                clearErrors();
                value = value !== '' ? parseInt(value) : 0;
                const correctedValue = correctValue(value, min, max);
                //  console.log('in in ----', correctedValue);
                setCounter(correctedValue.value);
                updateQuantity(correctedValue.value, id);

                if (correctedValue.minError) onMinError();
                else if (correctedValue.maxError) onMaxError();
              }}
              maxLength={3}
              onPress={onPress}
            />
          </View>
          <TouchableOpacity underlayColor="transparent" onPress={onRightPress}>
            <View style={styles.rightButton}>
              <Text style={styles.buttonText}>+</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default QuantityBox;
