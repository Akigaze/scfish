import React, {Component, Fragment} from "react";
import Comments from "./component/Comments";
import Typography from "@material-ui/core/Typography";

export class PostDetail extends Component{
  render() {
    return(
      <Fragment>
        <Typography variant="h1" component="h2">
          Comment list...
        </Typography>
        <Comments/>
      </Fragment>
    )
  }
}