import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";

import "../styles/Home.css";

// Example chapters shown in the hero's table of contents.
const sampleChapters = [
  { title: "The week everything felt heavy", page: 3 },
  { title: "Talking through the breakup", page: 11 },
  { title: "Saying no without the guilt", page: 18 },
  { title: "A good morning, finally", page: 26 },
];

const romanNumerals = ["I", "II", "III", "IV", "V"];

export default function Home() {
  const titleRef = useRef(null);

  // Reveal the headline one letter at a time, keeping words unbroken
  const animateText = (element, text) => {
    if (!element) return;

    element.innerHTML = "";

    const words = text.split(" ");
    let index = 0; // to keep animation delay continuous

    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.classList.add("word");
      element.appendChild(wordSpan);

      [...word].forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animationDelay = `${index * 0.035}s`;
        span.classList.add("letter-animate");
        wordSpan.appendChild(span);
        index++;
      });

      if (wordIdx !== words.length - 1) {
        element.appendChild(document.createTextNode(" "));
      }
    });
  };

  useEffect(() => {
    animateText(titleRef.current, "Where technology meets empathy.");
  }, []);

  return (
    <div className="home">
      <SiteHeader />

      <main className="home-main">
        <section className="home-intro">
          <h1 className="home-title" ref={titleRef} aria-label="Where technology meets empathy.">
            Where technology meets empathy.
          </h1>
          <p className="home-lede">
            Your thoughts become chapters. Your chapters become the story of you.
          </p>
          <div className="home-actions">
            <Link to="/Mainpage" className="btn btn-primary">
              Begin a chapter
            </Link>
            <Link to="/Learnmore" className="btn btn-quiet">
              How it works
            </Link>
          </div>
        </section>

        <aside className="contents" aria-label="Example table of contents">
          <h2 className="contents-heading">Contents</h2>
          <ol className="contents-list">
            {sampleChapters.map((chapter, i) => (
              <li key={chapter.title} className="contents-row">
                <span className="contents-num">{romanNumerals[i]}</span>
                <span className="contents-title">{chapter.title}</span>
                <span className="contents-leader" aria-hidden="true" />
                <span className="contents-page">{chapter.page}</span>
              </li>
            ))}
            <li className="contents-row contents-next">
              <span className="contents-num">{romanNumerals[sampleChapters.length]}</span>
              <Link to="/Mainpage" className="contents-title">
                Your next chapter
              </Link>
              <span className="contents-leader" aria-hidden="true" />
              <span className="contents-page">33</span>
            </li>
          </ol>
          <p className="contents-note">
            Every conversation you close is summarized and saved as a chapter you can come back
            to.
          </p>
        </aside>
      </main>
    </div>
  );
}
