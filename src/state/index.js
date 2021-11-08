import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as reducers from './features/index';

const { createLogger } = require('redux-logger');

const reduxLogger = (process.env.NEXT_PUBLIC_ADD_REDUX_LOGGER === 'true') || false;

const middleware = [thunk];

if (reduxLogger) {
  const logger = createLogger({
    collapsed: true,
  });

  middleware.push(logger);
}

export const initStore = (initialState = {}) => {
  const rootReducer = combineReducers(reducers);
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );

  return store;
};
