// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { GET_AUTHORISED_ACCESS } from './constants';
import { getProfileSuccess } from './actions';

function accessApi({ token, id_customer }) {}

export function* getAuthorisedAccess() {}

export default function* rootSaga() {
  yield all([takeEvery(GET_AUTHORISED_ACCESS, getAuthorisedAccess)]);
}
