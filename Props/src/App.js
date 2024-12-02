import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Form from "./Form";
import ClassCom from "./Component/ClassCom";
import FunctionCom from "./Component/FunctionCom";
import CoreConcept from "./Udemyprops/CoreConcept";
import Component from "./EventListener/Component";

function App() {
  return (
    <>
      <Form />
      <ClassCom fname="sugi" />
      <FunctionCom fname="kowshi" />
      <CoreConcept />
      <Component />
    </>
  );
}

export default App;
