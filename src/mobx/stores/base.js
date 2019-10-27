import { types, getEnv, flow } from "mobx-state-tree";

// our base store/fetcher
const baseStore = types
  .model("BaseStore", {
    isLoading: false,
    error: types.frozen()
  })
  .views(self => ({
    hasError: () => !!self.error
  }))
  .actions(self => ({
    fetch: flow(function*(apiCall, params, onSuccess, onError) {
      self.isLoading = true;
      const response = yield getEnv(self).apiService[apiCall](params);

      if (response.ok) {
        onSuccess(response.data);
        self.error = {};
      } else {
        self.error = {
          problem: response.problem,
          status: response.status,
          originalError: response.originalError
        };
        onError(self.error);
      }
      self.isLoading = false;
    })
  }));

export default baseStore;
