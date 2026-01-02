// src/pages/Login.tsx
import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "@/api/AuthApi";

type Errors = {
  email?: string;
  password?: string;
};

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const newErrors: Errors = {};

    if (!form.email) newErrors.email = "Email không được để trống";
    if (!form.password) newErrors.password = "Password không được để trống";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const user = await AuthApi.login({
        email: form.email,
        password: form.password,
      });

      // 🚫 CHỈ CHO ADMIN
      if (user.role !== "ADMIN") {
        alert("Chỉ ADMIN mới được phép đăng nhập");
        return;
      }

      // ✅ Lưu user
      localStorage.setItem("user", JSON.stringify(user));

      alert("Đăng nhập ADMIN thành công 🎉");

      navigate("/listOrder");
    } catch (err: any) {
      alert(err?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">
          Đăng nhập
        </h2>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Nhập email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Nhập mật khẩu"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
          />

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </div>

        <p className="text-center text-sm mt-4">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-red-500 font-medium">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
