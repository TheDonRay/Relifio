import React from "react";
import { useState } from "react";
require("../styles/Mainpage.css");

export default function MainPage() {
  const [textValue, newTextValue] = useState("");

  const handleChange = (textevent) => {
    newTextValue(textevent.target.value);
  };

  // TODO: need to set up post request to the backend to handle the body of text element. 
  const buttonsubmission = (btnevent) => {
    btnevent.preventDefault();

    if (textValue.trim()) {
      console.log("userWrote:", textValue);
      newTextValue("");
    }
  };

  return (
    <>
      <div className="title-before-textbox">
        <h1 className="heading-title">
          <span className="word word-1">Let's</span>{" "}
          <span className="word word-2">dive</span>{" "}
          <span className="word word-3">into</span>{" "}
          <span className="word word-4">a</span>{" "}
          <span className="word word-5">new</span>{" "}
          <span className="word word-6">chapter</span>
        </h1>
      </div>

      <div className="container-dv">
        <div className="content-wrapper">
          <div className="hold-icon-div">
            <img src="/therapist.png" alt="Relifio Icon" className="icon-img" />
          </div>

          <div className="textbox">
            <form onSubmit={buttonsubmission} className="input-form">
              <input
                type="text"
                value={textValue}
                onChange={handleChange}
                placeholder="Hey there! Excited for a new chapter. What's on your mind today?"
                className="text-input"
              />
              <button className="submitbtn" disabled={!textValue.trim()}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}