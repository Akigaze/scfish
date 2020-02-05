import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {getComments} from "../../../action/comment.action";
import Comment from "./Comment";


export class Comments extends Component{
  constructor(props) {
    super(props);
    this.state={
      page:1,
      postId:this.props.location.state.postId,
      commentPage:[]
    }
  }

  componentWillMount() {
    console.log(this.state.postId)
    this.props.getComments(this.state.page,this.state.postId)
      .then(value=>{
        this.setState({
            commentPage:value.content
          })
        })
  }

  render() {
    return(
      <div>
        <div className="posts">
          {
            this.state.commentPage.map((comment,index) => {
                return <Comment comment={comment} key={comment.id} />
              }
            )}
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  return{}
}

function mapDispatchToProps(dispatch,props){
  return bindActionCreators({
    getComments:getComments
  },dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Comments))


