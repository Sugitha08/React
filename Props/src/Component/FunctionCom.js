import React, { useState } from "react";

function FunctionCom(props) {
  const [fname, setname] = useState("sugi");
  return (
    <div className="container card w-50 my-2 bg-light">
      <h3 className="text-center mt-1" style={{ color: "blue" }}>
        Function Component
      </h3>
      <h4 className="mt-1" style={{ color: "blue" }}>
        props:-
      </h4>
      <h5 className="text-center" style={{ color: "red" }}>
        {props.fname}
      </h5>
      <h4 className="mt-1" style={{ color: "blue" }}>
        UseState:-
      </h4>
      <h5 className="text-center text-info">{fname}</h5>
      <button
        type="button"
        onClick={() => setname("kannaki")}
        className="btn btn-secondary d-block mx-auto mb-2"
      >
        update
      </button>
    </div>
  );
}

export default FunctionCom;
