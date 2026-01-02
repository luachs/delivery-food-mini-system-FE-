import { create } from "zustand";
import driverApi from "@/api/driverApi";

type DriverStatus = "BUSY" | "OFFLINE" | "AVAILABLE" | "LOCKED";

type Driver = {
  id: number;
  email: string;
  phone: string;
  status: DriverStatus;
};

type DriverStore = {
  drivers: Driver[];
  loading: boolean;
  fetchDrivers: () => Promise<void>;
  addDriver: (driver: Driver) => void;

  blockDriver: (id: number) => Promise<void>;
};

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [],
  loading: false,

  fetchDrivers: async () => {
    set({ loading: true });
    const res = await driverApi.getAll();
    set({ drivers: res, loading: false });
  },

  addDriver: (driver) =>
    set((state) => ({
      drivers: [driver, ...state.drivers],
    })),
  blockDriver: async (id) => {
    await driverApi.block(id); // gọi API backend

    set((state) => ({
      drivers: state.drivers.map((d) =>
        d.id === id ? { ...d, status: "LOCKED" } : d
      ),
    }));
  },
}));
