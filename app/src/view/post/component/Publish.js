import React from "react";
import FormControl from "@material-ui/core/FormControl";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {publish} from "../../../action/post.action";
import picUtils from "../../../utils/picUtils";
import AddIcon from '@material-ui/icons/Add';
import Box from "@material-ui/core/Box";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

export class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      imgId: '',
      blobs: [],
      imgURLs: [],
      thumbnailUrls: [],
      imgNum: 0
    }
    this.imgInputRef = React.createRef()
    this.relImgInputRef = React.createRef()
    this.imgRef = React.createRef()
  }

  componentDidMount() {
    this.relImgInputRef.current.style.height = this.relImgInputRef.current.clientWidth + "px"
    this.relImgInputRef.current.children[0].style.margin = (this.relImgInputRef.current.clientWidth - 40) / 2 + "px"
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value})
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value})
  }

  checkContent = (title, content) => {
    return title.length > 2 && content.length > 2
  }

  createForm = () => {
    let formData = new FormData()
    let {blobs} = this.state
    for (let i = 0; i < this.state.blobs.length; i++) {
      if (blobs[i]) {
        formData.append('files', blobs[i].img)
        formData.append('thumbnails', blobs[i].thumbnail)
      }
    }
    return formData
  }

  handlePublishClick = () => {
    const {title, content} = this.state
    if (this.checkContent(title, content)) {
      this.props.publish(title, content, this.createForm()).then(data => {
        this.props.history.push("/post")
      })
    }
  }

  handleUpload = (event) => {
    event.preventDefault();
    console.log(this.imgInputRef.current.files)
    let {blobs, imgURLs, thumbnailUrls, imgNum} = this.state
    let files = event.target.files
    if (imgNum + files.length > 6) {
      alert("can only upload 6 picture")
      return
    }
    if (event.target.files) {
      for (let i in event.target.files) {
        if (files[i].size < 1024 * 1024 * 10) {
          let index = imgNum + parseInt(i)
          let imgBlob = {img: undefined, thumbnail: undefined}
          picUtils.compress(files[i], (url, blob) => {
            imgBlob.img = blob
            imgURLs[index] = url
            this.setState({imgURLs: imgURLs})
          })
          picUtils.getImgThumbnail(files[i], (url, blob) => {
            imgBlob.thumbnail = blob
            blobs[index] = imgBlob
            thumbnailUrls[index] = url
            this.setState({
              thumbnailUrls: thumbnailUrls,
              blobs: blobs,
              imgNum: this.state.imgNum + 1
            })
          })
        }
      }
      if (this.state.imgURLs.length + event.target.files.length === 6) {
        this.relImgInputRef.current.className = "img-hidden"
      }
    }
    this.imgInputRef.current.value = null
  }

  handleDeleteClick = (event, index) => {
    const {imgId, imgURLs, blobs, thumbnailUrls} = this.state
    if (imgId === "preview-img" + index) {
      this.imgRef.current.className = "img-hidden"
    }
    const {newBlobs, newURLs, newThumbnailUrls} = picUtils.removeImg(index, blobs, imgURLs, thumbnailUrls)
    this.setState({imgURLs: newURLs, Blobs: newBlobs, thumbnailUrls: newThumbnailUrls, imgNum: this.state.imgNum - 1})
    this.relImgInputRef.current.className = "add-img-button"
  }

  handleUploadClick = () => {
    this.imgInputRef.current.click()
  }

  handleImgClick = (event, index) => {
    event.preventDefault()
    if (this.state.imgId === event.target.id) {
      this.imgRef.current.className = "img-hidden"
      this.setState({imgId: ''})
      return
    }
    this.imgRef.current.className = "img-zoom-in"
    this.imgRef.current.src = this.state.imgURLs[index]
    this.setState({imgId: event.target.id})
  }

  render() {
    return (
      <Box className="publish">
        <FormControl margin="normal" fullWidth>
          <TextField variant="outlined" size="small" color="primary" label="title"
                     value={this.state.title} onChange={this.handleTitleChange}/>
        </FormControl>
        <FormControl margin="normal" fullWidth className="content">
          <TextField variant="outlined" size="small" color="primary"
                     label="content" rows={5} rowsMax={20} multiline
                     value={this.state.content} onChange={this.handleContentChange}/>
        </FormControl>
        <Box className="imgs-box">
          {
            this.state.thumbnailUrls.map((preview, index) => {
              if (preview) {
                return <Box className="img-box" key={"preview-img" + index}>
                  <IconButton onClick={(event) => this.handleDeleteClick(event, index)}
                              style={{padding: 0}} className="delete-button">
                    <DeleteIcon style={{color: "#ea0621"}}/>
                  </IconButton>
                  <img id={"preview-img" + index} alt="preview" src={preview} className="img-preview"
                       onClick={event => this.handleImgClick(event, index)}/>
                </Box>
              }

            })
          }
          <input ref={this.imgInputRef} type="file" multiple maxLength={1000}
                 accept="image/*" onChange={this.handleUpload} style={{display: "none"}}/>
          <Box className="img-box">
            <Box ref={this.relImgInputRef} onClick={this.handleUploadClick}
                 className="add-img-button">
              <AddIcon style={{fontSize: "40px", color: "grey"}}/>
            </Box>
          </Box>
          <img ref={this.imgRef} className="img-hidden" alt="img"/>
          <FormControl margin="normal" fullWidth>
            <Button variant="contained" color="primary" className="publish-btn"
                    onClick={this.handlePublishClick}>publish</Button>
          </FormControl>
        </Box>
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    publish: publish
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Publish))

