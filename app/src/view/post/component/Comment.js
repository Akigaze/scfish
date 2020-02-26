import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {Avatar} from "@material-ui/core";
import store from "../../../store"
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import {bindActionCreators} from "redux";
import {deleteComment} from "../../../action/comment.action";
import {connect} from "react-redux";
import {withRouter} from "react-router";

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.commentRef = React.createRef()
  }
  handleDeleteClick = (event) => {
    this.props.deleteComment(this.props.id).then(data=>{
      this.commentRef.current.className = "deleted"
    })
  }

  render() {
    const {userNickname, content, createdTime} = this.props
    return (
      <Box ref={this.commentRef} my={2} ml={2}>
        <Box style={{display: "flex", flexDirection: "row-reverse"}}>
          {this.props.username === store.getState().user.profile.username ?
            <IconButton onClick={this.handleDeleteClick} style={{padding: 3}}>
              <ClearIcon style={{fontSize: 15}}/>
            </IconButton> : null}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box fontSize={14} textAlign="left" display="flex" alignItems="center">
            <Avatar src={"data:image/*;base64," + this.props.avatar}
                    style={{width: 25, height: 25, marginRight: 10}}/>
            <span>{userNickname} :</span>
          </Box>
          <Box fontSize={12} textAlign="right">
            <span>{createdTime}</span>
          </Box>
        </Box>
        <Box textAlign="left" mx={5} my={1}>
          <span>{content}</span>
        </Box>
      </Box>
    )
  }
}

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    deleteComment: deleteComment
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))

