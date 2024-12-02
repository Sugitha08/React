  import React, { useEffect, useState } from "react";
  import { API_URL } from "../API_URL/url";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";

  function Read() {
    const [userdata, setUserData] = useState([]);
    const navigate = useNavigate();

    const getdata = async () => {
      const resp = await axios.get(API_URL);
      setUserData(resp.data);     //data stands for the data in the mockapi
    };

    useEffect(() => {
      getdata();
    }, []);

    const redirecttologinpage = () => {
      navigate("/");
    };

    const handleDelete = async(id) =>{
        await axios.delete(API_URL+id)
        getdata();
    }

    const handleUpdate= (userdata) =>{
        localStorage.setItem('id',userdata.id);
        localStorage.setItem('username',userdata.username);
        localStorage.setItem('number',userdata.number);
        localStorage.setItem('email',userdata.email);
        localStorage.setItem('password',userdata.cpassword);
        localStorage.setItem('cpassword',userdata.password);
        localStorage.setItem('gender',userdata.gender);
        localStorage.setItem('nationality',userdata.nationality);
        localStorage.setItem('dob',userdata.dob);
        localStorage.setItem('lang',userdata.language)
        navigate('/update')
    }
    return (
      <div className="container mt-4" id="read">
        <div className="card p-4">
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={redirecttologinpage}
            >
              <i class="fa-solid fa-plus" style={{ fontWeight: 100 }}></i>
              &nbsp;NEW
            </button>
          </div>
          <hr/>
          <div className="row">
            <div className="col">
            <h3>Users List</h3>
            </div>
            <div className="col d-flex justify-content-center">
              <button className="btn clear"><i class="fa-solid fa-filter"></i>&nbsp;Clear</button>
            </div>
            <div className="col d-flex justify-content-end">
              <input className="form-control w-75" type="text" placeholder="&#xF002;&nbsp;Keyword Search"></input>
            </div>
          
          </div>
          <hr />
          <div> 
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>UserName</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userdata.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.number}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.gender}</td>
                    <td>
                      <button className="btn btn-danger me-2" type="button" onClick={()=>{handleDelete(user.id)}}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button type="button" className="btn btn-warning" onClick={()=>handleUpdate(user)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  export default Read;
