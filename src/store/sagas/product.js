import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import { Creators as ProductActions } from '../ducks/product';

export function* fetchAll() {
  try {
    const response = yield call(api.post, 'produtos');
    yield put(ProductActions.productsRequestSuccess(response.produtos));
  } catch (error) {
    console.log(error);
    yield put(ProductActions.productsRequestError(error));
  }
}
