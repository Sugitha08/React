import { Core_Concept } from "./Variable";
import AnotherConcept from "./Propsex";
import Propsex from "./Propsex";


function CoreConcept() {
  return (
    <div className="text-center">


        {/*ACCESSING PROPS VALUES FROM ANOTHER COMPONENT */}
        <h3 className="mt-5 text-danger">Udemy Course</h3>
        <h3 className="text-info">
          ACCESSING PROPS VALUES FROM ANOTHER COMPONENT
        </h3>
        <div className="core-concept">


      {/* OPUTPUTING ARRAY ELEMENT USING MAP METHOD */}
      {Core_Concept.map(items => (<Propsex {...items}/>) )}



      {/* USING PROPS TO OUTPUT THE ARRAY ELEMENT */}
        {/* <Propsex {...Core_oncept[0]} />
        <Propsex {...Core_oncept[1]} />
        <Propsex {...Core_oncept[2]} />
        <Propsex {...Core_oncept[3]} /> */}
        </div>

        <h3 className="text-danger">Another method</h3>
        <div className="core-concept">
        <AnotherConcept
          title={Core_Concept[0].title}
          description={Core_Concept[0].description}
        />
        <AnotherConcept
          title={Core_Concept[1].title}
          description={Core_Concept[1].description}
        />
        </div>
      </div>

  )
}

export default CoreConcept