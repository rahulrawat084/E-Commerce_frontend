
  import React,{useState,useEffect} from "react";
  import {useNavigate} from "react-router-dom";
  import { FaShoppingCart , FaUserEdit , FaBoxOpen,FaTruck,FaKey,FaSignOutAlt } from "react-icons/fa";
  import Customer_Change_Pass from "./Customer_Change_Pass";
  import ProductList from "../productviews/ProductList";
  import "./CustomerHome.css";

  import BillByID from "./BillByID";
    import OrderTracking from "./OrderTracking";

import EditCustomerProfile from "./EditCustomerProfile";

   function CustomerHome()
   {
    const [user,setUser] = useState(null);                
    const [isLoading, setIsLoading] = useState(false);
    const [isshowplist,setISShowPList]=useState(false);
    const [isshowbill,setIsShowBill] = useState(false);
    const [isEditProfile,setIsEditProfile]=useState(false);
    const [isChangePass,setIsChangePass]= useState(false);
    const[isshowordertracking,setIsShowOrderTracking] = useState(false);
  
  
    const navigate = useNavigate();


    useEffect(()=> {
        const localData =localStorage.getItem("userSession");
        const sessionData = sessionStorage.getItem("userSession");
        const userData = localData || sessionData;
        setUser(userData);  //  GET CUREENT USER INFO

         if(!userData)
         {
            alert("Session expired.Please log in again.");
          //  navigate("/customermain/customerlogin");
         }
         else
         {
            setUser(JSON.parse(userData));
         }
    },[]);

    const resetAll = () => {
        setISShowPList(false);
        setIsShowBill(false);
        setIsEditProfile(false);
        setIsChangePass(false);
        setIsShowOrderTracking(false);
    };

    //   UNIVERSAL LOADER TRIGGER

     const handleViewSwitch = (callback) =>{
        resetAll();
        setIsLoading(true);
        setTimeout(() => {
            callback();
            setIsLoading(false);
        }, 500); // SMOOTH ANIMATION DELAY
     };



       const handleLogout = ()=> {
         if(window.confirm("Are you sure you want to logout?"))
         {
             localStorage.removeItem("userSession");
            sessionStorage.removeItem("userSession");
            localStorage.removeItem("customertoken");
           navigate("/customermain/customerlogin");
         }
       };

       if(!user) return null;

     return (
  <div className="ch-container">
    <center style={{ marginTop: "20px" }}>
      {/* TOP BAR */}
      <header className="ch-topbar">

        {/* USER INFO */}
        <div className="ch-top-row1">
          <div className="ch-user-info">
            <img
              height={70}
              width={70}
              style={{ borderRadius: "50%" }}
              src={`http://localhost:9876/customer/getimage/${user.Cpicname}`}
              alt="Customer"
              className="ch-avatar"
            />
            <span className="ch-welcome-text">Welcome, {user.cfname}</span>
          </div>
        </div>

        {/* BUTTONS CENTERED */}
        <div className="ch-top-row2 ch-buttons-center">
          <button
            className="ch-icon-btn"
            onClick={() => handleViewSwitch(() => setIsEditProfile(true))}
          >
            <FaUserEdit /> Edit Profile
          </button>

          <button
            className="ch-icon-btn"
            onClick={() => handleViewSwitch(() => setISShowPList(true))}
          >
            <FaShoppingCart /> Shopping
          </button>

          <button
            className="ch-icon-btn"
            onClick={() => handleViewSwitch(() => setIsShowBill(true))}
          >
            <FaBoxOpen /> View Orders
          </button>

          <button
            className={`ch-icon-btn ${isshowordertracking ? "ch-active" : ""}`}
            onClick={() => handleViewSwitch(() => setIsShowOrderTracking(true))}
          >
            <FaTruck /> Track Orders
          </button>

          <button
            className={`ch-icon-btn ${isChangePass ? "ch-active" : ""}`}
            onClick={() => handleViewSwitch(() => setIsChangePass(true))}
          >
            <FaKey /> Change Password
          </button>

          <button className="ch-icon-btn ch-danger" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* LOADER */}
      {isLoading && (
        <div className="ch-loader-wrapper">
          <div className="ch-spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* CONTENT */}
      {!isLoading && (
        <div className="ch-content">
          {isshowplist && <ProductList data={user.Cid} />}
          {isshowbill && <BillByID data={user.Cid} />}

          
          {isEditProfile && (
            <EditCustomerProfile
              user={user}
              onClose={() => setIsEditProfile(false)}
              onUpdate={(updatedUser) => {
                const updatedSession = {
                  cfname: updatedUser.CustomerName,
                  cpicname: updatedUser.CPicName,
                  Cid: updatedUser.Cid,
                };
                setUser(updatedSession);

                if (localStorage.getItem("userSession")) {
                  localStorage.setItem(
                    "userSession",
                    JSON.stringify(updatedSession)
                  );
                } else {
                  sessionStorage.setItem(
                    "userSession",
                    JSON.stringify(updatedSession)
                  );
                }
              }}
            />
          )}

          {isshowordertracking && (
                        <div className="customer-card">
                            <OrderTracking
                                CUserId={user.Cid || user.CUserId}
                                onClose={() => setIsShowOrderTracking(false)}
                            />
                        </div>
                    )}

          {isChangePass && <div className="ch-card"></div>}
          {isChangePass && (
            <div className="ch-card">
              <Customer_Change_Pass
                Customer={user}
                onClose={() => setIsChangePass(false)}
              />
            </div>
          )}
        </div>
      )}

      {/* FOOTER MARQUEE LAST */}
      <footer className="ch-footer-marquee">
       {/* /* <marquee>www.BestOnlineShopingPlatform.com</marquee> */}
      </footer>
    </center>
  </div>
);
   }
   export default CustomerHome;


  //      return(
  //       <div className="customer-home">
  //         <center style={{marginTop:"20px"}}>
  //                 {/* TOP BARR */}
  //                 <header className="customer-topbar">

  //                   {/* ====TITLE + USER INFO === */}
  //                   <div className="topbar-row1">
  //                     <div className="customer-userinfo">
  //                          <img height={70} width={70} style={{borderRadius:"50%"}} src={`http://localhost:9876/customer/getimage/${user.Cpicname}`} alt="Customer" className="customer-avatar"></img>
  //                          <span className="customer-welcome">Welcome,{user.cfname}</span>
  //                     </div>

  //                   </div>

  //                        {/* ==== BUTTONS ==== */}
  //                        <div className="topbar-row-2" customer-buttons>
  //                           <button className="icon-btn" onClick={() => handleViewSwitch(() => setIsEditProfile(true))}>
  //                               <FaUserEdit/>Edit Profile
  //                           </button>

  //                           <button className="icon-btn" onClick={() => handleViewSwitch(() => setISShowPList(true))}>
  //                               <FaShoppingCart/> Shoping
  //                           </button>

  //                           <button className="icon-btn" onClick={() => handleViewSwitch(() => setIsShowBill(true))}>
  //                               <FaBoxOpen/> View Order
  //                           </button>

  //                           <button className={`icon-btn ${isshowordertracking ? "active" : ""}`} onClick={() => handleViewSwitch (()=> setIsShowOrderTracking(true))}>
  //                                  <FaTruck/> Track Orders
  //                           </button>

  //                           <button className={`icon-btn ${isChangePass ? "active" : "" }`} onClick={() => handleViewSwitch(() => setIsChangePass(true))}> 
  //                               <FaKey/>Change Password</button>
                            
  //                           <button className="icon-btn danger" onClick={handleLogout}><FaSignOutAlt/>Logout</button>
                         
  //                        </div>
  //                         </header>

  //                          {/* ====  LOADER ==== */}

  //                          {isLoading && (
  //                           <div className="loader-wrapper">
  //                               <div className="spinner"></div>
  //                               <p>Loading...</p>
  //                           </div>
  //                          )}

  //                         {/* ====  CONTENT ==== */}

  //                         {!isLoading && (
  //                           <div className="customer-content">
  //                                 {isshowplist && <ProductList data={user.Cid}/>}
  //                                 {/* {isshowbill && <BillByID data={user.Cid}/>} */}

  //                                 {isEditProfile && (
  //                                   <EditCustomerProfile user = {user} onClose={() => setIsEditProfile(false)} onUpdate={(updatedUser) => {
  //                                       const updatedSession ={
  //                                           cfname: updatedUser.CustomerName,
  //                                           cpicname:updatedUser.CPicName,
  //                                           Cid:updatedUser.Cid,
  //                                       };

  //                                       setUser(updatedSession);

  //                                       if(localStorage.getItem("userSession"))
  //                                       {
  //                                           localStorage.setItem("userSession", JSON.stringify(updatedSession));
  //                                       }
  //                                       else
  //                                       {
  //                                           sessionStorage.setItem("userSession",JSON.stringify(updatedSession));
  //                                       }
  //                                   }}
  //                                   />
  //                                 )}

  //                                 {isshowordertracking && (
  //                                    <div className="customer-card">
  //                                       {/* <OrderTracking CUserId = {user.Cid || user.CUserId} onClose ={() => setIsShowOrderTracking(false)} /> */}
  //                                           </div>
  //                                 )}

  //                                 {isChangePass && (
  //                                   <div className="customer-card"> <Customer_Change_Pass Customer={user} onClose={() => setIsChangePass(false)}/>
  //                                   </div>
  //                                 )}
  //                           </div>
  //                         )}

  //                         <footer className="footer-marquee">
  //                           <marquee>www.BestOnlineShopingPlatform.com</marquee>
  //                         </footer>
  //                         </center>
  //                         </div>
  //      )
  //  }
  //  export default CustomerHome;