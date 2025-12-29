import React from "react"; 
import { useState } from 'react';  
require("../styles/Mainpage.css"); 


//TODO: Start implementing the page and external AI to help with this. 
export default function MainPage() {  
  // we will be using useState to handle the state of the box and everything  
  const [textValue, newTextValue] = useState(''); // initialized textValue to empty as of now 

  // we need to handle change in input field 
  const handleChange = (textevent) => { 
    newTextValue(textevent.target.value);  
  };   

  // create the button to handle the actual sending of the text 
  const buttonsubmission = (btnevent) => { 
    btnevent.preventDefault(); // prevents the browser from refreshing the page on form submission  

    if (textValue.trim()){ 
      console.log('userWrote:', textValue);  
      // we can update the textValue to reset to empty 
      newTextValue(''); 
    }
  }
  return (
    <> 
      <div className="container-dv">
        <div className="hold-icon-div">
          {/*place the icon here as a friendly icon*/} 
          <img src="/relief.png" alt="Relifio Icon"/>
        </div> 

        {/*With some spacing a textbox that a user can type into and send which gets sent to the external API response*/} 
        <div className="textbox"> 
          {/*Place textbox stuff here*/}  
          <form onSubmit={buttonsubmission} style={{ display: 'flex', gap: '5px'}}>  
            <input 
              type="text" 
              value={textValue} 
              onChange={handleChange} 
              placeholder="Hey there! Excited for a new chapter. What’s on your mind today?" 
              style={{ flexGrow: 1, padding: '10px'}} 
              /> 
              <button className="submitbtn" disabled={!textValue.trim()}> 
                Send
              </button>
          </form>
        </div>
      </div>
    </>
  );
}
