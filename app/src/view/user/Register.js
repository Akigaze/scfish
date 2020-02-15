import React, {Component, Fragment} from "react"
import logo from "../../asset/icon/logo.svg";
import RegisterForm from "./component/RegisterForm";

export default class Register extends Component {

  render() {
    return (
      <Fragment>
        <img src={logo} className="App-logo" alt="logo"/>
        <RegisterForm/>
      </Fragment>
    )
  }
}
