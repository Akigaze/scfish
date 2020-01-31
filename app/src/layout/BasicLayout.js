import React, {Component} from "react"


export class BasicLayout extends Component{

  render() {
    return (
        <div className="App">
          <header className="App-header">
            {this.props.children}
          </header>
        </div>
    )
  }
}
