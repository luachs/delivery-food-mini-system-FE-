import React from "react";

type DriverStatus = "available" | "busy" | "offline";

type Driver = {
  id: string;
  orderId: string;
  status: DriverStatus;
};

const ListDriver = () => {
  const drivers: Driver[] = [
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
  ];

  const renderStatus = (status: DriverStatus) => {
    switch (status) {
      case "available":
        return <span className="text-green-600 font-medium">available</span>;
      case "busy":
        return <span className="text-orange-600 font-medium">busy</span>;
      case "offline":
        return <span className="text-gray-500 font-medium">offline</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className=" text-xl font-semibold">
          Tổng số lượng tài xế:{" "}
          <span className="font-semibold">{drivers.length}</span>
        </div>

        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm">
          Thêm tài xế
        </button>
      </div>

      {/* Table */}
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
                <tr
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">{driver.id}</td>
                  <td className="px-6 py-4">{driver.orderId}</td>
                  <td className="px-6 py-4">{renderStatus(driver.status)}</td>

                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      disabled={driver.status !== "busy"}
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
    </div>
  );
};

export default ListDriver;
