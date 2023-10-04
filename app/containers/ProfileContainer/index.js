/**
 *
 * ProfileContainer
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import LinearGradient from 'react-native-linear-gradient';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProfileContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { Avatar, Icon, Divider } from 'react-native-elements';
import SubscriptionCard from '../../components/SubscriptionCard';
import ImagePicker from 'react-native-image-picker';
import { getProfile, changeProfileImage } from './actions';
import { getOrders } from '../OrdersHistory/actions';

import { Colors, Spacing, Typography, Mixins } from '../../styles';

import Bell from '../../assets/svg/bell';
import Bubble from '../../assets/svg/bubble';
import Camera from '../../assets/svg/camera';
import ShoppingCart from '../../assets/svg/shoppingCart';
import Gift from '../../assets/svg/gift';
import Motor from '../../assets/svg/motor';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: Mixins.WINDOW_HEIGHT + 90,
    backgroundColor: '#e4e8ef',
    paddingTop: Platform.OS === 'ios' ? Spacing.SCALE_40 : Spacing.SCALE_10,
    flexDirection: 'column',
  },
  bg: {
    position: 'absolute',
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: '#e4e8ef',
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Mixins.WINDOW_HEIGHT,
    width: Mixins.WINDOW_WIDTH,
  },
  footer: {
    width: '100%',
    position: 'relative',
    bottom: 0,
  },
  profileArea: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.SCALE_24,
  },
  avatar: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  notif: {
    width: '35%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  iconStyle: {
    color: '#7a879d',
    width: Spacing.SCALE_34,
    height: Spacing.SCALE_34,
    //borderRadius: 17,
    // display: 'flex',
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStylePhoto: {
    // shadowColor: '#e4e8ef',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 'auto',
    height: 'auto',
    color: '#7a879d',
    borderRadius: 17,
    // display: 'flex',
    shadowColor: 'rgba(251, 72, 150, 0.31)',
    shadowOffset: { width: -1, height: 6 },
    shadowOpacity: 11,
    shadowRadius: 6,
    elevation: 6,
  },
  iconView: {
    position: 'absolute',
    bottom: Spacing.SCALE_10,
    right: 0,
    borderRadius: Spacing.SCALE_50,
  },
  container: {
    width: Spacing.SCALE_112,
    height: Spacing.SCALE_78,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: Spacing.SCALE_20,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Platform.OS === 'ios' ? Spacing.SCALE_6 : Spacing.SCALE_2,
  },
  optionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: Spacing.SCALE_20,
    marginHorizontal: Spacing.SCALE_8,
    marginTop: Spacing.SCALE_28,
  },
  title: {
    textAlign: 'center',
    //  justifyContent: 'center',
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_REGULAR,
    color: '#7a879d',
    paddingBottom: Spacing.SCALE_4,
  },
  listStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f2f4f8',
    borderTopLeftRadius: Spacing.SCALE_20,
    borderTopRightRadius: Spacing.SCALE_20,
  },
  division: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.SCALE_20,
  },
  name: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_REGULAR,
    color: '#7a879d',
  },
});

export function ProfileContainer(props) {
  useInjectReducer({ key: 'profileContainer', reducer });
  useInjectSaga({ key: 'profileContainer', saga });

  const language = useSelector(state => state?.login?.myLang);

  const [avatarSource, setAvatarSource] = React.useState('');
  const [reload, setReload] = React.useState(false);
  const { getUserProfile, changeUserProfileImage, getUserOrders } = props;
  const { profile, avatar } = props.profileContainer;

  const selectProfileImage = () => {
    const options = {
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.5,
    };
    ImagePicker.showImagePicker({ options }, response => {
      if (response.didCancel) {
        //     console.log('User cancelled image picker');
      } else if (response.error) {
        //     console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //     console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        const base64Image = 'data:image/jpeg;base64,' + response.data;
        //   console.log('response', response);
        changeUserProfileImage(response);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // setAvatarSource('data:image/jpeg;base64,' + response.data);
      }
    });
  };

  useEffect(() => {
    setReload(!reload);
    avatar
      ? setAvatarSource(avatar.toString())
      : profile && profile?.image
      ? setAvatarSource(profile?.image?.avatar.toString())
      : avatar;
  }, [profile, avatar]);

  useEffect(() => {
    getUserProfile();
    getUserOrders();
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" backgroundColor="#e4e8ef" />
      <View style={styles.bg}>
        <ImageBackground source={require('../../assets/background-pattern.png')} style={styles.backgroundImage} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} showsScrollIndicator={false}>
        <View style={{ paddingHorizontal: Spacing.SCALE_16 }}>
          <View style={styles.profileArea}>
            <View style={{ width: '35%' }} />
            <View style={styles.avatar}>
              {reload ? (
                <Avatar
                  rounded
                  size="xlarge"
                  source={{
                    uri: avatarSource && avatarSource,
                  }}
                  onPress={() => selectProfileImage()}
                  containerStyle={{ height: Spacing.SCALE_128, width: Spacing.SCALE_128 }}
                />
              ) : (
                <Avatar
                  rounded
                  size="xlarge"
                  source={{
                    uri: avatarSource && avatarSource,
                  }}
                  onPress={() => selectProfileImage()}
                  containerStyle={{ height: Spacing.SCALE_128, width: Spacing.SCALE_128 }}
                />
              )}

              <TouchableOpacity onPress={() => selectProfileImage()}>
                <View style={styles.iconStylePhoto}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#e4e8ef', '#ffffff']}
                    style={styles.iconView}>
                    <View style={styles.iconStyle}>
                      <Camera fill="#7a879d" height={Spacing.SCALE_24} width={Spacing.SCALE_24} />
                    </View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.notif}>
              <TouchableOpacity underlayColor="transparent" style={{ marginEnd: Spacing.SCALE_10 }}>
                <View style={styles.iconStyle}>
                  <Bubble fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                underlayColor="transparent"
                style={{ marginStart: Spacing.SCALE_10 }}
                onPress={() => props.navigation.navigate('Notifications')}>
                <View style={styles.iconStyle}>
                  <Bell fill="#7a879d" height={Spacing.SCALE_26} width={Spacing.SCALE_26} />
                </View>
              </TouchableOpacity> */}
            </View>
          </View>

          <SubscriptionCard {...profile} language={language} />

          {language === 'ar' ? (
            <View style={styles.optionView}>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => props.navigation.navigate('OrderTracking', { order: props.profileContainer })}>
                <View style={styles.container}>
                  <View style={styles.iconStyle}>
                    <Motor fill="#7a879d" height={Spacing.SCALE_24} width={Spacing.SCALE_26} />
                  </View>
                  <Text style={styles.title}>{props.intl.formatMessage({ id: 'app.containers.Profil.tracker' })}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => props.navigation.navigate('OrdersHistory', { gift: true })}>
                <View style={styles.container}>
                  <View style={styles.iconStyle}>
                    <Gift fill="#7a879d" height={Spacing.SCALE_24} width={Spacing.SCALE_26} />
                  </View>

                  <Text style={styles.title}>{props.intl.formatMessage({ id: 'app.containers.Profil.gift' })}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => props.navigation.navigate('OrdersHistory', { gift: false })}>
                <View style={styles.container}>
                  <View style={styles.iconStyle}>
                    <ShoppingCart fill="#7a879d" height={Spacing.SCALE_24} width={Spacing.SCALE_26} />
                  </View>

                  <Text style={styles.title}>{props.intl.formatMessage({ id: 'app.containers.Profil.orders' })}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.optionView}>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => props.navigation.navigate('OrdersHistory', { gift: false })}>
                <View style={styles.container}>
                  <View style={styles.iconStyle}>
                    <ShoppingCart fill="#7a879d" height={Spacing.SCALE_24} width={Spacing.SCALE_26} />
                  </View>

                  <Text style={styles.title}>{props.intl.formatMessage({ id: 'app.containers.Profil.orders' })}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => props.navigation.navigate('OrdersHistory', { gift: true })}>
                <View style={styles.container}>
                  <View style={styles.iconStyle}>
                    <Gift fill="#7a879d" height={Spacing.SCALE_24} width={Spacing.SCALE_26} />
                  </View>

                  <Text style={styles.title}>{props.intl.formatMessage({ id: 'app.containers.Profil.gift' })}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => props.navigation.navigate('OrderTracking', { order: props.profileContainer })}>
                <View style={styles.container}>
                  <View style={styles.iconStyle}>
                    <Motor fill="#7a879d" height={Spacing.SCALE_24} width={Spacing.SCALE_26} />
                  </View>
                  <Text style={styles.title}>{props.intl.formatMessage({ id: 'app.containers.Profil.tracker' })}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            height: Mixins.WINDOW_HEIGHT,
            width: Mixins.WINDOW_WIDTH,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          }}>
          <View style={styles.listStyle}>
            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.navigate('Account')}>
              <View style={styles.division}>
                {language === 'ar' ? (
                  <>
                    <Icon name="chevron-back" type="ionicon" color="#7a879d" size={20} />

                    <Text style={styles.name}>{props.intl.formatMessage({ id: 'app.containers.Profil.account' })}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.name}>{props.intl.formatMessage({ id: 'app.containers.Profil.account' })}</Text>
                    <Icon name="chevron-forward" type="ionicon" color="#7a879d" size={20} />
                  </>
                )}
              </View>
            </TouchableOpacity>

            <View
              style={{
                borderBottomColor: '#e4e8ef',
                borderBottomWidth: 0.8,
                marginLeft: 28,
                marginRight: 28,
              }}
            />

            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.navigate('FAQ')}>
              <View style={styles.division}>
                {language === 'ar' ? (
                  <>
                    <Icon name="chevron-back" type="ionicon" color="#7a879d" size={20} />
                    <Text style={styles.name}>{language === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.name}>{language === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</Text>
                    <Icon name="chevron-forward" type="ionicon" color="#7a879d" size={20} />
                  </>
                )}
              </View>
            </TouchableOpacity>

            <View
              style={{
                borderBottomColor: '#e4e8ef',
                borderBottomWidth: 0.8,
                marginLeft: 28,
                marginRight: 28,
              }}
            />

            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.navigate('HowToUse')}>
              <View style={styles.division}>
                {language === 'ar' ? (
                  <>
                    <Icon name="chevron-back" type="ionicon" color="#7a879d" size={20} />
                    <Text style={styles.name}>
                      {props.intl.formatMessage({ id: 'app.containers.Profil.howtouse' })}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.name}>
                      {props.intl.formatMessage({ id: 'app.containers.Profil.howtouse' })}
                    </Text>
                    <Icon name="chevron-forward" type="ionicon" color="#7a879d" size={20} />
                  </>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.navigate('ReferFriends')}>
              <View style={styles.division}>
                {language === 'ar' ? (
                  <>
                    <Icon name="chevron-back" type="ionicon" color="#7a879d" size={20} />
                    <Text style={styles.name}>
                      {props.intl.formatMessage({ id: 'app.containers.Profil.referFriends' })}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.name}>
                      {props.intl.formatMessage({ id: 'app.containers.Profil.referFriends' })}
                    </Text>
                    <Icon name="chevron-forward" type="ionicon" color="#7a879d" size={20} />
                  </>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity underlayColor="transparent" onPress={() => props.navigation.navigate('Langue')}>
              <View style={styles.division}>
                {language === 'ar' ? (
                  <>
                    <Icon name="chevron-back" type="ionicon" color="#7a879d" size={20} />
                    <Text style={styles.name}>{props.intl.formatMessage({ id: 'app.containers.Profil.langue' })}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.name}>{props.intl.formatMessage({ id: 'app.containers.Profil.langue' })}</Text>
                    <Icon name="chevron-forward" type="ionicon" color="#7a879d" size={20} />
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

ProfileContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  profileContainer: makeSelectProfileContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserProfile: () => {
      dispatch(getProfile());
    },
    changeUserProfileImage: image => {
      dispatch(changeProfileImage(image));
    },
    getUserOrders: () => {
      dispatch(getOrders());
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(ProfileContainer));
