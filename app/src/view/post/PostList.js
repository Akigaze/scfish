import React, {Component, Fragment} from "react"
import Posts from "./component/Posts";

export class PostList extends Component{

  render() {
    return(
        <Fragment>
            <h1>Post List...</h1>
            <Posts />
        </Fragment>
    )
  }
}
