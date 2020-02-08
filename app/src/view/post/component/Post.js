import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {bindActionCreators} from "redux";
import {publish} from "../../../action/comment.action";
import Comments from "./Comments";
import Button from "@material-ui/core/Button";
import {ExpansionPanel, ExpansionPanelDetails} from "@material-ui/core";
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
        .then(data => {this.child.refreshCommentList()})
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
    const {expanded} = this.state

    return (
      <Box borderRadius={4} m={1} boxShadow={2}>
        <ExpansionPanel expanded={Boolean(expanded)} onChange={this.handleExpansionPress}>
          <ExpansionPanelSummary>
            <Box p={1} style={{"width": "100%"}}>
              <Box textAlign="left" fontSize="h5.fontSize"
                   ml={2}>
                {this.props.title}
              </Box>
              <Box textAlign="left" fontSize={16}
                   ml={4} mt={2}>
                {this.props.content}
              </Box>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{"width": "100%"}}>
              <Divider/>
              <div id={"comment" + this.props.id}>
                <input value={this.state.comment} onChange={this.onCommentChange} className="comment-input-box"/>
                <Button color="primary" variant="outlined" onClick={this.handleSubmitClick}>submit</Button>
                <Comments onRef={this.onRef} postId={this.props.id}/>
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

