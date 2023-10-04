/**
 *
 * PasswordInput
 *
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Colors, Spacing, Typography, Mixins } from '../../styles';

import Alert from '../../assets/svg/alert';
import Hide from '../../assets/svg/hide';
import Show from '../../assets/svg/show';
// import PropTypes from 'prop-types';

export const styles = StyleSheet.create({
  passSection: {
    flex: 1,
    height: Spacing.SCALE_56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e4e8ef',
    borderStyle: 'solid',
    backgroundColor: '#e4e8ef',
    borderRadius: 20,
    paddingRight: Spacing.SCALE_4,
  },
  passInput: {
    flex: 1,
    height: '90%',
    backgroundColor: '#e4e8ef',
    borderRadius: 20,
    color: '#24378B',
    padding: Spacing.SCALE_0,
    alignSelf: 'center',
    marginHorizontal: Spacing.SCALE_20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  clickableIconStyle: {
    paddingVertical: Spacing.SCALE_10,
    paddingRight: Spacing.SCALE_14,
    paddingLeft: Spacing.SCALE_8,
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
    borderRadius: 50,
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

function PasswordInput(props) {
  const { lang, placeholder, errorsVisible, errors, handleChange } = props;

  const [secure, setSecure] = React.useState(props.secure);
  return (
    <>
      <View style={[styles.passSection, errorsVisible && errors ? styles.errorField : styles.correctField]}>
        {lang === 'ar' ? (
          <>
            {!secure && (
              <TouchableOpacity style={styles.clickableIconStyle} onPress={() => setSecure(!secure)}>
                <Show height={Spacing.SCALE_24} width={Spacing.SCALE_24} />
              </TouchableOpacity>
            )}
            {secure && (
              <TouchableOpacity style={styles.clickableIconStyle} onPress={() => setSecure(!secure)}>
                <Hide height={Spacing.SCALE_24} width={Spacing.SCALE_24} />
              </TouchableOpacity>
            )}
            <TextInput
              //   lang={lang}
              style={{ ...styles.passInput, textAlign: 'right' }}
              placeholder={placeholder}
              secureTextEntry={!secure}
              onChangeText={handleChange}
              error={errors}
              placeholderTextColor="#7A879D"
            />
            {errorsVisible && errors && (
              <View style={{ marginRight: lang === 'ar' ? 10 : 0 }}>
                <Alert height={Spacing.SCALE_24} width={Spacing.SCALE_24} />
              </View>
            )}
          </>
        ) : (
          <>
            <TextInput
              style={styles.passInput}
              placeholder={placeholder}
              secureTextEntry={!secure}
              onChangeText={handleChange}
              error={errors}
              placeholderTextColor="#7A879D"
            />
            {errorsVisible && errors && <Alert height={Spacing.SCALE_24} width={Spacing.SCALE_24} />}
            {!secure && (
              <TouchableOpacity style={styles.clickableIconStyle} onPress={() => setSecure(!secure)}>
                <Show height={Spacing.SCALE_24} width={Spacing.SCALE_24} />
              </TouchableOpacity>
            )}
            {secure && (
              <TouchableOpacity style={styles.clickableIconStyle} onPress={() => setSecure(!secure)}>
                <Hide height={Spacing.SCALE_24} width={Spacing.SCALE_24} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {errorsVisible && errors && (
        <View
          style={{
            ...styles.errorSection,
            alignSelf: lang === 'ar' ? 'flex-end' : 'flex-start',
            marginRight: lang === 'ar' ? 10 : 0,
          }}>
          <View style={styles.errorMark} />
          <Text style={styles.errorText}>{errors}</Text>
        </View>
      )}
    </>
  );
}

PasswordInput.propTypes = {};

export default memo(PasswordInput);
