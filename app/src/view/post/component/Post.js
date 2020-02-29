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
import {addFavorite, addLike, deletePost, loadImg, removeFavorite, removeLike} from "../../../action/post.action";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import IconButton from "@material-ui/core/IconButton";
import picUtils from "../../../utils/picUtils";
import store from "../../../store";
import ClearIcon from '@material-ui/icons/Clear';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      expanded: false,
      isFavorite: this.props.isFavorite,
      isLike: this.props.isLike,
      likeNum: this.props.likeNum,
      imgIndex: undefined,
      thumbnails: [],
      images: []
    }
    this.postRef = React.createRef()
    this.imgRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.imgList) {
      for (let url of this.props.imgList) {
        picUtils.getImgThumbnail(url, thumbnail => {
          this.setState({
            thumbnails: [...this.state.thumbnails, thumbnail]
          })
        })
      }
    }
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
    this.setState({isFavorite: !this.state.isFavorite}, () => {
      if (this.state.isFavorite) {
        this.props.addFavorite(this.props.id)
      } else {
        this.props.removeFavorite(this.props.id)
      }
    })
  }

  handleLikeClick = (event) => {
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

  handleImgClick = (event, index) => {
    let {images} = this.state
    if (this.state.imgIndex === index && this.imgRef.current.className !== "img-hidden") {
      this.imgRef.current.className = "img-hidden"
      this.setState({imgIndex: 0})
      return
    }
    if (!this.state.images[index]) {
      this.props.loadImg(this.props.id, index).then(async (data) => {
        images[this.state.imgIndex] = "data:image/jpg;base64," + await data
        this.setState({images: images})
      })
    }
    this.imgRef.current.className = "img-zoom-in"
    this.setState({imgIndex: index})
  }

  handleAmplificationImgClick = (event) => {
    let {images} = this.state
    this.setState({imgIndex: picUtils.handleImgClick(event, this.imgRef.current, this.props.id, this.state.imgIndex)}, () => {
      if (!images[this.state.imgIndex]) {
        this.props.loadImg(this.props.id, this.state.imgIndex).then(async (data) => {
          images[this.state.imgIndex] = "data:image/jpg;base64," + await data
          this.setState({images: images})
        })
      }
    })
  }

  handleDeleteClick = (event) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      this.postRef.current.className = "deleted"
      this.props.deletePost(this.props.id)
    }
  }

  handleAvatarClick = (event) => {
  }

  render() {
    const {expanded, comment, thumbnails} = this.state
    const {id, title, content, userNickname, avatar, createdTime} = this.props
    return (
      <Box ref={this.postRef} borderRadius={4} m={1} boxShadow={2} className="word">
        <ExpansionPanel expanded={Boolean(expanded)}>
          <ExpansionPanelSummary style={{cursor: "default"}}>
            <Box py={1} pl={2} style={{width: "100%"}}>
              <Box style={{display: "flex", flexDirection: "row-reverse"}}>
                {this.props.username === store.getState().user.profile.username ?
                  <IconButton onClick={this.handleDeleteClick} style={{padding: 3}}>
                    <ClearIcon style={{fontSize: 15}}/>
                  </IconButton> : <Box style={{height: 20}}/>}
              </Box>
              <Box textAlign="left" fontSize="h6.fontSize" mb={2}>
                <span>{title}</span>
              </Box>
              <Box textAlign="left" fontSize={14}>
                <span>{content}</span>
              </Box>
              <Box className="imgs-box">
                {
                  thumbnails ? thumbnails.map((thumbnail, index) => {
                    return <div key={id + "-" + index} className="img-box">
                      <img src={thumbnail} alt="preview" id={id + "-" + index} className="img-preview"
                           onClick={(event) => this.handleImgClick(event, index)}/>
                    </div>
                  }) : null
                }
                <img ref={this.imgRef} id={id + "img"} alt="img" src={this.state.images[this.state.imgIndex]}
                     onMouseMove={(event) => picUtils.changeCursorInImage(event, this.imgRef.current)}
                     onClick={this.handleAmplificationImgClick} className="img-hidden"/>
              </Box>
              <Box mt={3} display="flex" alignItems="center" justifyContent="space-between">
                <Box fontSize={14} textAlign="left" display="flex" alignItems="center">
                  <Avatar alt={userNickname} src={"data:image/*;base64," + avatar}
                          style={{width: 30, height: 30, marginRight: 10}} onClick={this.handleAvatarClick}/>
                  <span>{userNickname}</span>
                </Box>
                <Box fontSize={12} textAlign="right">
                  {createdTime}
                </Box>
              </Box>
              <Box style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}} my={1}>
                <IconButton style={{padding: 6}} onClick={this.handleExpansionPress}>
                  <ChatBubbleOutlineIcon/>
                </IconButton>
                <IconButton style={{padding: 6}} onClick={this.handleFavoriteClick}>
                  {this.state.isFavorite === true ? <Favorite style={{padding: 1}} color="secondary"/> :
                    <FavoriteBorder/>}
                </IconButton>
                <IconButton style={{padding: 6}} onClick={this.handleLikeClick}>
                  {this.state.isLike === true ? <ThumbUpIcon style={{padding: 1}} color="primary"/> :
                    <ThumbUpOutlinedIcon/>}
                </IconButton>
                <span style={{marginRight: 10, fontSize: 14}}>({this.state.likeNum})</span>
              </Box>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{width: "100%"}}>
              <Divider/>
              <div id={comment + id}>
                <TextField style={{display: "block"}} fullWidth multiline rows={3} rowsMax={20}
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
    deletePost: deletePost,
    removeFavorite: removeFavorite,
    addLike: addLike,
    removeLike: removeLike,
    loadImg: loadImg
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))

