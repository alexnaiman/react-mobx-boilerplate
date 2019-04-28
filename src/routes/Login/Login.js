import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
export default class Login extends Component {
  state = {};
  componentDidMount() {
    this.props.store.auth.login();
  }

  render() {
    return <div>Login</div>;
  }
}
