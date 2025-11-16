import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

require("../styles/Home.css");

export default function Home() {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  // initialize the use Navigate here 

  // Reusable function to animate any text into spans
  const animateText = (element, text) => {
    if (!element) return;

    element.innerHTML = "";
    text.split("").forEach((char, index) => {
      const span = document.createElement("span");

      // keep spaces visible
      span.textContent = char === " " ? "\u00A0" : char;

      span.style.animationDelay = `${index * 0.03}s`;
      span.classList.add("letter-animate");
      element.appendChild(span);
    });
  };

  useEffect(() => {
    const titleText = "Where technology meets empathy.";
    const paragraphText =
      "Relifio is more than an AI companion, it turns your thoughts and emotions into digital chapters you can revisit anytime. Whether it’s a memory, a story, or a tough feeling, Relifio gives you a safe space to talk through it with no pressure and no judgment.";

    animateText(titleRef.current, titleText);
    animateText(paragraphRef.current, paragraphText);
  }, []);

  // later set upo the button use navigates 

  return (
    <div className="home-wrapper">
      <div className="container1">
        <h1 className="title" ref={titleRef}></h1>

        <p className="paragraph-style" ref={paragraphRef}></p>

        <div className="buttons-row">
          <button className="btn1">
            <span>Learn More</span>
          </button>
          <button className="btn2">
            <span>Choose Your therapist!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
