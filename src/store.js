import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers/rootReducer';

const middleware = applyMiddleware(promise, thunk, logger);

export default function configureStore() {
  return createStore(
    rootReducer,
    middleware,
  );
}
