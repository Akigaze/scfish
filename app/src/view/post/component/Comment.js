import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {Avatar} from "@material-ui/core";

export class Comment extends Component {

  render() {
    const {userNickname, content, createdTime} = this.props
    return (
      <Box my="20px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box fontSize={14} textAlign="left" display="flex" alignItems="center">
            <Avatar alt={userNickname}
                    style={{backgroundColor: '#3f51b5', width: 20, height: 20, fontSize: 12, marginRight: 4}}>
              {userNickname[0]}
            </Avatar>
            <span>{userNickname} :</span>
          </Box>
          <Box fontSize={12} textAlign="right">
            <span>{createdTime.replace('T', ' ')}</span>
          </Box>
        </Box>
        <Box textAlign="left" mx={5} my={1}>
          <span>{content}</span>
        </Box>
      </Box>
    )
  }
}

export default Comment

