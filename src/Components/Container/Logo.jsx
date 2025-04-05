import React from "react";
import logo from "../../assets/logo.png";

const Logo = ({ width = "70px", height = "40px" }) => {
  return (
    <div className="flex items-center">
      <img
        src={logo}
        alt="Logo"
        style={{ width, height, objectFit: "contain" }}
      />
    </div>
  );
};

export default Logo;
