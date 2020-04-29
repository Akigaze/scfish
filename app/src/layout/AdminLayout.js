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
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import {logout} from "../action/user.action";
import CreateIcon from '@material-ui/icons/Create';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import store from "../store";
import ClearIcon from '@material-ui/icons/Clear';
import ForumIcon from '@material-ui/icons/Forum';
import {Favorite} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import Box from "@material-ui/core/Box";

const mdSizeContainerMap = ["/management"]

export class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      menuOpen: null,
      keyword: '',
      isManager: false
    }
  }

  drawerMenus() {
    return [
      {
        id: "myPosts",
        text: "My Posts",
        Icon: ForumIcon,
        onclick: this.handleClickMyPost
      },
      {
        id: "myFavorite",
        text: "My Favorite",
        Icon: Favorite,
        onclick: this.handleClickMyFavorite
      }
    ]
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
    this.setState({keyword: event.target.value})
  }

  handleSearchKeyPress = (event) => {
    if (event.charCode === 13) {
      this.handleClickSearch()
    }
  }

  handleClickSearch = () => {
    store.dispatch({type: "keyword", keyword: this.state.keyword})
  }

  handleClickSearchClear = () => {
    this.setState({keyword: ''})
  }

  handleClickHome = () => {
    store.dispatch({type: "keyword"})
    if (this.props.location.pathname !== "/post") {
      this.props.history.push("/post")
    }
  }

  handleClickMyPost = () => {
    if (this.props.location.pathname !== "/myPosts") {
      this.props.history.push("/myPosts")
    }
  }

  handleClickMyFavorite = () => {
    if (this.props.location.pathname !== "/myFavorite") {
      this.props.history.push("/myFavorite")
    }
  }

  handleManagerClick = () => {
    if (this.props.location.pathname !== "/management") {
      this.props.history.push("/management")
    }
  }

  render() {
    const {profile} = this.props
    const {anchorEl} = this.state
    const {menuOpen} = this.state
    return (
      <Box className="App">
        <AppBar position="static">
          <Toolbar className="admin-toolbar">
            <Box>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleClickMenu}>
                <MenuIcon/>
              </IconButton>
              <Drawer open={Boolean(menuOpen)} onClose={this.handleCloseMenu}>
                <Box style={{display: "flex", justifyContent: "space-between"}}>
                  <IconButton onClick={this.handleCloseMenu} style={{}}>
                    <ChevronLeftIcon/>
                  </IconButton>
                  {
                    store.getState().manager.isManager?<IconButton color="secondary" onClick={this.handleManagerClick} style={{}}>
                      <PersonIcon/>
                    </IconButton>:null
                  }
                </Box>
                <MenuList>
                  {this.drawerMenus().map(item => {
                    return <ProfileMenuItem key={item.id} {...item}/>
                  })}
                </MenuList>
              </Drawer>
              <IconButton color="inherit" onClick={this.handleClickHome}>
                <HomeIcon/>
              </IconButton>
            </Box>
            <Box>
              <Box className="search">
                <InputBase value={this.state.keyword} onKeyPress={this.handleSearchKeyPress} style={{width: 200}}
                           onChange={this.handleKeywordChange} placeholder="Search…" color="primary"
                           startAdornment={<SearchIcon style={{color: "white", margin: 5}}/>}
                           endAdornment={<ClearIcon style={{color: "white", margin: 5}}
                                                    onClick={this.handleClickSearchClear}/>}/>
              </Box>
              <Tooltip title="publish">
                <IconButton edge="end" color="inherit" onClick={this.handleClickPublish}>
                  <CreateIcon/>
                </IconButton>
              </Tooltip>
              <Tooltip title={(profile && profile.nickname) || ""}>
                <IconButton edge="end" color="inherit" onClick={this.handleClickPortrait}>
                  <Avatar src={profile && "data:image/*;base64," + profile.avatarThumbnail}
                          style={{width: 30, height: 30}}/>
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
            </Box>
          </Toolbar>
        </AppBar>
        <Box>
          <Container maxWidth={mdSizeContainerMap.includes(this.props.location.pathname)?"md":"sm"}>
            {this.props.children}
          </Container>
        </Box>
      </Box>
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
