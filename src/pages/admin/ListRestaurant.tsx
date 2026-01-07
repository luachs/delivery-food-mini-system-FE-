import CreateUserOverlay from "@/components/CreateUserOverlay";
import RestaurantDetailOverlay from "@/components/RestaurantDetailOverlay";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useRestaurantStore } from "@/store/restaurantStore";
import EditUserOverlay from "@/components/EditUserOverlay";
import Navbar from "@/components/Navbar";

/* =======================
   TYPES
======================= */

type RestaurantStatus = "AVAILABLE" | "LOCKED";

type Restaurant = {
  ID: number;
  name: string;
  address: string;
  phone: string;
  restaurantStatus: RestaurantStatus;
};

/* =======================
   STATUS MAPPER
======================= */

const RESTAURANT_STATUS_LABEL: Record<RestaurantStatus, string> = {
  AVAILABLE: "Đang hoạt động",
  LOCKED: "Ngừng hoạt động",
};

const RESTAURANT_STATUS_STYLE: Record<RestaurantStatus, string> = {
  AVAILABLE: "bg-green-100 text-green-700 border-green-200",
  LOCKED: "bg-red-100 text-red-700 border-red-200",
};

/* =======================
   COMPONENT
======================= */

const ListRestaurant = () => {
  const restaurants = useRestaurantStore((state) => state.restaurants);
  const [editId, setEditId] = useState<number | null>(null);

  const blockRestaurant = useRestaurantStore((state) => state.blockRestaurant);
  const fetchRestaurants = useRestaurantStore(
    (state) => state.fetchRestaurants
  );
  const loading = useRestaurantStore((state) => state.loading);

  const [openCreate, setOpenCreate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleBlockRestaurant = async (id: number) => {
    try {
      await blockRestaurant(id);
    } catch (err) {
      console.error("Lỗi khóa nhà hàng:", err);
    }
  };

  return (
    <div className="container mx-auto mt-[50px]">
      {/* Header */}
      <Navbar title="Danh sách Nhà hàng" />
      <div className="flex items-center justify-between mb-8">
        <div className="text-xl font-semibold text-gray-700">
          Tổng số lượng nhà hàng:{" "}
          <span className="font-bold">{restaurants.length}</span>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm">
          Thêm nhà hàng
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="max-h-[420px] overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="sticky top-0 z-10 border-b bg-gray-50 font-medium">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Địa chỉ</th>
                <th className="px-6 py-3">SĐT</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {restaurants.map((item) => (
                <tr
                  key={item.ID}
                  className="border-b last:border-b-0 hover:bg-gray-50">
                  {/* ID + view */}
                  <td className="px-6 py-4 font-medium">
                    {item.ID}
                    <FontAwesomeIcon
                      icon={faEye}
                      className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSelectedRestaurant(item);
                        setOpenDetail(true);
                      }}
                    />
                  </td>

                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4">{item.phone}</td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`
                        px-3 py-1.5 rounded-md text-xs font-semibold border
                        ${RESTAURANT_STATUS_STYLE[item.restaurantStatus]}
                      `}>
                      {RESTAURANT_STATUS_LABEL[item.restaurantStatus]}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-4 items-center">
                      <button
                        onClick={() => handleBlockRestaurant(item.ID)}
                        disabled={item.restaurantStatus === "LOCKED"}
                        className={`
                        px-4 py-1.5 rounded-md text-xs text-white
                        ${
                          item.restaurantStatus === "LOCKED"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }
                      `}>
                        Khóa
                      </button>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        onClick={() => setEditId(item.ID)}
                        className="text-xl hover:text-primary transition duration-300 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {restaurants.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Không có nhà hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overlays */}
      <CreateUserOverlay
        open={openCreate}
        mode="restaurant"
        onClose={() => setOpenCreate(false)}
      />
      {editId && (
        <EditUserOverlay
          open={true}
          mode="restaurant"
          userId={editId}
          onClose={() => setEditId(null)}
        />
      )}
      {selectedRestaurant && (
        <RestaurantDetailOverlay
          open={openDetail}
          restaurantId={selectedRestaurant.ID}
          onClose={() => setOpenDetail(false)}
        />
      )}
    </div>
  );
};

export default ListRestaurant;
