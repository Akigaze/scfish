import React, {Component} from "react";
import {Button, FormControlLabel, FormGroup} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";

export class ForbiddenCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      remark: "",
      checkA: false,
      checkB: false,
      checkC: false,
      checkD: false,
      checkE: false,
      duration: "one day"
    }
  }

  durationMap = [
    {
      text: "one day",
      value: "ONE_DAY"
    },
    {
      text: "three days",
      value: "THREE_DAYS"
    },
    {
      text: "seven days",
      value: "SEVEN_DAYS"
    },
    {
      text: "fifteen days",
      value: "FIFTEEN_DAYS"
    },
    {
      text: "a month",
      value: "A_MONTH"
    },
    {
      text: "forever",
      value: "FOREVER"
    }
  ]

  componentDidMount() {
    this.props.onRef(this)
  }

  checkBoxMap = () => {
    return [
      {
        id: "checkA",
        state: this.state.checkA,
        text: "reasonA"
      },
      {
        id: "checkB",
        state: this.state.checkB,
        text: "reasonB"
      },
      {
        id: "checkC",
        state: this.state.checkC,
        text: "reasonC"
      },
      {
        id: "checkD",
        state: this.state.checkD,
        text: "reasonD"
      },
      {
        id: "checkE",
        state: this.state.checkE,
        text: "reasonE"
      }]
  }

  handleOnClose = () => {
    this.setState({
      open: false,
      remark: "",
      checkA: false,
      checkB: false,
      checkC: false,
      checkD: false,
      checkE: false,
      duration: "one day"
    })
  }

  handleCheckChange = (event) => {
    this.setState({...this.state, [event.target.name]: event.target.checked})
  }

  handleDurationChange = (event) => {
    this.setState({duration: event.target.value})
  }

  handleSubmitClick = () => {
    let remark = "";
    this.checkBoxMap().map(item => {
      return item.state ? remark += item.text + ";" : null;
    })
    if(remark) {
      this.setState({remark: remark}, () => {
        this.props.addForbidden(this.props.username,this.state.remark,this.state.duration)
        this.handleOnClose()
      })
    }
  }

  render() {
    return (
      <Dialog open={this.state.open} onClose={this.handleOnClose}>
        <FormGroup style={{padding: "20px", width: "300px"}}>
          <Box style={{margin: "20px"}}>
            <InputLabel>Reason</InputLabel>
            {
              this.checkBoxMap().map(check => {
                return <FormControlLabel control={<Checkbox checked={check.state} onChange={this.handleCheckChange}/>}
                                         style={{display: "block"}} label={check.text} name={check.id} key={check.id}/>
              })
            }
          </Box>
          <Box style={{margin: "20px"}}>
            <InputLabel>Duration</InputLabel>
            <Select style={{width: "120px"}} value={this.state.duration} onChange={this.handleDurationChange}>
              {
                this.durationMap.map(item => {
                  return <MenuItem key={item.text} value={item.value}>{item.text}</MenuItem>
                })
              }
            </Select>
          </Box>
          <Button style={{width: "40%", margin: "10px auto"}} variant={"contained"} color={"secondary"}
                  onClick={this.handleSubmitClick}>submit</Button>
        </FormGroup>
      </Dialog>
    )
  }
}
