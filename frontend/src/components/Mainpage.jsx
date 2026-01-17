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
      ConversationSummary(responseFromBackend); 
      console.log("Summary received:", responseFromBackend);
      
    } catch (error) { 
      console.error("Error fetching summary:", error);
      ConversationSummary("Failed to generate summary. Please try again.");
    } finally {
      summaryIsLoading(false); // stop the loading 
    }

  }

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

          {/* Display conversation messages */}
          {messages.length > 0 && (
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
                >
                  <strong>{msg.sender === 'user' ? 'You' : 'Relifio'}:</strong>
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    {msg.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message ai-message">
                  <strong>Relifio:</strong> <em>typing...</em>
                </div>
              )}
              <div ref={messagesEndRef} /> {/* For auto-scroll */}
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
                disabled={isLoading}
              />
              <button 
                className="submitbtn" 
                disabled={!textValue.trim() || isLoading || !sessionId}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div> 

          {/*Working on the satisfy part of user being complete with their story*/} 
          <div className="satisfy-container"> 
            <div className="satisfy-button"> 
              <button 
                className='satisfybtn'
                onClick={handleSummaryConvo}
                disabled={summaryLoad}
              > 
                {summaryLoad ? 'Generating summary...' : 'I feel satisfied with our conversation'}
              </button>
            </div>
            {summary && (
              <div className="summary-display">
                <h3>Conversation Summary:</h3>
                <p>{summary}</p>
              </div>
            )}
          </div>
        </div> 
      </div>
    </>
  );
}