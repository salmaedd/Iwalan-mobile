/*
 *
 * ChangePassword reducer
 *
 */
import produce from 'immer';
import { CHANGE_PASSWORD_SUCCESS } from './constants';

export const initialState = {
  changePasswordResponse: null,
};

/* eslint-disable default-case, no-param-reassign */
const changePasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_PASSWORD_SUCCESS: {
        draft.changePasswordResponse = action.reponse;
      }
        break;
      default:
        state;
        break;
    }
  });

export default changePasswordReducer;
