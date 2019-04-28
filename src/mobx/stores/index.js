import { types } from "mobx-state-tree";
import authStore from "./auth";

export const stores = {
  auth: types.optional(authStore, {})
};
