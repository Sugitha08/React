import React, { useState } from "react";

function Form() {
  const [state, setstate] = useState({
    Name:'',
    date:'',
    Email:'',
    number:'',
    nation:'',
    address:''
  });

  const [isSubmitted,setIsSubmitted] =useState(false);
  const handleSubmit =() =>{
      //storing data in localstorge
  localStorage.setItem("Name", state.Name);
  localStorage.setItem("Date of Birth", state.date);
  localStorage.setItem("Email", state.Email);
  localStorage.setItem("PhoneNumber", state.number);
  localStorage.setItem("Nationality", state.nation);
  localStorage.setItem("Address", state.address);
  setIsSubmitted(true)
  }

  return (
    <>
      <div className="container card w-50 mt-2 bg-light">
        <h1 className="text-center form" style={{ color: "blue" }}>
          Form
        </h1>
        <form>
          <div className="my-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              id="name"
              onChange={(e) => setstate({...state,Name:e.target.value})}        
              value={state.Name}
            />
          </div>
          <div className="my-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth:
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Your DOB"
              id="dob"
              onChange={(e) => setstate({...state,date:e.target.value})}  
              value={state.date}      
            />
          </div>
          <div className="my-3">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <br />
            <input
              type="radio"
              className="form-check-input-sm"
              placeholder="Enter Your Gender"
              id="male"
              name="gender"
            />
            <label htmlFor="male" className="form-check-label me-2">
              Male
            </label>
            <input
              type="radio"
              className="form-check-input-sm"
              placeholder="Enter Your Gender"
              id="Female"
              name="gender"
            />
            <label htmlFor="Female" className="form-check-label me-2">
              Female
            </label>
            <input
              type="radio"
              className="form-check-input-sm"
              placeholder="Enter Your Gender"
              id="Others"
              name="gender"
            />
            <label htmlFor="Others" className="form-check-label me-2">
              Others
            </label>
          </div>
          <div className="my-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your email"
              id="email"
              onChange={(e) => setstate({...state,Email:e.target.value})}
              value={state.Email}
            />
          </div>
          <div className="my-3">
            <label htmlFor="number" className="form-label">
              PhoneNumber:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Your PhoneNumber"
              id="number"
              onChange={(e) => setstate({...state,number:e.target.value})}
              value={state.number}
            />
          </div>
          <div className="my-3">
            <label htmlFor="nationality" className="form-label">
              Nationality:
            </label>
            <select
              className="form-select"
              onChange={(e) => setstate({...state,nation:e.target.value})}
              value={state.nation}
            >
              <option>Choose</option>
              <option>Indian</option>
              <option>American</option>
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="textarea" className="form-label">
              Address:
            </label>
            <textarea
              rows={2}
              className="form-control"
              id="textarea"
              onChange={(e) => setstate({...state,address:e.target.value})}
              value={state.address}
            ></textarea>
          </div>
          
          <div className="d-flex justify-content-end my-3">
            <button type="button" className="btn btn-secondary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {isSubmitted ? (
            <div>
            {/*
             
            Getting value directly from the state

            <p>Username:{state.Name}</p>
            <p>DOB:{state.date}</p>
            <p>Email:{state.Email}</p>
            <p>PhoneNumber:{state.number}</p>   
            <p>Nationality:{state.nation}</p>
            <p>Address:{state.address}</p> */}

                {/*-----------------*/}
               
            {/* getting value from the localstorage */}

            <p>Username:{localStorage.getItem("Name")}</p>
            <p>DOB:{localStorage.getItem("Date of Birth")}</p>
            <p>Email:{localStorage.getItem("Email")}</p>
            <p>PhoneNumber:{localStorage.getItem("PhoneNumber")}</p>
            <p>Nationality:{localStorage.getItem("Nationality")}</p>
            <p>Address:{localStorage.getItem("Address")}</p>
          </div>
          ) : ''}
        </form>
      </div>
    </>
  );
}

export default Form;
