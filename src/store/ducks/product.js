import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  productsRequestError: ['error'],
  productsRequest: null,
  productsRequestSuccess: ['products'],
});

const INITIAL_STATE = Immutable({
  status: '',
  products: [],
});

const error = (state = INITIAL_STATE, action) =>
  state.merge({
    status: 'error',
    error: action.error.description,
  });

const productsSuccess = (state = INITIAL_STATE, { products }) => {
  return state.merge({
    status: 'success',
    products,
  });
};

const request = (state = INITIAL_STATE) => {
  return state.merge({ status: 'loading' });
};

export default createReducer(INITIAL_STATE, {
  [Types.PRODUCTS_REQUEST_SUCCESS]: productsSuccess,
  [Types.PRODUCTS_REQUEST_ERROR]: error,
  [Types.PRODUCTS_REQUEST]: request,
});

export { Types, Creators };
