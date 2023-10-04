/**
 *
 * DropDown
 *
 */

import React, { memo } from 'react';

import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import { ListItem, Overlay } from 'react-native-elements';

export const styles = StyleSheet.create({
  overlaycontainer: {
    width: '100%',
    //height: '50%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderTopRightRadius: Spacing.SCALE_20,
    borderTopLeftRadius: Spacing.SCALE_20,
  },
  element: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export function DropDown(props) {
  const keyExtractor = (item, index) => index.toString();
  const renderItem = () => {
    return (
      <Overlay
        isVisible={props.visible}
        onBackdropPress={props.toggleOverlay}
        supportedOrientations={['portrait', 'landscape']}
        overlayStyle={styles.overlaycontainer}>
        {props.list.map((element, i) => (
          <TouchableOpacity underlayColor="transparent" onPress={() => props.onElementClick(element)}>
            <ListItem key={i} bottomDivider>
              <ListItem.Content style={styles.element}>
                <ListItem.Title>{element}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </Overlay>
    );
  };
  return <FlatList keyExtractor={keyExtractor} data={props.list} renderItem={renderItem} />;
}
DropDown.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(DropDown));
