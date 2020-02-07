import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {getPosts, search} from "../../../action/post.action";
import Post from "./Post";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

let flag = true;

export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      postPage: [],
    };
  }

  // Load next page automatically
  onScrollHandle(event) {
    const scrollTop = (event.target ? event.target.documentElement.scrollTop : false) || window.pageYOffset || (event.target ? event.target.body.scrollTop : 0);
    const clientHeight = (event.target && event.target.documentElement.clientHeight) || document.body.clientHeight;
    const scrollHeight = (event.target && event.target.documentElement.scrollHeight) || document.body.scrollHeight;
    const height = scrollHeight - scrollTop - clientHeight;
    if(Math.round(height)<1 && flag){
      flag = false
      document.getElementById("flag").click()
    }
  }

  componentDidMount() {
    window.addEventListener("scroll",this.onScrollHandle)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScrollHandle)
  }

  handleFlagClick = () => {
    this.getNextPage()
    flag = true
  }

  //getPosts
  componentWillMount() {
    this.getPage(1)
  }

  getPage = (page) => {
    this.props.getPosts(page)
      .then(value => {
        if (value === "") {
          alert("No more")
        } else {
         for(let index in value.content) {
           this.setState({
             postPage: [...this.state.postPage, value.content[index]],
             page: page
           })
         }
        }
      })
  }

  search = (keyword) => {
    this.props.search(keyword,this.state.page)
  }

  getNextPage = () => {
    this.getPage(this.state.page + 1)
  }

  clickPublish = () => {
    this.props.history.push("/publish")
  }

  render() {
    return (
      <div id="post-list">
        <div id="flag" type="hidden" onClick={this.handleFlagClick}/>
        <Container fixed maxWidth="md">
          {
            this.state.postPage.map((post, index) => {
                return (
                    <Post post={post} key={post.id}/>
                )
              })
          }
        </Container>
        <FormControl margin="normal" className="-action">
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
    search:search
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))

