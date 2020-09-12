import { all, takeLatest } from 'redux-saga/effects';

import { Types as AuthTypes } from '../ducks/auth';

import { init, signIn, signUp, signOut, recover } from './auth';

export default function* rootSaga() {
  return yield all([
    // init(),
    takeLatest(AuthTypes.RECOVER_PASSWORD_REQUEST, init),
    // takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    // takeLatest(AuthTypes.SIGN_OUT_REQUEST, signOut),
    // takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
  ]);
}
