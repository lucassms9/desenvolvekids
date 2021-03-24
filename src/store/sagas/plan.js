import { call, put, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';
import { ToastActionsCreators } from 'react-native-redux-toast';
import api from '../../services/api';
import storageKeys from '~/helpers/storageKeys';

import { Creators as PlanActions } from '../ducks/plan';
import { Creators as AuthActions } from '../ducks/auth';

export function* requestPayment({ plan, methodPayment, hash, installment }) {
  try {
    const response = yield call(api.post, 'planos/pay', {
      methodPayment,
      plan,
      hash,
      installment,
    });

    yield put(PlanActions.requestPaymentPlanResult(response));

    const userAsync = yield call([AsyncStorage, 'getItem'], storageKeys.root);
    console.log(userAsync);
  
    if (!userAsync) {
      return yield put(AuthActions.authCheck(false));
    }
    const user = JSON.parse(userAsync);
    const auth = JSON.parse(user.auth);
    console.log(auth.user);
    if (auth.user && auth.user.id && auth.user.token) {
      const data = yield call(
        api.post,
        '/user/get-data',
        {},
        {
          headers: { token: auth.user.token },
        },
      );
      console.log('data.user')
      console.log(data.user)
      yield put(AuthActions.signInSuccess(data.user));
      }
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
