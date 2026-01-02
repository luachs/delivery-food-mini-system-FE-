import { data } from "autoprefixer";
import axiosClient from "./axiosClient";

const UserApi = {
  signup(data) {
    return axiosClient.post("/users/signup", data);
  },
  create(data) {
    return axiosClient.post("/users", data);
  },

  getAll() {
    return axiosClient.get("/users");
  },

  getByRole(role) {
    return axiosClient.get("/users", {
      params: { role },
    });
  },

  getById(id) {
    return axiosClient.get(`/users/${id}`);
  },
};

export default UserApi;
