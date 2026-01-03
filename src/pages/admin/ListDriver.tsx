import React, { useEffect, useState } from "react";
import CreateUserOverlay from "@/components/CreateUserOverlay";
import DriverDetailOverlay from "@/components/DriverDetailOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDriverStore } from "@/store/driverStore";
import EditUserOverlay from "@/components/EditUserOverlay";

/* =======================
   TYPES
======================= */

type DriverStatus = "BUSY" | "OFFLINE" | "AVAILABLE" | "LOCKED";

type Driver = {
  id: number;
  email: string;
  phone: string;
  status: DriverStatus;
};

/* =======================
   STATUS MAPPER
======================= */

const DRIVER_STATUS_LABEL: Record<DriverStatus, string> = {
  AVAILABLE: "Sẵn sàng",
  BUSY: "Đang giao",
  OFFLINE: "Ngoại tuyến",
  LOCKED: "Bị khóa",
};

const DRIVER_STATUS_STYLE: Record<DriverStatus, string> = {
  AVAILABLE: "bg-green-100 text-green-700",
  BUSY: "bg-orange-100 text-orange-700",
  OFFLINE: "bg-gray-100 text-gray-600",
  LOCKED: "bg-red-100 text-red-700",
};

const ListDriver = () => {
  const drivers = useDriverStore((state) => state.drivers);
  const blockDriver = useDriverStore((state) => state.blockDriver);
  const fetchDrivers = useDriverStore((state) => state.fetchDrivers);
  const loading = useDriverStore((state) => state.loading);
  const [editId, setEditId] = useState<number | null>(null);

  const [openCreate, setOpenCreate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const handleBlocked = async (driverId: number) => {
    try {
      await blockDriver(driverId);
    } catch (err) {
      console.error("Lỗi khoá tài khoản Driver: ", err);
    }
  };
  return (
    <div className="container mx-auto mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-semibold">
          Tổng số lượng tài xế:{" "}
          <span className="font-bold">{drivers.length}</span>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm">
          Thêm tài xế
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="max-h-[450px] overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="sticky top-0 bg-gray-50 border-b z-10">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">SĐT</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((driver) => (
                <tr
                  key={driver.id}
                  className="border-b last:border-b-0 hover:bg-gray-50">
                  {/* ID + View */}
                  <td className="px-6 py-4 font-medium">
                    {driver.id}
                    <FontAwesomeIcon
                      icon={faEye}
                      className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSelectedDriverId(driver.id);
                        setOpenDetail(true);
                      }}
                    />
                  </td>

                  <td className="px-6 py-4">{driver.email}</td>
                  <td className="px-6 py-4">{driver.phone}</td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`
                        px-2 py-1 rounded text-xs font-semibold
                        ${DRIVER_STATUS_STYLE[driver.status]}
                      `}>
                      {DRIVER_STATUS_LABEL[driver.status]}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-3 items-center justify-center">
                      <button
                        onClick={() => handleBlocked(driver.id)}
                        disabled={driver.status === "LOCKED"}
                        className={`
                        px-3 py-1 text-xs rounded text-white
                        ${
                          driver.status === "LOCKED"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }
                      `}>
                        Khóa
                      </button>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        onClick={() => setEditId(driver.id)}
                        className="text-xl hover:text-primary transition duration-300 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {drivers.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Không có tài xế nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overlays */}
      <CreateUserOverlay
        open={openCreate}
        mode="driver"
        onClose={() => setOpenCreate(false)}
      />
      {editId && (
        <EditUserOverlay
          open={true}
          mode="driver"
          userId={editId}
          onClose={() => setEditId(null)}
        />
      )}
      {selectedDriverId && (
        <DriverDetailOverlay
          open={openDetail}
          driverId={selectedDriverId}
          onClose={() => setOpenDetail(false)}
        />
      )}
    </div>
  );
};

export default ListDriver;
