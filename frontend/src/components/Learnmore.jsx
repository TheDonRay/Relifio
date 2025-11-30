
import React from "react";
import { useState, useEffect } from "react";
require("../styles/Learnmore.css"); 


// set up basic stuff here
// set up mongoDB database for this one to store signed up emails from people.
export default function LearnMore() {
  // add email state
  const [email, userEmail] = useState(""); 
  // const REACT_BACKEND_URL = process.env.REACT_APP_API_URL;

  //Turns out i didnt need useEffect because the useEffect was triggering the database call every character
  const userSignup = async () => { 
    // base case 
    if (!email) { 
      return; 
    } 
    try { 
      const sendUserdata = await fetch("http://localhost:6700/api/signup", { 
        method: "POST", 
        headers: { 
          "Content-Type" : "application/json",
        }, 
        body: JSON.stringify({ email }),
      }); 
      // set the result now 
      const result = await sendUserdata.json(); 
      console.log('User Signed up details:', result);  
      // clear it once its sent to the backend here 
      userEmail(""); 
    } catch(error) {  
      console.error('There was an error sending data to user', error); 
    }
  }; 
  // TODO: Fix error that Im facing where when user types it presses sign up which is not what we want that causes database overload.
  return (
    <>
      <div className="container-div">
        <div className="first-div">
          <h1>What is Relifio?</h1>
          <p className="paragraph-text1">
            Relifio is a mental wellness SaaS platform that provides on-demand
            emotional support through AI-powered therapeutic conversations in a
            safe, judgment-free space. Unlike traditional chatbots or journaling
            apps, Relifio transforms each interaction into structured “life
            chapters,” capturing challenges, breakthroughs, and milestones in a
            meaningful emotional timeline. As a user, you can revisit these
            chapters anytime to reflect on your growth—whether it’s an
            achievement, a challenge, a breakup, or anything in between. Looking
            back shows you just how far you’ve come, highlighting the growth
            that often happens without you even noticing.
          </p>
        </div>
        <div className="second-div">
          <h1>Why Relifio?</h1>
          <p className="paragraph-text2">
            Because reassurance matters. Even with friends and a supportive
            family, there are moments when you still feel alone—and I’ve
            experienced that firsthand. I often found myself turning to AI just
            to express how I felt, whether through quick voice messages or chat.
            That’s when I realized there was no platform designed to
            meaningfully hold these moments. So I'm creating Relifio: a place where
            your thoughts are not only heard but also tracked, summarized, and
            transformed into something you can reflect on. Self-reflection is
            one of the biggest drivers of personal growth, and Relifio turns
            those isolated moments of expression into a continuous journey of
            understanding yourself.
          </p>
        </div>
        <div className="third-div">
          <h1>Join the waitlist and let your chapters begin !</h1>
          <input 
            className="inputbox"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => userEmail(e.target.value)} // this updates the state of the email which is essentially empty string right now
          />
          <button className="signupbtn" onClick={userSignup}>Sign Up</button>
        </div>
      </div>
    </>
  );
}
