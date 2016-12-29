/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import rootReducer from '../reducers/rootReducer';

let middleware = [thunk];

if (true && __DEV__) {
  const reduxImmutableStateInvariant = require('redux-immutable-state-invariant')();
  const createLogger = require('redux-logger');

  const logger = createLogger({ collapsed: true });
  middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
  middleware = [...middleware];
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middleware),
      autoRehydrate(),
    )
  );
  persistStore(store, { storage: AsyncStorage });

  return store;
}
