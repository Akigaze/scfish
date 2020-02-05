import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {getPosts} from "../../../action/post.action";
import Post from "./Post";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

export class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            postPage: []
        };
    }

    getPage = (page) =>{
        this.props.getPosts(page)
          .then(value => {
              if(value===""){
                  alert("No more")
              }else {
                  this.setState({
                      postPage: value.content,
                      page : page
                 });
              }
          })
    }

    componentWillMount() {
        this.getPage(1)
    }

    getNextPage = () =>{
        this.getPage(this.state.page+1)
    }

    getPrePage = () =>{
        if(this.state.page>1){
            this.getPage(this.state.page-1)
        }
    }

  clickPublish = () =>{
    this.props.history.push("/publish");
  }

  render() {
    return (
      <div className="post-list">
        <div className="posts">
          {
            this.state.postPage.map((post,index) => {
                return <Post post={post} key={post.id} />
              }
            )}
        </div>
        <FormControl margin="normal" className="-action">
          <Button color="secondary" variant="outlined" onClick={this.getNextPage}>next</Button>
          <Button color="secondary" variant="outlined" onClick={this.getPrePage}>previous</Button>
          <Button color="primary" variant="contained" onClick={this.clickPublish}>publish</Button>
        </FormControl>
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

