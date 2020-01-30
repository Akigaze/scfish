import React from 'react';
import logo from './asset/icon/logo.svg';
import './asset/css/App.css';
import {LoginForm} from "./component/LoginForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginForm />
      </header>
    </div>
  );
}

export default App;
