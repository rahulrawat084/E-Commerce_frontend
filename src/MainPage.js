import React, { useState } from "react";
import "./MainPage.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

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

// Icons
import { FaSun, FaMoon } from "react-icons/fa";

// Slider
import HeroSlider from "./components/HeroSlider.jsx";

function MainPage() {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") setMode("dark");
    else if (mode === "dark") setMode("accent");
    else setMode("light");
  };

  return (
    <BrowserRouter>
      <div className={`mainpage ${mode}`}>

        {/* ================= HEADER ================= */}
        <header className="main-header">
          <nav className="main-nav">

            {/* 🔥 WRAPPER (CSS ko touch kiye bina layout fix) */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* ===== LEFT : LOGO + NAME ===== */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
               <div
  style={{
    width: "58px",             
    height: "58px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #111, #444)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "18px",
    letterSpacing: "2px",       
  }}
>
  RWT
</div>


                <div style={{ lineHeight: "1.1" }}>
                 <div
  style={{
    fontSize: "24px",
    fontWeight: "800",
    color: "#c0392b",
    letterSpacing: "1px",
  }}
>
  Rawat_Shopy
</div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#555",
                    }}
                  >
  Trusted Online Shopping Hub
                  </div>
                </div>
              </div>

              {/* ===== RIGHT : NAV LINKS ===== */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                

                }}
              >
                <Link to="/">Home</Link> <span>|</span>
                <Link to="/adminmain">Admin</Link> <span>|</span>
                <Link to="/customermain">Customer</Link> <span>|</span>
                <Link to="/vendermain">Vender</Link>

                <button className="theme-toggle-btn" onClick={toggleMode}>
                  {mode === "light" ? <FaMoon /> : <FaSun />}
                </button>
              </div>
            </div>
          </nav>
        </header>

        {/* ================= ROUTES ================= */}
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <HeroSlider />
                <ProductListforMainPage />
              </>
            }
          />

          {/* ADMIN */}
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

          {/* CUSTOMER */}
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

          {/* VENDER */}
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

          {/* BILL */}
          <Route path="/bill" element={<Bill />} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default MainPage;









// import React, { useState } from "react";
// import "./MainPage.css";

// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link,
//   Navigate,
// } from "react-router-dom";

// import ProductListforMainPage from "./productviews/ProductlistforMainpage";
// import AdminLogin from "./adminviews/AdminLogin";
// import AdminHome from "./adminviews/AdminHome";
// import CustomerMain from "./customerviews/CustomerMain";
// import CustomerLogin from "./customerviews/CustomerLogin";
// import CustomerReg from "./customerviews/CustomerReg";
// import CustomerHome from "./customerviews/CustomerHome";
// import VenderLogin from "./venderviews/VenderLogin";
// import VenderReg from "./venderviews/VenderReg.js";
// import VenderHome from "./venderviews/VenderHome";
// import Bill from "./customerviews/Bill";
// import AdminProtectedRoute from "./components/AdminProtectedRoute";
// import AdminMain from "./adminviews/AdminMain";
// import VenderMain from "./venderviews/Vendermain.js";

// // Icons
// import { FaSun, FaMoon } from "react-icons/fa";

// // Slider
// import HeroSlider from "./components/HeroSlider.jsx";

// function MainPage() {
//   // Theme mode
//   const [mode, setMode] = useState("light");

//   const toggleMode = () => {
//     if (mode === "light") setMode("dark");
//     else if (mode === "dark") setMode("accent");
//     else setMode("light");
//   };

//   return (
//     <BrowserRouter>
//       <div className={`mainpage ${mode}`}>
//         {/* ================= HEADER ================= */}
//         <header className="main-header">
//           <nav className="main-nav">
//             <Link to="/">Home</Link> <span>|</span>
//             <Link to="/adminmain">Admin</Link> <span>|</span>
//             <Link to="/customermain">Customer</Link> <span>|</span>
//             <Link to="/vendermain">Vender</Link>

//             <button className="theme-toggle-btn" onClick={toggleMode}>
//               {mode === "light" ? <FaMoon /> : <FaSun />}
//             </button>
//           </nav>
//         </header>

//         {/* ================= ROUTES ================= */}
//         <Routes>
//           {/* ✅ HOME (Slider ONLY here) */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <HeroSlider />
//                 <ProductListforMainPage />
//               </>
//             }
//           />

//           {/* ================= ADMIN ================= */}
//           <Route path="/adminmain" element={<AdminMain />}>
//             <Route index element={<Navigate to="adminlogin" replace />} />
//             <Route path="adminlogin" element={<AdminLogin />} />
//             <Route
//               path="adminhome"
//               element={
//                 <AdminProtectedRoute role="admin">
//                   <AdminHome />
//                 </AdminProtectedRoute>
//               }
//             />
//           </Route>

//           {/* ================= CUSTOMER ================= */}
//           <Route path="/customermain" element={<CustomerMain />}>
//             <Route index element={<Navigate to="customerlogin" replace />} />
//             <Route path="customerlogin" element={<CustomerLogin />} />
//             <Route path="customerreg" element={<CustomerReg />} />
//             <Route
//               path="customerhome"
//               element={
//                 <AdminProtectedRoute role="customer">
//                   <CustomerHome />
//                 </AdminProtectedRoute>
//               }
//             />
//           </Route>

