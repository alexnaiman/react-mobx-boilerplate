import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
export default class Login extends Component {
  state = {};
  render() {
    const {
      store: {
        auth: { isLoading, login }
      }
    } = this.props;
    return (
      <div onClick={() => login()}>
        Login
        {isLoading && "...Loading"}
      </div>
    );
  }
}
