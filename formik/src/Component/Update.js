import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../API_URL/url";
import { useNavigate } from "react-router-dom";

function Update() {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    dob: "",
    password: "",
    cpassword: "",
    number: "",
    language: [],
    nationality: "",
    gender: false,
  });
  const [showPassword, setShowpassword] = useState(false);
  const [showCPassword, setShowCpassword] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    setFormData({
      id: localStorage.getItem("id"),
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      dob: localStorage.getItem("dob"),
      password: localStorage.getItem("password"),
      cpassword: localStorage.getItem("cpassword"),
      number: localStorage.getItem("number"),
      gender: localStorage.getItem("gender"),
      nationality: localStorage.getItem("nationality"),
      language: localStorage.getItem("lang"),
    });
  }, []);
  const handleUpdate = async () => {
    await axios.put(API_URL + formData.id, formData);
    Navigate("/read");
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      language: checked
        ? [...prevData.language, value]
        : prevData.language.filter((data) => data !== value),
    }));
  };
  return (
    <div className="container my-4" id="update">
      <div className="card w-50 mx-auto px-4 shadow">
        <h3 className="text-center text-primary mt-3">LOGIN PAGE</h3>
        <form className="my-3">
          <label htmlFor="username" className="form-label">
            username:
          </label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter UserName"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          ></input>
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></input>
          <label htmlFor="dob" className="form-label">
            date of birth:
          </label>
          <input
            type="date"
            className="form-control mb-3"
            placeholder="Enter Date of Birth"
            id="dob"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          ></input>
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <div className="mb-3">
            <input
              type="radio"
              className="form-check-input me-1"
              id="male"
              name="gender"
              checked={formData.gender === "male"}
              onChange={() => setFormData({ ...formData, gender: "male" })}
            ></input>
            <label htmlFor="male" className="form-check-label me-2">
              Male
            </label>
            <input
              type="radio"
              className="form-check-input me-1"
              id="Female"
              name="gender"
              checked={formData.gender === "female"}
              onChange={() => setFormData({ ...formData, gender: "female" })}
            ></input>
            <label htmlFor="Female" className="form-check-label me-2">
              Female
            </label>
            <input
              type="radio"
              className="form-check-input me-1"
              id="Others"
              name="gender"
              checked={formData.gender === "others"}
              onChange={() => setFormData({ ...formData, gender: "others" })}
            ></input>
            <label htmlFor="Others" className="form-check-label me-2">
              Others
            </label>
          </div>
          <label htmlFor="password" className="form-label">
            password:
          </label>
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            ></input>
            <span
              className="input-group-text"
              onClick={() => setShowpassword(!showPassword)}
            >
              <i
                className={`fa-regular fa-eye${showPassword ? "-slash" : ""}`}
              ></i>
            </span>
          </div>
          <label htmlFor="cpassword" className="form-label">
            confirm password:
          </label>
          <div className="input-group mb-3">
            <input
              type={showCPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Confirm Password"
              id="cpassword"
              value={formData.cpassword}
              onChange={(e) =>
                setFormData({ ...formData, cpassword: e.target.value })
              }
            ></input>
            <span
              className="input-group-text"
              onClick={() => setShowCpassword(!showCPassword)}
            >
              <i
                className={`fa-regular fa-eye${showCPassword ? "-slash" : ""}`}
              ></i>
            </span>
          </div>
          <label htmlFor="ph.no" className="form-label">
            phone number:
          </label>
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Enter Phone Number"
            id="ph.no"
            value={formData.number}
            onChange={(e) =>
              setFormData({ ...formData, number: e.target.value })
            }
          ></input>
          <label htmlFor="lang" className="form-label">
            Language:
          </label>
          <div className="mb-3">
            <input
              type="checkbox"
              className="form-check-input me-1"
              id="tamil"
              value="tamil"
              checked={formData.language.includes('tamil')}
              onChange={handleChange}
            ></input>
            <label htmlFor="tamil" className="form-check-label me-2">
              Tamil
            </label>
            <input
              type="checkbox"
              className="form-check-input me-1"
              id="English"
              value="english"
              checked={formData.language.includes("english")}
              onChange={handleChange}
            ></input>
            <label htmlFor="English" className="form-check-label me-2">
              English
            </label>
            <input
              type="checkbox"
              className="form-check-input me-1"
              id="Hindi"
              value="hindi"
              checked={formData.language.includes("hindi")}
              onChange={handleChange}
            ></input>
            <label htmlFor="Hindi" className="form-check-label me-2">
              Hindi
            </label>
          </div>
          <label htmlFor="nation" className="form-label">
            Nationality:
          </label>
          <select
            type="select"
            className="form-select"
            value={formData.nationality}
            onChange={(e) =>
              setFormData({ ...formData, nationality: e.target.value })
            }
          >
            <option>CHOOSE</option>
            <option>Indian</option>
            <option>American</option>
            <option>Other</option>
          </select>
          <div className="d-flex justify-content-end mt-3 me-2">
            <button
              type="button"
              className="btn btn-info shadow btn-create"
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
