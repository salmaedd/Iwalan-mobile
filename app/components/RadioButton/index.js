import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

const RadioButton = ({
  selected,
  onPress,
  style,
  textStyle,

  text = '',
  ...props
}) => (
  <View style={styles.main}>
    <TouchableOpacity style={[styles.checkBox, style]} onPress={onPress} {...props}>
      <Icon
        size={Mixins.WINDOW_WIDTH >= 768 ? Spacing.SCALE_40 : Spacing.SCALE_40}
        color={!selected ? '#e4e8ef' : '#fb4896'}
        name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
      />
      <View style={{ marginLeft: Spacing.SCALE_4 }}>
        <Text style={styles.radioText}>{text}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  main: {
    marginRight: Spacing.SCALE_6,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: Mixins.WINDOW_WIDTH >= 768 ? Typography.FONT_SIZE_18 : Typography.FONT_SIZE_16,
    color: '#7a879d',
    //fontWeight: "bold",
    fontFamily: 'SofiaProRegular',
  },
});

export default RadioButton;
