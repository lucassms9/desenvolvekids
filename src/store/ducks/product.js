import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  productsRequestError: ['error'],
  productsRequest: null,
  productsRequestSuccess: ['products'],

  addProduct: ['id'],
  removeProduct: ['id'],
  decreaseProduct: ['id'],
});

const INITIAL_STATE = Immutable({
  status: '',
  products: [],
  cart: {
    products: [],
  },
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

const add = (state = INITIAL_STATE, { id }) => {
  const newProducts = [...state.cart.products];
  const productExist = state.cart.products.find((product) => product.id === id);
  if (!productExist) {
    const findP = state.products.find((product) => product.id === id);
    newProducts.push({
      ...findP,
      count: 1,
    });
    return state.merge({
      cart: { products: newProducts },
    });
  } else {
    const restProducts = state.cart.products.filter((prod) => prod.id !== id);
    const productMoreOne = { ...productExist, count: productExist.count + 1 };
    const productsAll = [...restProducts, productMoreOne];
    return state.merge({
      cart: {
        products: productsAll.sort(function (a, b) {
          return a.id - b.id;
        }),
      },
    });
  }
};

const decrease = (state = INITIAL_STATE, { id }) => {
  const productFinded = state.cart.products.find(
    (product) => product.id === id,
  );
  if (productFinded.count > 1) {
    const productExist = state.cart.products.filter(
      (product) => product.id !== id,
    );
    const productsAll = [
      ...productExist,
      { ...productFinded, count: productFinded.count - 1 },
    ];
    return state.merge({
      cart: {
        products: productsAll.sort(function (a, b) {
          return a.id - b.id;
        }),
      },
    });
  } else {
    const productExist = state.cart.products.filter(
      (product) => product.id !== id,
    );
    const productsAll = [...productExist];
    return state.merge({
      cart: {
        products: productsAll.sort(function (a, b) {
          return a.id - b.id;
        }),
      },
    });
  }
};

const remove = (state = INITIAL_STATE, { id }) => {
  const restProducts = state.cart.products.filter((prod) => prod.id !== id);

  const productsAll = [...restProducts];
  return state.merge({
    cart: {
      products: productsAll.sort(function (a, b) {
        return a.id - b.id;
      }),
    },
  });
};

export default createReducer(INITIAL_STATE, {
  [Types.PRODUCTS_REQUEST_SUCCESS]: productsSuccess,
  [Types.PRODUCTS_REQUEST_ERROR]: error,
  [Types.PRODUCTS_REQUEST]: request,

  [Types.ADD_PRODUCT]: add,
  [Types.REMOVE_PRODUCT]: remove,
  [Types.DECREASE_PRODUCT]: decrease,
});

export { Types, Creators };
