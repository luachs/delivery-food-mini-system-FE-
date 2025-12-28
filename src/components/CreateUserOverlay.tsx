import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";

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
    location: "",
    status: "available" as Status,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [animate, setAnimate] = useState(false);

  const isDriver = mode === "driver";

  const title = isDriver ? "Tạo tài xế mới" : "Tạo nhà hàng mới";
  const submitText = isDriver ? "Tạo tài xế" : "Tạo nhà hàng";

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

  const handleSubmit = () => {
    const newErrors: string[] = [];

    if (!form.name.trim()) newErrors.push("Tên không được để trống");
    if (!form.email.trim()) newErrors.push("Email không được để trống");
    if (!form.location.trim()) newErrors.push("Địa chỉ không được để trống");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("CREATE ACCOUNT:", {
      type: mode,
      ...form,
    });

    alert(
      mode === "driver"
        ? "Tạo tài xế mới thành công"
        : "Tạo nhà hàng mới thành công"
    );

    setForm({
      name: "",
      email: "",
      location: "",
      status: "available",
    });

    setErrors([]);
    onClose();
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
        `}
      >
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
            label="username"
            placeholder="username"
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
            label="Địa chỉ"
            placeholder="Nhập địa chỉ / tọa độ"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />

          {isDriver && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Trạng thái</label>
              <select
                className="border rounded-md px-3 py-2 text-sm outline-none focus:shadow-xl"
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserOverlay;
