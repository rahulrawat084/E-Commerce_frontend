import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StateMgt from "./StateMgt";
import CityMgt from "./CityMgt";
import ProductCatMgt from "./ProductCatgMgt";
import VenderMgt from "./VenderMgt";
import ShowBills from "./ShowBills";
import ProductList from "./ProductList";
import CustomerMgt from "./CustomerMgt";
import UpdateOrderStatus from "./UpdateOrderStatus";
import AdminVenderSales from "./AdminVendorSales";
import "./AdminHome.css";

function AdminHome() {
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();

  const toggleSection = (sectionName) => {
    setActiveSection((prev) => (prev === sectionName ? "" : sectionName));
  };

  const logOutButtonClick = () => {
    localStorage.removeItem("admintoken");
    navigate("/adminmain/adminlogin");
  };

  return (
    <div className="AdimHome">
      <center>
        <h4>Admin DashBoard</h4>

        <div className="admin-dashboard-panel">
          <button onClick={() => toggleSection("state")} className={activeSection === "state" ? "admin-active-btn" : ""}>
            State
          </button>

          <button onClick={() => toggleSection("city")} className={activeSection === "city" ? "admin-active-btn" : ""}>
            City
          </button>

          <button onClick={() => toggleSection("category")} className={activeSection === "category" ? "admin-active-btn" : ""}>
            Category
          </button>

          <button onClick={() => toggleSection("vender")} className={activeSection === "vender" ? "admin-active-btn" : ""}>
            Vender
          </button>

          <button onClick={() => toggleSection("bills")} className={activeSection === "bills" ? "admin-active-btn" : ""}>
            Bills
          </button>

          <button onClick={() => toggleSection("order-status")} className={activeSection === "order-status" ? "admin-active-btn" : ""}>
            Order Status
          </button>

          <button onClick={() => toggleSection("product")} className={activeSection === "product" ? "admin-active-btn" : ""}>
            Product
          </button>

          <button onClick={() => toggleSection("customer")} className={activeSection === "customer" ? "admin-active-btn" : ""}>
            Customer
          </button>

          <button onClick={() => toggleSection("vender-sales")} className={activeSection === "vender-sales" ? "admin-active-btn" : ""}>
            Vender Sales
          </button>

          <button onClick={logOutButtonClick} className="BUTTONlogout">
            Logout
          </button>
        </div>

        <div className="admin-section-shell">
          {activeSection === "state" && <StateMgt />}
          {activeSection === "city" && <CityMgt />}
          {activeSection === "category" && <ProductCatMgt />}
          {activeSection === "vender" && <VenderMgt />}
          {activeSection === "bills" && <ShowBills />}
          {activeSection === "product" && <ProductList />}
          {activeSection === "customer" && <CustomerMgt />}
          {activeSection === "order-status" && <UpdateOrderStatus updateByName="Admin" />}
          {activeSection === "vender-sales" && <AdminVenderSales />}
        </div>
      </center>
    </div>
  );
}

export default AdminHome;
