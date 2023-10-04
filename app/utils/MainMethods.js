import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from './RootNavigation';

import { channel } from 'redux-saga';
import { put, take, takeLatest } from 'redux-saga/effects';
import { addMsg } from '../containers/message/actions';

export function isPortrait() {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
}

export function isLandscape() {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
}

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (exception) {
    // console.log(exception);
    return false;
  }
};
export const setToken = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('token', jsonValue);
  } catch (e) {
    // console.log('AsyncStorage', e);
  }
};
export const setInfoLogin = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('LoginInfo', jsonValue);
  } catch (e) {
    // console.log('AsyncStorage', e);
  }
};
export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // console.log('return data');
      return value;
    } else {
      RootNavigation.navigate('Login');
    }
  } catch (e) {
    // console.log('AsyncStorage', e);
  }
};
export const getInfoLogin = async () => {
  try {
    const value = await AsyncStorage.getItem('LoginInfo');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // console.log('AsyncStorage', e);
  }
};
export const getTokenForSplash = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // console.log('return data');
      return value;
    } else {
      RootNavigation.navigate('Login');
    }
  } catch (e) {
    // console.log('AsyncStorage', e);
  }
};

export const getCLT = async () => {
  try {
    const value = await AsyncStorage.getItem('CLT');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // console.log('AsyncStorage', e);
  }
};
export const setCLT = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('CLT', jsonValue);
  } catch (e) {
    // console.log('AsyncStorage', e);
  }
};

export const setUserInfo = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('userInfo', jsonValue);
  } catch (e) {
    // console.log('AsyncStorage', e);
  }
};

export const getUserInfo = async () => {
  try {
    const value = await AsyncStorage.getItem('userInfo');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // console.log('AsyncStorage', e);
  }
};

export function timeout(source) {
  source.cancel();
}
