import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {getPosts} from "../../../action/post.action";
import Post from "./Post";

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
        if(this.state.page===1){
            this.getPage(1)
        }else {
            this.getPage(this.state.page-1)
        }
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
                <button className="btn" onClick={this.getNextPage}>next</button>
                <button className="btn" onClick={this.getPrePage}>previous</button>
            </div>
        )
    }
}


function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators({
        getPosts: getPosts
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))

