import React from "react";
import OrderStatusBar from "./OrderStatusBar";
import OrderActions from "./OrderActions";

/* ✅ THÊM */
type OrderStatus =
  | "created"
  | "confirmed"
  | "delivering"
  | "completed"
  | "cancelled";

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: string[];
  total: number;
  createdAt: string;
  status: OrderStatus;
}
/* ✅ */

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="bg-gradient-to-r from-[#1c1b2f] to-[#24233a] text-white rounded-lg p-4 mb-5">
      {/* header */}
      <div className="flex justify-between text-sm mb-3">
        <span className="font-semibold">Đơn #{order.id}</span>
        <span className="text-gray-300">⏱ {order.createdAt}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        {/* left */}
        <div>
          <p>👤 {order.customerName}</p>
          <p>📞 {order.phone}</p>
          <p>📍 {order.address}</p>

          <p className="mt-2 font-semibold">
            Tổng: {order.total.toLocaleString()}đ
          </p>

          <OrderActions
            status={order.status}
            onConfirm={() => console.log("confirm", order.id)}
            onCancel={() => console.log("cancel", order.id)}
          />
        </div>

        {/* right */}
        <div className="border-l border-white/20 pl-4">
          <ul className="list-disc ml-4">
            {order.items.slice(0, 3).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
            {order.items.length > 3 && (
              <li>+ {order.items.length - 3} món khác</li>
            )}
          </ul>

          <OrderStatusBar status={order.status} />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
