// src/pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ❌ Xóa user đã đăng nhập
    localStorage.removeItem("user");

    // (nếu sau này có token thì xóa luôn)
    localStorage.removeItem("token");

    // Điều hướng về login
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
};

export default Logout;
