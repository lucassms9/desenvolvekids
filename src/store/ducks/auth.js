import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  validateTokenSuccess: ['user'],
  validateTokenRequest: ['token'],

  signInError: ['error'],
  signInRequest: ['email', 'password', 'dataSocial'],
  signInSuccess: ['user'],

  signOutError: ['error'],
  signOutRequest: null,
  signOutSuccess: null,

  signUpError: ['error'],
  signUpRequest: ['data'],
  signUpSuccess: ['user'],

  recoverPasswordRequest: ['email'],
  recoverPasswordSuccess: ['message'],
  recoverPasswordError: ['error'],
  authCheck: ['status'],

  setNavigation: ['nav'],
});

const INITIAL_STATE = Immutable({
  authCheck: false,
  navigationGlobal: () => {},
  status: '',
  user: {},
});

const error = (state = INITIAL_STATE, action) =>
  state.merge({
    status: 'error',
    error: action.error,
  });

const signInSignUpSuccess = (state = INITIAL_STATE, { user }) => {
  return state.merge({
    status: 'success',
    user,
    authCheck: true,
  });
};

const request = (state = INITIAL_STATE) => {
  return state.merge({ status: 'loading' });
};

const setNavigationGlobal = (state = INITIAL_STATE, { nav }) => {
  console.log(state);
  // return {
  //   ...state,
  //   navigationGlobal:
  // }
  return state.merge({ navigationGlobal: nav });
};

const signOut = () => INITIAL_STATE.merge({ authCheck: false, user: {} });

const authCheckStatus = (state = INITIAL_STATE, { status }) =>
  state.merge({ authCheck: status });

const recoverPasswordSuccess = (state = INITIAL_STATE) =>
  state.merge({ status: 'success', error: '' });

export default createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_ERROR]: error,
  [Types.SIGN_IN_SUCCESS]: signInSignUpSuccess,
  [Types.SIGN_IN_REQUEST]: request,
  [Types.SIGN_OUT_ERROR]: error,
  [Types.SIGN_OUT_SUCCESS]: signOut,
  [Types.SIGN_UP_ERROR]: error,
  [Types.SIGN_UP_REQUEST]: request,
  [Types.SIGN_UP_SUCCESS]: (state = INITIAL_STATE, payload) =>
    signInSignUpSuccess(state, payload),
  [Types.AUTH_CHECK]: authCheckStatus,
  [Types.SET_NAVIGATION]: setNavigationGlobal,
  [Types.RECOVER_PASSWORD_REQUEST]: request,
  [Types.RECOVER_PASSWORD_ERROR]: error,
  [Types.RECOVER_PASSWORD_SUCCESS]: recoverPasswordSuccess,
});

export { Types, Creators };
