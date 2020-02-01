import React, {Component} from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import './asset/css/App.css';
import Routes from "./router/Routes";

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Routes/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
