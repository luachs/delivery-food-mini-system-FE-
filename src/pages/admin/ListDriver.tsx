import CreateUserOverlay from "@/components/CreateUserOverlay";
import DriverDetailOverlay from "@/components/DriverDetailOverlay";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type DriverStatus = "available" | "busy" | "offline";

type Driver = {
  id: string;
  orderId: string;
  status: DriverStatus;
};

const ListDriver = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: "A", orderId: "#238283", status: "available" },
    { id: "B", orderId: "#893483", status: "available" },
    { id: "C", orderId: "#434573", status: "busy" },
    { id: "D", orderId: "#676745", status: "offline" },
    { id: "A", orderId: "#238283", status: "available" },
    { id: "B", orderId: "#893483", status: "available" },
    { id: "C", orderId: "#434573", status: "busy" },
    { id: "D", orderId: "#676745", status: "offline" },
    { id: "A", orderId: "#238283", status: "available" },
    { id: "B", orderId: "#893483", status: "available" },
    { id: "C", orderId: "#434573", status: "busy" },
    { id: "D", orderId: "#676745", status: "offline" },
    { id: "A", orderId: "#238283", status: "available" },
    { id: "B", orderId: "#893483", status: "available" },
    { id: "C", orderId: "#434573", status: "busy" },
    { id: "D", orderId: "#676745", status: "offline" },
    { id: "A", orderId: "#238283", status: "available" },
    { id: "B", orderId: "#893483", status: "available" },
    { id: "C", orderId: "#434573", status: "busy" },
    { id: "D", orderId: "#676745", status: "offline" },
    { id: "A", orderId: "#238283", status: "available" },
    { id: "B", orderId: "#893483", status: "available" },
    { id: "C", orderId: "#434573", status: "busy" },
    { id: "D", orderId: "#676745", status: "offline" },
  ]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const handleStatusChange = (index: number, newStatus: DriverStatus) => {
    setDrivers((prev) =>
      prev.map((driver, i) =>
        i === index ? { ...driver, status: newStatus } : driver
      )
    );
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-semibold">
          Tổng số lượng tài xế:{" "}
          <span className="font-semibold">{drivers.length}</span>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Thêm tài xế
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="max-h-[530px] overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="sticky top-0 z-10 border-b bg-gray-50 font-medium">
              <tr>
                <th className="px-6 py-3">ID tài xế</th>
                <th className="px-6 py-3">Đơn hàng</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((driver, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {driver.id}{" "}
                    <span className="text-sm cursor-pointer hover:text-primary transition duration-300">
                      <FontAwesomeIcon
                        icon={faEye}
                        onClick={() => {
                          setSelectedDriver(driver);
                          setOpenDetail(true);
                        }}
                        className="ml-1 cursor-pointer hover:text-blue-600 transition"
                      />
                    </span>
                  </td>
                  <td className="px-6 py-4">{driver.orderId}</td>

                  <td className="px-6 py-4">
                    <select
                      value={driver.status}
                      onChange={(e) =>
                        handleStatusChange(
                          index,
                          e.target.value as DriverStatus
                        )
                      }
                      className={`rounded-md px-3 py-1.5 text-xs font-medium border
                        ${
                          driver.status === "available"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : driver.status === "busy"
                            ? "bg-orange-50 text-orange-700 border-orange-200"
                            : "bg-gray-100 text-gray-600 border-gray-300"
                        }
                      `}
                    >
                      <option value="available">available</option>
                      <option value="busy">busy</option>
                      <option value="offline">offline</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      disabled={driver.status !== "busy"}
                      onClick={() => handleStatusChange(index, "available")}
                      className={`
                        px-3 py-1.5 rounded-md text-xs text-white
                        ${
                          driver.status === "busy"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-300 cursor-not-allowed"
                        }
                      `}
                    >
                      Hoàn thành
                    </button>

                    <button className="px-3 py-1.5 rounded-md text-xs bg-red-600 hover:bg-red-700 text-white">
                      Khóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateUserOverlay
        open={openCreate}
        mode="driver"
        onClose={() => setOpenCreate(false)}
      />
      {selectedDriver && (
        <DriverDetailOverlay
          open={openDetail}
          driverId={selectedDriver.id}
          status={selectedDriver.status}
          onClose={() => setOpenDetail(false)}
        />
      )}
    </div>
  );
};

export default ListDriver;
