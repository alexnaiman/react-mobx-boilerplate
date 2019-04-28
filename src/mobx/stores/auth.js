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
    login: () => {
      // simulate login
      self.setLoading(true);
      self.token = "LOGGED_IN";
      self.setLoading(false);
    }
    // login: flow(function* login(email, password) {
    //     self.setLoading(true)
    //     authService.loginUser(email, password, self.setUser, self.setError)
    // }),
    // refresh: flow(function* refresh() {
    //     authService.refreshToken(self.setUser)
    // }),
    // logOut: flow(function* logOut() {
    //     authService.logOutUser(() => self.setUser({}), self.setError)
    // })
  }));

export default authStore;
