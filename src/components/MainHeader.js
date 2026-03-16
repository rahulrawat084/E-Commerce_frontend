import React from "react";
import { Link } from "react-router-dom";
import "./MainHeader.css";

function MainHeader() {
  return (
    <header className="main-header-bar">
      {/* LEFT SIDE : LOGO + NAME */}
      <div className="logo-section">
        <div className="logo-circle">R</div>

        <marquee className="logo-text" behavior="scroll" direction="left">
          Rawat_Shopy – Best Online Store
        </marquee>
      </div>

      {/* RIGHT SIDE : NAV LINKS */}
      {/* <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/customermain">Customer</Link>
        <Link to="/adminmain">Admin</Link>
      </nav> */}
    </header>
  );
}

export default MainHeader;
