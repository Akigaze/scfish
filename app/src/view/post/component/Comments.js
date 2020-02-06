import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {getComments, publish} from "../../../action/comment.action";
import Comment from "./Comment";
import storage from "../../../core/storage";


export class Comments extends Component{
  constructor(props) {
    super(props);
    this.state={
      page:1,
      postId:this.props.location.state.postId,
      commentPage:[],
      commentContent:''
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

  handleChange = (event) => {
    this.setState({commentContent:event.target.value})
  }

  clickPublish = () => {
    this.props.publish(storage.getters.profile().username,this.state.postId,this.state.commentContent)
  }

  render() {
    return(
      <div>
        <input value={this.state.commentContent} onChange={this.handleChange}/>
        <button onClick={this.clickPublish}>publish</button>
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
    getComments:getComments,
    publish:publish
  },dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Comments))


