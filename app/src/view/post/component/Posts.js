import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {getPosts} from "../../../action/post.action";
import {post as actionType} from "../../../action/actionType";
import store from "../../../store";

export class Posts extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.getPosts()
    }

    render() {
        return(
            <div>
                <p>{this.state.page}</p>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
    }
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators({
        getPosts:getPosts
    }, dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Posts))

