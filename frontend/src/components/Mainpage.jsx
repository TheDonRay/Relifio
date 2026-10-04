import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/Mainpage.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_HOSTED_URL;

const suggestions = [
  "I've been feeling stressed lately",
  "I want to talk about my day",
  "I need someone to listen",
];

const createSessionId = () =>
  `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function MainPage() {
  const [textValue, newTextValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, ConversationSummary] = useState("");
  const [summaryFailed, setSummaryFailed] = useState(false);
  const [summaryLoad, summaryIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Generate or retrieve sessionId when component loads
  useEffect(() => {
    let existingSessionId = localStorage.getItem("chatSessionId");

    if (!existingSessionId) {
      existingSessionId = createSessionId();
      localStorage.setItem("chatSessionId", existingSessionId);
    }

    setSessionId(existingSessionId);
  }, []);

  // Auto-scroll to bottom when new messages or the summary arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading, summary]);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
  };

  const handleChange = (textevent) => {
    newTextValue(textevent.target.value);
    resizeTextarea();
  };

  const sendMessage = async () => {
    if (!textValue.trim() || isLoading || !sessionId) return;

    const userMessage = textValue.trim();

    // Add user message to UI immediately
    setMessages((prev) => [...prev, { sender: "user", message: userMessage }]);
    newTextValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsLoading(true);

    try {
      const sendData = await fetch(`${BACKEND_URL}/api/userconvo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
        }),
      });

      if (!sendData.ok) {
        throw new Error(`HTTP error! status: ${sendData.status}`);
      }

      const res = await sendData.json();

      if (res.success && res.airesponse) {
        setMessages((prev) => [...prev, { sender: "ai", message: res.airesponse }]);
      } else {
        throw new Error(res.error || "Invalid response format");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "error",
          message: "Relifio couldn't reply because the server didn't respond. Send your message again to retry.",
        },
      ]);
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  const buttonsubmission = (btnevent) => {
    btnevent.preventDefault();
    sendMessage();
  };

  // Enter sends, Shift+Enter adds a new line
  const handleKeyDown = (keyevent) => {
    if (keyevent.key === "Enter" && !keyevent.shiftKey && !keyevent.nativeEvent.isComposing) {
      keyevent.preventDefault();
      sendMessage();
    }
  };

  const applySuggestion = (text) => {
    newTextValue(text);
    textareaRef.current?.focus();
  };

  const handleSummaryConvo = async () => {
    if (!sessionId || sessionId.trim() === "") {
      return;
    }
    summaryIsLoading(true);
    setSummaryFailed(false);

    try {
      const SummaryBackend = await fetch(`${BACKEND_URL}/api/convosummary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: sessionId }),
      });

      if (!SummaryBackend.ok) {
        throw new Error(`HTTP error! status: ${SummaryBackend.status}`);
      }

      const responseFromBackend = await SummaryBackend.json();
      ConversationSummary(responseFromBackend.AiConvoSummary);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummaryFailed(true);
      ConversationSummary("The summary couldn't be created because the server didn't respond. Try closing the chapter again.");
    } finally {
      summaryIsLoading(false);
    }
  };

  const startNewChapter = () => {
    const newSessionId = createSessionId();
    localStorage.setItem("chatSessionId", newSessionId);
    setSessionId(newSessionId);
    setMessages([]);
    ConversationSummary("");
    setSummaryFailed(false);
    newTextValue("");
    textareaRef.current?.focus();
  };

  const chapterClosed = summary && !summaryFailed;

  return (
    <div className="chat">
      <header className="chat-header">
        <Link to="/" className="wordmark">
          Relifio
        </Link>
        <span className="chat-status">{chapterClosed ? "Chapter saved" : "Chapter in progress"}</span>
        <button
          className="btn btn-quiet chat-close"
          onClick={handleSummaryConvo}
          disabled={summaryLoad || messages.length === 0 || chapterClosed}
        >
          {summaryLoad ? "Summarizing…" : "Close chapter"}
        </button>
      </header>

      <main className="chat-scroll">
        <div className="chat-column">
          {messages.length === 0 ? (
            <div className="chat-empty">
              <h1>What's on your mind?</h1>
              <p>
                Write as much or as little as you like. When you're done, close the chapter and
                Relifio will summarize it for you.
              </p>
              <ul className="suggestions" aria-label="Ways to start">
                {suggestions.map((text) => (
                  <li key={text}>
                    <button type="button" className="suggestion" onClick={() => applySuggestion(text)}>
                      {text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ol className="messages" aria-live="polite">
              {messages.map((msg, index) => (
                <li key={index} className={`message message-${msg.sender}`}>
                  <span className="visually-hidden">
                    {msg.sender === "user" ? "You said:" : "Relifio said:"}
                  </span>
                  {msg.message}
                </li>
              ))}
              {isLoading && (
                <li className="message message-ai typing" aria-label="Relifio is writing">
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
              )}
            </ol>
          )}

          {summary && (
            <section
              className={`chapter-summary ${summaryFailed ? "is-error" : ""}`}
              aria-labelledby="summary-heading"
            >
              <h2 id="summary-heading">{summaryFailed ? "Summary not created" : "Chapter summary"}</h2>
              <p>{summary}</p>
              {!summaryFailed && (
                <div className="chapter-summary-footer">
                  <span>Saved to your chapters.</span>
                  <button type="button" className="btn btn-primary" onClick={startNewChapter}>
                    Start a new chapter
                  </button>
                </div>
              )}
            </section>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="composer">
        <form onSubmit={buttonsubmission} className="composer-form">
          <label htmlFor="chat-input" className="visually-hidden">
            Your message
          </label>
          <textarea
            id="chat-input"
            ref={textareaRef}
            value={textValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Share what's on your mind…"
            className="composer-input"
            rows={1}
            aria-describedby="composer-hint"
          />
          <button
            type="submit"
            className="composer-send"
            disabled={!textValue.trim() || isLoading || !sessionId}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M12 19V5M5 12l7-7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
        <p id="composer-hint" className="composer-hint">
          Enter to send, Shift+Enter for a new line
        </p>
      </footer>
    </div>
  );
}
