import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {AppBar, IconButton, Toolbar, Tooltip} from "@material-ui/core"
import {AccountCircle, Menu} from "@material-ui/icons"

export class AdminLayout extends Component {

  render() {
    const {profile} = this.props
    return (
        <div className="App">
          <AppBar position="static">
            <Toolbar className="admin-toolbar">
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Menu/>
              </IconButton>
              <Tooltip title={profile && profile.nickname}>
                <IconButton edge="end" color="inherit">
                  <AccountCircle/>
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          {this.props.children}
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.user.profile
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout))
