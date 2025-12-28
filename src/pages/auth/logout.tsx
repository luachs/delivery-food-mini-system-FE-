// src/pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: clear token, localStorage
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
