import React from "react";
import { useState, useEffect } from "react";
require("../styles/Learnmore.css");

// set up basic stuff here
// set up mongoDB database for this one to store signed up emails from people.
export default function LearnMore() {
  // add email state
  const [email, userEmail] = useState("");

  useEffect(() => {
    // add a check here as such
    if (!email) return;

    async function userSignup() {
      const signupuser = await fetch("http://localhost:6700/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await signupuser.json();
      console.log("Server response", result);
    }
    userSignup();
  }, [email]); // this ensures that this fetch only runs when the email is updated.

  // TODO: Fix error that Im facing where when user types it presses sign up which is not what we want that causes database overload. 
  return (
    <>
      <div className="container-div">
        <div className="first-div">
          <h1>What is Relifio?</h1> 
          <p>Relifio is a </p>
        </div>
        <div className="second-div">
          <h1>Why Relifio?</h1>
        </div>
        <div className="third-div">
          <h1>Sign Up To announce our official release!</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => userEmail(e.target.value)} // this updates the state of the email which is essentially empty string right now
          />

          <button onClick={() => userEmail(email)}>Sign Up</button>
        </div>
      </div>
    </>
  );
}
