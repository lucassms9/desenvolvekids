import React from 'react';
import { Provider } from 'react-redux';
import { Toast } from 'react-native-redux-toast';

import Root from './src';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <Root />
      <Toast messageStyle={{ color: 'white' }} />
    </Provider>
  );
};

export default App;
