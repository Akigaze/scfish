import React, {Component} from "react";
import store from "../../../store";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {Avatar} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {loadAvatar, updateAvatar} from "../../../action/user.action";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import picUtils from "../../../utils/picUtils";
import IconButton from "@material-ui/core/IconButton";

export class Information extends Component{
  constructor(props) {
    super(props);
    this.state={
      avatarUrl: "data:image/jpg;base64," + store.getState().user.profile.avatarThumbnail,
      avatarBlob:'',
    }
    this.inputRef = React.createRef()
    this.updateButtonRef = React.createRef()
  }

  componentDidMount() {
    this.props.loadAvatar().then(data=>{
      this.setState({avatarUrl:"data:image/jpg;base64,"+data})
    })
  }

  handleAvatarClick = () => {
    this.inputRef.current.click()
  }

  handleUpload = () => {
    if(this.inputRef.current.files[0]){
      picUtils.handleAvatar(this.inputRef.current.files[0],200,(url,blob)=>{
        this.setState({avatarUrl:url,avatarBlob:blob})
      })
      this.updateButtonRef.current.style.display = ""
    }
  }

  handleUpdateClick = () => {
    let formData = new FormData()
    picUtils.handleAvatar(this.inputRef.current.files[0],50,(url,blob)=>{
      formData.append("thumbnail",blob)
      formData.append("avatar",this.state.avatarBlob)
      this.props.updateAvatar(formData).then(()=>{
        this.props.history.go(0)
      })
    })

  }

  handleModifyClick = () => {
    this.props.history.push("/modify")
  }

  render() {
    return(
      <Box>
        <Box style={{display:"flex",flexDirection:"row-reverse",justifyContent:"space-between",border:"solid 1px"}}
             borderRadius={10} mt={5} p={4} boxShadow={1}>
          <Box style={{alignItems:"flex-end",margin:10,display:"flex",flexDirection:"column"}}>
            <input ref={this.inputRef} type="file" style={{display:"none"}} accept={"image/*"} onChange={this.handleUpload}/>
            <IconButton  onClick={this.handleAvatarClick} style={{padding:0,border:"solid 1px black"}}>
              <Avatar src={this.state.avatarUrl} style={{width:80,height:80}} />
            </IconButton>
            <Button ref={this.updateButtonRef} style={{marginTop:10,display:"none"}} variant="outlined" onClick={this.handleUpdateClick}>update</Button>
          </Box>
          <Box style={{marginLeft:10,display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
            <p>username: {store.getState().user.profile.username}</p>
            <p>nickname: {store.getState().user.profile.nickname}</p>
            <Button style={{marginTop:10}} onClick={this.handleModifyClick} color="secondary" variant="outlined">modify</Button>
          </Box>
        </Box>
      </Box>
    )
  }
}

function mapStateToProps(){
  return{}
}

function mapDispatchToProps(dispatch,props){
  return bindActionCreators({
    updateAvatar:updateAvatar,
    loadAvatar:loadAvatar
  },dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Information))