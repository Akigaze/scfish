import React, {Component} from 'react';
import {Router, Switch} from 'react-router-dom';
import './asset/css/App.css';
import Routes from "./router/Routes";
import history from "./router/history";

class App extends Component {

  render() {
    return (
        <Router history={history}>
          <Switch>
            <Routes/>
          </Switch>
        </Router>
    );
  }
}

export default App;
