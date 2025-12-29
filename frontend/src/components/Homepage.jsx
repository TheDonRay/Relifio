import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

require("../styles/Home.css");

export default function Home() {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  // initialize the use Navigate here
  const navigate = useNavigate();

  // Reusable function to animate any text into spans
  // const animateText = (element, text) => {
  //   if (!element) return;

  //   element.innerHTML = "";
  //   text.split("").forEach((char, index) => {
  //     const span = document.createElement("span");

  //     // keep spaces visible
  //     // span.textContent = char === " " ? "\u00A0" : char;
  //     span.textContent = char;

  //     span.style.animationDelay = `${index * 0.06}s`;
  //     span.classList.add("letter-animate");
  //     element.appendChild(span);
  //   });
  // };
  const animateText = (element, text) => {
    if (!element) return;

    element.innerHTML = "";

    const words = text.split(" ");
    let index = 0; // to keep animation delay continuous

    words.forEach((word, wordIdx) => {
      // wrapper for the whole word
      const wordSpan = document.createElement("span");
      wordSpan.classList.add("word");
      element.appendChild(wordSpan);

      // each letter inside the word
      [...word].forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animationDelay = `${index * 0.06}s`;
        span.classList.add("letter-animate");
        wordSpan.appendChild(span);
        index++;
      });

      // add a normal space *between* words
      if (wordIdx !== words.length - 1) {
        element.appendChild(document.createTextNode(" "));
      }
    });
  };

  useEffect(() => {
    const titleText = "Where technology meets empathy.";
    const paragraphText =
      "Your thoughts become chapters, Your chapters become the story of you.";

    animateText(titleRef.current, titleText);
    animateText(paragraphRef.current, paragraphText);
  }, []);

  // later set upo the button use navigates
  // intialize button functions herer as such
  // learn more button function here
  function buttonNav1() {
    navigate("/Learnmore");
  }

  // second function for navigation to buttnav2
  function buttonNav2() {
    navigate("/Mainpage");
  }

  return (
    <div className="home-wrapper">
      <div className="container1">
        <h1 className="title" ref={titleRef}></h1>

        <p className="paragraph-style" ref={paragraphRef}></p>

        <div className="buttons-row">
          <button className="btn1" onClick={buttonNav1}>
            <span>Learn More</span>
          </button>
          <button className="btn2" onClick={buttonNav2}>
            <span>Begin a chapter!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
