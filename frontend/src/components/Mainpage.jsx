import React from "react";
import { useState, useRef } from "react";
require("../styles/Mainpage.css");

export default function MainPage() {
  const [textValue, newTextValue] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (textevent) => {
    const textarea = textevent.target;
    newTextValue(textarea.value);

    // Auto-resize textarea
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const buttonsubmission = async (btnevent) => {
    btnevent.preventDefault();

    if (textValue.trim()) {
      console.log("userWrote:", textValue);
      // implement try and atch for the sending data here
      try {
        const sendData = await fetch(`http://localhost:6700/api/usertext`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: textValue }),
        });
        const res = await sendData.json();
        console.log("Res sent successfully to the backend", res);

        // clear the textValue
        newTextValue("");

        // Reset textarea height after submission
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      } catch (error) {
        console.log("There was an error sending data to the backend", error);
      }
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
              <textarea
                ref={textareaRef}
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
