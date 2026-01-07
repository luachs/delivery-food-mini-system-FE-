import {
  faCar,
  faCircleXmark,
  faHandHoldingDollar,
  faList,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import OrderApi from "@/api/OrderApi";
import StatusStepper from "./StatusStepper";

const ORDER_STATUS = {
  IN_ASSIGNING: "Đang tìm tài xế",
  IN_DELIVERY: "Đang giao hàng",
  COMPLETED: "Đã giao",
};

type Props = {
  open: boolean;
  orderId: number | null;
  onClose: () => void;

  onOrderUpdated?: (updatedOrder: any) => void;
};
type OrderDetail = {
  orderId: number;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  totalAmount: number;
  driver: {
    id: number;
    name: string;
  } | null;
  restaurant: {
    ID: number;
    name: string;
    address: string;
    phone: string;
  };
  items: {
    itemId: number;
    menuItemName: string;
    price: number;
    quantity: number;
    total: number;
  }[];
};

const OrderDetailModal: React.FC<Props> = ({ open, onClose, orderId, onOrderUpdated }) => {
  const [order, setOrder] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [drivers, setDrivers] = useState<any[]>([]);

  const revealClass = `
    transition-all duration-300 ease-out
    ${
      isOpen
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4 pointer-events-none"
    }
  `;

  useEffect(() => {
    if (!open || !orderId) return;

    const fetchOrderDetail = async () => {
      try {
        const res = await OrderApi.getById(orderId);
        console.log(res);
        setOrder(res);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      }
    };

    fetchOrderDetail();
  }, [open, orderId]);

  const handleFindDriver = async () => {
    try {
      const res = await OrderApi.suggestDrivers(orderId);
      console.log(res);
      setDrivers(res.slice(0, 5));
      setIsOpen(true);
    } catch (err) {
      console.error("Lỗi tìm tài xế: ", err);
    }
  };

  const handleAssignDriver = async (driverId: number) => {
    if (!order) return;
    try {
      const updateOrder = await OrderApi.assignDriver(order.orderId, driverId);
      console.log(updateOrder);

      // 🔥 fetch lại order mới
      const updatedOrder = await OrderApi.getById(order.orderId);
      setOrder(updatedOrder);
      // 🔥 BÁO NGƯỢC LÊN CHA
      onOrderUpdated?.({
        id: updatedOrder.orderId,
        driverId: updatedOrder.driver?.id ?? null,
        status: updatedOrder.status,
      });

      // reset UI phụ
      setDrivers([]);
      setIsOpen(false);
    } catch (err) {
      console.error("Lỗi gán tài xế :", err);
    }
  };

  if (!open) return null;

  if (!order) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <div className="bg-[#11101a] text-white px-6 py-4 rounded-xl">
          Đang tải chi tiết đơn hàng...
        </div>
      </div>
    );
  }
  const status = order.status as "IN_ASSIGNING" | "IN_DELIVERY" | "COMPLETED";

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}
      `}>
      {/* Overlay background */}
      <div
        className={`
          absolute inset-0 bg-black/60
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0"}
        `}
        onClick={() => {
          onClose();
          setIsOpen(false);
        }}
      />

      {/* Modal content */}
      <div
        className={`
          relative w-[900px] max-w-[90%]
          rounded-xl rounded-t-none
          bg-gradient-to-br from-[#1c1b29] to-[#11101a]
          text-white shadow-xl
          transition-all duration-300
          ${open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
        `}>
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Đơn #{order.orderId}</h2>
          <span className="font-semibold">{order.restaurant.name}</span>
        </div>
        <StatusStepper status={status} />
        {/* Body */}
        <div className="grid grid-cols-2 gap-6 p-6">
          {/* LEFT */}
          <div className="space-y-3">
            <p>
              <FontAwesomeIcon className="text-primary" icon={faUtensils} /> ID
              nhà hàng: {order.restaurant.ID}
            </p>
            <p>
              <FontAwesomeIcon className="text-primary" icon={faCar} /> ID Tài
              xế giao hàng: {order.driver?.id ?? "chưa có"}
            </p>
            <p>- Địa chỉ lấy hàng: {order.pickupAddress}</p>
            <p>- Địa chỉ giao hàng: {order.deliveryAddress}</p>
            <p className="font-semibold">
              <FontAwesomeIcon
                className="text-primary"
                icon={faHandHoldingDollar}
              />
              Tổng: {order.totalAmount}đ
            </p>

            {/* CHỈ HIỆN KHI ĐANG TÌM TÀI XẾ */}
            {status === "IN_ASSIGNING" && (
              <>
                <div className="mt-6 flex items-center gap-3">
                  <span>Tìm tài xế gần nhất:</span>
                  <button
                    className="bg-primary hover:bg-red-600 px-4 py-2 rounded"
                    onClick={handleFindDriver}>
                    Tìm
                  </button>
                </div>

                <div className={`mt-4 ${revealClass}`}>
                  <p>
                    Đề xuất: <b>{drivers[0]?.name ?? "Chưa có đề xuất"}</b> là
                    lựa chọn hợp lí nhất
                  </p>

                  {drivers.length > 0 && (
                    <button
                      onClick={() => {
                        if (!drivers[0]) return;
                        handleAssignDriver(drivers[0].id);
                      }}
                      className="mt-4 bg-primary hover:bg-red-700 px-4 py-2 rounded">
                      Chọn tài xế này để giao hàng
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <ul className="space-y-2">
              <p>
                <FontAwesomeIcon icon={faList} className="text-primary" /> Danh
                sách món:
              </p>
              {order.items.map((item) => (
                <li key={item.itemId}>
                  • {item.menuItemName} x{item.quantity}
                </li>
              ))}
            </ul>
            {status === "IN_ASSIGNING" && isOpen && drivers.length > 0 && (
              <>
                <p className="mt-5 font-semibold">
                  <FontAwesomeIcon icon={faCar} className="text-primary" />{" "}
                  {drivers.length} tài xế gần nhất:
                </p>

                <select
                  className={`
        mt-1 w-full rounded-md bg-[#0f0e17]
        border border-white/10 px-3 py-2
        transition-all duration-300
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.distanceKm}km
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* ĐANG GIAO */}
            {status === "IN_DELIVERY" && (
              <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg text-yellow-300 text-center text-lg font-semibold">
                🚚 Đơn hàng đang được giao
              </div>
            )}

            {/* ĐÃ GIAO */}
            {status === "COMPLETED" && (
              <div className="mt-6 p-4 bg-green-500/20 rounded-lg text-green-400 text-center text-lg font-semibold">
                ✅ Đơn hàng đã được giao thành công
              </div>
            )}
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => {
            onClose();
            setIsOpen(false);
            setDrivers([]);
          }}
          className="absolute -top-14 right-0 text-white text-2xl hover:text-primary font-bold bg-[#14131f] w-16 h-14 rounded-xl rounded-b-none transition">
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
