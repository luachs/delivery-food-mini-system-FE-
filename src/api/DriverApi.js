import axiosClient from "./axiosClient";

const DriverApi = {
  getAll() {
    return axiosClient.get("/users", {
      params: { role: "DRIVER" },
    });
  },
  getById(id) {
    return axiosClient.get(`/drivers/${id}`);
  },

  update(id, data) {
    return axiosClient.put(`/drivers/${id}`, data);
  },

  block(id) {
    return axiosClient.delete(`/drivers/${id}`);
  },
  unlock(id) {
    return axiosClient.put(`/drivers/${id}/unlock`);
  },
};

export default DriverApi;
