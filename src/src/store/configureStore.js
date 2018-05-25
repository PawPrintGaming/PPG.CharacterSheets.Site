import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import characterSelect from '../ducks/characterSelect';

const configureStore = () => {
  const middlewares = [thunk, createLogger()];

  const rootReducer = combineReducers({
    characterSelect
  });

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;