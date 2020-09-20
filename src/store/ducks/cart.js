import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  addProduct: ['id'],
  removeProduct: ['id'],
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
    return state.merge({
      products: [...restProducts, productMoreOne],
    });
  }
};

const remove = (state = INITIAL_STATE, { id }) => {
  return state.merge({});
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCT]: add,
  [Types.REMOVE_PRODUCT]: remove,
});

export { Types, Creators };
