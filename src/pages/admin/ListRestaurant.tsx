import React from "react";

type Restaurant = {
  name: string;
  orderId: string;
  status: "Chưa chuẩn bị" | "Đã chuẩn bị";
};

const ListRestaurant = () => {
  const restaurants: Restaurant[] = [
    { name: "KFC", orderId: "#238283", status: "Chưa chuẩn bị" },
    { name: "Lotteria", orderId: "#893483", status: "Chưa chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#238283", status: "Chưa chuẩn bị" },
    { name: "Lotteria", orderId: "#893483", status: "Chưa chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
  ];

  return (
    <div className="container mx-auto mt-[50px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className=" text-xl font-semibold text-gray-700">
          Tổng số lượng nhà hàng:{" "}
          <span className="font-semibold">{restaurants.length}</span>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm">
          Thêm nhà hàng
        </button>
      </div>

      {/* Count */}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="max-h-[530px] overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            <thead className=" sticky top-0 z-10 border-b bg-gray-50 font-medium">
              <tr>
                <th className="px-6 py-3">Tên nhà hàng</th>
                <th className="px-6 py-3">Đơn hàng</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {restaurants.map((item, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4">{item.orderId}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      item.status === "Đã chuẩn bị"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-xs">
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

export default ListRestaurant;
