import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import _ from "lodash"
import store from "../../../store";

import {getPosts, search} from "../../../action/post.action";
import Post from "./Post";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {user} from "../../../action/actionType";

export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: undefined,
      pageNum: 0,
      postList: [],
    };
  }

  componentDidMount() {
    store.subscribe(this.handleKeywordChange)
  }

  UNSAFE_componentWillMount() {
    this.initPostList()
  }

  componentWillUnmount() {
    store.subscribe(this.handleKeywordChange)
    store.dispatch({type:'keyword'})
  }

  initPostList() {
    this.setState({postList: [],pageNum: 0},()=>{
      if(store.getState().post.keyword){
        this.search(store.getState().post.keyword)
      }else {
        this.getPageOfPost()
      }
    })
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
    const {pageNum, totalPages, keyword} = this.state
    if (pageNum + 1 === totalPages) {
      return
    }
    if (keyword) {
      this.setState({pageNum: pageNum + 1}, () => {
        this.search(keyword, this.state.pageNum)
      })
    } else {
      this.setState({pageNum: pageNum + 1}, () => {
        this.getPageOfPost(this.state.pageNum)
      })
    }
  }

  search = (keyword) => {
    const {pageNum} = this.state
    this.props.search(keyword, pageNum)
      .then(pageOfPost => {
        if (pageOfPost && !_.isEmpty(pageOfPost.content))
          this.setState({
            postList: [...this.state.postList, ...pageOfPost.content],
            totalPages: pageOfPost.totalPages
          })
      })
  }

  handleKeywordChange = () => {
    if(store.getState().post.keyword){
      if(this.props.location.path!=='/post'){
        this.props.history.push('/post')
      }
      this.forceUpdate(this.initPostList)
    }
  }

  render() {
    return (
      <div id="post-list">
        {
          this.state.postList.map(post => {
            return <Post key={"post" + post.id} {...post} />
          })
        }
        <IconButton onClick={this.getNextPage} style={{marginBottom:"30px"}}>
          <KeyboardArrowDownIcon />
        </IconButton>
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
    search: search
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))

