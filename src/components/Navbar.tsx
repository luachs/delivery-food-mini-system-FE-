import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  // 🔥 LẤY USER TỪ LOCAL STORAGE
  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

  const username = user?.name || "Guest";

  return (
    <div className="flex justify-between m-6 relative">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="relative">
        <div
          className="flex items-center gap-2 text-3xl cursor-pointer select-none"
          onClick={() => setOpen((prev) => !prev)}>
          <FontAwesomeIcon icon={faUserCircle} />
          <span>{username}</span>
        </div>

        {open && (
          <div className="absolute right-0 top-10 z-10">
            <Button variant="primary" onClick={() => navigate("/logout")}>
              Đăng xuất
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
