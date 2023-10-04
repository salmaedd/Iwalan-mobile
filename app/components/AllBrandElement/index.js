import React from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Image } from 'react-native-elements';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

const styles = StyleSheet.create({
  avatarStyle: {
    width: Spacing.SCALE_120,
    height: Spacing.SCALE_120,
    borderRadius: Spacing.SCALE_60,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#e4e8ef',
    backgroundColor: Colors.WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: Spacing.SCALE_4,
    marginTop: Spacing.SCALE_6,
  },
  closeButton: {
    width: Spacing.SCALE_32,
    height: Spacing.SCALE_32,
    borderRadius: Platform.OS === 'ios' ? Spacing.SCALE_50 : Spacing.SCALE_14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: -Spacing.SCALE_8,
    shadowColor: '#fb4896',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: Spacing.SCALE_10,
    elevation: 9,
  },
});

function BrandElement(props) {
  return (
    <TouchableOpacity underlayColor="transparent" onPress={props.onPress}>
      <View key={props.id} style={{ ...styles.avatarStyle, borderColor: props.isActive ? '#fb4896' : '#e4e8ef' }}>
        <Image
          source={{ uri: props?.image?.toString() ?? '' }}
          style={{ width: Spacing.SCALE_100, height: Spacing.SCALE_70 }}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="center"
        />
        {props.isActive && (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#c40055', '#fb4896']}
            style={styles.closeButton}>
            <TouchableOpacity underlayColor="transparent" onPress={props.onRemove}>
              <Icon name="close" type="ionicon" color={Colors.WHITE} />
            </TouchableOpacity>
          </LinearGradient>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default BrandElement;
