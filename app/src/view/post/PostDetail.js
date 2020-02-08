import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom"
import Comments from "./component/Comments";

export class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
    }
  }

  render() {
    return (
        <Fragment>
          <Comments postId={this.state.id}/>
        </Fragment>
    )
  }
}

export default withRouter(PostDetail)