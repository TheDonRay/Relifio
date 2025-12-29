import React from "react";
//MainPage that will run the api etc
require("../styles/Mainpage.css"); 


//TODO: Start implementing the page and external AI to help with this. 
export default function MainPage() {
  return (
    <> 
      <div className="container-dv">
        <div className="hold-icon-div">
          {/*place the icon here as a friendly icon*/}
        </div> 

        {/*With some spacing a textbox that a user can type into and send which gets sent to the external API response*/} 
        <div className="textbox"> 
          {/*Place textbox stuff here*/} 
        </div>
      </div>
    </>
  );
}
