import React, {Component} from "react";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {getComments, publish} from "../../../action/comment.action";
import Comment from "./Comment";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash"


export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      pageNum: 0,
      totalPages: 0,
      commentList: []
    }
    this.preButton = React.createRef()
    this.nextButton = React.createRef()
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  refreshCommentList() {
    this.props.getComments(this.props.postId, this.state.pageNum)
      .then(pageOfComment => {
        if (pageOfComment && !_.isEmpty(pageOfComment.content)) {
          this.setState({
              commentList: pageOfComment.content,
              totalPages: pageOfComment.totalPages
            }, () =>
              this.handlePageButtonChange()
          )
        }
      })

  }

  handleNextPage = () => {
    const {pageNum, totalPages} = this.state
    if (pageNum + 1 === totalPages) {
      return
    }
    this.setState({pageNum: pageNum + 1}, () => {
      this.refreshCommentList()
    })
  }

  handlePrePage = () => {
    const {pageNum} = this.state
    if (pageNum === 0) {
      return
    }
    this.setState({pageNum: pageNum - 1}, () => {
      this.refreshCommentList()
    })
  }

  handlePageButtonChange = () => {
    const {pageNum, totalPages} = this.state
    if (pageNum === 0) {
      this.preButton.current.style = "visibility: hidden"
    } else {
      this.preButton.current.style = ""
    }
    if (pageNum + 1 === totalPages) {
      this.nextButton.current.style=  "display:none"
    } else {
      this.nextButton.current.style = ""
    }
  }

  render() {
    return (
      <div>
        <IconButton ref={this.preButton} onClick={this.handlePrePage} style={{"visibility": "hidden"}}>
          <KeyboardArrowUpIcon/>
        </IconButton>
        {
          this.state.commentList.map(comment => {
            return <Comment key={"comment" + comment.id} {...comment}/>
          })
        }
        <IconButton ref={this.nextButton} onClick={this.handleNextPage} style={{"display": "none"}}>
          <KeyboardArrowDownIcon/>
        </IconButton>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    getComments: getComments,
    publish: publish
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))


