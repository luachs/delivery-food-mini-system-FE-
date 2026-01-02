import axiosClient from "./axiosClient";

const AuthApi = {
  login(data) {
    return axiosClient.post("/users/login", data);
  },
};

export default AuthApi;
