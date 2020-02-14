import React, {Component, Fragment} from "react"
import Typography from "@material-ui/core/Typography";
import MyFavorite from "./component/MyFavorite";

export default  class PostList extends Component {

  render() {
    return (
      <Fragment>
        <Typography component="h4" variant="h3">MyFavorite</Typography>
        <MyFavorite />
      </Fragment>
    )
  }
}
