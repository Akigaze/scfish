import React, {Component, Fragment} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './asset/css/App.css';
import {adminRouterConfig, publicRouterConfig} from "./router/router.config";

class App extends Component {

  // TODO should refactor
  render() {
    return (
        <BrowserRouter>
          <Switch>
            {
              publicRouterConfig.map(route => {
                const Layout = route.layout || Fragment
                return (
                    <Route key={route.name} path={route.path} >
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
                    <Route key={route.name} path={route.path} >
                      {
                        !route.auth()
                            ? <Redirect to={route.redirect}/>
                            : <Redirect to={route.home}/>
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
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
