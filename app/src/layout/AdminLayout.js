import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

export class AdminLayout extends Component {

  render() {
    const {profile} = this.props
    return (
        <div className="App">
          <div className="admin-header">
            <div className="user-portrait" title={profile && profile.nickname}></div>
          </div>
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
  return bindActionCreators({

  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout))
