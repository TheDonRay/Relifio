import React from "react"; 
import { useState } from 'react';  
require("../styles/Mainpage.css"); 

export default function MainPage() {  
  const [textValue, newTextValue] = useState('');

  const handleChange = (textevent) => { 
    newTextValue(textevent.target.value);  
  };   

  const buttonsubmission = (btnevent) => { 
    btnevent.preventDefault();

    if (textValue.trim()){ 
      console.log('userWrote:', textValue);  
      newTextValue(''); 
    }
  }
  
  return (
    <>   
      {/*TODO: Title, fix the textbox wrapper to go to a new line within the textbox. */}
      <div className="title-before-textbox"> 
        {/*Here im going to add the title like a catchy title for relifio */}
      </div> 

      <div className="container-dv">
        <div className="content-wrapper">
          <div className="hold-icon-div">
            <img src="/therapist.png" alt="Relifio Icon" className="icon-img"/>
          </div> 

          <div className="textbox"> 
            <form onSubmit={buttonsubmission} className="input-form">  
              <input 
                type="text" 
                value={textValue} 
                onChange={handleChange} 
                placeholder="Hey there! Excited for a new chapter. What's on your mind today?" 
                className="text-input"
              /> 
              <button className="submitbtn" disabled={!textValue.trim()}> 
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}