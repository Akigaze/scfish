import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {register} from "../../../action/user.action";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "../../../asset/css/common.css"
import FormControl from "@material-ui/core/FormControl";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";


export class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state={
          username : "",
          nickname : "",
          password : "",
        }
    }

    handleUsernameChange = (event) =>{
      this.setState({username:event.target.value})
    }

    handleNicknameChange = (event) =>{
      this.setState({nickname:event.target.value})
    }

    handlePasswordChange = (event) =>{
      this.setState({password:event.target.value})
    }

    clickRegister = () => {
        const {username,nickname,password} = this.state;
        if (username && nickname && password) {
            this.props.register(username, nickname, password)
                .then(() => this.props.history.push("/login"))
        }
    }

    render() {
        return (
            <div className="register-form">
                <FormControl margin="normal" fullWidth>
                  <TextField value={this.state.username} onChange={this.handleUsernameChange}
                             size="small" label="user name"
                             color="secondary" variant="outlined" />
                </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField value={this.state.nickname} onChange={this.handleNicknameChange}
                           size="small" label="nick name"
                           color="secondary" variant="outlined" />
              </FormControl>
              <FormControl margin="normal" fullWidth>
              <TextField value={this.state.password} onChange={this.handlePasswordChange}
                         size="small" label="password" type="password"
                         color="secondary" variant="outlined" />
              </FormControl>
              <FormControl margin="normal" className="-action">
                  <Button variant="contained" color="primary" onClick={this.clickRegister}>register</Button>
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
        register:register
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm))

