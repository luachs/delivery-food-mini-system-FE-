import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RestaurantApi from "@/api/restaurantApi";

/* =======================
   TYPES
======================= */

type RestaurantDetail = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  restaurantStatus: string;
  statistics: {
    totalOrders: number;
    pending: number;
    confirmed: number;
    inAssigning: number;
    inDelivery: number;
    completed: number;
    canceled: number;
  };
  restaurantOrders: {
    orderId: number;
    driverId: number | null;
    driverName: string | null;
    driverVehicleType: string | null;
    status: string;
    totalAmount: number;
    createdAt: string;
  }[];
};

type Props = {
  open: boolean;
  restaurantId: number;
  onClose: () => void;
};

/* =======================
   STATUS LABEL
======================= */

const ORDER_STATUS_LABEL: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  IN_ASSIGNING: "Đang tìm tài xế",
  IN_DELIVERY: "Đang giao",
  COMPLETED: "Hoàn thành",
  CANCELED: "Đã huỷ",
};

/* =======================
   COMPONENT
======================= */

const RestaurantDetailOverlay: React.FC<Props> = ({
  open,
  restaurantId,
  onClose,
}) => {
  const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !restaurantId) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await RestaurantApi.getById(restaurantId);
        console.log(res);
        setRestaurant(res);
      } catch (err) {
        console.error("Lỗi lấy chi tiết nhà hàng", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [open, restaurantId]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[900px] max-h-[85vh] rounded-lg shadow-lg overflow-hidden">
        {/* ================= HEADER + STATS (FIXED) ================= */}
        <div className="sticky top-0 z-20 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div>
              <div className="text-lg font-semibold">
                🏪 {restaurant?.name || "Loading..."}
              </div>
              <div className="text-sm text-gray-500">
                📍 {restaurant?.address}
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-600 text-xl transition">
              <FontAwesomeIcon icon={faXmarkCircle} />
            </button>
          </div>

          {/* Stats */}
          {!loading && restaurant && (
            <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b">
              <div className="bg-gray-50 p-4 rounded">
                📦 <b>{restaurant.statistics.totalOrders}</b>
                <div className="text-sm text-gray-500">Tổng số đơn</div>
              </div>

              <div className="bg-yellow-50 p-4 rounded">
                🔄 <b>{restaurant.statistics.inDelivery}</b>
                <div className="text-sm text-gray-500">Chờ xử lý</div>
              </div>

              <div className="bg-green-50 p-4 rounded">
                ✅ <b>{restaurant.statistics.completed}</b>
                <div className="text-sm text-gray-500">Hoàn thành</div>
              </div>
            </div>
          )}
        </div>

        {/* ================= TABLE ================= */}
        <div className="px-6 pb-6">
          {/* THEAD FIXED */}
          <table className="w-full text-sm border border-b-0">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Tài xế</th>
                <th className="px-4 py-2 text-left">Tổng tiền</th>
                <th className="px-4 py-2 text-left">Thời gian</th>
              </tr>
            </thead>
          </table>

          {/* TBODY SCROLL */}
          <div className="max-h-[320px] overflow-y-auto border border-t-0">
            <table className="w-full text-sm">
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-500">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                )}

                {!loading &&
                  restaurant?.restaurantOrders.map((o) => (
                    <tr
                      key={o.orderId}
                      className="border-b last:border-0 hover:bg-gray-50">
                      <td className="text-center px-4 py-2 font-medium">
                        #{o.orderId}
                      </td>
                      <td className="text-center px-4 py-2">
                        {ORDER_STATUS_LABEL[o.status] || o.status}
                      </td>
                      <td className="text-center px-4 py-2">
                        {o.driverName ?? "Chưa có"}
                      </td>
                      <td className="text-center px-4 py-2">
                        {o.totalAmount.toLocaleString()}đ
                      </td>
                      <td className="text-center px-4 py-2">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}

                {!loading && restaurant?.restaurantOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-gray-500 text-center">
                      Không có đơn hàng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailOverlay;
