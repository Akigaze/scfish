import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {register} from "../../../action/user.action";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "../../../asset/css/common.css"


export class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.usernameRef = React.createRef()
        this.nicknameRef = React.createRef()
        this.passwordRef = React.createRef()
    }

    clickRegister = () => {
        const username = this.usernameRef.current.value;
        const nickname = this.nicknameRef.current.value;
        const password = this.passwordRef.current.value;
        if (username && nickname && password) {
            this.props.register(username, nickname, password)
                .then(() => this.props.history.push("/login"))
        }
    }

    render() {
        return (
            <div className="register-form">
                <div>
                    <input ref={this.usernameRef} className="input" placeholder="user name"/>
                </div>
                <div>
                    <input ref={this.nicknameRef} className="input" placeholder="nick name"/>
                </div>
                <div>
                    <input ref={this.passwordRef} className="input" type="password" placeholder="password"/>
                </div>
                <button onClick={this.clickRegister} className="btn">register</button>
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

