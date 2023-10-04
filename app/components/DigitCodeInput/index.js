/**
 *
 * DigitCodeInput
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: {
    width: '80%',
  },
  container: {
    marginTop: 0,
    marginLeft: Spacing.SCALE_20,
    width: '80%',
  },
  inputContainer: {
    width: Spacing.SCALE_32,
    height: Spacing.SCALE_34,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: Spacing.SCALE_2,
  },
  inactiveInput: {
    borderBottomColor: '#c0c9d8',
  },
  activeInput: {
    borderBottomColor: '#5a6880',
  },
  input: {
    color: '#24378B',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
});

const DigitCodeInput = props => {
  const [value, setValue] = useState('');
  const [pressed, setPressed] = useState(false);
  const { onChangeValue, cellCount, ...additionalProps } = props;
  const ref = useBlurOnFulfill({ value, cellCount: cellCount });
  const [onLayoutProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { onPress, ...fieldProps } = onLayoutProps;
  useEffect(() => {
    if (pressed) {
      onChangeValue(value);
      setPressed(false);
    }
  });
  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...fieldProps}
        {...additionalProps}
        onPress={event => {
          onPress(event);
          setPressed(true);
        }}
        value={value}
        onChangeText={code => {
          setValue(code);
          onChangeValue(code);
        }}
        cellCount={cellCount}
        rootStyle={styles.container}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.inputContainer, isFocused ? styles.activeInput : styles.inactiveInput]}>
            <Text style={styles.input} placeholderTextColor="#7A879D">
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

DigitCodeInput.propTypes = {};

export default memo(DigitCodeInput);
