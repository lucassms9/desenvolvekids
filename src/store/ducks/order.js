import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  addProducts: ['products'],
  addPaymentMethod: ['paymentMethod'],
  addDeliveryMethod: ['deliveryMethod'],

  requestPaymentOrder: ['plan', 'methodPayment', 'hash', 'installment'],
  requestPaymentOrderSuccess: null,
  requestPaymentOrderError: null,
  requestPaymentOrderResult: null,
});

const INITIAL_STATE = Immutable({
  status: '',
  products: [],
  paymentMethod: {},
  deliveryMethod: {},
  freight: 0,
});

const addProducts = (state = INITIAL_STATE, { products }) => {
  return state.merge({
    products,
  });
};

const addPaymentMethod = (state = INITIAL_STATE, { paymentMethod }) => {
  console.log(paymentMethod);
  return state.merge({
    paymentMethod,
  });
};

const addDeliveryMethod = (state = INITIAL_STATE, { deliveryMethod }) => {
  return state.merge({
    deliveryMethod,
  });
};

const requestPaymentOrder = (state = INITIAL_STATE, {}) => {
  return state.merge({
    status: 'loading',
  });
};

const paymentOrderResult = (state = INITIAL_STATE, {}) => {
  return state.merge({
    status: '',
  });
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCTS]: addProducts,
  [Types.ADD_PAYMENT_METHOD]: addPaymentMethod,
  [Types.ADD_DELIVERY_METHOD]: addDeliveryMethod,
  [Types.REQUEST_PAYMENT_ORDER]: requestPaymentOrder,
  [Types.REQUEST_PAYMENT_ORDER_RESULT]: paymentOrderResult,
});

export { Types, Creators };
