import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../API_URL/url";
import { useNavigate } from "react-router-dom";

function Create() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    password: "",
    cpassword: "",
    number: "",
    nationality: "",
    gender: false,
    language: [],
  });
  const [showPassword, setShowpassword] = useState(false);
  const [showCPassword, setShowCpassword] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { value, checked } = e.target; // Destructuring the value and checked properties from the event target
    setFormData((prevData) => ({
      ...prevData, // Copying the previous state using the spread operator
      language: checked
        ? [...prevData.language, value] // Add the language to the array if checked
        : prevData.language.filter((data) => data !== value), // Remove the language if unchecked
    }));
  };

  const handleSubmit = async () => {
    await axios.post(API_URL, {
      username: formData.username,
      email: formData.email,
      dob: formData.dob,
      password: formData.password,
      cpassword: formData.cpassword,
      number: formData.number,
      nationality: formData.nationality,
      gender: formData.gender,
      language: formData.language,
    });
    Navigate("/read");
  };

  return (
    <div className="container my-4" id="create">
      <div className="card w-50 mx-auto px-4 shadow">
        <h3 className="text-center text-primary mt-3">LOGIN PAGE</h3>
        <form className="was-validated my-3">
          <div>
            <label htmlFor="username" className="form-label">
              username:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter UserName"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
            <p className="valid-feedback">valid</p>
            <p className="invalid-feedback">This field is required</p>
          </div>
          <div>
            <label htmlFor="email" className="form-label">
              email:
            </label>
            <input
              type="email"
              className="form-control "
              placeholder="Enter email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <p className="valid-feedback">valid</p>
            <p className="invalid-feedback">This field is required</p>
          </div>
          <div>
            <label htmlFor="dob" className="form-label">
              date of birth:
            </label>
            <input
              type="date"
              className="form-control "
              placeholder="Enter Date of Birth"
              id="dob"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              required
            />
            <p className="valid-feedback">valid</p>
            <p className="invalid-feedback">This field is required</p>
          </div>
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <div>
            <input
              type="radio"
              className="form-check-input me-1"
              id="male"
              name="gender"
              checked={formData.gender === "male"}
              onChange={() => setFormData({ ...formData, gender: "male" })}
              required
            />
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
            />
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
            <p className="valid-feedback">valid</p>
            <p className="invalid-feedback">This field is required</p>
          </div>
          <label htmlFor="password" className="form-label">
            password:
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <span
              className="input-group-text"
              onClick={() => setShowpassword(!showPassword)}
            >
              <i
                className={`fa-regular fa-eye${showPassword ? "-slash" : ""}`}
              ></i>
            </span>
            <p className="valid-feedback">valid</p>
            <p className="invalid-feedback">This field is required</p>
          </div>
          <label htmlFor="cpassword" className="form-label">
            confirm password:
          </label>
          <div className="input-group ">
            <input
              type={showCPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Confirm Password"
              id="cpassword"
              value={formData.cpassword}
              onChange={(e) =>
                setFormData({ ...formData, cpassword: e.target.value })
              }
              required
            />
            <span
              className="input-group-text"
              onClick={() => setShowCpassword(!showCPassword)}
            >
              <i
                className={`fa-regular fa-eye${showCPassword ? "-slash" : ""}`}
              />
            </span>
            <p className="valid-feedback">valid</p>
            <p className="invalid-feedback">This field is required</p>
          </div>
          <div>
            <label htmlFor="ph.no" className="form-label">
              phone number:
            </label>
            <input
              type="number"
              className="form-control "
              placeholder="Enter Phone Number"
              id="ph.no"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              required
            />
            <p className="valid-feedback">valid</p>
            <p className="invalid-feedback">This field is required</p>
          </div>
          <label htmlFor="lang" className="form-label">
            Language:
          </label>
          <div>
            <input
              type="checkbox"
              className="form-check-input me-1"
              id="tamil"
              value="tamil"
              checked={formData.language.includes("tamil")}
              onChange={handleChange}
            />
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
            />
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
            />
            <label htmlFor="Hindi" className="form-check-label me-2">
              Hindi
            </label>
          <p className="valid-feedback">valid</p>
          <p className="invalid-feedback">This field is required</p>
          </div>
          <div>
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
              required
            >
              <option>CHOOSE</option>
              <option>Indian</option>
              <option>American</option>
              <option>Other</option>
            </select>
            <p className="valid-feedback">valid</p>
            <p className="invalid-feedback">This field is required</p>
          </div>
          <div className="d-flex justify-content-end mt-3 me-2">
            <button
              type="button"
              className="btn btn-info shadow"
              onClick={handleSubmit}
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;

// const [language,SetLanguage] = useState([])

// const handleChange =(e)=>{
//   const {value,checked}=e.target
//   if(checked){
//     SetLanguage(prev=>[...prev,value])
//   }else{
//     SetLanguage(prev=>{
//       return [...prev.filter(data=>data===value)]
//     })
//   }
// }
