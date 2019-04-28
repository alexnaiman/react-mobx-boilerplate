import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Login from "../../module/Login/Login";

// the smart component that is linked to the store
@inject("store")
@observer
export default class LoginRoute extends Component {
  state = {};
  render() {
    const {
      store: {
        auth: { isLoading, login }
      }
    } = this.props;
    return (
      <div onClick={() => login()}>
        <Login />
        {isLoading && "...Loading"}
      </div>
    );
  }
}
