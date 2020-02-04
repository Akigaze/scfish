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
            postPage: []
        };
    }

    componentWillMount() {
        this.props.getPosts()
            .then(value => {
                this.setState({
                    postPage: value
                });
            })
    }


    render() {
        return (
            <div className="post-list">
                {
                    this.state.postPage.map((post,index) => {
                        return <Post post={post} key={post.id} />
                    }
                )}
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

