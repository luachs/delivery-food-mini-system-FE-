import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DriverApi from "@/api/driverApi";

type DriverDetail = {
  id: number;
  name: string;
  email: string;
  phone: string;
  driverStatus: string;
  statistics: {
    totalOrders: number;
    inDelivery: number;
    completed: number;
    canceled: number;
  };
  driverOrders: {
    orderId: number;
    restaurantName: string;
    status: string;
    totalAmount: number;
    createdAt: string;
  }[];
};
type Props = {
  open: boolean;
  driverId: string;
  status: string;
  onClose: () => void;
};

const DriverDetailOverlay: React.FC<Props> = ({ open, driverId, onClose }) => {
  const [driver, setDriver] = useState<DriverDetail | null>(null);
  const [loading, setLoading] = useState(false);

  // MOCK DATA – sau này thay API

  useEffect(() => {
    if (!open || !driverId) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await DriverApi.getById(driverId);
        setDriver(res);
      } catch (err) {
        console.error("Lỗi lấy chi tiết driver", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [open, driverId]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[850px] max-h-[85vh] rounded-lg shadow-lg overflow-hidden">
        {/* ================= HEADER (FIXED) ================= */}
        <div className="sticky top-0 z-20 bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="text-lg font-semibold">
                🚴‍♂️ {driver?.name || "Loading..."}
              </div>
              <div className="text-sm text-gray-500">
                Trạng thái: <b>{driver?.driverStatus}</b>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-600 text-xl">
              <FontAwesomeIcon icon={faXmarkCircle} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">Đang tải...</div>
        ) : (
          <>
            {/* ================= STATS (FIXED) ================= */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b bg-white">
              <div className="bg-gray-50 p-4 rounded">
                📦 <b>{driver?.statistics.totalOrders}</b>
                <div className="text-sm text-gray-500">Tổng đơn</div>
              </div>

              <div className="bg-green-50 p-4 rounded">
                ✅ <b>{driver?.statistics.completed}</b>
                <div className="text-sm text-gray-500">Hoàn thành</div>
              </div>

              <div className="bg-yellow-50 p-4 rounded">
                🔄 <b>{driver?.statistics.inDelivery}</b>
                <div className="text-sm text-gray-500">Đang giao</div>
              </div>

              <div className="bg-red-50 p-4 rounded">
                ❌ <b>{driver?.statistics.canceled}</b>
                <div className="text-sm text-gray-500">Huỷ</div>
              </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className="px-6 pb-6">
              {/* THEAD FIXED */}
              <table className="w-full text-sm border border-b-0">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2">Order ID</th>
                    <th className="px-4 py-2">Nhà hàng</th>
                    <th className="px-4 py-2">Trạng thái</th>
                    <th className="px-4 py-2">Số tiền</th>
                    <th className="px-4 py-2">Thời gian</th>
                  </tr>
                </thead>
              </table>

              {/* TBODY SCROLL */}
              <div className="max-h-[300px] overflow-y-auto border border-t-0">
                <table className="w-full text-sm">
                  <tbody>
                    {driver?.driverOrders.map((o) => (
                      <tr
                        key={o.orderId}
                        className="border-b last:border-0 text-center hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium">#{o.orderId}</td>
                        <td className="px-4 py-2">{o.restaurantName}</td>
                        <td className="px-4 py-2">{o.status}</td>
                        <td className="px-4 py-2">
                          {o.totalAmount.toLocaleString()}đ
                        </td>
                        <td className="px-4 py-2">
                          {new Date(o.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}

                    {driver?.driverOrders.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-6 text-gray-500 text-center">
                          Không có đơn hàng
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DriverDetailOverlay;
