import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ChatbotPage.css";

const ChatbotPage = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! I'm Jeffrey's AI assistant. Ask me anything about Jeffrey's background, skills, projects, or experience!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const messagesEndRef = useRef(null);
  
  // LLM Service configuration
  const LLM_SERVICE_URL = process.env.REACT_APP_LLM_SERVICE_URL || "https://llm-service-313722807947.us-central1.run.app";
  const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY || "9n27309GGSt3yg9c210T5t8vnvmyctYrJKFHnyg2yro8aymyt0cry35987yv9mq";

  // Validate environment variables
  useEffect(() => {
    if (!REACT_APP_API_KEY) {
      console.error('REACT_APP_API_KEY is not defined in environment variables');
    }
    if (!LLM_SERVICE_URL) {
      console.error('REACT_APP_LLM_SERVICE_URL is not defined in environment variables');
    }
  }, [REACT_APP_API_KEY, LLM_SERVICE_URL]);

  // Prevent body scroll when chatbot is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Handle mobile viewport issues
      const setMobileVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setMobileVH();
      window.addEventListener('resize', setMobileVH);
      window.addEventListener('orientationchange', setMobileVH);
      
      return () => {
        // Restore scrolling
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Clean up mobile viewport
        window.removeEventListener('resize', setMobileVH);
        window.removeEventListener('orientationchange', setMobileVH);
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Progress messages for different stages
  const initialSetupMessages = [
    "Warming up container...",
    "Spawning Llama model...",
    "Loading knowledge base...",
    "Processing your question...",
    "Generating response..."
  ];

  const apiCallMessages = [
    "Making API call...",
    "Generating tokens...",
    "Generating tokens...",
    "Response received"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to cycle through progress messages
  const showProgressMessages = () => {
    setShowProgress(true);
    let messageIndex = 0;
    
    // Choose appropriate message set based on whether this is first interaction
    const currentMessages = isFirstInteraction ? initialSetupMessages : apiCallMessages;
    setProgressMessage(currentMessages[messageIndex]);
    
    const interval = setInterval(() => {
      messageIndex++;
      if (messageIndex < currentMessages.length) {
        setProgressMessage(currentMessages[messageIndex]);
      } else {
        // Stay at the last message, don't loop
        clearInterval(interval);
      }
    }, isFirstInteraction ? 1500 : 2000); // Slower for API calls since fewer messages
    
    return interval;
  };

  // Function to make API call to LLM service
  const callLLMService = async (userMessage, previousMessages = []) => {
    if (!REACT_APP_API_KEY) {
      return "Configuration error: API key is missing. Please check your environment setup.";
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      const response = await fetch(`${LLM_SERVICE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': REACT_APP_API_KEY
        },
        body: JSON.stringify({
          message: userMessage,
          context: previousMessages.slice(-6), // Send last 6 messages for context
          max_tokens: 100
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Authentication failed - please check API key');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded - please try again in a moment');
        } else if (response.status >= 500) {
          throw new Error('Server error - the AI service is temporarily unavailable');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response || "I'm having trouble generating a response right now.";
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('LLM Service error:', error);
      
      if (error.name === 'AbortError') {
        return "I apologize, but my response is taking longer than expected. The AI model might be warming up or experiencing high load. Please try again in a moment.";
      }
      
      if (error.message.includes('fetch') || error.message.includes('network')) {
        return "I'm having trouble connecting to my AI brain right now. Please check your internet connection and try again.";
      }
      
      if (error.message.includes('Authentication failed')) {
        return "There's a configuration issue with the AI service. Please contact the administrator.";
      }
      
      if (error.message.includes('Rate limit')) {
        return "I'm receiving too many requests right now. Please wait a moment and try again.";
      }
      
      return `I encountered an error: ${error.message}. Please try asking your question again.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    const newUserMessage = {
      id: Date.now(),
      type: "user",
      text: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Start progress messages
    const progressInterval = showProgressMessages();

    try {
      // Prepare context from previous messages
      const previousMessages = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Call LLM service
      const botResponse = await callLLMService(userMessage, previousMessages);
      
      const newBotMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: "I'm sorry, I encountered an error while processing your message. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      // Clean up progress messages
      clearInterval(progressInterval);
      setShowProgress(false);
      setIsTyping(false);
      
      // Mark that first interaction is complete
      if (isFirstInteraction) {
        setIsFirstInteraction(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle input focus to ensure it stays visible on mobile
  const handleInputFocus = () => {
    // Small delay to ensure keyboard is shown
    setTimeout(() => {
      scrollToBottom();
    }, 300);
  };

  // Prevent scroll propagation when scrolling inside the chatbot
  const handleOverlayScroll = (e) => {
    e.stopPropagation();
  };

  // Prevent scroll on overlay background, allow it only in messages container
  const handleOverlayWheel = (e) => {
    // If the scroll is not happening inside the messages container, prevent it
    if (!e.target.closest('.scrollable-content')) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="chatbot-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onWheel={handleOverlayWheel}
        onScroll={handleOverlayScroll}
      >
        <motion.div
          className="chatbot-container"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Progress Bar */}
          <AnimatePresence>
            {showProgress && (
              <motion.div
                className="progress-bar"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  key={progressMessage}
                  className="progress-message"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="progress-icon">🤖</div>
                  <span>{progressMessage}</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="chatbot-header">
            <div className="profile-section">
              <div className="profile-picture">
                <img 
                  src={`${process.env.PUBLIC_URL}/logo.png`} 
                  alt="Jeffrey Oduman" 
                  onError={(e) => {
                    e.target.src = `${process.env.PUBLIC_URL}/funJeffrey.png`; // Fallback image
                  }} 
                />
              </div>
              <div className="profile-info">
                <h2>Jeffrey Oduman</h2>
                <p>AI + Robotics Engineer</p>
              </div>
            </div>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="scrollable-content">
            {/* Powered By Strip */}
            <div className="powered-by-strip">
              <span className="powered-by">Powered by Llama + Google Cloud (Experimental)</span>
            </div>

            {/* Messages */}
            <div className="messages-container">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-content">
                    {message.text}
                  </div>
                  <div className="message-timestamp">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  className="message bot typing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={handleInputFocus}
              placeholder="Ask me about Jeffrey..."
              className="message-input"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="send-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9"></polygon>
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatbotPage; 