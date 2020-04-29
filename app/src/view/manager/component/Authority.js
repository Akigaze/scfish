import React, {Component} from "react"
import Box from "@material-ui/core/Box";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

export class Authority extends Component {

  render() {
    return (
      <Box>
        Authority
      </Box>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({

  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authority))
