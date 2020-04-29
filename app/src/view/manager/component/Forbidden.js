import React, {Component} from "react"
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addForbidden, getForbiddenHistory, liftForbidden} from "../../../action/manager.action";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Button} from "@material-ui/core";
import {ForbiddenCheckBox} from "./ForbiddenCheckBox";


export class Forbidden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 0,
      forbiddenList: [],
    }
  }

  componentDidMount() {
    this.initLists()
  }

  initLists = () => {
    this.props.getForbiddenHistory(this.state.pageNum, 5).then(data => {
      this.setState({forbiddenList: data.content})
    })
  }

  onLiftClick = (item) => {
    this.props.liftForbidden(item.username)
  }

  handleUpdateClick = () => {
    this.child.setState({open: !this.state.open})
  }

  addForbidden = (username,remark,type) => {
    this.props.addForbidden(username,remark,type)
  }

  render() {
    return (
      <TableContainer>
        <Table className="forbidden-table">
          <TableHead>
            <TableRow>
              <TableCell>nickname</TableCell>
              <TableCell>duration</TableCell>
              <TableCell>startTime</TableCell>
              <TableCell>status</TableCell>
              <TableCell style={{minWidth: "150px"}}>remark</TableCell>
              <TableCell>operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.forbiddenList.map((item) => (
              <TableRow key={item.id} style={{fontSize: "1"}}>
                <TableCell>{item.nickname}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.startTime}</TableCell>
                <TableCell>{item.forbidden ? "Forbidden" : "Lifted"}</TableCell>
                <TableCell>{item.remark}</TableCell>
                <TableCell>

                  <Button size={"small"} onClick={this.handleUpdateClick}>update</Button>
                    <ForbiddenCheckBox username={item.username} onRef={(ref)=>{ this.child = ref}} addForbidden={this.addForbidden}/>
                  <Button size={"small"} onClick={() => this.onLiftClick(item)}>lift</Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    addForbidden: addForbidden,
    getForbiddenHistory: getForbiddenHistory,
    liftForbidden:liftForbidden
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Forbidden))
