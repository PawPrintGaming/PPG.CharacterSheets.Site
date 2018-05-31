import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = () => {
  const middlewares = [thunk, createLogger()];

  const rootReducer = combineReducers({
  });

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;