//           {/* ================= VENDER ================= */}
//           <Route path="/vendermain" element={<VenderMain />}>
//             <Route index element={<Navigate to="venderlogin" replace />} />
//             <Route path="venderlogin" element={<VenderLogin />} />
//             <Route path="venderreg" element={<VenderReg />} />
//             <Route
//               path="venderhome"
//               element={
//                 <AdminProtectedRoute role="vender">
//                   <VenderHome />
//                 </AdminProtectedRoute>
//               }
//             />
//           </Route>

//           {/* ================= BILL ================= */}
//           <Route path="/bill" element={<Bill />} />

//           {/* ================= FALLBACK ================= */}
//           <Route path="*" element={<Navigate to="/" replace />} />

          
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default MainPage;


















// import React, { useState } from "react";
// import "./MainPage.css";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Navigate,
//   BrowserRouter,
// } from "react-router-dom";

// import ProductListforMainPage from "./productviews/ProductlistforMainpage";
// import AdminLogin from "./adminviews/AdminLogin";
// import AdminHome from "./adminviews/AdminHome";
// import CustomerMain from "./customerviews/CustomerMain";
// import CustomerLogin from "./customerviews/CustomerLogin";
// import CustomerReg from "./customerviews/CustomerReg";
// import CustomerHome from "./customerviews/CustomerHome";
// import VenderLogin from "./venderviews/VenderLogin";
// import VenderReg from "./venderviews/VenderReg.js";
// import VenderHome from "./venderviews/VenderHome";
// import Bill from "./customerviews/Bill";
// import AdminProtectedRoute from "./components/AdminProtectedRoute";
// import AdminMain from "./adminviews/AdminMain";

// import VenderMain from "./venderviews/Vendermain.js";

// //  Icons import
// import { FaSun, FaMoon } from "react-icons/fa";
// import HeroSlider from "./components/HeroSlider.jsx";

// function MainPage() {
//    const productImages = [
//     "https://m.media-amazon.com/images/I/61BGE6iu4AL._SL1500_.jpg",
//     "https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg",
//     "https://m.media-amazon.com/images/I/61n8y0F9lXL._SL1500_.jpg",
//   ];
//   // Theme mode state
//   const [mode, setMode] = useState("light"); // light / dark / accent

//   const toggleMode = () => {
//     if (mode === "light") setMode("dark");
//     else if (mode === "dark") setMode("accent");
//     else setMode("light");
//   };

//   return (
//     <BrowserRouter>
//       {/* Add dynamic mode class */}
//       <div className={`mainpage ${mode}`}>
//         <header className="main-header">
//           <nav className="main-nav">
//             <Link to="/">Home</Link> <span>|</span>
//             <Link to="/adminmain">Admin</Link> <span>|</span>
//             <Link to="/customermain">Customer</Link> <span>|</span>
//             <Link to="/vendermain">Vender</Link>

//             {/* Theme toggle icon */}
//             <button className="theme-toggle-btn" onClick={toggleMode}>
//               {mode === "light" ? <FaMoon /> : mode === "dark" ? <FaSun /> : <FaMoon />}
//             </button>
//           </nav>
//         </header>
//         <HeroSlider/>
//          {/* <div style={{ padding: "40px" }}>
//       <ProductSlider images={productImages} />
//     </div> */}

//         <Routes>
//           {/* HOME */}  
//           <Route
//             path="/"
//             element={
//               <>
//                 <ProductListforMainPage />
//               </>
//             }
//           />

//           {/* ADMIN */}
//           <Route path="/adminmain" element={<AdminMain />}>
//             <Route index element={<Navigate to="adminlogin" replace />} />
//             <Route path="adminlogin" element={<AdminLogin />} />
//             <Route
//               path="adminhome"
//               element={
//                 <AdminProtectedRoute role="admin">
//                   <AdminHome />
//                 </AdminProtectedRoute>
//               }
//             />
//           </Route>

//           {/* CUSTOMER */}
//           <Route path="/customermain" element={<CustomerMain />}>
//             <Route index element={<Navigate to="customerlogin" replace />} />
//             <Route path="customerlogin" element={<CustomerLogin />} />
//             <Route path="customerreg" element={<CustomerReg />} />
//             <Route
//               path="customerhome"
//               element={
//                 <AdminProtectedRoute role="customer">
//                   <CustomerHome />
//                 </AdminProtectedRoute>
//               }
//             />
//           </Route>

//           {/* VENDER */}
//           <Route path="/vendermain" element={<VenderMain />}>
//             <Route index element={<Navigate to="venderlogin" replace />} />
//             <Route path="venderlogin" element={<VenderLogin />} />
//             <Route path="venderreg" element={<VenderReg />} />
//             <Route
//               path="venderhome"
//               element={
//                 <AdminProtectedRoute role="vender">
//                   <VenderHome />
//                 </AdminProtectedRoute>
//               }
//             />
//           </Route>

//           {/* VENDER PROTECTED */}
//           <Route
//             path="/manageproducts"
//             element={
//               <AdminProtectedRoute role="vender">
//                 {/* <ManageProduct /> */}
//               </AdminProtectedRoute>
//             }
//           />

//           {/* BILL */}
//           <Route path="/bill" element={<Bill />} />

//           {/* FALLBACK */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default MainPage;










