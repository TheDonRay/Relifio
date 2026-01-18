import React from "react";
import { useState } from "react";
require("../styles/Learnmore.css");

// set up basic stuff here
// set up mongoDB database for this one to store signed up emails from people.
export default function LearnMore() {
  // add email state
  const [email, userEmail] = useState("");
  const REACT_BACKEND_URL = process.env.REACT_APP_API_URL;

  //Turns out i didnt need useEffect because the useEffect was triggering the database call every character
  //TODO helper function that checks for a valid email.
  // Below here this is the email regex used for  a valid email.
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const checkValidEmail = (email) => {
    const validemail = emailregex.test(email);
    if (!validemail) {
      alert("Please Enter a valid Email Thank you!");
    }
    return validemail; // returns the email itself.
  };

  const userSignup = async () => {
    // base case which calls the helper function here as such which should basically help with email authentication
    if (!checkValidEmail(email)) {
      return;
    } else {
      console.log("Email looks good moving on with the rest of the code");
    }
    // Begins the actually fetch of the backend but sending a post request which is the req body
    try {
      const sendUserdata = await fetch(`${REACT_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      // set the result now
      const result = await sendUserdata.json();
      console.log("User Signed up details:", result);
      // clear it once its sent to the backend here
      alert("Success! Your email is now signed up");
      userEmail("");
    } catch (error) {
      console.error("There was an error sending data to user", error);
    }
  };

  return (
    <div className="learn-more-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Mental Wellness Platform</span>
          <h1 className="hero-title">
            Your Journey to <span className="highlight">Self-Discovery</span>
          </h1>
          <p className="hero-subtitle">
            Transform your thoughts into meaningful chapters of growth
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Available Support</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Private & Secure</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">AI</span>
              <span className="stat-label">Powered Insights</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <span className="card-icon">&#128218;</span>
            <span>Life Chapters</span>
          </div>
          <div className="floating-card card-2">
            <span className="card-icon">&#128161;</span>
            <span>Breakthroughs</span>
          </div>
          <div className="floating-card card-3">
            <span className="card-icon">&#127942;</span>
            <span>Milestones</span>
          </div>
        </div>
      </section>

      {/* What is Relifio Section */}
      <section className="content-section what-section">
        <div className="section-grid">
          <div className="section-visual">
            <div className="visual-box">
              <div className="icon-circle">
                <span>&#129504;</span>
              </div>
              <div className="visual-lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          </div>
          <div className="section-content">
            <span className="section-tag">About Us</span>
            <h2>
              What is <span className="t3-color">Relifio?</span>
            </h2>
            <p className="paragraph-text1">
              Relifio is a mental wellness SaaS platform that provides on-demand
              emotional support through AI-powered therapeutic conversations in a
              safe, judgment-free space. Unlike traditional chatbots or journaling
              apps, Relifio transforms each interaction into structured "life
              chapters," capturing challenges, breakthroughs, and milestones in a
              meaningful emotional timeline.
            </p>
            <p className="paragraph-text1">
              As a user, you can revisit these chapters anytime to reflect on your
              growth—whether it's an achievement, a challenge, a breakup, or anything
              in between. Looking back shows you just how far you've come, highlighting
              the growth that often happens without you even noticing.
            </p>
            <div className="feature-chips">
              <span className="chip">AI-Powered</span>
              <span className="chip">Safe Space</span>
              <span className="chip">Life Chapters</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Relifio Section */}
      <section className="content-section why-section">
        <div className="section-grid reverse">
          <div className="section-content">
            <span className="section-tag">Our Mission</span>
            <h2>
              Why <span className="t2-color">Relifio?</span>
            </h2>
            <p className="paragraph-text2">
              Because reassurance matters. Even with friends and a supportive
              family, there are moments when you still feel alone—and I've
              experienced that firsthand. I often found myself turning to AI just
              to express how I felt, whether through quick voice messages or chat.
            </p>
            <p className="paragraph-text2">
              That's when I realized there was no platform designed to meaningfully
              hold these moments. So I'm creating Relifio: a place where your thoughts
              are not only heard but also tracked, summarized, and transformed into
              something you can reflect on. Self-reflection is one of the biggest
              drivers of personal growth, and Relifio turns those isolated moments
              of expression into a continuous journey of understanding yourself.
            </p>
            <div className="feature-chips">
              <span className="chip">Self-Reflection</span>
              <span className="chip">Personal Growth</span>
              <span className="chip">Emotional Support</span>
            </div>
          </div>
          <div className="section-visual">
            <div className="visual-box alt">
              <div className="icon-circle">
                <span>&#128150;</span>
              </div>
              <div className="quote-box">
                <p>"Your thoughts deserve to be heard"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section className="signup-section">
        <div className="signup-container">
          <div className="signup-content">
            <span className="section-tag light">Join the Journey</span>
            <h2>
              Stay updated with <span className="t1-color">Relifio!</span>
            </h2>
            <p>Be the first to know when we launch and get exclusive early access.</p>
          </div>
          <div className="signup-form">
            <div className="input-wrapper">
              <input
                className="inputbox"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => userEmail(e.target.value)}
              />
              <button className="signupbtn" onClick={userSignup}>
                <span>Sign Up</span>
              </button>
            </div>
            <p className="form-note">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
        <div className="signup-decoration">
          <div className="deco-circle"></div>
          <div className="deco-circle small"></div>
        </div>
      </section>
    </div>
  );
}
