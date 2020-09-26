import { call, put, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';
import { ToastActionsCreators } from 'react-native-redux-toast';

import api from '../../services/api';

import storageKeys from '~/helpers/storageKeys';

import { Creators as AuthActions } from '../ducks/auth';

export function* init() {
  console.log('init');
  const userAsync = yield call([AsyncStorage, 'getItem'], storageKeys.user);

  if (userAsync) {
    yield put(AuthActions.authCheck(true));
  } else {
    yield put(AuthActions.authCheck(false));
  }
}
export function* signUp({ data: signUpData }) {
  try {
    const {
      birthDate,
      email,
      fiscalNumber,
      lastName,
      name,
      parent,
      password,
      phone,
    } = signUpData;

    const request = {
      nome: name,
      sobrenome: lastName,
      data_nascimento: birthDate,
      email: email,
      parentesco: parent,
      celular: phone,
      cpf: fiscalNumber,
      senha: password,
    };
    //faz request signUp
    const data = yield call(api.post, '/user/post', request);
    if (typeof data.user === 'undefined') {
      throw data;
    }

    const user = {};
    const {
      auth: { navigationGlobal },
    } = yield select();

    yield put(AuthActions.signUpSuccess(user));
    yield call(
      [AsyncStorage, 'setItem'],
      storageKeys.user,
      JSON.stringify(user),
    );
    yield call([navigationGlobal, 'dispatch'], StackActions.replace('Main'));
  } catch (error) {
    console.log(error);
    yield put(ToastActionsCreators.displayError(error.message));
    yield put(AuthActions.signUpError(error.message));
  }
}

export function* signOut() {
  try {
    yield call([AsyncStorage, 'removeItem'], storageKeys.user);

    const {
      auth: { navigationGlobal },
    } = yield select();

    yield call([navigationGlobal, 'dispatch'], StackActions.replace('Auth'));

    yield put(AuthActions.signOutSuccess());
  } catch (error) {
    yield put(ToastActionsCreators.displayError(`Erro: ${error.message}`));
    yield put(AuthActions.signOutError(error));
  }
}

export function* signIn({ email, password }) {
  try {
    const req = {
      email,
      senha: password,
    };

    //faz request login
    const data = yield call(api.post, '/login/post', req);

    const {
      auth: { navigationGlobal },
    } = yield select();

    yield call(
      [AsyncStorage, 'setItem'],
      storageKeys.user,
      JSON.stringify(data.user),
    );

    yield put(AuthActions.signInSuccess(data.user));

    yield call([navigationGlobal, 'dispatch'], StackActions.replace('Main'));
  } catch (error) {
    yield put(ToastActionsCreators.displayError(`Erro: ${error.message}`));
    yield put(AuthActions.signInError(error));
  }
}

export function* recover() {
  try {
  } catch (error) {
    yield put(ToastActionsCreators.displayError(`Erro: ${error.message}`));
    yield put(AuthActions.signInError(error));
  }
}
