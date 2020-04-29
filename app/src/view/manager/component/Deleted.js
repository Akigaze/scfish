import React, {Component} from "react"
import Box from "@material-ui/core/Box";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

export class Deleted extends Component {

  render() {
    return (
      <Box>
        Deleted
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Deleted))
