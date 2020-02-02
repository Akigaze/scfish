import React, {Component, Fragment} from "react"
import {connect} from "react-redux"
import {Redirect, Route, withRouter} from "react-router-dom"
import {adminRouterConfig, publicRouterConfig, whitePaths} from "./router.config";

export class Routes extends Component {

  // TODO should refactor
  render() {
    return (
        <Fragment>
          {
            publicRouterConfig.map(route => {
              const Layout = route.layout || Fragment
              return (
                  <Route key={route.name} path={route.path}>
                    <Layout>
                      <route.component/>
                    </Layout>
                  </Route>
              )
            })
          }
          <Route path="/">
            <AuthRoute isAuth={this.props.isAuth}/>
          </Route>
          {
            adminRouterConfig.map(route => {
              const Layout = route.layout || Fragment
              return (
                  <Route key={route.name} path={route.path}>
                    <Layout>
                      <route.component/>
                    </Layout>
                  </Route>
              )
            })
          }
        </Fragment>
    )
  }
}

const AuthRoute = withRouter((props) => {
  const {isAuth, location} = props
  if (whitePaths.includes(location.pathname)) {
    return null
  }
  if (isAuth) {
    return location.pathname === "/" ? <Redirect to="/post"/> : null
  }
  return <Redirect to="/login"/>
})

function mapStateToProps(state, props) {
  return {
    isAuth: Boolean(state.user.token)
  }
}

export default connect(mapStateToProps)(Routes)