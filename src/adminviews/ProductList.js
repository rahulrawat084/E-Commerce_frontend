  //     CODE FOR PRODUCT LIST VIEW FOR ADMIN MANAGE PRODUCTS ACTIVE/INACTIVE WITHOUT ACTIVATION PRODUCT PURCHASE OPTION WILL BE NOT AVAILABLE FOR CUSTOMER TO BUY PRODUCT.

   import React,{useEffect,useState} from "react";
   import axios from "axios";
   import ReactDOM from "react-dom/client";
   import Bill from "../customerviews/Bill";
   import "./ProductList.css";
   import "./AdminSections.css";
    function ProductList(props)
    {
         const [itemcount,setItemCount] = useState(0);
         const [selitems,setSelItems] = useState([]);
         const [pcatglist,setPCatgList] = useState([]);
         const [plist,setPList] = useState([]);
         const [vlist,setVList] = useState([]);

         let cname="";

         useEffect(() => {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/showproduct`).then((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);
            });

            axios.get(`${process.env.REACT_APP_BACKEND_URL}/productcatg/showproductcatg`).then((res) => {
                setPCatgList(res.data);
            }).catch((err) => {
                 alert(err);
            });
        

                // GET VENDER

                axios.get(`${process.env.REACT_APP_BACKEND_URL}/vender/getvendercount`).then((res) => {
                    setVList(res.data);
                }).catch((err)=> {
                    alert(err);
                })
                 },[]);

                 const handleActiveButton=(evt) => {
                    let pid=parseInt(evt);
                    let status="Active";
                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/product/updateproductstatus/`+pid+"/"+status).then((res) => {
                      alert("Product Status Updated");
                 }).catch((err) => {
                    alert(err);
                 });
                 }

                 const handleInactiveButton=(evt) =>{
                 let pid=parseInt(evt);
                    let status="Inactive";
                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/product/updateproductstatus/`+pid+"/"+status).then((res) => {
                      alert("Product Status Updated");
                 }).catch((err) => {
                    alert(err);
                 }); 
                 }

                 const handleCheckOutButton=()=>{
                    alert("Hello");
                    if(selitems.length<=0)
                    {
                        alert("Please Buy Some Product");
                    }
                    else
                    {
                        const root=ReactDOM.createRoot(document.getElementById("root"));

                        let ccid=props.data;
                        let obj = {
                            selitems:selitems,
                        cid:ccid
                        };

                        root.render(<Bill data={obj}></Bill>)
                    }
                 }

                 const handleSearch=(evt)=>{
                    if(evt.target.value>0)
                    {
                        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/showproductbycatgid/`+evt.target.value).then((res)=>{
                            setPList(res.data);
                        }).catch((err)=>{
                            alert(err);
                        });
                    }
                    else
                    {
                       axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/showproduct`).then((res)=>{
                            setPList(res.data);
                        }).catch((err)=>{
                            alert(err);
                        }); 
                    }
                 }

                 // PRODUCT SEARCH BY VENDER

                 const handleSearchByVender=(evt) => {
                    if(evt.target.value>0)
                    {
                        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/showproductbyvender/`+evt.target.value).then((res) => {
                            setPList(res.data);
                        }).catch((err)=> {
                            alert(err);
                        });
                    }
                    else
                    {
                         axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/showproduct`).then((res) => {
                            setPList(res.data);
                        }).catch((err)=> {
                            alert(err);
                        });
                    }
                 }
                    // PRODUCT SEARCH BY STATUS
                  
                      const handleSearchByStatus=(evt) => {
                    if(evt.target.value!=="0")
                    { 
                        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/showproductstatus/`+evt.target.value).then((res) => {
                            setPList(res.data);
                        }).catch((err)=> {
                            alert(err);
                        });
                    }
                    else
                    {
                         axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/showproduct`).then((res) => {
                            setPList(res.data);
                        }).catch((err)=> {
                            alert(err);
                        });
                    }
                 }

                 return(
                    <div className="ProDiv admin-section-card">
                       <center>
                       <h1> Search By Category </h1>
                        <div className="admin-filter-row">
                        <select onClick={handleSearch}>
                            <option value="0">All</option>
                            {
                                pcatglist.map((pcatgitem) => (
                                    <option key={pcatgitem.pcatgid} value={pcatgitem.pcatgid}>{pcatgitem.pcatgname}</option>
                                ))
                            }
                        </select>

                        <p>
                            Search By Vender <select onClick={handleSearchByVender}>
                                <option value="0">All</option>
                                {
                                   vlist.map((vitem) =>(
                                    <option   key={vitem.Vid} value={vitem.Vid}>{vitem.VenderName}</option>
                                   ))
                                }
                            </select>
                        </p>


                        <p>
                            Search By Status <select onClick={handleSearchByStatus}>
                                <option value="0">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </p>
                        </div>

                      <p style={{backgroundColor:"green",color:"white"}}>Product List</p> 
                      <div className="admin-table-scroll">
                      <table border={1} className="borrdrer">
                        <thead>
                        <tr >
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Offer Price</th>
                            <th>Category</th>
                            <th>Photo</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            plist.map((item) => (
                                <tr  key={item.pid}>
                                    <td>{item.pid}</td>
                                    <td>{item.pname}</td>
                                    <td>{item.pprice}</td>
                                    <td>{item.oprice}</td>

                                    <td>
                                        {
                                            pcatglist.map((citem)=>{
                                                if(item.pcatgid==citem.pcatgid)
                                                {
                                                    cname=citem.pcatgname;
                                                }
                                                 })
                                        }
                                        {cname}
                                    </td>

                              <td>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/product/getproductimage/`+item.ppicname} height="100" width="100"></img>
                                </td>      

                                <td>{item.status}</td>
                                <td>
                                    <button type="submit" onClick={() => handleActiveButton(item.pid)}>Active</button>
                                    <span></span>
                                <button type="submit" onClick={() => handleInactiveButton(item.pid)}>Inactive</button>
                                    </td>
                                </tr>
                            
                            ))
                        }
                        </tbody>
                        </table>
                        </div>
                       </center>
                    </div>
                 );
   
                }

                export default ProductList;
