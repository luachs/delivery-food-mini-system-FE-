import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import userApi from "@/api/userApi";
import { useDriverStore } from "@/store/driverStore";
import { useRestaurantStore } from "@/store/restaurantStore";

type Mode = "driver" | "restaurant";
type Status = "available" | "busy" | "offline";

type Props = {
  open: boolean;
  mode: Mode;
  onClose: () => void;
};

const CreateUserOverlay: React.FC<Props> = ({ open, mode, onClose }) => {
  const [visible, setVisible] = useState(open);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    lat: 0,
    lng: 0,
    status: "available" as Status,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [animate, setAnimate] = useState(false);

  const isDriver = mode === "driver";

  const title = isDriver ? "Tạo tài xế mới" : "Tạo nhà hàng mới";
  const submitText = isDriver ? "Tạo tài xế" : "Tạo nhà hàng";
  const addDriver = useDriverStore((state) => state.addDriver);
  const addRestaurant = useRestaurantStore((state) => state.addRestaurant);
  /* ================= Animation Control ================= */
  useEffect(() => {
    if (open) {
      setVisible(true);

      const id = setTimeout(() => {
        setAnimate(true);
      }, 10);

      return () => clearTimeout(id);
    } else {
      setAnimate(false);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!visible) return null;

  /* ================= Handlers ================= */
  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const newErrors: string[] = [];

    if (!form.name.trim()) newErrors.push("Tên không được để trống");
    if (!form.email.trim()) newErrors.push("Email không được để trống");

    if (isDriver) {
      if (!form.phone.trim())
        newErrors.push("Số điện thoại không được để trống");
      if (!form.address.trim()) newErrors.push("Địa chỉ không được để trống");
      if (!form.lat || isNaN(Number(form.lat)))
        newErrors.push("Latitude không hợp lệ");
      if (!form.lng || isNaN(Number(form.lng)))
        newErrors.push("Longitude không hợp lệ");
    } else {
      if (!form.phone.trim())
        newErrors.push("Số điện thoại không được để trống");
      if (!form.address.trim()) newErrors.push("Địa chỉ không được để trống");
      if (!form.lat || isNaN(Number(form.lat)))
        newErrors.push("Latitude không hợp lệ");
      if (!form.lng || isNaN(Number(form.lng)))
        newErrors.push("Longitude không hợp lệ");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (!isDriver) {
        // ===== RESTAURANT (GIỮ NGUYÊN) =====
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          lat: Number(form.lat),
          lng: Number(form.lng),
          role: "RESTAURANT",
        };

        const res = await userApi.signup(payload);
        addRestaurant(res); // 👈 update list ngay
        onClose();
        alert("Tạo nhà hàng mới thành công 🎉");
      } else {
        // ===== DRIVER (THÊM MỚI) =====
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          currentLat: Number(form.lat),
          currentLng: Number(form.lng),
          role: "DRIVER",
          vehicleType: "Motorbike",
        };

        const res = await userApi.signup(payload);
        addDriver(res);
        console.log(res);
        alert("Tạo tài xế mới thành công 🎉");
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        lat: 0,
        lng: 0,
        status: "available",
      });

      setErrors([]);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Tạo thất bại ❌");
    }
  };

  /* ================= Render ================= */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg
          transform transition-all duration-300 ease-out
          ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}>
        {/* Header */}
        <h2 className="mb-6 text-2xl font-semibold">{title}</h2>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {errors.map((e, i) => (
              <div key={i}>• {e}</div>
            ))}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <Input
            label="Tên"
            placeholder={isDriver ? "Tên tài xế" : "Tên nhà hàng"}
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Nhập email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <Input
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />

          <div className="flex gap-7">
            <Input
              className="w-[220px]"
              label="Latitude"
              placeholder="Nhập toạ độ x"
              value={form.lat}
              onChange={(e) => handleChange("lat", e.target.value)}
            />

            <Input
              className="w-[220px]"
              label="Longitude"
              placeholder="Nhập toạ độ y"
              value={form.lng}
              onChange={(e) => handleChange("lng", e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100">
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserOverlay;
