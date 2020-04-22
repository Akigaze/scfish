import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import {getProfile, login} from "../../../action/user.action";
import {isManager} from "../../../action/manager.action";

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  loginSuccess() {
    this.props.getProfile()
    this.props.isManager()
    this.props.history.push("/post")
  }

  clickLogin = () => {
    const {username, password} = this.state
    if (username && password) {
      this.props.login(username, password)
          .then(resp => this.loginSuccess(resp))
    }
  }

  clickReset = () => {
    this.setState({username: "", password: ""})
  }

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  render() {
    return (
        <div className="login-form">
          <FormControl margin="normal" fullWidth>
            <TextField size="small" color="secondary"
                       label="user name" variant="outlined"
                       value={this.state.username} onChange={this.handleUsernameChange}/>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <TextField type="password" size="small"
                       color="secondary" label="password" variant="outlined"
                       value={this.state.password} onChange={this.handlePasswordChange}/>
          </FormControl>
          <FormControl margin="normal" className="-action">
            <Button variant="contained" color="primary" onClick={this.clickLogin}>login</Button>
            <Button variant="outlined" color="secondary" onClick={this.clickReset}>reset</Button>
          </FormControl>
          <FormControl margin="normal" className="-sign-up-link">
            <Link to="/register">Sign up for Scfish</Link>
          </FormControl>
        </div>
    )
  }
}


function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    login: login,
    getProfile: getProfile,
    isManager:isManager
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
