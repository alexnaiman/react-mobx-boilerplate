import React, { Component } from "react";
import { Link } from "react-router-dom";

import { observer, inject } from "mobx-react";

@inject("store")
@observer
export default class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <div onClick={() => this.props.store.auth.logout()}>Logout</div>
      </div>
    );
  }
}
