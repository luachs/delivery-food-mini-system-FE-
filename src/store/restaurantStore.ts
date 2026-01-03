import { create } from "zustand";
import UserApi from "@/api/UserApi";
import RestaurantApi from "@/api/RestaurantApi";

export type RestaurantStatus = "AVAILABLE" | "LOCKED";

export type Restaurant = {
  ID: number;
  name: string;
  phone: string;
  address: string;
  restaurantStatus: RestaurantStatus;
};

type RestaurantStore = {
  restaurants: Restaurant[];
  loading: boolean;
  fetchRestaurants: () => Promise<void>;
  addRestaurant: (restaurant: Restaurant) => void;
  blockRestaurant: (id: number) => Promise<void>;
};

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  restaurants: [],
  loading: false,

  fetchRestaurants: async () => {
    set({ loading: true });
    try {
      const data = await UserApi.getByRole("RESTAURANT");
      set({ restaurants: data, loading: false });
      console.log(data);
    } catch (error) {
      console.error("Lỗi khi lấy nhà hàng:", error);
      set({ loading: false });
    }
  },

  addRestaurant: (restaurant) =>
    set((state) => ({
      restaurants: [restaurant, ...state.restaurants],
    })),

  blockRestaurant: async (id) => {
    await RestaurantApi.block(id);

    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.ID === id ? { ...r, restaurantStatus: "LOCKED" } : r
      ),
    }));
  },
}));
