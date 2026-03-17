import React, { useState } from "react";
import "./MainPage.css";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import ProductListforMainPage from "./productviews/ProductlistforMainpage";
import AdminLogin from "./adminviews/AdminLogin";
import AdminHome from "./adminviews/AdminHome";
import CustomerMain from "./customerviews/CustomerMain";
import CustomerLogin from "./customerviews/CustomerLogin";
import CustomerReg from "./customerviews/CustomerReg";
import CustomerHome from "./customerviews/CustomerHome";
import VenderLogin from "./venderviews/VenderLogin";
import VenderReg from "./venderviews/VenderReg.js";
import VenderHome from "./venderviews/VenderHome";
import Bill from "./customerviews/Bill";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminMain from "./adminviews/AdminMain";
import VenderMain from "./venderviews/Vendermain.js";
import HeroSlider from "./components/HeroSlider.jsx";

function MainPage() {
  const [mode, setMode] = useState("light");
  const [navOpen, setNavOpen] = useState(false);

  const toggleMode = () => {
    if (mode === "light") setMode("dark");
    else if (mode === "dark") setMode("accent");
    else setMode("light");
  };

  return (
    <HashRouter>
      <div className={`mainpage ${mode}`}>
        <header className="main-header">
          <nav className="main-nav">
            <div className="main-nav-shell">
              <div className="main-brand">
                <div className="main-brand-mark">RWT</div>
                <div className="main-brand-copy">
                  <div className="main-brand-title">Rawat_Shopy</div>
                  <div className="main-brand-tagline">Trusted Online Shopping Hub</div>
                </div>
              </div>

              <div className="main-nav-actions">
                <button
                  className="main-nav-toggle"
                  onClick={() => setNavOpen((prev) => !prev)}
                  aria-label="Toggle navigation"
                  aria-expanded={navOpen}
                >
                  {navOpen ? <FaTimes /> : <FaBars />}
                </button>

                <button className="theme-toggle-btn theme-toggle-desktop" onClick={toggleMode}>
                  {mode === "light" ? <FaMoon /> : <FaSun />}
                </button>
              </div>

              <div className={`main-nav-links ${navOpen ? "main-nav-links-open" : ""}`}>
                <Link to="/" onClick={() => setNavOpen(false)}>Home</Link>
                <span>|</span>
                <Link to="/adminmain" onClick={() => setNavOpen(false)}>Admin</Link>
                <span>|</span>
                <Link to="/customermain/customerlogin" onClick={() => setNavOpen(false)}>Customer</Link>
                <span>|</span>
                <Link to="/vendermain" onClick={() => setNavOpen(false)}>Vender</Link>
                <button className="theme-toggle-btn theme-toggle-mobile" onClick={toggleMode}>
                  {mode === "light" ? <FaMoon /> : <FaSun />}
                </button>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSlider />
                <ProductListforMainPage />
              </>
            }
          />

          <Route path="/adminmain" element={<AdminMain />}>
            <Route index element={<Navigate to="adminlogin" replace />} />
            <Route path="adminlogin" element={<AdminLogin />} />
            <Route
              path="adminhome"
              element={
                <AdminProtectedRoute role="admin">
                  <AdminHome />
                </AdminProtectedRoute>
              }
            />
          </Route>

          <Route path="/customermain" element={<CustomerMain />}>
            <Route index element={<Navigate to="customerlogin" replace />} />
            <Route path="customerlogin" element={<CustomerLogin />} />
            <Route path="customerreg" element={<CustomerReg />} />
            <Route
              path="customerhome"
              element={
                <AdminProtectedRoute role="customer">
                  <CustomerHome />
                </AdminProtectedRoute>
              }
            />
          </Route>

          <Route path="/vendermain" element={<VenderMain />}>
            <Route index element={<Navigate to="venderlogin" replace />} />
            <Route path="venderlogin" element={<VenderLogin />} />
            <Route path="venderreg" element={<VenderReg />} />
            <Route
              path="venderhome"
              element={
                <AdminProtectedRoute role="vender">
                  <VenderHome />
                </AdminProtectedRoute>
              }
            />
          </Route>

          <Route path="/bill" element={<Bill />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default MainPage;
