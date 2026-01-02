import axiosClient from "./axiosClient";

const OrderApi = {
  getAll() {
    return axiosClient.get("/orders");
  },
  getById(id) {
    return axiosClient.get(`/orders/${id}`);
  },

  getByRestaurant(restaurantId) {
    return axiosClient.get(`/orders/by-restaurant/${restaurantId}`);
  },

  getByStatus(status) {
    return axiosClient.get(`/orders/by-status/${status}`);
  },

  create(data) {
    return axiosClient.post(`/orders`, data);
  },

  assignDriver(orderId, driverId) {
    return axiosClient.post(`/orders/${orderId}/assign-driver`, {
      driverId,
    });
  },

  suggestDrivers(orderId) {
    return axiosClient.get(`/orders/${orderId}/suggest-drivers`);
  },
};
export default OrderApi;
