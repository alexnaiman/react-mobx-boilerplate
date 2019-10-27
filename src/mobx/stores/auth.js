import { types, flow } from "mobx-state-tree";
import getCookie from "@/config/cookieProvider";
import { User } from "../models";
import baseStore from "./base";
import { getEnv } from "mobx-state-tree";

const cookie = getCookie();

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
    afterCreate: () => {
      self.token = cookie.get("access_token");
    },
    setLoading: value => {
      self.isLoading = value;
    },
    setField: (field, value) => (self[field] = value),
    login: flow(function* login(email, password) {
      const authCalls = getEnv(self).callNames.authCallNames;
      yield self.fetch(
        authCalls.LOGIN,
        { email, password },
        self.onLoginSuccess,
        self.onError
      );
    }),
    register: flow(function* login(email, password) {
      const authCalls = getEnv(self).callNames.authCallNames;
      yield self.fetch(
        authCalls.REGISTER,
        { email, password },
        self.onLoginSuccess,
        self.onError
      );
    }),
    onLoginSuccess: response => {
      self.setField("token", response.access_token);
    },

    onError: error => {
      self.setField("error", error.originalError);
    },
    logout: () => {
      self.setLoading(true);
      self.setField("token", "");
      self.setLoading(false);
    }
  }));

const enhancedAuth = types.compose(
  authStore,
  baseStore
);
export default enhancedAuth;
