import React, {Component} from "react";

export class Comment extends Component{

  render() {
    return(
      <div className="post">
        <p>{this.props.comment.commentContent}</p>
      </div>
    )
  }
}

export default Comment

