import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { BackHandler, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Colors, Spacing, Typography } from '../../styles';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: Spacing.SCALE_24,
    justifyContent: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    borderRadius: Spacing.SCALE_20,
    width: Spacing.SCALE_320,
    padding: Spacing.SCALE_28,
    justifyContent: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.WHITE,
    height: Spacing.SCALE_300,
  },
  text: {
    color: '#5a6880',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    textAlign: 'center',
    // width: Spacing.SCALE_290,
  },
  textBrand: {
    color: Colors.PINK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: Spacing.SCALE_50,
    marginTop: Spacing.SCALE_20,
  },
  buttonStyle: {
    position: 'relative',
    borderRadius: Spacing.SCALE_20,
    height: Spacing.SCALE_40,
    backgroundColor: '#fb4896',
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_12,
    fontWeight: 'bold',
    marginVertical: Spacing.SCALE_6,
  },
});

function AlertModal(props) {
  useEffect(() => {
    const backAction = () => props.setIsVisible && props.setIsVisible(false);

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <Modal
      testID={'modal'}
      isVisible={props.isVisible}
      style={styles.view}
      onBackButtonPress={() => props.setIsVisible && props.setIsVisible(false)}
      customBackdrop={
        <TouchableWithoutFeedback onPress={() => props.setIsVisible && props.setIsVisible(false)}>
          <View style={{ backgroundColor: 'black', flex: 1 }} />
        </TouchableWithoutFeedback>
      }>
      <View style={{ ...styles.modalContainer, height: props.height }}>
        <Text style={styles.text}>{props.text}</Text>
        {/* <Text style={styles.textBrand}>{props.textBrand}</Text> */}

        <View style={styles.bottomContainer}>
          <Button
            title={props.cancelText ?? props.intl.formatMessage({ id: 'app.components.Alert.ok' })}
            titleStyle={{
              color: 'white',
            }}
            buttonStyle={{ ...styles.buttonStyle, backgroundColor: Colors.PINK }}
            onPress={() => props.onCancelPressed()}
          />
        </View>
      </View>
    </Modal>
  );
}

export default injectIntl(AlertModal);
