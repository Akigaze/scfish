import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  AppBar, Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Toolbar,
  Tooltip
} from "@material-ui/core"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import MenuIcon from "@material-ui/icons/Menu"
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import {logout} from "../action/user.action";
import CreateIcon from '@material-ui/icons/Create';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import store from "../store";
import ClearIcon from '@material-ui/icons/Clear';

export class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      menuOpen: null,
      keyword:''
    }
  }

  profileMenus() {
    return [
      {
        id: "account",
        text: "account",
        Icon: AccountCircleIcon,
        onclick: this.handleClickAccount
      },
      {
        id: "settings",
        text: "setting",
        Icon: SettingsIcon,
        onclick: this.handleClickSettings
      },
      {
        id: "logout",
        text: "logout",
        Icon: PowerSettingsNewIcon,
        onclick: this.handleClickLogout
      }
    ]
  }

  handleClickMenu = (event) => {
    console.log(this.props.children)
    this.setState({menuOpen: event.target})
  }

  handleCloseMenu = (event) => {
    this.setState({menuOpen: null})
  }

  handleClickPortrait = (event) => {
    this.setState({anchorEl: event.target})
  }

  closePopover = (event) => {
    this.setState({anchorEl: null})
  }

  handleClickAccount = (event) => {
    if (this.props.location.pathname !== "/information") {
      this.props.history.push("/information")
    }
  }

  handleClickSettings = (event) => {

  }

  handleClickLogout = (event) => {
    this.props.logout()
  }

  handleClickPublish = (event) => {
    if (this.props.location.pathname !== "/publish") {
      this.props.history.push("/publish")
    }
  }

  handleKeywordChange = (event) => {
    this.setState({keyword:event.target.value})
  }

  handleSearchKeyPress = (event) => {
    if(event.charCode===13){
      this.handleClickSearch()
    }
  }

  handleClickSearch = () => {
    store.dispatch({type:"keyword",keyword:this.state.keyword})
  }

  handleClickSearchClear = () => {
    this.setState({keyword:''})
  }

  render() {
    const {profile} = this.props
    const {anchorEl} = this.state
    const {menuOpen} = this.state
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar className="admin-toolbar">
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleClickMenu}>
              <MenuIcon/>
            </IconButton>
            <Drawer open={Boolean(menuOpen)} onClose={this.handleCloseMenu}>
              <div>
                <IconButton onClick={this.handleCloseMenu}>
                  <ChevronLeftIcon/>
                </IconButton>
              </div>
              <MenuList>
              </MenuList>
            </Drawer>
            <div>
              <div className="search">
                <div className="search-icon">
                  <SearchIcon />
                </div>
                <InputBase value={this.state.keyword} onKeyPress={this.handleSearchKeyPress} onChange={this.handleKeywordChange} placeholder="Search…" color="primary"/>
                <div className="search-clear">
                  <ClearIcon fontSize="small" onClick={this.handleClickSearchClear}/>
                </div>
              </div>
              <Tooltip title="publish">
                <IconButton edge="end" color="inherit" onClick={this.handleClickPublish}>
                  <CreateIcon/>
                </IconButton>
              </Tooltip>
              <Tooltip title={profile && profile.nickname}>
                <IconButton edge="end" color="inherit" onClick={this.handleClickPortrait}>
                  <AccountCircleIcon/>
                </IconButton>
              </Tooltip>
              <Popover open={Boolean(anchorEl)}
                       anchorEl={anchorEl}
                       anchorOrigin={{
                         vertical: "bottom",
                         horizontal: "right"
                       }}
                       transformOrigin={{
                         vertical: -8,
                         horizontal: 8
                       }}
                       onClose={this.closePopover}>
                <MenuList>
                  {this.profileMenus().map(item => {
                    return <ProfileMenuItem key={item.id} {...item}/>
                  })}
                </MenuList>
              </Popover>
            </div>
          </Toolbar>
        </AppBar>
        <div>
          <Container maxWidth="sm">
            {this.props.children}
          </Container>
        </div>
      </div>
    )
  }
}

const ProfileMenuItem = (props) => {
  const {id, text, Icon, onclick} = props
  return (
    <MenuItem id={id} onClick={onclick}>
      <ListItemIcon>
        <Icon/>
      </ListItemIcon>
      <ListItemText primary={text}/>
    </MenuItem>
  )
}

function mapStateToProps(state) {
  return {
    profile: state.user.profile,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout: logout,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout))
