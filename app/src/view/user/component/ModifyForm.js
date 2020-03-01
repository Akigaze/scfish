import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import store from "../../../store";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {modify} from "../../../action/user.action";
import {TextField} from "@material-ui/core";

export class modifyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
    }
  }

  componentDidMount() {
    this.setState({
      nickname: this.props.nickname
    })
  }

  nicknameChanged() {
    const {nickname} = this.state
    const updatedNickname = nickname && nickname.trim()
    return Boolean(updatedNickname && updatedNickname !== this.props.nickname)
  }

  handleNicknameChange = (event) => {
    this.setState({
      nickname: event.target.value
    })
  }

  handleUpdateClick = () => {
    const newProfile = {
      username: store.getState().user.profile.username,
      nickname: this.state.nickname
    }
    this.props.modify(newProfile).then(data => {
      this.props.history.push("/information")
    })
  }

  handleCancelClick = () => {
    this.props.history.push("/information")
  }

  render() {
    const {nickname} = this.state
    const isNicknameChanged = this.nicknameChanged()
    return (
      <div>
        <Box className="modify-profile-box" borderRadius={4} boxShadow={2}>
          <Box className="modify-profile-input-box">
            <span>nickname:</span>
            <TextField size="small" variant="outlined" onChange={this.handleNicknameChange} value={nickname}/>
          </Box>
          <Box className="modify-profile-actions-box">
            <Button variant="contained" color="secondary" disabled={!isNicknameChanged} onClick={this.handleUpdateClick}>update</Button>
            <Button variant="outlined" color="secondary" onClick={this.handleCancelClick}>cancel</Button>
          </Box>
        </Box>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    nickname: state.user.profile.nickname
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    modify: modify
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(modifyForm))