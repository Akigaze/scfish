import React, {Component, Fragment} from "react"
import Typography from "@material-ui/core/Typography"
import Posts from "./component/Posts";

export class PostList extends Component {

  render() {
    return (
        <Fragment>
          <Typography variant="h1" component="h2">
            Post list...
          </Typography>
          <Posts/>
        </Fragment>
    )
  }
}
