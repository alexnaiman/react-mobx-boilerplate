import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { ThemeProvider } from "styled-components";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Login from "./auth/LoginRoute";

import theme from "../constans/theme/theme";

import { RoutePrivate, RoutePublic } from "../components";
import Dashboard from "./dashboard/DashboardRoute";
import NotFound from "./common/NotFound";
import { AppWrapper } from "../components";

// try to use as much function components as possible but when using
// decorators stick to class components
@inject("routing", "store")
@withRouter
@observer
export default class App extends Component {
  render() {
    const {
      store: { auth }
    } = this.props;
    console.log(auth.error);
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          {/* {auth.isLoggedIn && (
            <Header user={auth.userData} logout={auth.logout} />
          )} */}
          <Switch>
            <RoutePublic
              isAuthenticated={auth.isLoggedIn}
              path="/login"
              to="/"
              exact
              component={Login}
            />
            {/* <RoutePublic
                isAuthenticated={auth.isLoggedIn}
                path="/register"
                to="dashboard"
                exact
              // component={Register}
              /> */}
            <RoutePrivate
              isAuthenticated={auth.isLoggedIn}
              path="/"
              exact
              to="/login"
              component={Dashboard}
            />
            <Route component={NotFound} />
          </Switch>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}
