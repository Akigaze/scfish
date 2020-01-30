import React, {Component} from "react"
import "../asset/css/common.css"
import adminApi from "../api/admin"


export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()
  }

  clickLogin = () => {
    const username = this.usernameRef.current.value
    const password = this.passwordRef.current.value
    console.log(username, password);
    if (username && password) {
      adminApi.login(username, password)
          .then(resp => {
            console.log(resp);
          })
          .catch(error => {
            console.log(error);
          })
    }
  }

  render() {
    return (
        <div className="login-form">
          <div>
            <input ref={this.usernameRef} className="input" placeholder="user name" />
          </div>
          <div>
            <input ref={this.passwordRef} className="input" type="password" placeholder="password" />
          </div>
          <div className="-action">
            <button className="btn" onClick={this.clickLogin}>login</button>
            <button className="btn">reset</button>
          </div>
          <div className="-sign-up-link">
            <a href="/register">Sign up for Scfish</a>
          </div>
        </div>
    )
  }
}