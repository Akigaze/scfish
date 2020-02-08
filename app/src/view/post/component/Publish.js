import React, {Component} from "react";
import FormControl from "@material-ui/core/FormControl";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {publish} from "../../../action/post.action";


export class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    }
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value})
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value})
  }

  handlePublishClick = () => {
    const {title, content} = this.state
    this.props.publish(title, content).then(data => {
      this.props.history.push("/post")
    })
  }


  render() {
    return (
        <div className="publish">
          <FormControl margin="normal" fullWidth>
            <TextField variant="outlined" size="small" color="primary"
                       value={this.state.title} onChange={this.handleTitleChange}/>
          </FormControl>
          <FormControl margin="normal" fullWidth className="content">
            <TextField variant="outlined" size="small" color="primary"
                       value={this.state.content} onChange={this.handleContentChange}/>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <Button variant="contained" color="primary" className="publish-btn"
                    onClick={this.handlePublishClick}>publish</Button>
          </FormControl>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Publish))

