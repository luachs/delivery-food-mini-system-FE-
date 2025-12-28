import CreateUserOverlay from "@/components/CreateUserOverlay";
import RestaurantDetailOverlay from "@/components/RestaurantDetailOverlay";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type Restaurant = {
  name: string;
  orderId: string;
  status: "Chưa chuẩn bị" | "Đã chuẩn bị";
};

const ListRestaurant = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    { name: "KFC", orderId: "#238283", status: "Chưa chuẩn bị" },
    { name: "Lotteria", orderId: "#893483", status: "Chưa chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
    { name: "Pizza Hut", orderId: "#676745", status: "Đã chuẩn bị" },
    { name: "KFC", orderId: "#434573", status: "Đã chuẩn bị" },
  ]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");

  const handleStatusChange = (
    index: number,
    newStatus: Restaurant["status"]
  ) => {
    setRestaurants((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="container mx-auto mt-[50px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className=" text-xl font-semibold text-gray-700">
          Tổng số lượng nhà hàng:{" "}
          <span className="font-semibold">{restaurants.length}</span>
        </div>
        <button
          onClick={() => setOpenCreate(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
        >
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
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {item.name}{" "}
                    <span className="text-sm cursor-pointer  transition duration-300">
                      <FontAwesomeIcon
                        icon={faEye}
                        onClick={() => {
                          setSelectedRestaurant(item.name);
                          setOpenDetail(true);
                        }}
                        className="ml-2 cursor-pointer  hover:text-blue-600"
                      />
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.orderId}</td>

                  <td className="px-6 py-4">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(
                          index,
                          e.target.value as Restaurant["status"]
                        )
                      }
                      className={`rounded-md px-3 py-1.5 text-xs font-medium border
                ${
                  item.status === "Đã chuẩn bị"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                }
              `}
                    >
                      <option value="Chưa chuẩn bị">Chưa chuẩn bị</option>
                      <option value="Đã chuẩn bị">Đã chuẩn bị</option>
                    </select>
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
      <CreateUserOverlay
        open={openCreate}
        mode="restaurant"
        onClose={() => setOpenCreate(false)}
      />
      <RestaurantDetailOverlay
        open={openDetail}
        restaurantName={selectedRestaurant}
        onClose={() => setOpenDetail(false)}
      />
    </div>
  );
};

export default ListRestaurant;
