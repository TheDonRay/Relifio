import React from "react";
import { useState, useRef, useEffect } from "react";
require("../styles/Mainpage.css");

export default function MainPage() {
  const [textValue, newTextValue] = useState("");
  const [messages, setMessages] = useState([]); // NEW: Store conversation
  const [sessionId, setSessionId] = useState(""); // NEW: Track session
  const [isLoading, setIsLoading] = useState(false); // NEW: Loading state
  const textareaRef = useRef(null);

  // NEW: Generate sessionId when component loads
  useEffect(() => {
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    console.log("Session ID created:", newSessionId);
  }, []);

  const handleChange = (textevent) => {
    const textarea = textevent.target;
    newTextValue(textarea.value);

    // Auto-resize textarea
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const buttonsubmission = async (btnevent) => {
    btnevent.preventDefault();

    if (textValue.trim() && !isLoading) {
      const userMessage = textValue.trim();
      console.log("userWrote:", userMessage);
      
      // NEW: Add user message to UI immediately
      setMessages(prev => [...prev, { sender: 'user', message: userMessage }]);
      
      // Clear input
      newTextValue("");

      // Reset textarea height after submission
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      setIsLoading(true); // NEW: Start loading

      try {
        const sendData = await fetch(`http://localhost:6700/api/userconvo`, { // CHANGED: endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            message: userMessage,
            sessionId: sessionId // NEW: Send sessionId
          }),
        });
        const res = await sendData.json();
        console.log("Res sent successfully to the backend", res);

        // NEW: Add AI response to UI
        if (res.airesponse) {
          setMessages(prev => [...prev, { 
            sender: 'ai', 
            message: res.airesponse 
          }]);
        }

      } catch (error) {
        console.log("There was an error sending data to the backend", error);
        // NEW: Show error message to user
        setMessages(prev => [...prev, { 
          sender: 'ai', 
          message: 'Sorry, something went wrong. Please try again.' 
        }]);
      } finally {
        setIsLoading(false); // NEW: Stop loading
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

          {/* NEW: Display conversation messages */}
          {messages.length > 0 && (
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
                >
                  <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.message}
                </div>
              ))}
              {isLoading && (
                <div className="message ai-message">
                  <strong>AI:</strong> <em>typing...</em>
                </div>
              )}
            </div>
          )}

          <div className="textbox">
            <form onSubmit={buttonsubmission} className="input-form">
              <textarea
                ref={textareaRef}
                value={textValue}
                onChange={handleChange}
                placeholder="Hey there! Excited for a new chapter. What's on your mind today?"
                className="text-input"
                disabled={isLoading} // NEW: Disable while loading
              />
              <button 
                className="submitbtn" 
                disabled={!textValue.trim() || isLoading} // NEW: Disable while loading
              >
                {isLoading ? 'Sending...' : 'Send'} {/* NEW: Show loading text */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}