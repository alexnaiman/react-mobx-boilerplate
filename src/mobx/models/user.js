import { types } from "mobx-state-tree";

// Models used for storing data -> just plain data, no actions

const user = types.model("User", {
  id: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  affiliation: types.maybeNull(types.string),
  webpage: types.maybeNull(types.string)
  // role: types.maybeNull(types.enumeration('role',['TRAINER', 'EMPLOYEE'])),
});

export default user;
