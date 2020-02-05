import React, {Component} from "react";

export class Comment extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="post">
        <p>{this.props.comment.commentContent}</p>
      </div>
    )
  }
}

export default Comment

