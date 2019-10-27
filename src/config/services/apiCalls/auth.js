// Here we will make our api calls regarding authentication
export default function getAuthApiCalls(api) {
  return {
    login: ({ email, password }) =>
      api.post("/auth/login", { email, password }),
    register: ({ email, password }) =>
      api.post("/auth/register", { email, password })
  };
}
// here we export each name for each api call - maybe we will generate thos
export const callNames = {
  LOGIN: "login",
  REGISTER: "register"
};
