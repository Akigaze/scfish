import React, {Component} from "react";
import store from "../../../store";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {Avatar} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {updateAvatar} from "../../../action/user.action";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import picUtils from "../../../utils/picUtils";
import IconButton from "@material-ui/core/IconButton";

export class Information extends Component{
  constructor(props) {
    super(props);
    this.state={
      avatar: "data:image/*;base64," + store.getState().user.profile.avatar
    }
    this.inputRef = React.createRef()
    this.updateButtonRef = React.createRef()
  }

  handleAvatarClick = () => {
    this.inputRef.current.click()
  }

  handleUpload = (event) => {
    this.setState({avatar:picUtils.getPictUrl(event.target.files[0])})
    this.updateButtonRef.current.style.display = ""
  }

  handleUpdateClick = (event) => {
    let formData = new FormData()
    formData.append("avatar",this.inputRef.current.files[0])
    this.props.updateAvatar(formData).then(data=>{
      this.props.history.go(0)
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
              <Avatar style={{width:80,height:80}} src={this.state.avatar} />
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
    updateAvatar:updateAvatar
  },dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Information))