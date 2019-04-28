
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled, { ThemeProvider } from 'styled-components';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';

import theme from '../constans/theme/theme';

import { RoutePrivate, RoutePublic } from '../components'
import Dashboard from './Dashboard/Dashboard';
import NotFound from './NotFound/NotFound';
import { withRouter } from "react-router-dom";
import { AppWrapper } from '../components'

@inject('routing', 'store')
@withRouter
@observer
export default class App extends Component {
  render() {
    const { store: { auth } } = this.props

    return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          {/* {auth.isLoggedIn && <Header user={user} logout={logout} />} */}
          <Switch>
            <RoutePublic
              isAuthenticated={auth.isLoggedIn}
              path="/"
              to="dashboard"
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
              path="/dashboard"
              exact
              component={Dashboard}
            />
            {/*<RoutePrivate
                isAuthenticated={!!user.ID}
                path="/dashboard"
                exact
                component={Dashboard}
              />
              <RoutePrivate
                isAuthenticated={!!user.ID}
                path="/dashboard/:dndClassId"
                component={DndClassItem}
              />*/}
            <Route component={NotFound} />
          </Switch>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

