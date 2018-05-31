import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router';
import browserHistory from 'history/createBrowserHistory';
import './Root.css';
import CharacterSelect from './characterSelect/CharacterSelect';
import CharacterSystemDispatcher from './characterSystemDispatcher/CharacterSystemDispatcher';
import Header from './header/Header';

const Root = ({store}) => (
  <Provider store={store}>
    <div className={"App"}>
      <Header />
      <Router history={browserHistory()}>
        <Switch>
          <Route path='/' component={CharacterSelect} exact />
          <Route path='/character/:id' component={CharacterSystemDispatcher} />
        </Switch>
      </Router>
    </div>
  </Provider>
);

export default Root