import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons/faUtensils";

const Sidebar: React.FC = () => {
  const itemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-1 rounded-md cursor-pointer transition duration-100
     ${isActive ? "bg-primary text-white" : "hover:bg-gray-200"}`;

  return (
    <div className="pt-8 px-5">
      <h2 className="font-bold">Admin</h2>

      <NavLink to="/listOrder" className={itemClass}>
        <FontAwesomeIcon icon={faHouse} />
        <span>Danh sách đơn hàng</span>
      </NavLink>
      <NavLink to="/listRestaurant" className={itemClass}>
        <FontAwesomeIcon icon={faUtensils} />
        <span>Danh sách nhà hàng</span>
      </NavLink>
      <NavLink to="/listDriver" className={itemClass}>
        <FontAwesomeIcon icon={faMotorcycle} />
        <span>Danh sách tài xế</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
