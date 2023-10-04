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
import RadioButton from '../RadioButton';

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
  const [radio16, setRadio16] = React.useState(false);
  const [radio32, setRadio32] = React.useState(false);
  const [radio64, setRadio64] = React.useState(false);
  const [radio120, setRadio120] = React.useState(false);
  const [radio256, setRadio256] = React.useState(false);

  const [radioRam2, setRadioRam2] = React.useState(false);
  const [radioRam4, setRadioRam4] = React.useState(false);
  const [radioRam8, setRadioRam8] = React.useState(false);
  const [radioRam12, setRadioRam12] = React.useState(false);
  const [radioRam16, setRadioRam16] = React.useState(false);

  const [selectedPrice, setSelectedPrice] = React.useState(false);
  const [newestFirst, setNewestFirst] = React.useState(false);
  const [selectedPriceHigh, setSelectedPriceHigh] = React.useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = React.useState(false);

  const sortFunc = text => {
    if (text === 'price') {
      setSelectedPrice(!selectedPrice);
      setNewestFirst(false);
      setSelectedPriceHigh(false);
      setLoyaltyPoints(false);
      if (selectedPrice === false) {
        props.setSort(text);
      } else {
        props.setSort('');
      }
    } else if (text === 'newest') {
      setSelectedPrice(false);
      setNewestFirst(!newestFirst);
      setSelectedPriceHigh(false);
      setLoyaltyPoints(false);
      if (newestFirst === false) {
        props.setSort(text);
      } else {
        props.setSort('');
      }
    } else if (text === 'highPrice') {
      setSelectedPrice(false);
      setNewestFirst(false);
      setSelectedPriceHigh(!selectedPriceHigh);
      setLoyaltyPoints(false);
      if (selectedPriceHigh === false) {
        props.setSort(text);
      } else {
        props.setSort('');
      }
    } else if (text === 'loyaltyPoints') {
      setSelectedPrice(false);
      setNewestFirst(false);
      setSelectedPriceHigh(false);
      setLoyaltyPoints(!loyaltyPoints);
      if (loyaltyPoints === false) {
        props.setSort(text);
      } else {
        props.setSort('');
      }
    } else {
      props.setSort('');
    }
  };

  const radioButtonCapacity = text => {
    if (text === '16') {
      setRadio16(!radio16);
      setRadio32(false);
      setRadio64(false);
      setRadio120(false);
      setRadio256(false);
      if (radio16 === false) {
        props.setCapacity(text);
      } else {
        props.setCapacity('');
      }
    } else if (text === '32') {
      setRadio16(false);
      setRadio32(!radio32);
      setRadio64(false);
      setRadio120(false);
      setRadio256(false);
      if (radio32 === false) {
        props.setCapacity(text);
      } else {
        props.setCapacity('');
      }
    } else if (text === '64') {
      setRadio16(false);
      setRadio32(false);
      setRadio64(!radio64);
      setRadio120(false);
      setRadio256(false);
      if (radio64 === false) {
        props.setCapacity(text);
      } else {
        props.setCapacity('');
      }
    } else if (text === '128') {
      setRadio16(false);
      setRadio32(false);
      setRadio64(false);
      setRadio120(!radio120);
      setRadio256(false);
      if (radio120 === false) {
        props.setCapacity(text);
      } else {
        props.setCapacity('');
      }
    } else if (text === '256') {
      setRadio16(false);
      setRadio32(false);
      setRadio64(false);
      setRadio120(false);
      setRadio256(!radio256);
      if (radio256 === false) {
        props.setCapacity(text);
      } else {
        props.setCapacity('');
      }
    } else {
      props.setCapacity('');
    }
  };
  const radioButtonRam = text => {
    if (text === '2') {
      setRadioRam2(!radioRam2);
      setRadioRam4(false);
      setRadioRam8(false);
      setRadioRam12(false);
      setRadioRam16(false);
      if (radioRam2 === false) {
        props.setRam(text);
      } else {
        props.setRam('');
      }
    } else if (text === '4') {
      setRadioRam4(!radioRam4);
      setRadioRam8(false);
      setRadioRam2(false);
      setRadioRam12(false);
      setRadioRam16(false);
      if (radioRam4 === false) {
        props.setRam(text);
      } else {
        props.setRam('');
      }
    } else if (text === '8') {
      setRadioRam4(false);
      setRadioRam8(!radioRam8);
      setRadioRam12(false);
      setRadioRam2(false);
      setRadioRam16(false);
      if (radioRam8 === false) {
        props.setRam(text);
      } else {
        props.setRam('');
      }
    } else if (text === '12') {
      setRadioRam2(false);
      setRadioRam4(false);
      setRadioRam8(false);
      setRadioRam12(!radioRam12);
      setRadioRam16(false);
      if (radioRam12 === false) {
        props.setRam(text);
      } else {
        props.setRam('');
      }
    } else if (text === '16') {
      setRadioRam2(false);
      setRadioRam4(false);
      setRadioRam8(false);
      setRadioRam12(false);
      setRadioRam16(!radioRam16);
      if (radioRam16 === false) {
        props.setRam(text);
      } else {
        props.setRam('');
      }
    } else {
      props.setRam('');
    }
  };

  const resetFilter = () => {
    // props.setFilterCount(0);
    props.setMultiSliderValue([0, 15000]);
    props.setRam('');
    props.setCapacity('');
    props.setSort('');

    setSelectedPrice(false);
    setNewestFirst(false);
    setSelectedPriceHigh(false);
    setLoyaltyPoints(false);
    setRadioRam2(false);
    setRadioRam4(false);
    setRadioRam8(false);
    setRadioRam12(false);
    setRadioRam16(false);
    setRadio16(false);
    setRadio32(false);
    setRadio64(false);
    setRadio120(false);
    setRadio256(false);
  };

  return (
    <Overlay
      supportedOrientations={['portrait', 'landscape']}
      overlayStyle={styles.overlaycontainer}
      isVisible={props.visible}
      onBackdropPress={props.toggleOverlay}>
      {props?.lang === 'ar' ? (
        <View style={{ ...styles.headerStyle, marginTop: -10 }}>
          <TouchableOpacity underlayColor="transparent" onPress={props?.toggleOverlay}>
            <Image source={Close} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={{ ...styles.filterTitle, marginTop: -2 }}>
            {props.intl.formatMessage({ id: 'app.components.Filter.filterAndSort' })}
          </Text>

          <TouchableOpacity underlayColor="transparent" onPress={resetFilter}>
            <Text style={styles.reset}>{props.intl.formatMessage({ id: 'app.components.Filter.reset' })}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.headerStyle}>
          <TouchableOpacity underlayColor="transparent" onPress={resetFilter}>
            <Text style={styles.reset}>{props.intl.formatMessage({ id: 'app.components.Filter.reset' })}</Text>
          </TouchableOpacity>
          <Text style={styles.filterTitle}>
            {props.intl.formatMessage({ id: 'app.components.Filter.filterAndSort' })}
          </Text>
          <TouchableOpacity underlayColor="transparent" onPress={props?.toggleOverlay}>
            <Image source={Close} style={styles.backIcon} />
          </TouchableOpacity>
        </View>
      )}

      <Divider style={{ backgroundColor: '#000000', opacity: 0.3, marginBottom: 30 }} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 10 }}>
        <Text style={{ ...styles.title, alignSelf: props?.lang === 'ar' ? 'flex-end' : 'flex-start' }}>
          {props.intl.formatMessage({ id: 'app.components.Filter.priceRange' })}
        </Text>
        <View style={styles.valueLabel}>
          <Text style={styles.valueText}>{props?.multiSliderValue?.[0]} MAD</Text>
          <Text style={styles.valueText}>{props?.multiSliderValue?.[1]} MAD</Text>
        </View>
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={[props?.multiSliderValue?.[0], props?.multiSliderValue?.[1]]}
            sliderLength={Mixins.WINDOW_WIDTH - 78}
            onValuesChange={props?.multiSliderValuesChange}
            onValuesChangeFinish={props?.onValuesChangeFinish}
            min={0}
            max={15000}
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
        <View
          style={{
            flexDirection: 'row',
            marginBottom: Spacing.SCALE_10,
            alignSelf: props?.lang === 'ar' ? 'flex-end' : 'flex-start',
          }}>
          <Text style={styles.title}>{props.intl.formatMessage({ id: 'app.components.Filter.capacity' })} </Text>
          <Text style={styles.titleGo}>(go) </Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: Spacing.SCALE_10 }}>
          <RadioButton
            text={'16'}
            selected={radio16}
            onPress={() => {
              radioButtonCapacity('16');
            }}
          />
          <RadioButton
            text={'32'}
            selected={radio32}
            onPress={() => {
              radioButtonCapacity('32');
            }}
          />
          <RadioButton
            text={'64'}
            selected={radio64}
            onPress={() => {
              radioButtonCapacity('64');
            }}
          />
          <RadioButton
            text={'128 '}
            selected={radio120}
            onPress={() => {
              radioButtonCapacity('128');
            }}
          />
          <RadioButton
            text={'256 +'}
            selected={radio256}
            onPress={() => {
              radioButtonCapacity('256');
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: Spacing.SCALE_10,
            alignSelf: props?.lang === 'ar' ? 'flex-end' : 'flex-start',
          }}>
          <Text style={{ ...styles.title }}> {'RAM'} </Text>
          <Text style={styles.titleGo}>(go) </Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: Spacing.SCALE_10 }}>
          <RadioButton
            text={'2'}
            style={{ marginRight: Spacing.SCALE_10 }}
            selected={radioRam2}
            onPress={() => {
              radioButtonRam('2');
            }}
          />
          <RadioButton
            text={'4'}
            style={{ marginRight: Spacing.SCALE_8 }}
            selected={radioRam4}
            onPress={() => {
              radioButtonRam('4');
            }}
          />
          <RadioButton
            text={'8'}
            style={{ marginRight: Spacing.SCALE_12 }}
            selected={radioRam8}
            onPress={() => {
              radioButtonRam('8');
            }}
          />
          <RadioButton
            style={{ marginRight: Spacing.SCALE_12 }}
            text={'12'}
            selected={radioRam12}
            onPress={() => {
              radioButtonRam('12');
            }}
          />
          <RadioButton
            text={'16 +'}
            selected={radioRam16}
            onPress={() => {
              radioButtonRam('16');
            }}
          />
        </View>

        <Text style={{ ...styles.title, alignSelf: props?.lang === 'ar' ? 'flex-end' : 'flex-start' }}>
          {props.intl.formatMessage({ id: 'app.components.Filter.sort' })}
        </Text>

        <TouchableOpacity underlayColor="transparent" onPress={() => sortFunc('price')}>
          <View style={{ ...styles.selectCriteria, alignSelf: props?.lang === 'ar' ? 'flex-end' : 'flex-start' }}>
            <Text style={selectedPrice ? styles.selected : styles.unselected}>
              {props.intl.formatMessage({ id: 'app.components.Filter.priceLH' })}
            </Text>
            {selectedPrice && <Image source={checkMark} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity underlayColor="transparent" onPress={() => sortFunc('newest')}>
          <View style={{ ...styles.selectCriteria, alignSelf: props?.lang === 'ar' ? 'flex-end' : 'flex-start' }}>
            <Text style={newestFirst ? styles.selected : styles.unselected}>
              {props.intl.formatMessage({ id: 'app.components.Filter.newestFirst' })}
            </Text>
            {newestFirst && <Image source={checkMark} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity underlayColor="transparent" onPress={() => sortFunc('highPrice')}>
          <View style={{ ...styles.selectCriteria, alignSelf: props?.lang === 'ar' ? 'flex-end' : 'flex-start' }}>
            <Text style={selectedPriceHigh ? styles.selected : styles.unselected}>
              {props.intl.formatMessage({ id: 'app.components.Filter.priceHL' })}
            </Text>
            {selectedPriceHigh && <Image source={checkMark} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity underlayColor="transparent" onPress={() => sortFunc('loyaltyPoints')}>
          <View style={{ ...styles.selectCriteria, alignSelf: props?.lang === 'ar' ? 'flex-end' : 'flex-start' }}>
            <Text style={loyaltyPoints ? styles.selected : styles.unselected}>
              {props.intl.formatMessage({ id: 'app.components.Filter.loyalty' })}
            </Text>
            {loyaltyPoints && <Image source={checkMark} />}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Overlay>
  );
}

Filter.propTypes = {
  intl: intlShape,
};

export default memo(injectIntl(Filter));
