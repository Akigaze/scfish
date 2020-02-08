import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import _ from "lodash"

import {getPosts} from "../../../action/post.action";
import Post from "./Post";


export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: undefined,
      pageNum: 0,
      postList: [],
    };
  }

  // Load next page automatically
  handleWindowScroll = (event) => {
    const scrollTop = (event.target ? event.target.documentElement.scrollTop : false) || window.pageYOffset || (event.target ? event.target.body.scrollTop : 0);
    const clientHeight = (event.target && event.target.documentElement.clientHeight) || document.body.clientHeight;
    const scrollHeight = (event.target && event.target.documentElement.scrollHeight) || document.body.scrollHeight;
    const height = scrollHeight - scrollTop - clientHeight;
    if (Math.round(height) < 1) {
      this.getNextPage()
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleWindowScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleWindowScroll)
  }

  initPostList() {
    this.getPageOfPost()
  }

  //getPosts
  componentWillMount() {
    this.initPostList()
  }

  getPageOfPost = (pageNum = 0, pageSize = 10) => {
    this.props.getPosts(pageNum, pageSize)
      .then(pageOfPost => {
        if (pageOfPost && !_.isEmpty(pageOfPost.content))
          this.setState({
            postList: [...this.state.postList, ...pageOfPost.content],
            totalPages: pageOfPost.totalPages
          })
      })
  }

  getNextPage = () => {
    const {pageNum, totalPages} = this.state
    if (pageNum + 1 === totalPages) {
      return
    }
    this.setState({pageNum: pageNum + 1}, () => {
      this.getPageOfPost(this.state.pageNum)
    })
  }

  render() {
    return (
      <div id="post-list">
        <Container fixed maxWidth="md">
          {
            this.state.postList.map(post => {
              return <Post key={post.id} {...post}/>
            })
          }
        </Container>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    getPosts: getPosts,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))

