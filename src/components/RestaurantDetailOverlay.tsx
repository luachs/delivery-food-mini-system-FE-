import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Order = {
  id: string;
  status: string;
  driver: string;
  createdAt: string;
};

type Props = {
  open: boolean;
  restaurantName: string;
  onClose: () => void;
};

const RestaurantDetailOverlay: React.FC<Props> = ({
  open,
  restaurantName,
  onClose,
}) => {
  if (!open) return null;

  // MOCK DATA (sau này thay bằng API)
  const orders: Order[] = [
    {
      id: "#238283",
      status: "Đang xử lý",
      driver: "Nguyễn Văn A",
      createdAt: "01/01/2025 10:30",
    },
    {
      id: "#238284",
      status: "Đã hoàn thành",
      driver: "Nguyễn Văn B",
      createdAt: "01/01/2025 09:15",
    },
  ];

  const total = orders.length;
  const processing = orders.filter((o) => o.status === "Đang xử lý").length;
  const completed = orders.filter((o) => o.status === "Đã hoàn thành").length;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
    >
      <div
        data-aos="fade-up"
        className="bg-white w-[900px] max-h-[85vh] rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="text-lg font-semibold">
            🏪 {restaurantName}
            <div className="text-sm text-gray-500">
              📍 123 Nguyễn Văn Linh, Quận 7
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl transition duration-300"
          >
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 px-6 py-4">
          <div className="bg-gray-50 p-4 rounded">
            📦 <b>{total}</b>
            <div className="text-sm text-gray-500">Tổng số đơn</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            🔄 <b>{processing}</b>
            <div className="text-sm text-gray-500">Đơn đang xử lý</div>
          </div>
          <div className="bg-green-50 p-4 rounded">
            ✅ <b>{completed}</b>
            <div className="text-sm text-gray-500">Đơn đã hoàn thành</div>
          </div>
        </div>

        {/* Table */}
        <div className="px-6 pb-6">
          <table className="w-full text-sm text-left border rounded">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Tài xế</th>
                <th className="px-4 py-2">Thời gian tạo</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-4 py-2 font-medium">{o.id}</td>
                  <td className="px-4 py-2">{o.status}</td>
                  <td className="px-4 py-2">{o.driver}</td>
                  <td className="px-4 py-2">{o.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailOverlay;
