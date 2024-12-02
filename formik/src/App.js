import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create1 from "./Formik/Create1";
import Read1 from "./Formik/Read1";
import Update1 from "./Formik/Update1";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*USING FORMIK*/}
          <Route path="/" element={<Create1 />} />
          <Route path="/read1" element={<Read1 />} />
          <Route path="/update1" element={<Update1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
