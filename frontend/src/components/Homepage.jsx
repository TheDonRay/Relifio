import React, { useEffect, useRef } from "react";
require("../styles/Home.css");

export default function Home() {
  const titleRef = useRef(null);

  useEffect(() => {
    const title = "Where technology meets empathy.";
    const titleElement = titleRef.current;

    if (titleElement) {
      titleElement.innerHTML = "";
      title.split("").forEach((char, index) => {
        const span = document.createElement("span");

        // Fix: keep spacing by turning normal spaces into non-breaking spaces
        span.textContent = char === " " ? "\u00A0" : char;

        span.style.animationDelay = `${index * 0.05}s`;
        titleElement.appendChild(span);
      });
    }
  }, []);

  return (
    <div className="home-wrapper">
      <div className="container1">
        <h1 className="title" ref={titleRef}></h1>
        <p className="paragraph-style">Relifio is more than an AI companion. It turns your thoughts and emotions into digital chapters you can revisit anytime. Whether it’s a memory, a story, or a difficult feeling, Relifio gives you a safe space to talk through it — no pressure, no judgment, just support.</p>

        <div className="buttons-row">
          <button className="btn1">Learn More</button>
          <button className="btn2">Choose Your therapist!</button>
        </div>
      </div>
    </div>
  );
}
