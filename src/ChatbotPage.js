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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Knowledge base about Jeffrey
  const knowledgeBase = {
    "who are you": "I'm Jeffrey's AI assistant! I can tell you all about Jeffrey Oduman, his background, skills, and experience.",
    "what is jeffrey studying": "Jeffrey is studying BSE Computer Science + MSE Robotics, AI Track at the University of Pennsylvania with a GPA of 3.91/4.00.",
    "what are jeffrey's skills": "Jeffrey has expertise in Python, Java, JavaScript, C++, OCaml, SQL, HTML/CSS, React, Jetpack Compose, Pandas, Scikit-learn, Git, Docker, Firebase, WSL, Tableau, Arduino, Raspberry Pi, I2C, and UART.",
    "what projects has jeffrey worked on": "Jeffrey has worked on several impressive projects including Quantum Trading (autonomous trading platform), Transparency Now (Android app for whistleblowers), NBA Predictor (ML model with 0.93 AUC), Wiki Olympics (Wikipedia scraping engine), and a Chess Game built from scratch in Java.",
    "what is jeffrey's experience": "Jeffrey has experience as a Machine Learning Researcher at JoyNet Research, Software Engineer at Penn Electric Racing, Robotics Engineer at Sung Robotics Group, and Teaching Assistant for CIS 1200 at University of Pennsylvania.",
    "where did jeffrey go to school": "Jeffrey attended African Leadership Academy for A-Levels (2022-2024) where he achieved 97% in Mathematics and 96% in Computer Science, placing in the top 5% of his class. He's now at the University of Pennsylvania (2024-2028).",
    "what is jeffrey's gpa": "Jeffrey has an excellent GPA of 3.91/4.00 at the University of Pennsylvania.",
    "what research areas": "Jeffrey's research areas focus on AI and Robotics, which aligns with his MSE Robotics, AI Track program.",
    "contact jeffrey": "You can contact Jeffrey through his GitHub (github.com/odzjeffreyjr), LinkedIn (linkedin.com/in/jeffrey-oduman-533094216), or download his resume from the main page.",
    "resume": "Jeffrey's resume is available for download on the main portfolio page. It contains detailed information about his education, experience, and projects.",
    "github": "Jeffrey's GitHub profile is github.com/odzjeffreyjr where you can find all his projects including Quantum Trading, Transparency Now, NBA Predictor, Wiki Olympics, and Chess Game.",
    "linkedin": "Jeffrey's LinkedIn profile is linkedin.com/in/jeffrey-oduman-533094216 where you can connect with him professionally.",
    "quantum trading": "Quantum Trading is Jeffrey's autonomous trading platform that uses the Alpaca API with advanced algorithms for market analysis and automated decision making. It's available on GitHub.",
    "transparency now": "Transparency Now is Jeffrey's Android app designed for whistleblowers and audit reporting. It features secure communication channels and encrypted data storage.",
    "nba predictor": "NBA Predictor is Jeffrey's machine learning model using Logistic Regression with 0.93 AUC for predicting NBA game outcomes based on historical data.",
    "wiki olympics": "Wiki Olympics is Jeffrey's Wikipedia scraping engine for Olympic data with comprehensive statistics and historical analysis capabilities.",
    "chess game": "Jeffrey built a PvP Java chess game from scratch with complete rule implementation and intuitive user interface.",
    "penn electric racing": "At Penn Electric Racing, Jeffrey worked as a Software Engineer building C++ applications and PySerial interfaces for aero & battery engineering, optimizing performance and data collection systems.",
    "joynet research": "At JoyNet Research, Jeffrey worked as a Machine Learning Researcher developing ML algorithms and social network features using Firebase, implementing advanced recommendation systems and user behavior analysis.",
    "sung robotics": "At Sung Robotics Group, Jeffrey worked as a Robotics Engineer implementing 3D Dubins path inverse kinematics algorithms for autonomous navigation and path planning systems.",
    "teaching assistant": "Jeffrey is a Teaching Assistant for CIS 1200 at the University of Pennsylvania, where he leads debugging sessions for OCaml & Java, conducts recitations, and provides one-on-one student support.",
    "african leadership academy": "Jeffrey attended African Leadership Academy (2022-2024) where he achieved excellent A-Level results: 97% in Mathematics and 96% in Computer Science, placing in the top 5% of his class."
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Check for partial matches
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! I'm here to help you learn about Jeffrey. What would you like to know?";
    }
    
    if (lowerMessage.includes("thank")) {
      return "You're welcome! Feel free to ask me anything else about Jeffrey.";
    }
    
    if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
      return "Goodbye! Feel free to come back anytime to learn more about Jeffrey.";
    }
    
    // Default response for unrecognized questions
    return "I'm not sure about that specific question, but I can tell you about Jeffrey's education, skills, projects, experience, or background. What would you like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

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

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      const newBotMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
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
      >
        <motion.div
          className="chatbot-container"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="profile-section">
              <div className="profile-picture">
                <img src="/logo.png" alt="Jeffrey Oduman" />
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

          {/* Input */}
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about Jeffrey..."
              className="message-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
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