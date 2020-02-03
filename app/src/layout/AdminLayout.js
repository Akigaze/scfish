import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {getAccess} from "../action/user.action";

export class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessible: false
    }
  }

  componentDidMount() {
    // TODO should validate token from service then render
    this.props.getAccess()
        .then(resp => {
          this.setState({accessible: true})
        })
        .catch(error => {
          this.props.history.push("/login")
        })
  }

  render() {
    console.log(this.state.accessible);
    return (
        <div className="App">
          <header className="App-header">
            {this.state.accessible ? this.props.children : <h1>loading...</h1>}
          </header>
        </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    token: state.user.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAccess: getAccess
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout))
