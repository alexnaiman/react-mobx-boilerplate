import { types, flow } from "mobx-state-tree";

import { User } from "../models";

// Here we will add call our api service for requests *just like sagas/thunks*
const authStore = types
  .model("Auth", {
    error: "",
    token: "",
    isLoading: types.optional(types.boolean, false),
    userData: types.optional(User, {})
  })
  .views(self => ({
    get isLoggedIn() {
      return !!self.token;
    }
  }))
  .actions(self => ({
    setLoading: value => {
      self.isLoading = value;
    },
    setError: (code, message) => {
      self.error = message.split(".")[0];
      self.setLoading(false);
    },
    setUser: user => {
      self.userData = User.create({
        email: user.email,
        name: user.displayName,
        image: user.photoURL
      });
      self.setLoading(false);
    },
    // helper function used to simulate login delay
    setToken: token => (self.token = token),
    // function that simulates a backend request with delay
    login: flow(function* login() {
      self.setLoading(true);
      yield new Promise(resolve => setTimeout(resolve, 1000)).then(() =>
        self.setToken("LOGGED_IN")
      );
      self.setLoading(false);
    }),
    logout: flow(function* logout() {
      self.setLoading(true);
      yield new Promise(resolve => setTimeout(resolve, 1000)).then(() =>
        self.setToken("")
      );
      self.setLoading(false);
    })
  }));

export default authStore;
