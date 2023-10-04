import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import { Colors, Spacing, Typography, Mixins } from '../../styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  boxContainer: {
    width: Spacing.SCALE_80,
    height: Spacing.SCALE_80,
    backgroundColor: Colors.WHITE,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: Spacing.SCALE_20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.SCALE_28,
  },
  singleAvatar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.SCALE_4,
    marginVertical: Spacing.SCALE_16,
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    marginHorizontal: Spacing.SCALE_4,
  },
  closeButton: {
    width: Spacing.SCALE_32,
    height: Spacing.SCALE_32,
    borderRadius: Spacing.SCALE_50,
    backgroundColor: Colors.PINK,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: Spacing.SCALE_6,
  },
});

function CategoryElement(props) {
  return (
    <>
      <TouchableWithoutFeedback onPress={props.onPress} style={styles.singleAvatar}>
        <View style={[styles.boxContainer, { borderColor: props.selected ? Colors.PINK : Colors.BACK_GRAY }]}>
          <SvgUri
            height={Spacing.SCALE_24}
            width={Spacing.SCALE_24}
            fill={props.selected ? Colors.PINK : Colors.DARK_GRAY}
            source={{ uri: props.image }}
          />
          <Text style={{ ...styles.title, color: props.selected ? Colors.PINK : Colors.DARK_GRAY }} numberOfLines={1}>
            {props.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {props.selected && (
        // <View style={{ marginHorizontal: Spacing.SCALE_4 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#c40055', '#fb4896']}
          style={styles.closeButton}>
          <TouchableOpacity onPress={props.onRemove}>
            <Icon name="close" type="ionicon" color={Colors.WHITE} />
          </TouchableOpacity>
        </LinearGradient>
        // </View>
      )}
    </>
  );
}

export default CategoryElement;
