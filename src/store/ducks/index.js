import { combineReducers } from 'redux';
import { toastReducer as toast } from 'react-native-redux-toast';

import auth from './auth';
import cart from './cart';
import product from './product';
import plan from './plan';
import order from './order';

export default combineReducers({
  auth,
  cart,
  product,
  plan,
  order,
  toast,
});
