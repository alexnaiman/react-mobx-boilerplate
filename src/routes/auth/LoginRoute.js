import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Login from "@/modules/auth/LoginContainer";

// import as from ""
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
      <div
        onClick={() =>
          this.props.store.auth.login("nilson@email.com", "nilson")
        }
      >
        <Login />
        {isLoading && "...Loading"}
      </div>
    );
  }
}
