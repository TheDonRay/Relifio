import React from "react";
import { useState, useRef, useEffect } from "react";
require("../styles/Mainpage.css");

export default function MainPage() {
  const [textValue, newTextValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, ConversationSummary] = useState("");
  const [summaryLoad, summaryIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null); // NEW: For auto-scroll

  // Generate or retrieve sessionId when component loads
  useEffect(() => {
    // Check if session exists in localStorage
    let existingSessionId = localStorage.getItem('chatSessionId');

    if (!existingSessionId) {
      // Create new session if none exists
      existingSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatSessionId', existingSessionId);
    }

    setSessionId(existingSessionId);
    console.log("Session ID:", existingSessionId);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (textevent) => {
    const textarea = textevent.target;
    newTextValue(textarea.value);

    // Auto-resize textarea
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const buttonsubmission = async (btnevent) => {
    btnevent.preventDefault();

    if (textValue.trim() && !isLoading && sessionId) {
      const userMessage = textValue.trim();
      console.log("User wrote:", userMessage);

      // Add user message to UI immediately
      setMessages(prev => [...prev, { sender: 'user', message: userMessage }]);

      // Clear input
      newTextValue("");

      // Reset textarea height after submission
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      setIsLoading(true);

      try {
        console.log("Sending to backend:", { message: userMessage, sessionId });

        const sendData = await fetch(`http://localhost:6700/api/userconvo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            sessionId: sessionId
          }),
        });

        // Check if response is ok
        if (!sendData.ok) {
          throw new Error(`HTTP error! status: ${sendData.status}`);
        }

        const res = await sendData.json(); // gets response from the backend here
        console.log("Response from backend:", res);

        // Add AI response to UI
        if (res.success && res.airesponse) {
          setMessages(prev => [...prev, {
            sender: 'ai',
            message: res.airesponse
          }]);
        } else {
          throw new Error(res.error || 'Invalid response format');
        }

      } catch (error) {
        console.error("Error sending data to backend:", error);
        setMessages(prev => [...prev, {
          sender: 'ai',
          message: 'Sorry, something went wrong. Please try again.'
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSummaryConvo = async () => {
    // start of with a base case here as such
    if (!sessionId || sessionId.trim() === ''){
      return;
    }
    //set the loading to true here
    summaryIsLoading(true); // starts the loading

    //implement a try and catch case here as such
    try {
      console.log('Requesting summary for session', sessionId);
      // now we need to set up the backend to recieve the session ID as a post request because its sending data to the backend.
      const SummaryBackend = await fetch(`http://localhost:6700/api/convosummary`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId: sessionId }),
      });

      if (!SummaryBackend.ok) {
        throw new Error(`HTTP error! status: ${SummaryBackend.status}`);
      }

      const responseFromBackend = await SummaryBackend.json();
      // update the conversationSummary to hold the summary data from the backend.
      ConversationSummary(responseFromBackend.AiConvoSummary);
      console.log("Summary received:", responseFromBackend);

    } catch (error) {
      console.error("Error fetching summary:", error);
      ConversationSummary("Failed to generate summary. Please try again.");
    } finally {
      summaryIsLoading(false); // stop the loading
    }

  }

  return (
    <div className="main-page">
      {/* Header Section */}
      <header className="chat-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-circle">
              <img src="/therapist.png" alt="Relifio Icon" className="logo-img" />
            </div>
            <div className="header-text">
              <h1 className="brand-name">Relifio</h1>
              <span className="status-badge">
                <span className="status-dot"></span>
                Online
              </span>
            </div>
          </div>
          <div className="header-right">
            <button
              className="end-session-btn"
              onClick={handleSummaryConvo}
              disabled={summaryLoad || messages.length === 0}
            >
              {summaryLoad ? (
                <>
                  <span className="btn-spinner"></span>
                  Generating...
                </>
              ) : (
                <>
                  <span className="btn-icon">&#10003;</span>
                  End & Summarize
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Title Section */}
      <div className="title-section">
        <h2 className="heading-title">
          <span className="word word-1">Let's</span>{" "}
          <span className="word word-2">dive</span>{" "}
          <span className="word word-3">into</span>{" "}
          <span className="word word-4">a</span>{" "}
          <span className="word word-5">new</span>{" "}
          <span className="word word-6">chapter</span>
        </h2>
      </div>

      {/* Main Chat Container */}
      <div className="chat-container">
        {/* Messages Area */}
        <div className="messages-area">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">&#128172;</div>
              <h3>Start Your Journey</h3>
              <p>Share what's on your mind. I'm here to listen and support you.</p>
              <div className="suggestion-chips">
                <span className="suggestion">I've been feeling stressed lately</span>
                <span className="suggestion">I want to talk about my day</span>
                <span className="suggestion">I need someone to listen</span>
              </div>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-row ${msg.sender === 'user' ? 'user-row' : 'ai-row'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="avatar ai-avatar">
                      <img src="/therapist.png" alt="Relifio" />
                    </div>
                  )}
                  <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
                    <div className="message-content" style={{ whiteSpace: 'pre-wrap' }}>
                      {msg.message}
                    </div>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="avatar user-avatar">
                      <span>You</span>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="message-row ai-row">
                  <div className="avatar ai-avatar">
                    <img src="/therapist.png" alt="Relifio" />
                  </div>
                  <div className="message-bubble ai-bubble typing-bubble">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Summary Display */}
        {summary && (
          <div className="summary-card">
            <div className="summary-header">
              <span className="summary-icon">&#128214;</span>
              <h3>Your Chapter Summary</h3>
            </div>
            <div className="summary-content">
              <p>{summary}</p> {/*here is where we actually upload the backend response to the frontend. */}
            </div>
            <div className="summary-footer">
              <span>This chapter has been saved to your journey</span>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="input-area">
          <form onSubmit={buttonsubmission} className="input-form">
            <div className="input-wrapper">
              <textarea
                ref={textareaRef}
                value={textValue}
                onChange={handleChange}
                placeholder="Share what's on your mind..."
                className="chat-input"
                disabled={isLoading}
                rows={1}
              />
              <button
                type="submit"
                className="send-btn"
                disabled={!textValue.trim() || isLoading || !sessionId}
              >
                <span className="send-icon">&#10148;</span>
              </button>
            </div>
            <p className="input-hint">Press Enter to send, Shift+Enter for new line</p>
          </form>
        </div>
      </div>
    </div>
  );
}
