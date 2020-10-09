import { all, takeLatest } from 'redux-saga/effects';

import { Types as AuthTypes } from '../ducks/auth';
import { Types as ProductTypes } from '../ducks/product';
import { Types as PlanTypes } from '../ducks/plan';

import { init, signIn, signUp, signOut, recover } from './auth';
import { fetchAll } from './product';
import { requestPayment } from './plan';

export default function* rootSaga() {
  return yield all([
    init(),
    takeLatest(AuthTypes.RECOVER_PASSWORD_REQUEST, recover),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT_REQUEST, signOut),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
    takeLatest(ProductTypes.PRODUCTS_REQUEST, fetchAll),
    takeLatest(PlanTypes.REQUEST_PAYMENT_PLAN, requestPayment),
  ]);
}
