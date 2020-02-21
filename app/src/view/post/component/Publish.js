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

export class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      imgURL:''
    }
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value})
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value})
  }

  checkContent = (title,content) => {
    return title.length>2 && content.length>2
  }

  handlePublishClick = () => {
    const {title, content} = this.state
    if(this.checkContent(title,content)){
      this.props.publish(title, content).then(data => {
        this.props.history.push("/post")
      })
    }
  }

  handleUpload = (event) =>{
    event.preventDefault();
    if (event.target.files[0]){
      this.setState({imgURL:picUtils.getPictUrl(event.target.files[0])})
      document.getElementById("preview").setAttribute("class","img-preview")
    }
  }

  handleUploadClick = () => {
    document.getElementById("input-button").click()
  }


  handleImgClick = (event) => {
    picUtils.handleImgClick(event.target.id,"img-preview","img-amplification")
  }


  render() {
    return (
        <div className="publish">
          <FormControl margin="normal" fullWidth>
            <TextField variant="outlined" size="small" color="primary" label="title"
                       value={this.state.title} onChange={this.handleTitleChange}/>
          </FormControl>
          <FormControl margin="normal" fullWidth className="content">
            <TextField variant="outlined" size="small" color="primary"
                       label="content" rows={5} rowsMax={20} multiline
                       value={this.state.content} onChange={this.handleContentChange}/>
          </FormControl>

          <div className="publish-img-box">
            <img id="preview" alt="preview" src={this.state.imgURL} className="img-hidden" onClick={this.handleImgClick}/>
            <input id="input-button" type="file" onChange={this.handleUpload.bind(this)} style={{display:"none"}}/>
            <div onClick={this.handleUploadClick} className="add-img-button">
              <AddIcon style={{fontSize:"40px",color:"grey",margin:"40px auto"}}/>
            </div>
          </div>

          <FormControl margin="normal" fullWidth>
            <Button variant="contained" color="primary" className="publish-btn"
                    onClick={this.handlePublishClick}>publish</Button>
          </FormControl>
        </div>
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

