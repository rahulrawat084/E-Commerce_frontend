
  import React from "react";
   import { Link,Outlet,useLocation } from "react-router-dom";
   import "./VenderMain.css";
//    import sellerHero from "./SellerHero";

   function VenderMain()
   {
    const location = useLocation();
    const currentPath = location.pathname.replace(/\/$/,"");

    const  hideHero = currentPath === "/vendermain/venderlogin" || currentPath === "/vendermain/venderreg";

    return(
        <div className="vendermain">
            <center>
            <nav className="vender-nav">
      <ul>
        <li>
                    <Link to="/vendermain/venderlogin">Login</Link>

        </li>
        <li>
        <Link to="/vendermain/venderreg">Registration</Link>
               </li>
      </ul>
            </nav>

                {/* <h2 className="venddermain">Vender panel</h2> */}

                 {/* SHOW HERO OR LOGIN/Registration,NEVER BOTH */}

                 {
                    hideHero ? (
                        <div className="vendermainout">
                            <Outlet/>
                        </div>

                    ) : (
                        <sellerHero/>

                    )} 
                    </center>
        </div>
    )
   }
   export default VenderMain;
