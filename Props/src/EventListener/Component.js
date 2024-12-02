import TabButton from "./Button";
import { useState } from "react";
import { Example } from "./Button";

function Component() {
    var [selectedtopic, setSelectedtopic] = useState();

    function handleselect(selectedstring) {
      //selectedstring =>'React' , 'JSX' , 'Props'
      setSelectedtopic(selectedstring);
      console.log(selectedtopic);
    }
    // 3rd method to render content conditionally using IF STATEMENT
    var content = "please click on the button";
    if(selectedtopic){
      content =  <div className="text-center my-2">
      <h2>{Example[selectedtopic].title}</h2>
      <p>{Example[selectedtopic].description}</p>
      </div>
    }
  return (
    <>
     <h1 className="text-center text-info">Event Handler</h1>
     <div className="d-flex justify-content-center">
       {/* EventHandler with Dynamic value using children prop also */}
       <TabButton
         isSelected={selectedtopic === 'Component'}
         onselect={() => {
           handleselect("Component");
         }}
       >
         React
       </TabButton>
       <TabButton
         isSelected={selectedtopic === 'JSX'}
         onselect={() => {
           handleselect("JSX");
         }}
       >
         JSX
       </TabButton>
       <TabButton
         isSelected={selectedtopic === 'Props'}
         onselect={() => {
           handleselect("Props");
         }}
       >
         Props
       </TabButton>
     </div>
     <div className="text-center mt-2">{content}</div> {/* 3rd method */}
    {/* 1st method to render content conditionally using TERNARY OPERATOR*/}
           {/* {!selectedtopic ? <p>please click on the button</p> : null}
           {selectedtopic ? (
           <div className="text-center my-2">
           <h2>{Example[selectedtopic].title}</h2>
           <p>{Example[selectedtopic].description}</p>
           </div>
           ) : null}   */}
                  
                     {/* (or) */}

             {/* {selectedtopic ? <p>please click on the button</p> : 
                <div className="text-center my-2">
                <h2>{Example[selectedtopic].title}</h2>
                <p>{Example[selectedtopic].description}</p>
               </div> } */}    
            
     {/* 2nd method to render content conditionally AND OPERATOR */}
            {/* { !selectedtopic && <p>please click on the button</p> }
            { selectedtopic &&
                <div className="text-center my-2">
                <h2>{Example[selectedtopic].title}</h2>
                <p>{Example[selectedtopic].description}</p>
                </div> }       */}
  </>
  )
}

export default Component