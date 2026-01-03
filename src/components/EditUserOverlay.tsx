import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import DriverApi from "@/api/DriverApi";
import RestaurantApi from "@/api/RestaurantApi";

type Mode = "driver" | "restaurant";

type Props = {
  open: boolean;
  mode: Mode;
  userId: number;
  onClose: () => void;
  onUpdated?: (data: any) => void;
};

const EditUserOverlay: React.FC<Props> = ({
  open,
  mode,
  userId,
  onClose,
  onUpdated,
}) => {
  const [visible, setVisible] = useState(open);
  const [animate, setAnimate] = useState(false);
  const isDriver = mode === "driver";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    lat: 0,
    lng: 0,
  });

  /* ================= Animation ================= */
  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300);
    }
  }, [open]);

  /* ================= Fetch Detail ================= */
  useEffect(() => {
    if (!open) return;

    const fetchDetail = async () => {
      const res = isDriver
        ? await DriverApi.getById(userId)
        : await RestaurantApi.getById(userId);

      setForm({
        name: res.name,
        email: res.email,
        phone: res.phone,
        address: res.address,
        lat: res.currentLat || res.lat || 0,
        lng: res.currentLng || res.lng || 0,
      });
    };

    fetchDetail();
  }, [open, userId]);

  if (!visible) return null;

  /* ================= Submit ================= */
  const handleSubmit = async () => {
    const payload = isDriver
      ? {
          name: form.name,
          phone: form.phone,
          address: form.address,
          currentLat: Number(form.lat),
          currentLng: Number(form.lng),
        }
      : {
          name: form.name,
          phone: form.phone,
          address: form.address,
          lat: Number(form.lat),
          lng: Number(form.lng),
        };

    const res = isDriver
      ? await DriverApi.update(userId, payload)
      : await RestaurantApi.update(userId, payload);

    onUpdated?.(res);
    onClose();
    alert("Cập nhật thành công ✅");
  };

  /* ================= Render ================= */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-black/40 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`
          relative w-full max-w-lg bg-white p-6 rounded-lg shadow-lg
          transition-all duration-300
          ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}>
        <h2 className="mb-6 text-xl font-semibold">
          {isDriver ? "Cập nhật tài xế" : "Cập nhật nhà hàng"}
        </h2>

        <div className="space-y-4">
          <Input
            label="Tên"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input label="Email" value={form.email} disabled />
          <Input
            label="SĐT"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            label="Địa chỉ"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <div className="flex gap-4">
            <Input
              label="Lat"
              value={form.lat}
              onChange={(e) =>
                setForm({ ...form, lat: Number(e.target.value) })
              }
            />
            <Input
              label="Lng"
              value={form.lng}
              onChange={(e) =>
                setForm({ ...form, lng: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-600 text-white px-4 py-2 rounded">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserOverlay;
