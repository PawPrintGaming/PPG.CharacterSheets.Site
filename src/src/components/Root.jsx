import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router';
import browserHistory from 'history/createBrowserHistory';
import './Root.css';
import CharacterSelect from './characterSelect/CharacterSelect';
import CharacterSheetDispatcher from './characterSheetDispatcher/CharacterSheetDispatcher';
import CreateCharacterDispatcher from './createCharacterDispatcher/CreateCharacterDispatcher';
import Header from './header/Header';

const Root = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory()}>
    <div className={"App"}>
      <Header />
      <Switch>
        <Route exact path='/' component={CharacterSelect} />
        <Route exact path='/character/:id' component={CharacterSheetDispatcher} />
        <Route exact path='/create/character/:ruleSet?' component={CreateCharacterDispatcher} />
      </Switch>
    </div>
    </Router>
  </Provider>
);

export default Root