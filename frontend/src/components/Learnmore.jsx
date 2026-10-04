import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";

import "../styles/Learnmore.css";

const steps = [
  {
    title: "Talk it through",
    body: "Write about whatever is on your mind, big or small. Relifio listens and responds without judgment, any time of day.",
  },
  {
    title: "Close the chapter",
    body: "When you're ready, end the conversation. Relifio summarizes what you talked about, what you felt, and what shifted.",
  },
  {
    title: "Look back",
    body: "Each summary is saved as a chapter. Over time they show patterns, breakthroughs, and how far you've come.",
  },
];

// set up mongoDB database for this one to store signed up emails from people.
export default function LearnMore() {
  const [email, userEmail] = useState("");
  // idle | sending | success | error
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const REACT_BACKEND_URL = process.env.REACT_APP_BACKEND_HOSTED_URL;

  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const checkValidEmail = (email) => {
    const validemail = emailregex.test(email);
    if (!validemail) {
      alert("That email doesn't look complete. Check it and try again, like name@example.com.");
    }
    return validemail; // returns the email itself.
  };

  const userSignup = async () => {
    if (!emailregex.test(email)) {
      setStatus("error");
      setStatusMessage("Enter an email address like name@example.com.");
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      const sendUserdata = await fetch(`${REACT_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      // only treat it as a signup if the backend actually accepted it
      if (!sendUserdata.ok) {
        throw new Error(`HTTP error! status: ${sendUserdata.status}`);
      }
      // set the result now
      const result = await sendUserdata.json();
      console.log("User Signed up details:", result);
      // clear it once its sent to the backend here
      alert("You're on the list. We'll email you when there's Relifio news.");
      userEmail("");
    } catch (error) {
      console.error("There was an error sending data to user", error);
      alert("We couldn't sign you up just now. Check your connection and try again.");
    }
  };

  return (
    <div className="learn-more-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">AI emotional support</span>
          <h1 className="hero-title">
            Your Journey to <span className="highlight">Self-Discovery</span>
          </h1>
          <p className="hero-subtitle">
            Talk through what's on your mind. When you're done, Relifio turns
            the conversation into a chapter of your story.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Accounts needed</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">1</span>
              <span className="stat-label">Chapter per conversation</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">Any time</span>
              <span className="stat-label">Start when it hits</span>
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
              Relifio is a place to talk through how you're feeling with an AI
              that listens without judgment. Unlike a regular chatbot, the
              conversation doesn't just disappear: when you end a session,
              Relifio summarizes it into a "life chapter" that captures what you
              worked through, whether it's a challenge, a breakthrough, a
              breakup, or a milestone.
            </p>
            <p className="paragraph-text1">
              Relifio isn't therapy and isn't a replacement for a professional.
              If you're in crisis or thinking about hurting yourself, call or
              text 988 in the US, or contact your local emergency number.
            </p>
            <div className="feature-chips">
              <span className="chip">AI-Powered</span>
              <span className="chip">Judgment-free</span>
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
            <p>Relifio is still growing. Leave your email to hear when new features launch.</p>
          </div>
          <div className="signup-form">
            <div className="input-wrapper">
              <input
                className="inputbox"
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                value={email}
                onChange={(e) => userEmail(e.target.value)}
              />
              <button className="signupbtn" onClick={userSignup}>
                <span>Get updates</span>
              </button>
            </div>
            <p className="form-note">We'll only email you about Relifio. No spam.</p>
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
