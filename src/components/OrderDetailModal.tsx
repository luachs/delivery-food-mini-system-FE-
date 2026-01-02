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

type Props = {
  open: boolean;
  orderId: number | null;
  onClose: () => void;
};
type OrderDetail = {
  orderId: number;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  totalAmount: number;
  driver: any;
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

const OrderDetailModal: React.FC<Props> = ({ open, onClose, orderId }) => {
  const [order, setOrder] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        setOrder(res);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      }
    };

    fetchOrderDetail();
  }, [open, orderId]);

  const handleFindDriver = () => {
    try {
      const res = OrderApi.suggestDrivers(orderId);
      console.log(res);
    } catch (err) {
      console.error("Lỗi tìm tài xế: ", err);
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
              xế giao hàng: {order.driverId || "chưa có"}
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

            <div className="mt-6 flex items-center gap-3">
              <span>Tìm tài xế gần nhất:</span>
              <button
                className="bg-primary hover:bg-red-600 px-4 py-2 rounded"
                onClick={() => {
                  setIsOpen(true);
                  handleFindDriver();
                }}>
                Tìm
              </button>
            </div>

            {/* Reveal content */}
            <div className={`mt-4 ${revealClass}`}>
              <p>
                Đề xuất: <b>Driver 1</b> là lựa chọn hợp lý nhất
              </p>

              <button className="mt-4 bg-primary hover:bg-red-700 px-4 py-2 rounded">
                Chọn tài xế này để giao hàng
              </button>
            </div>
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

              {order.items.length > 3 && (
                <li className="opacity-70">
                  + {order.items.length - 3} món khác
                </li>
              )}
            </ul>

            <select
              className={`
                mt-6 w-full rounded-md bg-[#0f0e17]
                border border-white/10 px-3 py-2
                ${revealClass}
              `}>
              <option>Driver 1 - 1km</option>
              <option>Driver 2 - 2km</option>
              <option>Driver 3 - 5km</option>
              <option>Driver 4 - 7km</option>
            </select>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => {
            onClose();
            setIsOpen(false);
          }}
          className="absolute -top-14 right-0 text-white text-2xl hover:text-primary font-bold bg-[#14131f] w-16 h-14 rounded-xl rounded-b-none transition">
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
