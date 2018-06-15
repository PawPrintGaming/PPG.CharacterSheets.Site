import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {reducer as form} from 'redux-form';

import ruleSetsReducer from '../ducks/ruleSets'
import userOptionsReducer from '../ducks/userOptions';

const configureStore = () => {
  const middlewares = [thunk, createLogger()];

  const rootReducer = combineReducers({
    ruleSetsStore: ruleSetsReducer,
    userOptions: userOptionsReducer,
    form
  });

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;