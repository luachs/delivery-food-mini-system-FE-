import axiosClient from "./axiosClient";
const RestaurantApi = {
  getById(id) {
    return axiosClient.get(`/restaurants/${id}`);
  },
  update(id, data) {
    return axiosClient.put(`/restaurants/${id}`, data);
  },
  block(id) {
    return axiosClient.delete(`/restaurants/${id}`);
  },
};

export default RestaurantApi;
