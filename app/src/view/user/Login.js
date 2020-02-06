import React, {Component, Fragment} from "react"
import logo from "../../asset/icon/logo.svg";
import LoginForm from "./component/LoginForm";

export default class Login extends Component {

  render() {
    return (
        <Fragment>
          <img src={logo} className="App-logo" alt="logo"/>
          <LoginForm/>
        </Fragment>
    )
  }
}
