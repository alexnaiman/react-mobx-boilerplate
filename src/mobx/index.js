import { types } from "mobx-state-tree";
import { stores } from "./stores";

const mainStore = types.model("MainStore", {
  ...stores
});

export default mainStore;
