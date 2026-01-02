import OrderDetailModal from "@/components/OrderDetailModal";
import { useEffect, useState } from "react";
import OrderApi from "@/api/OrderApi";

type Orders = {
  id: number;
  restaurantId: number;
  driverId: number | null;
  status: string;
  createdAt: string;
};

const ORDER_STATUS_LABEL: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  IN_ASSIGNING: "Đang tìm tài xế",
  IN_DELIVERY: "Đang giao hàng",
  COMPLETED: "Hoàn thành",
  CANCELED: "Đã huỷ",
};
const ORDER_STATUS_COLOR: Record<string, string> = {
  PENDING: "bg-gray-100 text-gray-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  IN_ASSIGNING: "bg-yellow-100 text-yellow-700",
  IN_DELIVERY: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELED: "bg-red-100 text-red-700",
};

const ListOrders = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await OrderApi.getAll();
        console.log(res);
        setOrders(res);
      } catch (err) {
        console.error("Lỗi lấy danh sách đơn hàng: ", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto mt-[50px]">
      {/* Tổng số đơn */}
      <div className="text-xl font-semibold text-gray-700 mb-5">
        Tổng số lượng đơn hàng: {orders.length}
      </div>

      {/* Bảng */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div className="max-h-[460px] overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            <thead className=" sticky top-0 z-10 border-b bg-gray-50 font-medium">
              <tr>
                <th className="px-6 py-3 w-[90px]">ID Đơn hàng</th>
                <th className="px-6 py-3 w-[90px]">ID Nhà hàng</th>
                <th className="px-6 py-3 w-[150px]">ID tài xế</th>
                <th className="px-6 py-3 w-[170px]">Trạng thái</th>
                <th className="px-6 py-3 w-[200px]">Ngày tạo</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">#{order.id}</td>
                  <td className="px-6 py-4">{order.restaurantId}</td>
                  <td className="px-6 py-4">
                    {order.driverId ?? "Chưa có tài xế"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        ORDER_STATUS_COLOR[order.status] ??
                        "bg-gray-100 text-gray-700"
                      }
                    `}>
                      {ORDER_STATUS_LABEL[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{order.createdAt}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        setOpen(true);
                        setSelectedOrderId(order.id);
                      }}
                      className="bg-primary hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm">
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OrderDetailModal
        orderId={selectedOrderId}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default ListOrders;
