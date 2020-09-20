import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import storageKeys from '~/helpers/storageKeys';

import { Creators as ProductActions } from '../ducks/product';

export function* fetchAll() {
  try {
    const userAsync = yield call([AsyncStorage, 'getItem'], storageKeys.user);
    const parseUser = JSON.parse(userAsync);

    const response = yield call(api.get, 'products', {
      user_id: parseUser.name,
    });
    yield put(ProductActions.productsRequestSuccess(response));
  } catch (error) {
    yield put(ProductActions.productsRequestError(error));
  }
}
