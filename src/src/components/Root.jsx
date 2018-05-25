import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import browserHistory from 'history/createBrowserHistory';
import './Root.css';
import CharacterSelect from './CharacterSelect';
import Header from './Header';
import {Container} from 'reactstrap';

const Root = ({store}) => (
  <div className="App">
    <Provider store={store}>
      <div>
        <Header />
        <Router history={browserHistory()}>
          <Route path='/' component={CharacterSelect} />
        </Router>
    </div>
    </Provider>
  </div>
);

// class Root extends Component {
//   render() {
//     return (
//       <div className="Root">
//         <header className="Header">
//           <h1 className="Title">Welcome to React</h1>
//         </header>
//         <p className="Intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default Root