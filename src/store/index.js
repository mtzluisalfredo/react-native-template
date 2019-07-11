import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Reactotron from 'reactotron-react-native';
import reducers from 'store/ducks';
import rootSaga from 'store/sagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const sagaMonitor = __DEV__ ? Reactotron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const persistedReducer = persistReducer(persistConfig, reducers);
const middlewares = [sagaMiddleware];

const createCompose = __DEV__
  ? compose(
      applyMiddleware(...middlewares),
      Reactotron.createEnhancer()
    )
  : compose(applyMiddleware(...middlewares));

// monta a store
export default () => {
  const store = createStore(persistedReducer, createCompose);
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};
