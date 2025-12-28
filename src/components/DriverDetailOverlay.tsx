import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Order = {
  id: string;
  status: "completed" | "delivering" | "cancelled";
  time: string;
};

type Props = {
  open: boolean;
  driverId: string;
  status: string;
  onClose: () => void;
};

const DriverDetailOverlay: React.FC<Props> = ({
  open,
  driverId,
  status,
  onClose,
}) => {
  if (!open) return null;

  // MOCK DATA – sau này thay API
  const orders: Order[] = [
    { id: "#238283", status: "completed", time: "10:30" },
    { id: "#893483", status: "completed", time: "09:15" },
    { id: "#434573", status: "delivering", time: "11:00" },
  ];

  const total = orders.length;
  const completed = orders.filter((o) => o.status === "completed").length;
  const delivering = orders.filter((o) => o.status === "delivering").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
    >
      <div
        data-aos="fade-up"
        className="bg-white w-[850px] max-h-[85vh] rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <div className="text-lg font-semibold">🚴‍♂️ Tài xế: {driverId}</div>
            <div className="text-sm text-gray-500">
              Trạng thái: <b>{status}</b>
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
        <div className="grid grid-cols-4 gap-4 px-6 py-4">
          <div className="bg-gray-50 p-4 rounded">
            📦 <b>{total}</b>
            <div className="text-sm text-gray-500">Tổng đơn</div>
          </div>

          <div className="bg-green-50 p-4 rounded">
            ✅ <b>{completed}</b>
            <div className="text-sm text-gray-500">Hoàn thành</div>
          </div>

          <div className="bg-yellow-50 p-4 rounded">
            🔄 <b>{delivering}</b>
            <div className="text-sm text-gray-500">Đang giao</div>
          </div>

          <div className="bg-red-50 p-4 rounded">
            ❌ <b>{cancelled}</b>
            <div className="text-sm text-gray-500">Huỷ</div>
          </div>
        </div>

        {/* Orders table */}
        <div className="px-6 pb-6">
          <table className="w-full text-sm border rounded">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i} className="border-b last:border-0 text-center">
                  <td className="px-4 py-2 font-medium">{o.id}</td>
                  <td className="px-4 py-2">{o.status}</td>
                  <td className="px-4 py-2">{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailOverlay;
