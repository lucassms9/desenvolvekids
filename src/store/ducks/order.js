import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  addProducts: ['products'],
  addPaymentMethod: ['paymentMethod'],
  addDeliveryMethod: ['deliveryMethod', 'products'],

  requestPaymentOrder: [
    'products',
    'enderecoId',
    'entregaId',
    'valor_frete',
    'forma_pagmento',
    'promocode',
  ],

  requestPaymentOrderSuccess: null,
  requestPaymentOrderError: null,
  requestPaymentOrderResult: null,

  fetchDeliveryWayResult: ['deliveryWays'],
  fetchDeliveryWayErro: null,
  resetOrder: null,
});

const INITIAL_STATE = Immutable({
  status: '',
  products: [],
  paymentMethod: {},
  deliveryMethod: {},
  freight: 0,
  deliveryWays: [],
});

const resetOrder = (state = INITIAL_STATE, { products }) => {
  return state.merge({
    status: '',
    products: [],
    paymentMethod: {},
    deliveryMethod: {},
    freight: 0,
    deliveryWays: [],
  });
};

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

const fetchDeliveryWayResult = (state = INITIAL_STATE, { deliveryWays }) => {
  return state.merge({
    deliveryWays,
  });
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCTS]: addProducts,
  [Types.ADD_PAYMENT_METHOD]: addPaymentMethod,
  [Types.ADD_DELIVERY_METHOD]: addDeliveryMethod,
  [Types.REQUEST_PAYMENT_ORDER]: requestPaymentOrder,
  [Types.REQUEST_PAYMENT_ORDER_RESULT]: paymentOrderResult,
  [Types.FETCH_DELIVERY_WAY_RESULT]: fetchDeliveryWayResult,
  [Types.RESET_ORDER]: resetOrder,
});

export { Types, Creators };
