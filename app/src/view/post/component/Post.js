import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";

export class Post extends Component{

  handlePostClick = () =>{
    this.props.history.push(`/post/${this.props.id}`)
  }

  render() {
    return(
      <Box onClick={this.handlePostClick} style={{padding:15}}
           borderRadius={4} border={1} borderColor="grey" m={1} boxShadow={2}>
        <Box component="div" overflow="hidden" textOverflow="ellipsis"
             textAlign="left" fontSize="h5.fontSize"
              style={{height:"1.4em"}} ml={2}>
          {this.props.title}
        </Box>
        <Box component="div" overflow="hidden" textOverflow="ellipsis"
             textAlign="left" fontSize={16}
             style={{height:"2.8em"}} ml={4} mt={2}>
          {this.props.content}
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

