import OrderDetailModal from "@/components/OrderDetailModal";
import React, { useState } from "react";

type Order = {
  id: string;
  restaurant: string;
  driver: string;
  status: string;
  createdAt: string;
};

const ListOrders = () => {
  const orders: Order[] = [
    {
      id: "#SD12387D",
      restaurant: "KFC",
      driver: "Chưa có",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD12387D",
      restaurant: "KFC",
      driver: "Chưa có",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD12387D",
      restaurant: "KFC",
      driver: "Chưa có",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD12387D",
      restaurant: "KFC",
      driver: "Chưa có",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD12387D",
      restaurant: "KFC",
      driver: "Chưa có",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD12387D",
      restaurant: "KFC",
      driver: "Chưa có",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD12387D",
      restaurant: "KFC",
      driver: "Chưa có",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Lotteria",
      driver: "Nguyễn Văn A",
      status: "Chưa bắt đầu",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "KFC",
      driver: "Nguyễn Văn A",
      status: "Đang giao",
      createdAt: "1/1/2025",
    },
    {
      id: "#SD362HGD",
      restaurant: "Pizza Hut",
      driver: "Nguyễn Văn B",
      status: "Đã hoàn thành",
      createdAt: "1/1/2025",
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="container mx-auto mt-[50px]">
      {/* Tổng số đơn */}
      <div className="text-xl font-semibold text-gray-700 mb-5">
        Tổng số lượng đơn hàng: {orders.length}
      </div>

      {/* Bảng */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div className="max-h-[530px] overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            <thead className=" sticky top-0 z-10 border-b bg-gray-50 font-medium">
              <tr>
                <th className="px-6 py-3">ID Đơn hàng</th>
                <th className="px-6 py-3">Nhà hàng</th>
                <th className="px-6 py-3">Tên tài xế</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3">Ngày tạo</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.restaurant}</td>
                  <td className="px-6 py-4">{order.driver}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">{order.createdAt}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setOpen(true)}
                      className="bg-primary hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OrderDetailModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ListOrders;
