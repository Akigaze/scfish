import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import _ from "lodash"

import {getMyFavorite} from "../../../action/post.action";
import Post from "./Post";

export class MyFavorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: undefined,
      pageNum: 0,
      postList: [],
    };
  }

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

  UNSAFE_componentWillMount() {
    this.initPostList()
  }

  initPostList() {
    this.getPageOfMyFavorite()
  }

  getPageOfMyFavorite = (pageNum = 0, pageSize = 10) => {
    this.props.getMyFavorite(pageNum, pageSize)
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
      this.getPageOfMyFavorite(this.state.pageNum)
    })
  }

  render() {
    return (
      <div id="post-list">
        {
          this.state.postList.map(post => {
            return <Post key={"post" + post.id} {...post}/>
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    getMyFavorite:getMyFavorite
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyFavorite))

