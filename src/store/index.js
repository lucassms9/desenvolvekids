import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator,
} from 'redux-persist-seamless-immutable';

import rootReducer from './ducks';
import rootSaga from './sagas';

import Reactotron from 'reactotron-react-native';

const transformerConfig = {
  whitelistPerReducer: {
    auth: ['user', 'navigationGlobal', 'authCheck'],
  },
  blacklistPerReducer: {
    reducerB: [],
  },
};

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  stateReconciler: seamlessImmutableReconciler,
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
  transforms: [seamlessImmutableTransformCreator(transformerConfig)],
};

const sagaMonitor = Reactotron.createSagaMonitor;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middleware = applyMiddleware(sagaMiddleware);

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, middleware);

sagaMiddleware.run(rootSaga);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export { store, persistor };
