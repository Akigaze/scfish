import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {getComments, publish} from "../../../action/comment.action";
import Comment from "./Comment";


export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      pageNum: 0,
      commentList: []
    }
  }

  componentDidMount() {
    this.refreshCommentList()
  }

  refreshCommentList() {
    this.props.getComments(this.props.postId, this.state.pageNum)
        .then(pageOfComment => {
          this.setState({
            commentList: pageOfComment.content
          })
        })
  }

  handleChange = (event) => {
    this.setState({content: event.target.value})
  }

  handlePublishClick = () => {
    this.props.publish(this.props.postId, this.state.content)
        .then(resp => {
          this.setState({content: ''})
          this.refreshCommentList()
        })
  }

  render() {
    return (
        <div>
          <input value={this.state.content} onChange={this.handleChange}/>
          <button onClick={this.handlePublishClick}>publish</button>
          <div className="posts">
            {
              this.state.commentList.map(comment => {
                    return <Comment key={comment.id} {...comment}/>
                  }
              )}
          </div>
        </div>
    )
  }

}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    getComments: getComments,
    publish: publish
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))


