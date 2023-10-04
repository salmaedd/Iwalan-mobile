/*
 *
 * Langue reducer
 *
 */

import produce from 'immer';

import { CHANGE_LANGUAGE } from './constants';

export const initialState = {
  Lang: '',
};

/* eslint-disable default-case, no-param-reassign */
const profileContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LANGUAGE:
        draft.Lang = action.value;
        break;
    }
  });

export default profileContainerReducer;
