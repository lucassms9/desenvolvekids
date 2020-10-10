import { call, put, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';
import { ToastActionsCreators } from 'react-native-redux-toast';
import api from '../../services/api';

import { Creators as PlanActions } from '../ducks/plan';

export function* requestPayment({ plan, methodPayment, hash, installment }) {
  try {
    const response = yield call(api.post, 'planos/pay', {
      methodPayment,
      plan,
      hash,
      installment,
    });

    yield put(PlanActions.requestPaymentPlanResult(response));
    yield put(
      ToastActionsCreators.displayInfo('Pagamento realizado com sucesso'),
    );
    const {
      auth: { navigationGlobal },
    } = yield select();

    yield call([navigationGlobal, 'dispatch'], StackActions.replace('Main'));
  } catch (error) {
    yield put(ToastActionsCreators.displayError(error.message));
    yield put(PlanActions.requestPaymentPlanResult(error));
  }
}
