import React, {Component} from 'react';
import './asset/css/App.css';
import "./asset/css/common.css"
import "typeface-roboto"
import Routes from "./router/Routes";

class App extends Component {

  render() {
    return (
        <Routes/>
    );
  }
}

export default App;
