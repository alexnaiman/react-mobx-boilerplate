import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { createGlobalStyle } from "styled-components";
import { Router } from "react-router-dom";

import App from "./routes/App";
import * as serviceWorker from "./serviceWorker";
import reset from "./css/reset";
import browserHistory from "./config/history/history";
import store from "./mobx";

const GlobalStyle = createGlobalStyle`${reset}`;

const routingStore = new RouterStore();

const stores = {
  store: store.create(),
  routing: routingStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <Fragment>
      <Router history={history}>
        <App />
      </Router>
      <GlobalStyle />
    </Fragment>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
