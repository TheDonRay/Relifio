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

  const userSignup = async (event) => {
    event.preventDefault();

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

      if (!sendUserdata.ok) {
        throw new Error(`HTTP error! status: ${sendUserdata.status}`);
      }

      const result = await sendUserdata.json();
      console.log("User Signed up details:", result);
      setStatus("success");
      setStatusMessage(`You're on the list. We'll email ${email} when early access opens.`);
      userEmail("");
    } catch (error) {
      console.error("There was an error sending data to user", error);
      setStatus("error");
      setStatusMessage("Your email wasn't saved because the server couldn't be reached. Try again in a moment.");
    }
  };

  return (
    <div className="about">
      <SiteHeader />

      <main className="about-main">
        <header className="about-hero">
          <h1>A place to put what you're carrying.</h1>
          <p className="about-lede">
            Relifio is an AI companion for emotional support. You talk, it listens, and each
            conversation becomes a chapter in a timeline of your growth.
          </p>
        </header>

        <section className="about-section" aria-labelledby="how-heading">
          <h2 id="how-heading">How a chapter forms</h2>
          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title} className="step">
                <span className="step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-section prose" aria-labelledby="what-heading">
          <h2 id="what-heading">What Relifio is</h2>
          <p>
            Relifio offers on-demand emotional support through conversations in a safe,
            judgment-free space. Unlike a chatbot that forgets you or a journal that only stores
            words, it turns each conversation into a structured chapter: the challenges, the
            breakthroughs, and the milestones.
          </p>
          <p>
            You can revisit those chapters whenever you want perspective, whether it's an
            achievement, a breakup, or a hard week. Looking back shows the growth that often
            happens without you noticing.
          </p>
        </section>

        <section className="about-section prose founder" aria-labelledby="why-heading">
          <h2 id="why-heading">Why I built it</h2>
          <p>
            Because reassurance matters. Even with friends and a supportive family, there are
            moments when you still feel alone. I've been there. I often found myself turning to
            AI just to say how I felt, through quick voice messages or chat.
          </p>
          <p>
            But nothing held on to those moments. So I'm building Relifio: a place where your
            thoughts are heard, then summarized into something you can reflect on. Self-reflection
            is one of the biggest drivers of growth, and Relifio turns isolated moments of
            expression into a continuous story about yourself.
          </p>
          <Link to="/Mainpage" className="btn btn-primary">
            Begin a chapter
          </Link>
        </section>

        <section className="signup" aria-labelledby="signup-heading">
          <h2 id="signup-heading">Get early access</h2>
          <p>We'll email you once when new features launch. No newsletters.</p>
          <form className="signup-form" onSubmit={userSignup} noValidate>
            <label htmlFor="signup-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="signup-email"
              className="signup-input"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                userEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-invalid={status === "error"}
              aria-describedby="signup-status"
            />
            <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Joining…" : "Join the list"}
            </button>
          </form>
          <p id="signup-status" className={`signup-status ${status}`} role="status">
            {statusMessage}
          </p>
        </section>
      </main>

      <footer className="about-footer">
        <p>
          Relifio is a support tool, not a replacement for professional care. If you're in
          crisis or thinking about hurting yourself, call or text 988 in the US, or contact your
          local emergency number.
        </p>
      </footer>
    </div>
  );
}
