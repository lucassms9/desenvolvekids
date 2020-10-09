import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { ToastActionsCreators } from 'react-native-redux-toast';
import api from '../../services/api';

import { Creators as PlanActions } from '../ducks/plan';

export function* requestPayment({ plan, methodPayment, hash }) {
  try {
    const response = yield call(api.post, 'planos/pay', {
      methodPayment,
      plan,
      hash,
    });
    console.log(response);
    yield put(PlanActions.requestPaymentPlanResult(response));
  } catch (error) {
    yield put(ToastActionsCreators.displayError(error.message));
    yield put(PlanActions.requestPaymentPlanResult(error));
  }
}
