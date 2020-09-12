import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  validateTokenSuccess: ['user'],
  validateTokenRequest: ['token'],
  signInError: ['error'],
  signInRequest: ['emailPhone', 'password'],
  signInSuccess: ['user'],
  signOutError: ['error'],
  signOutRequest: null,
  signOutSuccess: null,
  signUpError: ['error'],
  signUpRequest: ['data'],
  signUpSuccess: ['user'],
  signUpLeadError: ['error'],
  signUpLeadRequest: ['data', 'setIsLoading'],
  signUpLeadSuccess: ['company', 'retailer', 'user'],
  recoverPasswordRequest: ['emailOrPhone'],
  recoverPasswordSuccess: ['message'],
  recoverPasswordWithPhoneStep1: ['token', 'phone'],
  recoverPasswordRequestStep2: ['phone', 'code', 'newPassword'],
  recoverPasswordClearToken: null,
  recoverPasswordError: ['error'],
  savePartialDataRequest: ['set', 'data'],
  savePartialDataSuccess: ['set', 'data'],
  savePartialDataError: ['error'],
  loadPartialDataRequest: null,
  loadPartialDataSuccess: ['set', 'data'],
  loadPartialDataError: ['error'],
  resetPartialDataRequest: null,
  resetPartialDataSuccess: null,
  saveTimeStamp: ['timeStamp'],
  authCheck: ['status'],
  fetchChannelsRequest: ['data'],
  fetchChannelsSuccess: ['channels'],
  setNotAfterBecomeRetailer: [],
});

const INITIAL_STATE = Immutable({
  authCheck: true,
  status: '',
  user: null,
});

const error = (state = INITIAL_STATE, action) =>
  state.merge({ status: 'error', error: action.error.description });

const signInSignUpSuccess = (state = INITIAL_STATE, { user }) => {
  return state.merge({
    status: 'success',
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
};

const request = (state = INITIAL_STATE) => state.merge({ status: 'loading' });
const signOut = () => INITIAL_STATE.merge({ authCheck: false });

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
});

export { Types, Creators };
