import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import store from "../../../store";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {modify} from "../../../action/user.action";

export class modifyForm extends Component{
  constructor(props) {
    super(props);
    this.state={
      nickname:'',
    }
  }

  componentDidMount() {
    const profile = store.getState().user.profile
    this.setState({
      nickname:profile.nickname
    })
  }

  handleNicknameChange = (event) => {
    this.setState({
      nickname : event.target.value
    })
  }

  handleUpdateClick = () => {
    const newProfile = {
      username: store.getState().user.profile.username,
      nickname: this.state.nickname
    }
    this.props.modify(newProfile).then(data=>{
      this.props.history.push("/information")
    })
  }

  render() {
    return(
      <div>
        <Box borderRadius={4} mt={5} pt={3} pb={1} boxShadow={2}>
          <span style={{"fontSize":"16px"}}>nickname:</span>
          <input style={{"marginLeft":"8px","padding":"2px"}}
                 onChange={this.handleNicknameChange} value={this.state.nickname}/>
          <Button style={{"display":"block","margin":"10px auto"}} variant="outlined" onClick={this.handleUpdateClick}>update</Button>
        </Box>
      </div>
    )
  }
}

function mapStateToProps(){
  return{}
}

function mapDispatchToProps(dispatch,props){
  return bindActionCreators({
    modify:modify
  },dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(modifyForm))