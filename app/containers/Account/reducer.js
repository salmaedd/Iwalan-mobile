/*
 *
 * ProfileContainer reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_PROFILE_SUCCESS, APP_LOADER,APP_ERR } from './constants';

export const initialState = {
  profile: {},
  isLoading: false,
  err: false,
};

/* eslint-disable default-case, no-param-reassign */
const profileContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case APP_ERR:
        draft.err = action.value;
        break;
      case GET_PROFILE_SUCCESS:
        draft.profile = action.data;
        break;
      case APP_LOADER:
        draft.isLoading = action.value;
        break;
    }
  });

export default profileContainerReducer;
