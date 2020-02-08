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
import Divider from "@material-ui/core/Divider";
import CreateIcon from '@material-ui/icons/Create';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      menuOpen: null
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
    this.setState({menuOpen:event.target})
  }

  handleCloseMenu = (event) => {
    this.setState({menuOpen:null})
  }

  handleClickPortrait = (event) => {
    this.setState({anchorEl: event.target})
  }

  closePopover = (event) => {
    this.setState({anchorEl: null})
  }

  handleClickAccount = (event) => {

  }

  handleClickSettings = (event) => {

  }

  handleClickLogout = (event) => {
    this.props.logout()
  }

  handleClickPublish = (event) => {
    if(this.props.location.pathname!=="/publish"){
      this.props.history.push("/publish")
    }
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
                  <IconButton onClick={this.handleCloseMenu} >
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <MenuList>
                </MenuList>
              </Drawer>
              <div>
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
          {this.props.children}
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
    profile: state.user.profile
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout: logout,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout))
