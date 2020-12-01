import { all, takeLatest } from 'redux-saga/effects';

import { Types as AuthTypes } from '../ducks/auth';
import { Types as ProductTypes } from '../ducks/product';
import { Types as PlanTypes } from '../ducks/plan';
import { Types as OrderTypes } from '../ducks/order';

import {
  init,
  signIn,
  signUp,
  signOut,
  recover,
  requestAddress,
  requestUpdate,
  requestChildren,
  requestDependent,
  requestRmDependent,
} from './auth';
import { fetchAll } from './product';
import { requestPayment } from './plan';
import { requestPaymentOrder, fetchDeliveryway } from './order';

export default function* rootSaga() {
  return yield all([
    init(),
    takeLatest(AuthTypes.RECOVER_PASSWORD_REQUEST, recover),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT_REQUEST, signOut),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
    takeLatest(ProductTypes.PRODUCTS_REQUEST, fetchAll),
    takeLatest(PlanTypes.REQUEST_PAYMENT_PLAN, requestPayment),
    takeLatest(AuthTypes.ADD_ADDRESS_REQUEST, requestAddress),
    takeLatest(AuthTypes.UPDATE_USER_REQUEST, requestUpdate),
    takeLatest(AuthTypes.ADD_CHILDREN_REQUEST, requestChildren),
    takeLatest(AuthTypes.ADD_DEPENDENT_REQUEST, requestDependent),
    takeLatest(AuthTypes.RM_DEPENDENT_REQUEST, requestRmDependent),
    takeLatest(OrderTypes.REQUEST_PAYMENT_ORDER, requestPaymentOrder),
    takeLatest(OrderTypes.ADD_DELIVERY_METHOD, fetchDeliveryway),
  ]);
}
