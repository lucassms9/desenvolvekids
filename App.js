import React from 'react';
import { Provider } from 'react-redux';
import { Toast } from 'react-native-redux-toast';
import codePush from 'react-native-code-push';
import { ModalPortal } from 'react-native-modals';
import GeneralStatusBar from '~/components/GeneralStatusBar';

import Root from './src';
import { store, persistor } from '~/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ENVIRONMENT_CONFG } from 'react-native-dotenv';
import { colors } from '~/styles'
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
        <GeneralStatusBar
          backgroundColor={colors.secondary}
          barStyle="light-content"
        />
        <Toast messageStyle={{ color: 'white' }} />
        <ModalPortal />
      </PersistGate>
    </Provider>
  );
};

const handleApp =
  ENVIRONMENT_CONFG === 'Produção' ? codePush(codePushOptions)(App) : App;
export default handleApp;
