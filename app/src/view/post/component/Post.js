import React, {Component} from "react";


export class Post extends Component{
  clickPost = () =>{
    console.log(this.props.post.id)
  }

  render() {
    return(
      <div className="post" onClick={this.clickPost}>
        <p>{this.props.post.title}</p>
        <p>{this.props.post.content}</p>
      </div>
    )
  }
}


export default Post