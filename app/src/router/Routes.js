import React, {Component, Fragment, Suspense} from "react"
import {connect} from "react-redux"
import {Redirect, Route, Router, Switch} from "react-router-dom"
import {Backdrop, CircularProgress} from "@material-ui/core"
import {adminRouterConfig, publicRouterConfig} from "./router.config";
import history from "../router/history";


export class Routes extends Component {

  // TODO should refactor
  // TODO 登录后是否可以重新打开登录页面
  render() {
    return (
        <Router history={history}>
          <Suspense
              fallback={<Backdrop open={true} timeout={{}}><CircularProgress color="secondary" /></Backdrop>}>
            <Switch>
              {
                publicRouterConfig.map(route => {
                  const Layout = route.layout || Fragment
                  return (
                      <Route key={route.name}
                             path={route.path}
                             component={() => <Layout><route.component/></Layout>}/>
                  )
                })
              }
              {
                adminRouterConfig.map(route => {
                  const Layout = route.layout || Fragment
                  return (
                      <Route key={route.name}
                             path={route.path}
                             component={() => !this.props.isAuth
                                 ? <Redirect to="/login"/>
                                 : <Layout><route.component/></Layout>
                             }/>
                  )
                })
              }
              <Route path="*" component={() => <Redirect to={this.props.isAuth ? "/post" : "/login"}/>}/>
            </Switch>
          </Suspense>
        </Router>
    )
  }
}


function mapStateToProps(state, props) {
  return {
    isAuth: Boolean(state.user.token)
  }
}

export default connect(mapStateToProps)(Routes)