import { call, put, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions,NavigationActions } from '@react-navigation/native';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { initNotification } from '~/services/notificationService';

import api from '../../services/api';
import {
  hasInternetKey,
  dialogBiometric,
  getInternetKey,
} from '~/services/keyChain';

import storageKeys from '~/helpers/storageKeys';

import { Creators as AuthActions } from '../ducks/auth';
import { Creators as OrderActions } from '../ducks/order';
import { Creators as ProductActions } from '../ducks/product';

export function* init() {
  console.log('init');

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
    yield put(AuthActions.signInSuccess(data.user));
    yield put(AuthActions.authCheck(true));
  } else {
    yield put(AuthActions.authCheck(false));
  }
}

export function* getDataUser() {
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
    console.log('data.user');
    console.log(data.user);
    yield put(AuthActions.signInSuccess(data.user));
    yield put(AuthActions.authCheck(true));
  } else {
    yield put(AuthActions.authCheck(false));
  }
}

export function* requestUpdate({ data: userData }) {
  try {
    console.log(userData);
    const {
      birthDate,
      email,
      fiscalNumber,
      name,
      parent,
      password,
      phone,
      address,
      city,
      complement,
      nameAddress,
      neighborhood,
      number,
      zipCode,
      state,
      recipient,
    } = userData;

    const request = {
      nome: name,
      data_nascimento: birthDate,
      email: email,
      parentesco: parent,
      celular: phone,
      cpf: fiscalNumber,
      senha: password,

      zipCode: zipCode,
      nameAddress: nameAddress,
      address: address,
      city: city,
      complement: complement,
      neighborhood: neighborhood,
      number: number,
      recipient: recipient,
      state: state,
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
      parentLabel,
      parentOther,
      zipCode,
      nameAddress,
      address,
      city,
      complement,
      neighborhood,
      number,
      recipient,
      state,
    } = signUpData;

    const request = {
      nome: name,
      data_nascimento: birthDate,
      email: email,
      parentesco: parent,
      celular: phone,
      cpf: fiscalNumber,
      senha: password,
      parentLabel,
      parentOther,
      zipCode: zipCode,
      nameAddress: nameAddress,
      address: address,
      city: city,
      complement: complement,
      neighborhood: neighborhood,
      number: number,
      recipient: recipient,
      state: state,
    };

    //faz request signUp
    const data = yield call(api.post, '/login/cadastrar-user', request);
    if (typeof data.user === 'undefined') {
      throw data;
    }
    console.log(data);
    const {
      auth: { navigationGlobal },
    } = yield select();

    yield put(AuthActions.signUpSuccess(data.user));

    yield call([navigationGlobal, 'dispatch'], StackActions.replace('Plans'));
    yield call([AsyncStorage, 'setItem'], storageKeys.userLogin, String(email));
    const bioOptional = yield call(hasInternetKey);

    if (bioOptional) {
      const emailPhoneSto = yield call(
        [AsyncStorage, 'getItem'],
        storageKeys.userLogin,
      );

      if (emailPhoneSto !== email) {
        dialogBiometric(email, password);
      }
    } else {
      dialogBiometric(email, password);
    }
     yield call([AsyncStorage, 'setItem'], storageKeys.userLogin, String(email));
  } catch (error) {
    yield put(ToastActionsCreators.displayError(error.message));
    yield put(AuthActions.signUpError(error.message));
  }
}

export function* signOut({ message }) {
  console.log('signOut');
  // return;
  try {
    yield call([AsyncStorage, 'removeItem'], 'persist:root');

    const {
      auth: { navigationGlobal },
    } = yield select();

    console.log('AQUI');
    console.log(navigationGlobal);
   
    if (navigationGlobal.name !== 'SignIn') {

      yield call([navigationGlobal, 'reset'], {
          index: 0,
          routes: [{ name: 'Auth' }],
        })
      if (message) {
        yield put(ToastActionsCreators.displayError(`Erro: ${message}`));
      }
    }
    yield put(AuthActions.signOutSuccess());
    yield put(OrderActions.resetOrder());
    yield put(ProductActions.resetCart());
  } catch (error) {
    console.log(error);
    yield put(ToastActionsCreators.displayError(`Erro: ${error.message}`));
    yield put(AuthActions.signOutError(error));
  }
}

export function* signIn({ email, password, dataSocial }) {
  const {
    auth: { navigationGlobal },
  } = yield select();

  try {
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

      yield call([AsyncStorage, 'setItem'], storageKeys.userLogin, String(email));
      const bioOptional = yield call(hasInternetKey);

      if (bioOptional) {
        const emailPhoneSto = yield call(
          [AsyncStorage, 'getItem'],
          storageKeys.userLogin,
        );

        if (emailPhoneSto !== email) {
          dialogBiometric(email, password);
        }
      } else {
        dialogBiometric(email, password);
      }


      setTimeout(function () {
        call(initNotification);
      }, 2000);
    } else {
      throw data;
    }
  } catch (error) {
    console.log('erro login');
    console.log(error);
    if (error.message === 'Complete seu cadastro!') {
      yield call([navigationGlobal, 'navigate'], 'SignUp', dataSocial);
      yield put(AuthActions.signInError('not auth'));
    } else {
      yield put(ToastActionsCreators.displayError(`Erro: ${error.message}`));
      yield put(AuthActions.signInError(error));
    }
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
      parentLabel: data.parentLabel,
      parentOther: data.parentOther,
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
