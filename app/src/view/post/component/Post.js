import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {bindActionCreators} from "redux";
import {publish} from "../../../action/comment.action";
import Comments from "./Comments";
import Button from "@material-ui/core/Button";
import {Avatar, ExpansionPanel, ExpansionPanelDetails, TextField} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import {addFavorite, addLike, removeFavorite, removeLike} from "../../../action/post.action";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import IconButton from "@material-ui/core/IconButton";

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      expanded: false,
      isFavorite: this.props.isFavorite,
      isLike: this.props.isLike,
      likeNum: this.props.likeNum,
      imgId: ''
    }
    this.imgRef = React.createRef()
  }

  componentDidMount() {
  }

  onCommentChange = (event) => {
    this.setState({comment: event.target.value})
  }

  handleSubmitClick = () => {
    if (this.state.comment) {
      this.props.publish(this.props.id, this.state.comment)
        .then(data => {
          this.child.refreshCommentList()
        })
      this.setState({comment: ''})
    }
  }

  handleExpansionPress = (event) => {
    this.setState({expanded: !this.state.expanded}, () => {
      if (this.state.expanded) {
        this.child.refreshCommentList()
      }
    })
  }

  onRef = (ref) => {
    this.child = ref
  }

  handleFavoriteClick = (event) => {
    event.stopPropagation()
    this.setState({isFavorite: !this.state.isFavorite}, () => {
      if (this.state.isFavorite) {
        this.props.addFavorite(this.props.id)
      } else {
        this.props.removeFavorite(this.props.id)
      }
    })
  }

  handleLikeClick = (event) => {
    event.stopPropagation()
    this.setState({isLike: !this.state.isLike}, () => {
      if (this.state.isLike) {
        this.setState({likeNum: this.state.likeNum + 1})
        this.props.addLike(this.props.id)
      } else {
        this.setState({likeNum: this.state.likeNum - 1})
        this.props.removeLike(this.props.id)
      }
    })
  }

  handleImgClick = (event) => {
    event.stopPropagation()
    if (this.state.imgId === event.target.id) {
      this.imgRef.current.className = "img-hidden"
      this.setState({imgId: ''})
      return
    }
    this.imgRef.current.src = event.target.src
    this.imgRef.current.className = "img-zoom-in"
    this.setState({imgId: event.target.id})
  }

  render() {
    const {expanded, comment} = this.state
    const {id, title, content, userNickname, createdTime, imgList} = this.props
    return (
      <Box borderRadius={4} m={1} boxShadow={2} className="word">
        <ExpansionPanel expanded={Boolean(expanded)} onChange={this.handleExpansionPress}>
          <ExpansionPanelSummary>
            <Box p={2} style={{"width": "100%"}}>
              <Box textAlign="left" fontSize="h6.fontSize" mb="10px">
                {title}
              </Box>
              <Box textAlign="left" fontSize={14}>
                {content}
              </Box>
              <Box className="imgs-box">
                {
                  imgList ? imgList.map((img, index) => {
                      return <img src={"data:image/*;base64," + img} alt="preview"
                                  key={id + "imgPreview" + index} id={id + "imgPreview" + index}
                                  className="img-preview" onClick={this.handleImgClick}/>
                    }) : null
                }
                <img ref={this.imgRef} id={id + "img"} className="img-hidden" alt="img"/>
              </Box>
              <Box mt="25px" display="flex" alignItems="center" justifyContent="space-between">
                <Box fontSize={12} textAlign="left" display="flex" alignItems="center">
                  <Avatar alt={userNickname}
                          style={{backgroundColor: '#3f51b5', width: 20, height: 20, fontSize: 12, marginRight: 4}}>
                    {userNickname[0]}
                  </Avatar>
                  <span>{userNickname}</span>
                </Box>
                <Box fontSize={12} textAlign="right">
                  {createdTime.replace('T', ' ')}
                </Box>
              </Box>
              <Box style={{"display": "flex", "flexDirection": "row-reverse"}} alignItems="center" my={1}>
                <span style={{"marginRight": "10px", "fontSize": "14px"}}>({this.state.likeNum})</span>
                <IconButton style={{"padding": "4px"}} onClick={this.handleLikeClick}>
                  {this.state.isLike === true ? <ThumbUpIcon style={{"padding": "1px"}} color="primary"/> :
                    <ThumbUpOutlinedIcon/>}
                </IconButton>
                <IconButton style={{"padding": "4px"}} onClick={this.handleFavoriteClick}>
                  {this.state.isFavorite === true ? <Favorite style={{"padding": "1px"}} color="secondary"/> :
                    <FavoriteBorder/>}
                </IconButton>
              </Box>
            </Box>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <div style={{"width": "100%"}}>
              <Divider/>
              <div id={"comment" + id}>
                <TextField style={{"display": "block"}} fullWidth multiline rows={3} rowsMax={20}
                           variant="outlined" label="comment" margin="normal"
                           value={comment} onChange={this.onCommentChange}/>
                <Button color="primary" variant="outlined" onClick={this.handleSubmitClick}>submit</Button>
                <Comments onRef={this.onRef} postId={id}/>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    publish: publish,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
    addLike: addLike,
    removeLike: removeLike
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))

