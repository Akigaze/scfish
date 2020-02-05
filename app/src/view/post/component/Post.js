import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";

export class Post extends Component{
  constructor(props) {
    super(props);
  }

  clickPost = () =>{
    const state = {postId:this.props.post.id}
    const path = {
      pathname:"/detail",
      state:state
    }
    this.props.history.push(path)
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

function mapStateToProps(state){
  return{}
}
function mapDispatchToProps(dispatch,props){
  return {}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Post))

