/**
 *
 * Input
 *
 */

import React, { memo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Alert from '../../assets/svg/alert';
import { Spacing, Typography } from '../../styles';

// import PropTypes from 'prop-types';

export const styles = StyleSheet.create({
  inputSection: {
    flex: 1,
    height: Spacing.SCALE_56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e4e8ef',
    borderStyle: 'solid',
    backgroundColor: '#e4e8ef',
    borderRadius: Spacing.SCALE_20,
    paddingRight: Spacing.SCALE_4,
  },
  input: {
    flex: 1,
    height: '90%',
    backgroundColor: '#e4e8ef',
    borderRadius: Spacing.SCALE_20,
    color: '#24378B',
    padding: Spacing.SCALE_0,
    alignSelf: 'center',
    marginHorizontal: Spacing.SCALE_20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  prefix: {
    color: '#7A879D',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    marginLeft: Spacing.SCALE_15,
    marginRight: Spacing.SCALE_2,
  },
  correctField: {
    borderWidth: Spacing.SCALE_0,
  },
  errorField: {
    borderWidth: Spacing.SCALE_2,
    borderColor: '#ff0000',
  },
  errorSection: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  errorMark: {
    backgroundColor: '#ff0000',
    height: Spacing.SCALE_4,
    width: Spacing.SCALE_4,
    borderRadius: Spacing.SCALE_50,
    alignSelf: 'center',
    marginRight: Spacing.SCALE_5,
  },
  errorText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
    color: '#ff0000',
    alignSelf: 'flex-start',
  },
});

function Input(props) {
  const { lang, placeholder, errorsVisible, errors, handleChange, prefix, keyboardType, containerStyle, style } = props;
  return (
    <View style={[{ flex: 1, width: '100%' }, style]}>
      <View
        style={[
          styles.inputSection,
          errorsVisible && errors ? styles.errorField : styles.correctField,
          containerStyle,
        ]}>
        {prefix && <Text style={{ ...styles.prefix }}>{prefix}</Text>}
        <TextInput
          keyboardType={keyboardType}
          style={[styles.input, { textAlign: lang && lang === 'ar' ? 'right' : 'left' }, prefix && { marginLeft: 0 }]}
          placeholder={placeholder}
          onChangeText={handleChange}
          error={errors}
          placeholderTextColor="#7A879D"
        />
        {errorsVisible && errors && (
          <Alert height={Spacing.SCALE_24} width={Spacing.SCALE_24} style={{ marginRight: Spacing.SCALE_8 }} />
        )}
      </View>
      {errorsVisible && errors && (
        <View
          style={{
            ...styles.errorSection,
            alignSelf: lang && lang === 'ar' ? 'flex-end' : 'flex-start',
            marginRight: lang && lang === 'ar' ? Spacing.SCALE_8 : 0,
          }}>
          <View style={styles.errorMark} />
          <Text style={styles.errorText}>{errors}</Text>
        </View>
      )}
    </View>
  );
}

Input.propTypes = {};

export default memo(Input);
