import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks';
import rootSaga from './sagas';

import Reactotron from 'reactotron-react-native';

const sagaMonitor = Reactotron.createSagaMonitor;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middleware = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;
