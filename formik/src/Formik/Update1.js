import axios from "axios";
import React, { useEffect,useState } from "react";
import { API_URL } from "../API_URL/url";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { useFormik } from "formik";

function Update() {
  const [showPassword, setShowpassword] = useState(false);
  const [showCPassword, setShowCpassword] = useState(false);
  const Navigate = useNavigate();
 
  const onSubmit = async () => {
    await axios.put(API_URL + formik.values.id, formik.values);
    Navigate("/read1");
  };
  const handleCheckboxChange = (value) => {
    const language = formik.values.languages;
    if (language.includes(value)) {
      formik.setFieldValue(
        "languages",
        language.filter((lang) => lang !== value)
      );
    } else {
      formik.setFieldValue("languages", [...language, value]);
    }
  };


  const passwordsyntax = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const formik = useFormik({
    initialValues: {
      id:'',
      username: "",
      email: "",
      dob: "",
      password: "",
      cpassword: "",
      mobile: "",
      nationality: "",
      gender: "",
      languages: [],
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(6, "Username must have atleast 6 characters")
        .required("*this field is required"),
      email: yup
        .string()
        .email("Invalid Email address")
        .required("*this field is required"),
      dob: yup.date().required("*this field is required"),
      password: yup
        .string()
        .min(6, "password must have atleast 6 characters")
        .matches(passwordsyntax, "create a strong password")
        .required("*this field is required"),
      cpassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          "confirm password and password are not matching"
        )
        .required("*this field is required"),
      mobile: yup
        .string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("*this field is required"),
      nationality: yup.string().required("*this field is required"),
      gender: yup.string().required("*please select the gender"),
      languages: yup.array().min(1, "select atleast one language"),
    }),
    onSubmit,
  });

  useEffect(() => {
    const storedLanguagesString = localStorage.getItem("lang");
    const storedLanguagesArray = storedLanguagesString
      ? storedLanguagesString.split(',')                   // Split the string into an array
      : [];
  
    formik.setValues({
      id: localStorage.getItem("id"),
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      dob: localStorage.getItem("dob"),
      password: localStorage.getItem("password"),
      cpassword: localStorage.getItem("cpassword"),
      mobile: localStorage.getItem("number"),
      gender: localStorage.getItem("gender"),
      nationality: localStorage.getItem("nationality"),
      languages: storedLanguagesArray
    });
  }, []);
  return (
    <div className="container my-4" id="create1">
    <div className="card w-50 mx-auto px-4 shadow">
      <h3 className="text-center text-primary mt-3">LOGIN PAGE</h3>
      <form className="my-3" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username" className="form-label">
            username:
          </label>
          <input
            type="text"
            className={`form-control ${
              formik.errors.username && formik.touched.username
                ? "is-invalid"
                : formik.touched.username && !formik.errors.username
                ? "is-valid"
                : ""
            }`}
            placeholder="Enter UserName"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && formik.touched.username && (
            <p className="invalid-feedback">{formik.errors.username}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <input
            type="email"
            className={`form-control ${
              formik.errors.email && formik.touched.email
                ? "is-invalid"
                : !formik.errors.email && formik.touched.email
                ? "is-valid"
                : ""
            }`}
            placeholder="Enter email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="invalid-feedback">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="dob" className="form-label">
            date of birth:
          </label>
          <input
            type="date"
            className={`form-control ${
              formik.errors.dob && formik.touched.dob
                ? "is-invalid"
                : !formik.errors.dob && formik.touched.dob
                ? "is-valid"
                : ""
            }`}
            placeholder="Enter Date of Birth"
            id="dob"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.dob && formik.touched.dob && (
            <p className="invalid-feedback">{formik.errors.dob}</p>
          )}
        </div>

        <div>
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <div>
            <input
              type="radio"
              className="form-check-input me-1"
              id="male"
              name="gender"
              value="male"
              checked={formik.values.gender==='male'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="male" className="form-check-label me-2">
              Male
            </label>
            <input
              type="radio"
              className="form-check-input me-1"
              id="Female"
              name="gender"
              value="female"
              checked={formik.values.gender==='female'}
              onChange={formik.handleChange}
            />
            <label htmlFor="Female" className="form-check-label me-2">
              Female
            </label>
            <input
              type="radio"
              className="form-check-input me-1"
              id="Others"
              name="gender"
              value="others"
              checked={formik.values.gender==='others'}
              onChange={formik.handleChange}
            />
            <label htmlFor="Others" className="form-check-label me-2">
              Others
            </label>
          </div>
          {formik.errors.gender && (
            <p className="text-danger">{formik.errors.gender}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control  ${
                formik.errors.password && formik.touched.password
                  ? "is-invalid"
                  : !formik.errors.password && formik.touched.password
                  ? "is-valid"
                  : ""
              }`}
              placeholder="Enter password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            <i
              onClick={() => setShowpassword(!showPassword)}
              className={`absolute fa-regular fa-eye${
                showPassword ? "-slash" : ""
              }`}
            ></i>
            {formik.errors.password && formik.touched.password && (
              <p className="invalid-feedback">{formik.errors.password}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="cpassword" className="form-label">
            confirm password:
          </label>
          <div className="relative">
            <input
              type={showCPassword ? "text" : "password"}
              className={`form-control ${
                formik.errors.cpassword && formik.touched.cpassword
                  ? "is-invalid"
                  : !formik.errors.cpassword && formik.touched.cpassword
                  ? "is-valid"
                  : ""
              }`}
              placeholder="Enter Confirm Password"
              id="cpassword"
              name="cpassword"
              value={formik.values.cpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i
              onClick={() => setShowCpassword(!showCPassword)}
              className={`absolute fa-regular fa-eye${
                showCPassword ? "-slash" : ""
              }`}
            />
            {formik.errors.cpassword && formik.touched.cpassword && (
              <p className="invalid-feedback">{formik.errors.cpassword}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="mobile" className="form-label">
            phone number:
          </label>
          <input
            type="number"
            className={`form-control ${
              formik.errors.mobile && formik.touched.mobile
                ? "is-invalid"
                : !formik.errors.mobile && formik.touched.mobile
                ? "is-valid"
                : ""
            }`}
            placeholder="Enter Phone Number"
            id="mobile"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.mobile && formik.touched.mobile && (
            <p className="invalid-feedback">{formik.errors.mobile}</p>
          )}
        </div>

        <div>
          <label htmlFor="lang" className="form-label">
            Language:
          </label>
          <div>
            <input
              type="checkbox"
              className="form-check-input me-1"
              id="tamil"
              name="languages"
              value="tamil"
              checked={formik.values.languages.includes("tamil")}
              onChange={() => handleCheckboxChange("tamil")}
            />
            <label htmlFor="tamil" className="form-check-label me-2">
              Tamil
            </label>
            <input
              type="checkbox"
              className="form-check-input me-1"
              id="english"
              name="languages"
              value="english"
              checked={formik.values.languages.includes("english")}
              onChange={() => handleCheckboxChange("english")}
            />
            <label htmlFor="English" className="form-check-label me-2">
              English
            </label>
            <input
              type="checkbox"
              className="form-check-input me-1"
              id="Hindi"
              name="languages"
              value="hindi"
              checked={formik.values.languages.includes("hindi")}
              onChange={() => handleCheckboxChange("hindi")}
            />
            <label htmlFor="Hindi" className="form-check-label me-2">
              Hindi
            </label>
          </div>
          {formik.errors.languages && formik.touched.languages && (
            <p className="text-danger">{formik.errors.languages}</p>
          )}
        </div>
        <div>
          <label htmlFor="nationality" className="form-label">
            Nationality:
          </label>
          <select
            type="select"
            className={`form-control ${
              formik.errors.nationality && formik.touched.nationality
                ? "is-invalid"
                : !formik.errors.nationality && formik.touched.nationality
                ? "is-valid"
                : ""
            }`}
            id="nationality"
            name="nationality"
            value={formik.values.nationality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option>CHOOSE</option>
            <option>Indian</option>
            <option>American</option>
            <option>Other</option>
          </select>
          {formik.errors.nationality && formik.touched.nationality && (
            <p className="invalid-feedback">{formik.errors.nationality}</p>
          )}
        </div>
        <div className="d-flex justify-content-end mt-3 me-2">
          <button type="submit" className="btn btn-info shadow">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default Update;
