import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";

export class Post extends Component{

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
      <Box onClick={this.clickPost} style={{padding:15}}
           borderRadius={4} border={1} borderColor="grey" m={1} boxShadow={2}>
        <Box component="div" overflow="hidden" textOverflow="ellipsis"
             textAlign="left" fontSize="h5.fontSize"
              style={{height:"1.4em"}} ml={2}>
          {this.props.post.title}
        </Box>
        <Box component="div" overflow="hidden" textOverflow="ellipsis"
             textAlign="left" fontSize={16}
             style={{height:"2.8em"}} ml={4} mt={2}>
          {this.props.post.content}
        </Box>
      </Box>
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

