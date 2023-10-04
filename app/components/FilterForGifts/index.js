/**
 *
 * Filter
 *
 */

import React, { memo } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
// import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import { Divider, Overlay } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import checkMark from '../../assets/check.png';
import Close from '../../assets/close.png';
import Pause from '../../assets/pause.png';
import { Colors, Spacing, Typography, Mixins } from '../../styles';

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
  headerStyle: {
    width: '100%',
    height: Spacing.SCALE_60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Platform.OS === 'ios' ? Spacing.SCALE_20 : Spacing.SCALE_10,
  },
  reset: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#fb4896',
    marginTop: Spacing.SCALE_4,
  },
  filterTitle: {
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#7a879d',
  },
  title: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    color: '#24378b',
  },
  titleGo: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
    color: '#7a879d',
  },
  sliderContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  valueLabel: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: Spacing.SCALE_10,
    marginHorizontal: Spacing.SCALE_10,
  },
  valueText: {
    color: '#7a879d',
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  selectCriteria: {
    height: Spacing.SCALE_50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  selected: {
    color: '#fb4896',
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  unselected: {
    color: '#7a879d',
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  backIcon: {
    width: Spacing.SCALE_24,
    height: Spacing.SCALE_24,
  },
});

function Filter(props) {
  const [selectedPoints, setSelectedPoints] = React.useState(false);
  const [openGifts, setOpenGifts] = React.useState(false);
  const [selectedHightPoints, setSelectedHightPoints] = React.useState(false);

  const sortFunc = text => {
    if (text === 'Points') {
      setSelectedPoints(!selectedPoints);
      setOpenGifts(false);
      setSelectedHightPoints(false);
      if (selectedPoints === false) {
        props.setSort(text);
      } else {
        props.setSort('');
      }
    } else if (text === 'Open') {
      setSelectedPoints(false);
      setOpenGifts(!openGifts);
      setSelectedHightPoints(false);
      if (openGifts === false) {
        props.setSort(text);
      } else {
        props.setSort('');
      }
    } else if (text === 'HighPoints') {
      setSelectedPoints(false);
      setOpenGifts(false);
      setSelectedHightPoints(!selectedHightPoints);
      if (selectedHightPoints === false) {
        props.setSort(text);
      } else {
        props.setSort('');
      }
    } else {
      props.setSort('');
    }
  };

  const resetFilter = () => {
    props.setMultiSliderValue([0, 30000]);
    props.setSort('');
    setSelectedPoints(false);
    setOpenGifts(false);
    setSelectedHightPoints(false);
  };

  return (
    <Overlay
      supportedOrientations={['portrait', 'landscape']}
      overlayStyle={styles.overlaycontainer}
      isVisible={props.visible}
      onBackdropPress={props.toggleOverlay}>
      <View style={styles.headerStyle}>
        {props.language === 'ar' ? (
          <>
            <TouchableOpacity underlayColor="transparent" onPress={props.toggleOverlay}>
              <Image source={Close} style={styles.backIcon} />
            </TouchableOpacity>

            <Text style={{ ...styles.filterTitle, marginBottom: -10 }}>
              {props.intl.formatMessage({ id: 'app.components.ForGift.filterAndSort' })}
            </Text>

            <TouchableOpacity underlayColor="transparent" onPress={resetFilter}>
              <Text style={styles.reset}>{props.intl.formatMessage({ id: 'app.components.ForGift.reset' })}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity underlayColor="transparent" onPress={resetFilter}>
              <Text style={styles.reset}>{props.intl.formatMessage({ id: 'app.components.ForGift.reset' })}</Text>
            </TouchableOpacity>

            <Text style={styles.filterTitle}>
              {props.intl.formatMessage({ id: 'app.components.ForGift.filterAndSort' })}
            </Text>

            <TouchableOpacity underlayColor="transparent" onPress={props.toggleOverlay}>
              <Image source={Close} style={styles.backIcon} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Divider style={{ backgroundColor: '#000000', opacity: 0.3, marginBottom: 30 }} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 10 }}>
        <Text style={{ ...styles.title, alignSelf: props?.language === 'ar' ? 'flex-end' : 'flex-start' }}>
          {props.intl.formatMessage({ id: 'app.components.ForGift.PointeRange' })}
        </Text>
        <View style={styles.valueLabel}>
          <Text style={styles.valueText}>{props.multiSliderValue[0]} Point</Text>
          <Text style={styles.valueText}>{props.multiSliderValue[1]} Point</Text>
        </View>
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={[props.multiSliderValue[0], props.multiSliderValue[1]]}
            sliderLength={Mixins.WINDOW_WIDTH - 78}
            onValuesChange={props.multiSliderValuesChange}
            onValuesChangeFinish={props.onValuesChangeFinish}
            min={0}
            max={30000}
            step={1}
            allowOverlap
            snapped
            minMarkerOverlapDistance={40}
            trackStyle={{
              height: 4,
              backgroundColor: '#f2f4f8',
            }}
            selectedStyle={{
              backgroundColor: '#fb4896',
            }}
            containerStyle={{
              marginBottom: 10,
            }}
            customMarker={() => <Image source={Pause} style={styles.backIcon} />}
          />
        </View>

        <Text style={{ ...styles.title, alignSelf: props?.language === 'ar' ? 'flex-end' : 'flex-start' }}>
          {props.intl.formatMessage({ id: 'app.components.ForGift.sort' })}
        </Text>

        <View style={{ alignSelf: props.language === 'ar' ? 'flex-end' : 'flex-start' }}>
          <TouchableOpacity underlayColor="transparent" onPress={() => sortFunc('Points')}>
            <View style={styles.selectCriteria}>
              <Text style={selectedPoints ? styles.selected : styles.unselected}>
                {props.intl.formatMessage({ id: 'app.components.ForGift.priceLH' })}
              </Text>
              {selectedPoints && <Image source={checkMark} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity underlayColor="transparent" onPress={() => sortFunc('Open')}>
            <View style={styles.selectCriteria}>
              <Text style={openGifts ? styles.selected : styles.unselected}>
                {props.intl.formatMessage({ id: 'app.components.ForGift.openGifts' })}
              </Text>
              {openGifts && <Image source={checkMark} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity underlayColor="transparent" onPress={() => sortFunc('HighPoints')}>
            <View style={styles.selectCriteria}>
              <Text style={selectedHightPoints ? styles.selected : styles.unselected}>
                {props.intl.formatMessage({ id: 'app.components.ForGift.priceHL' })}
              </Text>
              {selectedHightPoints && <Image source={checkMark} />}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Overlay>
  );
}

Filter.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(Filter));
