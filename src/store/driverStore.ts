import { create } from "zustand";
import DriverApi from "@/api/DriverApi";

export type DriverStatus = "BUSY" | "OFFLINE" | "AVAILABLE" | "LOCKED";

export type Driver = {
  id: number;
  email: string;
  phone: string;
  status: DriverStatus;
};

type DriverStore = {
  drivers: Driver[];
  loading: boolean;
  fetchDrivers: () => Promise<void>;
  blockDriver: (id: number) => Promise<void>;
  unlockDriver: (id: number) => Promise<void>;
};

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [],
  loading: false,

  fetchDrivers: async () => {
    set({ loading: true });
    try {
      const data = await DriverApi.getAll();
      set({ drivers: data, loading: false });
    } catch (err) {
      console.error("Lỗi lấy driver:", err);
      set({ loading: false });
    }
  },

  blockDriver: async (id: number) => {
    await DriverApi.block(id);

    set((state) => ({
      drivers: state.drivers.map((d) =>
        d.id === id ? { ...d, status: "LOCKED" } : d
      ),
    }));
  },

  unlockDriver: async (id: number) => {
    await DriverApi.unlock(id);

    set((state) => ({
      drivers: state.drivers.map((d) =>
        d.id === id ? { ...d, status: "AVAILABLE" } : d
      ),
    }));
  },
}));
