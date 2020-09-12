import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import storageKeys from '~/helpers/storageKeys';

import { Creators as AuthActions } from '../ducks/auth';

export function* init() {
  console.log('init');
  const token = yield call([AsyncStorage, 'getItem'], storageKeys.userId);
  yield put(AuthActions.authCheck(false));
  if (token) {
    yield put(AuthActions.validateTokenRequest(token));
  } else {
    yield put(AuthActions.authCheck(false));
  }
}
