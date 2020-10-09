import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  addPlan: ['plan'],
  addMethodPayment: ['methodPayment'],
  requestPaymentPlan: ['plan', 'methodPayment', 'hash'],
  requestPaymentPlanSuccess: null,
  requestPaymentPlanError: null,
  requestPaymentPlanResult: null,
});

const INITIAL_STATE = Immutable({
  status: '',
  plan: {},
  methodPayment: {},
});

const addPlan = (state = INITIAL_STATE, { plan }) => {
  return state.merge({
    plan,
  });
};

const addMethodPayment = (state = INITIAL_STATE, { methodPayment }) => {
  return state.merge({
    methodPayment,
  });
};

const requestPaymentPlan = (state = INITIAL_STATE, {}) => {
  return state.merge({
    status: 'loading',
  });
};

const paymentPlanResult = (state = INITIAL_STATE, {}) => {
  return state.merge({
    status: '',
  });
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_PLAN]: addPlan,
  [Types.ADD_METHOD_PAYMENT]: addMethodPayment,
  [Types.REQUEST_PAYMENT_PLAN]: requestPaymentPlan,
  [Types.REQUEST_PAYMENT_PLAN_RESULT]: paymentPlanResult,
});

export { Types, Creators };
