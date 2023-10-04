/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { APP_LOADER, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, CHANGE_LANG } from './constants';

export const initialState = {
  loginResponse: null,
  loginFail: false,
  isLoading: false,
  myLang: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USER_LOGIN_SUCCESS:
        draft.loginResponse = action.reponse;
        break;
      case CHANGE_LANG:
        draft.myLang = action.value;
        break;
      case USER_LOGIN_FAIL:
        draft.loginFail = action.value;
        break;
      case APP_LOADER:
        draft.isLoading = action.value;
      default:
        state;
        break;
    }
  });

export default loginReducer;
