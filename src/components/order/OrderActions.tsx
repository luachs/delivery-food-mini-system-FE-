import React from "react";
import Button from "@/components/ui/Button";

type OrderStatus =
  | "created"
  | "confirmed"
  | "delivering"
  | "completed"
  | "cancelled";

interface Props {
  status: OrderStatus;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const OrderActions: React.FC<Props> = ({ status, onConfirm, onCancel }) => {
  // chỉ đơn mới tạo mới thao tác được
  if (status !== "created") {
    return (
      <div className="flex gap-2 opacity-60">
        <Button disabled>Xác nhận</Button>
        <Button disabled variant="secondary">
          Huỷ
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button onClick={onConfirm}>Xác nhận</Button>
      <Button variant="secondary" onClick={onCancel}>
        Huỷ
      </Button>
    </div>
  );
};

export default OrderActions;
