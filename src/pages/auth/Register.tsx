// src/pages/Register.tsx
import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

type Errors = {
  username?: string;
  email?: string;
  password?: string;
};

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const newErrors: Errors = {};

    if (!form.username) newErrors.username = "Username không được để trống";
    if (!form.email) newErrors.email = "Email không được để trống";
    if (!form.password) newErrors.password = "Password không được để trống";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("REGISTER:", form);
    // TODO: call API register
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">
          Đăng ký
        </h2>

        <div className="space-y-4">
          <Input
            label="Username"
            placeholder="Nhập username"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            error={errors.username}
          />

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

          <Button className="w-full">Đăng ký</Button>
        </div>

        <p className="text-center text-sm mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-red-500 font-medium">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
