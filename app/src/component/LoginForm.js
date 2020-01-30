import React, {Component} from "react"
import "../asset/css/common.css"


export class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="login-form">
          <div><input className="input" placeholder="user name"/></div>
          <div><input className="input" type="password" placeholder="password"/></div>
          <div>
            <button className="btn">reset</button>
            <button className="btn">login</button>
          </div>
        </div>
    )
  }
}