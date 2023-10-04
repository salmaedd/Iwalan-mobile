import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Back from '../../assets/back.png';
import FilterIcon from '../../assets/filter.png';
import Bubble from '../../assets/svg/bubble';
import { Mixins, Spacing, Typography } from '../../styles';
import { chatWhatsAppClient } from '../../utils/call';
import { NUMBER2 } from './constants';
import { Icon } from 'react-native-elements';

export const styles = StyleSheet.create({
  serachBar: {
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    width: Mixins.WINDOW_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginBottom: Spacing.SCALE_10,
  },
  searchBarStyle: {
    height: 60,
    borderColor: '#e4e8ef',
    borderStyle: 'solid',
    backgroundColor: '#e4e8ef',
    borderWidth: 0,
    borderRadius: Spacing.SCALE_20,
    color: '#7a879d',
    paddingHorizontal: Spacing.SCALE_20,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontWeight: '600',
    marginBottom: 0,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  backIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notif: {
    // width: '30%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  filter: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: '#24378b',
  },
  iconsView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: Spacing.SCALE_28,
    marginEnd: Spacing.SCALE_14,
  },
});

export function Header(props) {
  const [search, setSearch] = React.useState('');
  return (
    <View style={styles.serachBar}>
      {props?.lang === 'ar' ? (
        <>
          {props.hasFilter && (
            <TouchableOpacity underlayColor="transparent" onPress={props.toggleFilter}>
              <View style={styles.iconsView}>
                <Image source={FilterIcon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                <Text style={styles.filter}>
                  {props.filterLang ? props.filterLang : props?.lang === 'ar' ? 'تصنيف' : 'Filter'} (
                  <Text>{props.filterCount}</Text>)
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {props?.lang === 'ar' ? (
            <>
              {props.hasNotifications && (
                <View style={{ ...styles.notif, marginLeft: 10 }}>
                  <TouchableOpacity
                    underlayColor="transparent"
                    //style={{ marginEnd: Spacing.SCALE_10 }}
                    onPress={() => {
                      chatWhatsAppClient(NUMBER2);
                    }}>
                    <View style={styles.iconStyle}>
                      <Bubble fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
            underlayColor="transparent"
            style={{ marginStart: Spacing.SCALE_10 }}
            onPress={props.goToNotifications}>
            <View style={styles.iconStyle}>
              <Bell fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
            </View>
          </TouchableOpacity> */}
                </View>
              )}

              <SearchBar
                // lang={props.lang}
                placeholder={props.placeholder}
                onChangeText={text => {
                  setSearch(text);
                  props.onChangeText(text);
                }}
                onBlur={() => props.onBlur && props.onBlur(search)}
                value={search}
                //leftIconContainerStyle={{ width: 30, height: 30 }}
                inputStyle={{
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  fontSize: Typography.FONT_SIZE_16,
                  color: '#7a879d',
                }}
                inputContainerStyle={styles.searchBarStyle}
                containerStyle={{ ...styles.searchBarContainer, width: props.hasFilter ? '65%' : '85%' }}
              />
            </>
          ) : (
            <>
              <SearchBar
                // lang={props.lang}
                placeholder={props.placeholder}
                onChangeText={text => {
                  setSearch(text);
                  props.onChangeText(text);
                }}
                onBlur={() => props.onBlur && props.onBlur(search)}
                value={search}
                //leftIconContainerStyle={{ width: 30, height: 30 }}
                inputStyle={{
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  fontSize: Typography.FONT_SIZE_16,
                  color: '#7a879d',
                }}
                inputContainerStyle={styles.searchBarStyle}
                containerStyle={{ ...styles.searchBarContainer, width: props.hasFilter ? '65%' : '85%' }}
              />
              {props.hasNotifications && (
                <View style={styles.notif}>
                  <TouchableOpacity
                    underlayColor="transparent"
                    style={{ marginEnd: Spacing.SCALE_10 }}
                    onPress={() => {
                      chatWhatsAppClient(NUMBER2);
                    }}>
                    <View style={styles.iconStyle}>
                      <Bubble fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
            underlayColor="transparent"
            style={{ marginStart: Spacing.SCALE_10 }}
            onPress={props.goToNotifications}>
            <View style={styles.iconStyle}>
              <Bell fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
            </View>
          </TouchableOpacity> */}
                </View>
              )}
            </>
          )}
          {props.hasBack && (
            <TouchableOpacity
              style={{ ...styles.backIcon, marginRight: props.hasFilter ? Spacing.SCALE_14 : 0 }}
              underlayColor="transparent"
              onPress={props.goBack}>
              <Icon name="chevron-forward" type="ionicon" color="#7a879d" />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          {props.hasBack && (
            <TouchableOpacity
              style={{ ...styles.backIcon, marginRight: props.hasFilter ? 0 : -10 }}
              underlayColor="transparent"
              onPress={props.goBack}>
              <Icon name="chevron-back" type="ionicon" color="#7a879d" />
            </TouchableOpacity>
          )}
          {props?.lang === 'ar' ? (
            <>
              {props.hasNotifications && (
                <View style={{ ...styles.notif, marginLeft: 10 }}>
                  <TouchableOpacity
                    underlayColor="transparent"
                    //style={{ marginEnd: Spacing.SCALE_10 }}
                    onPress={() => {
                      chatWhatsAppClient(NUMBER2);
                    }}>
                    <View style={styles.iconStyle}>
                      <Bubble fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
            underlayColor="transparent"
            style={{ marginStart: Spacing.SCALE_10 }}
            onPress={props.goToNotifications}>
            <View style={styles.iconStyle}>
              <Bell fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
            </View>
          </TouchableOpacity> */}
                </View>
              )}

              <SearchBar
                // lang={props.lang}
                placeholder={props.placeholder}
                onChangeText={text => {
                  setSearch(text);
                  props.onChangeText(text);
                }}
                onBlur={() => props.onBlur && props.onBlur(search)}
                value={search}
                //leftIconContainerStyle={{ width: 30, height: 30 }}
                inputStyle={{
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  fontSize: Typography.FONT_SIZE_16,
                  color: '#7a879d',
                }}
                inputContainerStyle={styles.searchBarStyle}
                containerStyle={{ ...styles.searchBarContainer, width: props.hasFilter ? '65%' : '85%' }}
              />
            </>
          ) : (
            <>
              <SearchBar
                // lang={props.lang}
                placeholder={props.placeholder}
                onChangeText={text => {
                  setSearch(text);
                  props.onChangeText(text);
                }}
                onBlur={() => props.onBlur && props.onBlur(search)}
                value={search}
                //leftIconContainerStyle={{ width: 30, height: 30 }}
                inputStyle={{
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  fontSize: Typography.FONT_SIZE_16,
                  color: '#7a879d',
                }}
                inputContainerStyle={styles.searchBarStyle}
                containerStyle={{ ...styles.searchBarContainer, width: props.hasFilter ? '65%' : '85%' }}
              />
              {props.hasNotifications && (
                <View style={styles.notif}>
                  <TouchableOpacity
                    underlayColor="transparent"
                    style={{ marginEnd: Spacing.SCALE_10 }}
                    onPress={() => {
                      chatWhatsAppClient(NUMBER2);
                    }}>
                    <View style={styles.iconStyle}>
                      <Bubble fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
            underlayColor="transparent"
            style={{ marginStart: Spacing.SCALE_10 }}
            onPress={props.goToNotifications}>
            <View style={styles.iconStyle}>
              <Bell fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
            </View>
          </TouchableOpacity> */}
                </View>
              )}
            </>
          )}

          {props.hasFilter && (
            <TouchableOpacity underlayColor="transparent" onPress={props.toggleFilter}>
              <View style={styles.iconsView}>
                <Image source={FilterIcon} style={{ width: Spacing.SCALE_20, height: Spacing.SCALE_20 }} />
                <Text style={styles.filter}>
                  {props.filterLang ? props.filterLang : props?.lang === 'ar' ? 'تصنيف' : 'Filter'} (
                  <Text>{props.filterCount}</Text>)
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}
export default Header;
