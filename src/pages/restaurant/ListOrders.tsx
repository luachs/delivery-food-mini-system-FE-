import React from "react";
import Navbar from "@/components/Navbar";
import OrderCard from "@/components/order/OrderCard";

/* ✅ THÊM Ở ĐÂY */
export type OrderStatus =
  | "created"
  | "confirmed"
  | "delivering"
  | "completed"
  | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: string[];
  total: number;
  createdAt: string;
  status: OrderStatus;
}
/* ✅ HẾT PHẦN THÊM */

const orders: Order[] = [
  {
    id: "DH00123",
    customerName: "Nguyễn Văn A",
    phone: "0987 654 321",
    address: "12 Nguyễn Trãi Q1",
    items: [
      "Trà sữa trân châu x1",
      "Bánh mì thịt x2",
      "Gà rán x1",
      "Khoai tây",
    ],
    total: 125000,
    createdAt: "5 phút trước",
    status: "created",
  },
  {
    id: "DH00124",
    customerName: "Nguyễn Văn A",
    phone: "0987 654 321",
    address: "12 Nguyễn Trãi Q1",
    items: ["Trà sữa trân châu x1", "Bánh mì thịt x2"],
    total: 125000,
    createdAt: "10 phút trước",
    status: "cancelled",
  },
  {
    id: "DH00125",
    customerName: "Nguyễn Văn A",
    phone: "0987 654 321",
    address: "12 Nguyễn Trãi Q1",
    items: ["Trà sữa trân châu x1", "Bánh mì thịt x2"],
    total: 125000,
    createdAt: "15 phút trước",
    status: "completed",
  },
];

const ListOrders = () => {
  return (
    <div className="mx-auto mt-3 max-w-4xl">
      <Navbar title="Danh sách đơn hàng" username="Nguyễn Văn A" />

      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default ListOrders;
