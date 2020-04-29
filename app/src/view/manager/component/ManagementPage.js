import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {Container, Divider} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Forbidden from "./Forbidden";
import Deleted from "./Deleted";
import Authority from "./Authority";

export class ManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "Forbidden",
      keyword:""
    }
  }

  onForbiddenClick = () => {
    this.setState({state: "Forbidden"})
  }

  onDeletedClick = () => {
    this.setState({state: "Deleted"})
  }

  onAuthorityClick = () => {
    this.setState({state: "Authority"})
  }

  operationMenu = [
    {
      id: "ForbiddenUser",
      text: "Forbidden User",
      onclick: this.onForbiddenClick
    },
    {
      id: "DeletedPost",
      text: "Deleted Post",
      onclick: this.onDeletedClick
    },
    {
      id: "AuthorityManagement",
      text: "Authority Management",
      onclick: this.onAuthorityClick
    }
  ]

  menuDisplay = [
    {
      state: "Forbidden",
      Component:Forbidden
    },
    {
      state: "Deleted",
      Component: Deleted
    },
    {
      state: "Authority",
      Component: Authority
    }
  ]

  onSearchClick = () => {
    console.log(this.state.keyword)
  }

  handleKeywordChange =(event)=>{
    this.setState({keyword:event.target.value})
  }

  render() {
    let {state} = this.state
    return (
      <Box style={{height:"800px", display: "flex", marginTop: "50px", justifyContent: "space-between"}}>
        <Box boxShadow={1} style={{width: "15%"}}>
          {
            this.operationMenu.map(item => {
                return <Button style={{width: "80%", marginTop: "20px"}} key={item.id} size={"small"}
                             variant={"outlined"} id={item.id} onClick={item.onclick}>{item.text}</Button>
            })
          }
        </Box>
        <Box boxShadow={1} style={{width: "85%", padding: "10px"}}>
          <InputBase value={this.state.keyword} onChange={this.handleKeywordChange} placeholder="Search…"
                     style={{
                       width: "250px",
                       marginTop: "20px",
                       padding: "0 5px",
                       borderRadius: "5px",
                       border: "solid silver 1px"
                     }}/>
          <IconButton style={{marginLeft: "5px", padding: "6px"}} onClick={this.onSearchClick}>
            <SearchIcon/>
          </IconButton>
          <Divider style={{marginTop: "15px"}}/>
          {
            this.menuDisplay.map(item => {
              return state === item.state ? <item.Component key={item.state}/> : null
            })
          }
        </Box>
      </Box>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagementPage))