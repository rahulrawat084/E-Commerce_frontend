import React,{useState} from "react";
import axios from "axios";
import "./State.css";
import "./AdminResponsive.css";



  function StateMgt()
  {
    const [stid,setStId]= useState();
    const [stname,setStName]= useState();
    const [status,setStatus]= useState();
    const [stlist,setSList]= useState([]);
    const [isupdatestname,setIsUpdateStName]= useState(false);
    const [isupdatestatus,setIsUpdateStatus]= useState(false);


    const handleStIdText = (evt)=>{
         setStId(evt.target.value);
    }

     const handleStNameText = (evt)=>{
         setStName(evt.target.value);
    }

     const handleStatusText = (evt)=>{
         setStatus(evt.target.value);
    }
         
      const handleAddNewButton = ()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/state/getall`).then((res)=>{
            setStId(res.data.length+1);
            setStatus(1);
             }).catch((err)=>{
                 alert(err);
             });
      }

      const handleSaveButton=()=>{
        if(stid==""||stid ==undefined||stname==""||stname==undefined||status==""||status==undefined)
        {
            alert("PLEASE FILL ALL FEILDS");
            return;
        }
        else
        {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/state/searchbyname/${stname}`).then((res)=>{
                if(res.data.stname!=undefined)
                {
                    alert("STATE NAME ALREADY EXITS");
                }
                else
                {
                    let obj={
                        stid:stid,
                        stname:stname,
                        status:status
                    }

                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/state/save`,obj).then((res)=>{
                        alert(res.data);
                        setStId("");
                        setStName("");
                        setStatus("");
                    }).catch((err)=>{
                        alert(err);
                    });
                }
            }).catch((err)=>{
                alert(err);
            });
        }
      }

      const handleShowButton=()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/state/getall`).then((res)=>{
            setSList(res.data);
        }).catch((err)=>{
            alert(err);
        });
      }

       const handleSearchButton=()=>{
          if(stid!=undefined && stid!="")
          {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/state/search/${stid}`).then((res)=>{
                if(res.data.stid!=undefined)
                {
                    setStId(res.data.stid);
                    setStName(res.data.stname);
                    setStatus(res.data.status);
                }
                else
                {
                    alert("DATA NOT FOUND");
                }
            }).catch((err)=>{
                alert(err);
            });
          }
       }

       const handleUpdateButton=()=>{
        if(stid==""||stid==undefined||stname==""||stname==undefined||status==""||status==undefined)
        {
            alert("PLEASE FILL ALL FILEDS");
            return;
        }
        else
        {
            let obj={
                stid:stid,
                stname:stname,
                status:status
            }
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/state/update/`,obj).then((res)=>{
                alert(res.data);
                setStId("");
                setStName("");
                setStatus("");
            }).catch((err)=>{
                alert(err);
            });
        }
       }

       const handleDeleteButton=()=>{
        if(stid!=undefined&&stid!="")
        {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/state/delete/${stid}`).then((res)=>{
                alert(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }
        else
        {
            alert("FILL STATE ID TO DELETE")
        }
       }

       return (
  <div className="admin-screen-shell">
    <center>
      <h6 className="admin-screen-title">STATE MANAGMENT</h6>

      <div className="stateBox_guru admin-card-panel">
        <center>
          <div className="admin-form-wrap">
          <table className="admin-form-table">
            <tr>
              <td className="stateLabel_id_guru">STATE ID</td>
              <td>
                <input
                  type="number"
                  onChange={handleStIdText}
                  className="form-control"
                  value={stid}
                />
              </td>
            </tr>

            <tr>
              <td className="stateLabel_name_guru">STATE NAME</td>
              <td>
                <input
                  type="text"
                  onChange={handleStNameText}
                  className="form-control"
                  value={stname}
                />
              </td>
            </tr>

            <tr>
              <td className="stateLabel_status_guru">STATUS</td>
              <td>
                <input
                  type="text"
                  onChange={handleStatusText}
                  className="form-control"
                  value={status}
                />
              </td>
            </tr>

            <tr></tr>
            <tr></tr>
          </table>
          </div>

          <div className="admin-actions-row">
            <button type="submit" onClick={handleAddNewButton} className="btn-new_guru">NEW</button>
            <button type="submit" onClick={handleSaveButton} className="btn-save_guru">SAVE</button>
            <button type="submit" onClick={handleShowButton} className="btn-show_guru">SHOW</button>
            <button type="submit" onClick={handleUpdateButton} className="btn-update_guru">UPDATE</button>
            <button type="submit" onClick={handleDeleteButton} className="btn-delete_guru">DELETE</button>
          </div>
        </center>
      </div>

      <div className="stateBox_table_guru admin-card-panel admin-table-wrap">
        <center>
          <table className="admin-data-table state-data-table">
            <tr>
              <th className="stateCol_id_guru">STATE ID</th>
              <th className="stateCol_name_guru">STATE NAME</th>
              <th className="stateCol_status_guru">STATUS</th>
            </tr>

            {
              stlist.map((item) => (
                <tr key={item.stid}>
                  <td className="stateCol_id_guru state-mobile-id">{item.stid}</td>
                  <td className="stateCol_name_guru state-mobile-name">{item.stname}</td>
                  <td className="stateCol_status_guru state-mobile-status">
                    {item.status == 1 ? <h5>enable</h5> : <h5>disable</h5>}
                  </td>
                </tr>
              ))
            }
          </table>
        </center>
      </div>

    </center>
  </div>
);

}
export default StateMgt;


    //    return(
    //     <div>
    //         <center>
    //             <h6 style={{fontSize:"30px",color:"red",backgroundColor:"wheat"}}>STATE MANAGMENT</h6>
    //             <div className="myDiv">
    //               <center>
    //                 <table>
    //                     <tr>
    //                         <td className="stid">STATE ID</td>
    //                         <td>
    //          <input type="number" onChange={handleStIdText} className="form-control" value={stid}></input>
    //                         </td>
    //                     </tr>

    //                      <tr>
    //                         <td  className="stname" >STATE NAME</td>
    //                         <td>
    //       <input type="text" onChange={handleStNameText} className="form-control" value={stname}></input>
    //                         </td>
    //                     </tr>

    //                     <tr>
    //                         <td className="ststatus">STATUS</td>
    //                         <td>
    //  <input type="text" onChange={handleStatusText} className="form-control" value={status}></input>
    //                         </td>
    //                     </tr>

    //                     <tr></tr>
    //                     <tr></tr>

    //              </table>

    //              <table>
    //                 <tr>
    //                     <td>
    //            <button type="submit" onClick={handleAddNewButton} className="btn btn-primary">NEW</button>
    //                     </td>

    //                    <td>
    //      <button type="submit" onClick={handleSaveButton} className="btn btn-success">SAVE</button>
    //                     </td>

    //                      <td>
    //            <button type="submit" onClick={handleShowButton} className="btn btn-secondary">SHOW</button>
    //                     </td>

    //                      <td>
    //            <button type="submit" onClick={handleSearchButton} className="btn btn-success">SEARCH</button>
    //                     </td>

    //                      <td>
    //            <button type="submit" onClick={handleUpdateButton} className="btn btn-primary">UPDATE</button>
    //                     </td>

    //                      <td>
    //     <button type="submit" onClick={handleDeleteButton} className="btn btn-danger">DELETE</button>
    //                     </td>
    //                 </tr>
    //              </table>
    //               </center>
    //             </div>

    //             <div className="mydiv1">
    //             <center>
    //                 <table>
    //                     <tr>
    //                        <th className="stid">STATE ID</th>
    //                        <th className="stnam">STATE NAME</th>
    //                        <th className="ststatus">STATUS</th>
    //                         </tr>
    //                         {
    //                             stlist.map((item)=>(
    //                                 <tr>
    //                                     <td className="stid">{item.stid}</td>
    //                                     <td className="stname">{item.stname}</td>

    //                                     <td className="ststatus">
    //                                         {item.status==1 ? <h5>enable</h5>:<h5>disable</h5>}
    //                                     </td>
    //                                 </tr>
    //                             ))
    //                         }
    //                 </table>
    //             </center>
    //             </div>
    //         </center>
    //     </div>
    //    );
