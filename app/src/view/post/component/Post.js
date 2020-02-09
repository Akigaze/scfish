import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {bindActionCreators} from "redux";
import {publish} from "../../../action/comment.action";
import Comments from "./Comments";
import Button from "@material-ui/core/Button";
import {Avatar, ExpansionPanel, ExpansionPanelDetails, TextField} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      expanded: false
    }
  }

  onCommentChange = (event) => {
    this.setState({comment: event.target.value})
  }

  handleSubmitClick = () => {
    if (this.state.comment) {
      this.props.publish(this.props.id, this.state.comment)
          .then(data => {
            this.child.refreshCommentList()
          })
      this.setState({comment: ''})
    }

  }

  handleExpansionPress = (event) => {
    this.setState({expanded: !this.state.expanded})
  }

  onRef = (ref) => {
    this.child = ref
  }

  render() {
    const {expanded, comment} = this.state
    const {id, title, content, userNickname, createdTime} = this.props
    return (
        <Box borderRadius={4} m={1} boxShadow={2} style={{"wordBreak":"break-all"}} >
          <ExpansionPanel expanded={Boolean(expanded)} onChange={this.handleExpansionPress}>
            <ExpansionPanelSummary>
              <Box p={1}  >
                <Box textAlign="left" fontSize="h5.fontSize" mb="4px">
                  {title}
                </Box>
                <Box textAlign="left" fontSize={16} >
                  {content}
                </Box>
                <Box mt="14px" display="flex" alignItems="center" justifyContent="space-between">
                  <Box fontSize={12} textAlign="left" display="flex" alignItems="center">
                    <Avatar alt={userNickname}
                            style={{backgroundColor: '#3f51b5', width: 20, height: 20, fontSize: 12, marginRight: 4}}>
                      {userNickname[0]}
                    </Avatar>
                    <span>{userNickname}</span>
                  </Box>
                  <Box fontSize={12} textAlign="right">
                    {createdTime.replace('T',' ')}
                  </Box>
                </Box>
              </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{"width": "100%"}}>
                <Divider/>
                <div id={"comment" + id}>
                  <TextField style={{"display":"block"}} fullWidth multiline rows={3} rowsMax={20}
                             variant="outlined" label="comment" margin="normal"
                             value={comment} onChange={this.onCommentChange}/>
                  <Button color="primary" variant="outlined" onClick={this.handleSubmitClick}>submit</Button>
                  <Comments onRef={this.onRef} postId={id}/>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Box>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    publish: publish
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))

