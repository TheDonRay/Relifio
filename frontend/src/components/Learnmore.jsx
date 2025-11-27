import React from "react";
import { useState, useEffect } from "react";
require("../styles/Learnmore.css");

// set up basic stuff here
// set up mongoDB database for this one to store signed up emails from people.
export default function LearnMore() {
  const [data, setData] = useState(null);
 
  //TODO: Chnage the fetch to update to a POST logic to send data to the mongoDB cluster 
  useEffect(() => {
    // create the function to hold the data here as such
    const fetchUserData = async () => {
      // implement the try and catch case ehre as such
      try {
        const datares = await fetch("http://localhost:6700/api/signup", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json", // Optional, but good practice
          },
        });
        const result = await datares.json();
        // update the state here as such
        setData(result);
      } catch (error) { 
        console.log('Error was found', error); 
      }
    };
    // below here we are just going to invoke the function as such
    fetchUserData();
  }, []);
  return ( 
    //TODO: Change to be like one centered DIV instead of seperate divs which might confuse and make it harder. 
    <>
      <div>
        <div className="part1">
          <h1>General about Relifio</h1> 
          <p>{data?.message}</p>
        </div>

        <div className="part2">
          <h1>Motivation of this project</h1>
          <p>The reason we built this.. </p>
        </div>

        <div className="signup for updates">
          <h1>Sign up page</h1>
        </div>
      </div>
    </>
  );
}
