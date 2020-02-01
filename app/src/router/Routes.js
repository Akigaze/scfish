import React, {Component, Fragment} from "react"
import {connect} from "react-redux"
import {Switch, Route, Redirect} from "react-router-dom"
import {adminRouterConfig, publicRouterConfig} from "./router.config";

export class Routes extends Component {

  // TODO should refactor
  render() {
    console.log("render routes", this.props.isAuth);
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
          {
            adminRouterConfig.map(route => {
              return (
                  <Route key={route.name} path={route.path}>
                    {
                      !this.props.isAuth && <Redirect to={route.redirect}/>
                    }

                    <route.component>
                      {
                        route.children && (
                            <Switch>
                              {
                                route.children.map(sub => {
                                  return (
                                      <Route key={sub.name} path={sub.path} exact={true}>
                                        <sub.component/>
                                      </Route>
                                  )
                                })
                              }
                            </Switch>
                        )
                      }
                    </route.component>
                  </Route>
              )
            })
          }
        </Fragment>
    )
  }

}

function mapStateToProps(state, props) {
  return {
    isAuth: Boolean(state.user.token)
  }
}

export default connect(mapStateToProps)(Routes)