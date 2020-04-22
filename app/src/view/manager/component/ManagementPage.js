import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";

export class ManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Box>
        hello
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagementPage))