import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import "../../../asset/css/common.css"
import {login} from "../../../action/user.action";

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()
  }

  clickLogin = () => {
    const username = this.usernameRef.current.value
    const password = this.passwordRef.current.value
    if (username && password) {
      this.props.login(username, password)
          .then(() => this.props.history.push("/post"))
    }
  }

  render() {
    return (
        <div className="login-form">
          <div>
            <input ref={this.usernameRef} className="input" placeholder="user name"/>
          </div>
          <div>
            <input ref={this.passwordRef} className="input" type="password" placeholder="password"/>
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


function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    login: login
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
