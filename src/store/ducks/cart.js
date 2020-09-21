import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  addProduct: ['id'],
  removeProduct: ['id'],
  decreaseProduct: ['id'],
});

const INITIAL_STATE = Immutable({
  status: '',
  products: [],
});

const add = (state = INITIAL_STATE, { id }) => {
  const newProducts = [...state.products];
  const productExist = state.products.find((product) => product.id === id);
  if (!productExist) {
    newProducts.push({
      id: id,
      count: 1,
    });
    return state.merge({
      products: newProducts,
    });
  } else {
    const restProducts = state.products.filter((prod) => prod.id !== id);
    const productMoreOne = { ...productExist, count: productExist.count + 1 };
    const productsAll = [...restProducts, productMoreOne];
    return state.merge({
      products: productsAll.sort(function (a, b) {
        return a.id - b.id;
      }),
    });
  }
};

const decrease = (state = INITIAL_STATE, { id }) => {
  const productFinded = state.products.find((product) => product.id === id);
  if (productFinded.count > 1) {
    const productExist = state.products.filter((product) => product.id !== id);
    const productsAll = [
      ...productExist,
      { ...productFinded, count: productFinded.count - 1 },
    ];
    return state.merge({
      products: productsAll.sort(function (a, b) {
        return a.id - b.id;
      }),
    });
  } else {
    const productExist = state.products.filter((product) => product.id !== id);
    const productsAll = [...productExist];
    return state.merge({
      products: productsAll.sort(function (a, b) {
        return a.id - b.id;
      }),
    });
  }
};

const remove = (state = INITIAL_STATE, { id }) => {
  const restProducts = state.products.filter((prod) => prod.id !== id);

  const productsAll = [...restProducts];
  return state.merge({
    products: productsAll.sort(function (a, b) {
      return a.id - b.id;
    }),
  });
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCT]: add,
  [Types.REMOVE_PRODUCT]: remove,
  [Types.DECREASE_PRODUCT]: decrease,
});

export { Types, Creators };
