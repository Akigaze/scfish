import React, {Component} from "react";
import store from "../../../store";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

export class Information extends Component{
  constructor(props) {
    super(props);
    this.state={
      username:'',
      nickname:'',
    }
  }

  componentDidMount() {
    this.setState(store.getState().user.profile)
  }

  handleClickModify = () => {
    this.props.history.push("/modify")
  }

  render() {
    return(
      <div>
        <Box borderRadius={4} mt={5} p={3} boxShadow={2}>
          <Box className="information-format">
            <span>username: {this.state.username}</span>
            <span>nickname: {this.state.nickname}</span>
          </Box>
          <Button onClick={this.handleClickModify} color="secondary" variant="outlined">modify</Button>
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
  },dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Information))