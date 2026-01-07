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
  unlockRestaurant: (id: number) => Promise<void>; // ✅ THÊM
};

export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
  restaurants: [],
  loading: false,

  fetchRestaurants: async () => {
    set({ loading: true });
    try {
      const data = await UserApi.getByRole("RESTAURANT");
      set({ restaurants: data, loading: false });
    } catch (error) {
      console.error("Lỗi khi lấy nhà hàng:", error);
      set({ loading: false });
    }
  },

  addRestaurant: (restaurant) =>
    set((state) => ({
      restaurants: [restaurant, ...state.restaurants],
    })),

  blockRestaurant: async (id: number) => {
    await RestaurantApi.block(id);

    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.ID === id ? { ...r, restaurantStatus: "LOCKED" } : r
      ),
    }));
  },

  unlockRestaurant: async (id: number) => {
    await RestaurantApi.unlock(id);

    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.ID === id ? { ...r, restaurantStatus: "AVAILABLE" } : r
      ),
    }));
  },
}));
