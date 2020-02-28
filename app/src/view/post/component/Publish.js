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
      imgURLs: [],
      imgBlobs: [],
      previews: []
    }
    this.imgInputRef = React.createRef()
    this.relImgInputRef = React.createRef()
    this.imgRef = React.createRef()
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
    this.state.imgBlobs.forEach(function (file) {
      formData.append('files', file)
    })
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
    if (event.target.files) {
      if (this.state.imgURLs.length + event.target.files.length > 6) {
        alert("Only 6 pictures can be uploaded")
        return
      }
      for (let f of event.target.files) {
        if (f.size < 1024 * 1024 * 10) {
          picUtils.getImgUrlAndBlob(f, (imgUrl, imgBlob) => {
            this.setState({
              imgURLs: [...this.state.imgURLs, imgUrl],
              imgBlobs: [...this.state.imgBlobs, imgBlob]
            }, data => {
              picUtils.handleImgPreview(f, preview => {
                this.setState({previews: [...this.state.previews, preview]})
              })
            })
          })
        }
      }
      if (this.state.imgURLs.length + event.target.files.length === 6) {
        this.relImgInputRef.current.className = "img-hidden"
      }
      this.imgInputRef.current.value = null
    }
  }

  handleDeleteClick = (event, index) => {
    const {imgId, imgURLs, imgBlobs, previews} = this.state
    if (imgId === "preview-img" + index) {
      this.imgRef.current.className = "img-hidden"
    }
    const {newBlobs, newURLs, newPreviews} = picUtils.removeImg(index, imgBlobs, imgURLs, previews)
    this.setState({imgURLs: newURLs, imgBlobs: newBlobs, previews: newPreviews})
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
            this.state.previews.map((preview, index) => {
              return <div className="img-box" key={"preview-img" + index}>
                <IconButton onClick={(event) => this.handleDeleteClick(event, index)}
                            style={{padding: 0}} className="delete-button">
                  <DeleteIcon style={{color: "#ea0621"}}/>
                </IconButton>
                <img id={"preview-img" + index} alt="preview" src={preview} className="img-preview"
                     onClick={event => this.handleImgClick(event, index)}/>
              </div>
            })
          }
          <input ref={this.imgInputRef} type="file" multiple maxLength={1000}
                 accept="image/*" onChange={this.handleUpload} style={{display: "none"}}/>
          <Box ref={this.relImgInputRef} onClick={this.handleUploadClick} className="add-img-button">
            <AddIcon style={{fontSize: "40px", color: "grey", margin: "40px auto"}}/>
          </Box>
          <img ref={this.imgRef} className="img-hidden" alt="img"/>
        </Box>
        <FormControl margin="normal" fullWidth>
          <Button variant="contained" color="primary" className="publish-btn"
                  onClick={this.handlePublishClick}>publish</Button>
        </FormControl>
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

