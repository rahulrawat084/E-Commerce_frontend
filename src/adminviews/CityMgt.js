import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./City.css";
import "./AdminResponsive.css";

function CityMgt() {
  const [ctid, setCtId] = useState("");
  const [ctname, setCtName] = useState("");
  const [stid, setStId] = useState("");
  const [status, setStatus] = useState("");
  const [ctlist, setCtList] = useState([]);
  const [stlist, setStList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/state/show`)
      .then((res) => setStList(res.data))
      .catch((err) => alert(err));
  }, []);

  const stateNameMap = useMemo(() => {
    const map = {};
    stlist.forEach((item) => {
      map[item.stid] = item.stname;
    });
    return map;
  }, [stlist]);

  const resetForm = () => {
    setCtId("");
    setCtName("");
    setStId("");
    setStatus("");
  };

  const handleAddNewButton = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/city/getall`)
      .then((res) => {
        setCtId(res.data.length + 1);
        setStatus(1);
      })
      .catch((err) => alert(err));
  };

  const handleSaveButton = () => {
    if (!ctid || !ctname || !stid || !status || stid === "0") {
      alert("PLEASE FILL ALL FIELDS");
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/city/searchbyname/${ctname}`)
      .then((res) => {
        if (res.data.ctname !== undefined) {
          alert("CITY NAME ALREADY EXISTS");
          return;
        }

        const obj = { ctid, ctname, stid, status };
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/city/save/`, obj)
          .then((saveRes) => {
            alert(saveRes.data);
            resetForm();
          })
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));
  };

  const handleShowButton = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/city/getall/`)
      .then((res) => setCtList(res.data))
      .catch((err) => alert(err));
  };

  const handleSearchButton = () => {
    if (ctid) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/city/search/${ctid}`)
        .then((res) => {
          if (res.data.stid !== undefined) {
            setCtId(res.data.ctid);
            setCtName(res.data.ctname);
            setStId(res.data.stid);
            setStatus(res.data.status);
          } else {
            alert("DATA NOT FOUND");
          }
        })
        .catch((err) => alert(err));
      return;
    }

    if (ctname) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/city/searchbyname/${ctname}`)
        .then((res) => {
          if (res.data.stid !== undefined) {
            setCtId(res.data.ctid);
            setCtName(res.data.ctname);
            setStId(res.data.stid);
            setStatus(res.data.status);
          } else {
            alert("DATA NOT FOUND");
          }
        })
        .catch((err) => alert(err));
    }
  };

  const handleUpdateButton = () => {
    if (!ctid || !ctname || !stid || !status) {
      alert("PLEASE FILL ALL FIELDS");
      return;
    }

    const obj = { ctid, ctname, stid, status };
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/city/update/`, obj)
      .then((res) => {
        alert(res.data);
        resetForm();
      })
      .catch((err) => alert(err));
  };

  const handleDeleteButton = () => {
    if (!ctid) {
      alert("FILL CITY ID TO DELETE");
      return;
    }

    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/city/delete/${ctid}`)
      .then((res) => alert(res.data))
      .catch((err) => alert(err));
  };

  return (
    <div className="admin-screen-shell">
      <center>
        <h6 className="cityTitle_guru admin-screen-title">CITY MANAGEMENT</h6>

        <div className="cityContainer_guru admin-card-panel">
          <div className="cityFormGrid_guru">
            <div className="cityField_guru">
              <label className="cityLabel_guru">CITY ID</label>
              <input
                type="number"
                onChange={(e) => setCtId(e.target.value)}
                value={ctid}
                className="cityInput_guru"
              />
            </div>

            <div className="cityField_guru">
              <label className="cityLabel_guru">CITY NAME</label>
              <input
                type="text"
                onChange={(e) => setCtName(e.target.value)}
                value={ctname}
                className="cityInput_guru"
              />
            </div>

            <div className="cityField_guru">
              <label className="cityLabel_guru">STATE NAME</label>
              <select onChange={(e) => setStId(e.target.value)} value={stid} className="citySelect_guru">
                <option value="0">SELECT STATE</option>
                {stlist.map((item) => (
                  <option value={item.stid} key={item.stid}>
                    {item.stname}
                  </option>
                ))}
              </select>
            </div>

            <div className="cityField_guru">
              <label className="cityLabel_guru">STATUS</label>
              <input
                type="text"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="cityInput_guru"
              />
            </div>
          </div>

          <div className="admin-actions-row">
            <button onClick={handleAddNewButton} className="cityBtnNew_guru">NEW</button>
            <button onClick={handleSaveButton} className="cityBtnSave_guru">SAVE</button>
            <button onClick={handleShowButton} className="cityBtnShow_guru">SHOW</button>
            <button onClick={handleSearchButton} className="cityBtnSearch_guru">SEARCH</button>
            <button onClick={handleUpdateButton} className="cityBtnUpdate_guru">UPDATE</button>
            <button onClick={handleDeleteButton} className="cityBtnDelete_guru">DELETE</button>
          </div>
        </div>

        <div className="cityTableContainer_guru admin-card-panel admin-table-wrap">
          <table className="cityDataTable_guru admin-data-table city-data-table">
            <thead>
              <tr>
                <th>CITY ID</th>
                <th>CITY NAME</th>
                <th>STATE NAME</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {ctlist.map((item) => (
                <tr key={item.ctid}>
                  <td className="city-mobile-id">{item.ctid}</td>
                  <td className="city-mobile-name">{item.ctname}</td>
                  <td className="city-mobile-state">{stateNameMap[item.stid] || "-"}</td>
                  <td className="city-mobile-status">{item.status === 1 ? "enable" : "disable"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
}

export default CityMgt;
