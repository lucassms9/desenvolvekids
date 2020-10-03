import React from 'react';
import { Provider } from 'react-redux';
import { Toast } from 'react-native-redux-toast';

import Root from './src';
import { store, persistor } from '~/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
        <Toast messageStyle={{ color: 'white' }} />
      </PersistGate>
    </Provider>
  );
};

export default App;
