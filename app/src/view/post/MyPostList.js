import React, {Component, Fragment} from "react"
import MyPosts from "./component/MyPosts";
import Typography from "@material-ui/core/Typography";

export default  class PostList extends Component {

  render() {
    return (
      <Fragment>
        <Typography component="h4" variant="h3">MyPosts</Typography>
        <MyPosts />
      </Fragment>
    )
  }
}
