import React from "react";

/* ✅ THÊM */
type OrderStatus =
  | "created"
  | "confirmed"
  | "delivering"
  | "completed"
  | "cancelled";
/* ✅ */

const STEPS = [
  { key: "created", label: "Đã tạo" },
  { key: "confirmed", label: "Đã xác nhận" },
  { key: "delivering", label: "Đang giao" },
  { key: "completed", label: "Đã hoàn thành" },
];

const OrderStatusBar: React.FC<{ status: OrderStatus }> = ({ status }) => {
  // case bị huỷ
  if (status === "cancelled") {
    return (
      <div className="flex gap-6 text-xs mt-3">
        <Dot active label="Đã tạo" />
        <Dot active label="Đã huỷ" />
      </div>
    );
  }

  const activeIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="flex gap-6 text-xs mt-3">
      {STEPS.map((step, idx) => (
        <Dot key={step.key} active={idx <= activeIndex} label={step.label} />
      ))}
    </div>
  );
};

const Dot: React.FC<{ active: boolean; label: string }> = ({
  active,
  label,
}) => (
  <div className="flex items-center gap-1 text-gray-400">
    <span
      className={`w-2.5 h-2.5 rounded-full ${
        active ? "bg-green-500" : "bg-gray-400"
      }`}
    />
    {label}
  </div>
);

export default OrderStatusBar;
