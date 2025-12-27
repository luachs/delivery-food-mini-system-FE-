import React from "react";
import logo from "@/assets/logo.png";
const Header = () => {
  return (
    <div>
      <div className="bg-primary h-[66px] flex items-center justify-center">
        <div className="container">
          <img src={logo} alt="logo" className="h-15" />
        </div>
      </div>
    </div>
  );
};

export default Header;
