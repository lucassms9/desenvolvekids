import { call, put, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';
import { ToastActionsCreators } from 'react-native-redux-toast';

import api from '../../services/api';

import storageKeys from '~/helpers/storageKeys';

import { Creators as AuthActions } from '../ducks/auth';
import { Creators as OrderActions } from '../ducks/order';
import { Creators as ProductActions } from '../ducks/product';

export function* init() {
  console.log('init');

  const userAsync = yield call([AsyncStorage, 'getItem'], storageKeys.root);
  if (!userAsync) {
    return yield put(AuthActions.authCheck(false));
  }
  const user = JSON.parse(userAsync);
  const auth = JSON.parse(user.auth);

  if (auth.user && auth.user.id) {
    const data = yield call(api.get, '/user/get-data', {
      params: {},
      headers: { token: auth.user.token },
    });
    yield put(AuthActions.signInSuccess(data.user));
    yield put(AuthActions.authCheck(true));
  } else {
    yield put(AuthActions.authCheck(false));
  }
}

export function* requestUpdate({ data: userData }) {
  try {
    const {
      birthDate,
      email,
      fiscalNumber,
      name,
      parent,
      password,
      phone,
    } = userData;

    const request = {
      nome: name,
      data_nascimento: birthDate,
      email: email,
      parentesco: parent,
      celular: phone,
      cpf: fiscalNumber,
      senha: password,
    };
    //faz request signUp
    const data = yield call(api.post, '/user/update', request);
    if (typeof data.user === 'undefined') {
      throw data;
    }
    yield put(ToastActionsCreators.displayInfo('Dados Salvos com sucesso'));
    yield put(AuthActions.updateUserSuccess(data.user));
  } catch (error) {
    yield put(ToastActionsCreators.displayError(error.message));
    yield put(AuthActions.signUpError(error.message));
  }
}

export function* signUp({ data: signUpData }) {
  try {
    const {
      birthDate,
      email,
      fiscalNumber,
      name,
      parent,
      password,
      phone,
    } = signUpData;

    const request = {
      nome: name,
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

    const {
      auth: { navigationGlobal },
    } = yield select();

    yield put(AuthActions.signUpSuccess(data.user));

    yield call([navigationGlobal, 'dispatch'], StackActions.replace('Plans'));
  } catch (error) {
    yield put(ToastActionsCreators.displayError(error.message));
    yield put(AuthActions.signUpError(error.message));
  }
}

export function* signOut({ message }) {
  console.log('signOut');
  try {
    yield call([AsyncStorage, 'removeItem'], 'persist:root');

    const {
      auth: { navigationGlobal },
    } = yield select();

    yield put(AuthActions.signOutSuccess());
    yield put(OrderActions.resetOrder());
    yield put(ProductActions.resetCart());
    if (navigationGlobal.name !== 'SignIn') {
      yield call([navigationGlobal, 'dispatch'], StackActions.replace('Auth'));
      if (message) {
        yield put(ToastActionsCreators.displayError(`Erro: ${message}`));
      }
    }
  } catch (error) {
    console.log(error);
    yield put(ToastActionsCreators.displayError(`Erro: ${error.message}`));
    yield put(AuthActions.signOutError(error));
  }
}

export function* signIn({ email, password, dataSocial }) {
  try {
    const {
      auth: { navigationGlobal },
    } = yield select();

    const req = {
      email,
      senha: password,
    };
    let data;

    //faz request login
    if (dataSocial) {
      data = yield call(api.post, '/login/social', dataSocial);
      console.log(data);
      if (typeof data.user === 'undefined') {
        yield call([navigationGlobal, 'navigate'], 'SignUp', dataSocial);
        yield put(AuthActions.signInError('not auth'));
      }
    } else {
      data = yield call(api.post, '/login/post', req);
    }

    if (typeof data.user !== 'undefined') {
      yield put(AuthActions.signInSuccess(data.user));
      if (data && data.user && data.user.plano && data.user.plano.id) {
        yield call(
          [navigationGlobal, 'dispatch'],
          StackActions.replace('Main'),
        );
      } else {
        yield call(
          [navigationGlobal, 'dispatch'],
          StackActions.replace('Plans'),
        );
      }
    } else {
      throw data;
    }
  } catch (error) {
    yield put(ToastActionsCreators.displayError(`Erro: ${error.message}`));
    yield put(AuthActions.signInError(error));
  }
}

export function* requestAddress({ data }) {
  console.log('aqui');
  try {
    console.log(data);
    const resAddress = yield call(api.post, '/user/add-address', data);

    console.log(resAddress);
    const datares = yield call(api.get, '/user/get-data');
    console.log(datares);

    yield put(AuthActions.addAddressRequestSuccess(datares.user));
  } catch (error) {
    yield put(ToastActionsCreators.displayError(`Erro: ${error.message}`));
    yield put(AuthActions.signInError(error));
  }
}
export function* requestChildren({ data }) {
  try {
    console.log(data);
    yield call(api.post, '/user/add-children', data);

    const datares = yield call(api.get, '/user/get-data');

    yield put(AuthActions.signInSuccess(datares.user));
  } catch (error) {
    yield put(ToastActionsCreators.displayError(`Erro: ${error.message}`));
    yield put(AuthActions.signInError(error));
  }
}

export function* requestRmDependent({ id }) {
  try {
    const req = {
      id: id,
    };

    yield call(api.post, '/user/rm-dependent', req);

    const datares = yield call(api.get, '/user/get-data');

    yield put(AuthActions.signInSuccess(datares.user));
  } catch (error) {
    yield put(ToastActionsCreators.displayError(`Erro: ${error.message}`));
    yield put(AuthActions.signInError(error));
  }
}

export function* requestDependent({ data }) {
  try {
    const req = {
      nome: data.name,
      email: data.email,
      parentesco: data.parent,
      celular: data.phone,
      senha: data.password,
      cpf: data.fiscalNumber,
      data_nascimento: data.birthDate,
    };

    if (data.id) {
      req.id = data.id;
    }

    yield call(api.post, '/user/add-dependent', req);

    const datares = yield call(api.get, '/user/get-data');

    yield put(AuthActions.signInSuccess(datares.user));
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
