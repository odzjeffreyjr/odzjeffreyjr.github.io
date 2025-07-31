import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Fixed button positioned at bottom right of the picture
const SwitchButton = ({ onClick, isFunMode }) => {
  return (
    <motion.button
      className={`rotating-switch-btn ${isFunMode ? 'moon' : 'sun'}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={isFunMode ? "Switch to Serious Mode" : "Switch to Fun Mode"}
    >
      {isFunMode ? "🌙" : "☀️"}
    </motion.button>
  );
};

export default function MePage() {
  const [isFunMode, setIsFunMode] = useState(false);

  const toggleMode = () => {
    setIsFunMode(prev => {
      const newMode = !prev;
      // Toggle the inverted class on the body element
      if (newMode) {
        document.body.classList.add('inverted');
      } else {
        document.body.classList.remove('inverted');
      }
      return newMode;
    });
  };

  // Cleanup effect to remove inverted class when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('inverted');
    };
  }, []);

  return (
    <main className="quantum-trader">
      {/* Liquid Crystal Grid Background */}
      <div className="liquid-grid"></div>
      
      {/* Floating Icons */}
      <div className="floating-icons">
        <div className="floating-icon">⚡</div>
        <div className="floating-icon">🔬</div>
        <div className="floating-icon">🤖</div>
        <div className="floating-icon">💻</div>
        <div className="floating-icon">🚀</div>
        <div className="floating-icon">🎯</div>
      </div>

      <motion.header 
        className="trader-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="header-content">
          <div className="title-section">
            <div className="main-title">
              <h1 className="title-text">About Me</h1>
              <p className="title-subtitle">Get to Know Jeffrey</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Profile Picture Section */}
      <motion.div 
        className="profile-section"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="profile-container">
          <motion.div 
            className="profile-picture"
            key={isFunMode ? 'fun' : 'serious'}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={isFunMode ? "/funJeffrey.png" : "/seriousJeffrey.png"} 
              alt={isFunMode ? "Fun Jeffrey" : "Serious Jeffrey"}
            />
          </motion.div>
          
          <SwitchButton onClick={toggleMode} isFunMode={isFunMode} />
        </div>
      </motion.div>

      {/* About Me Content */}
      <motion.div 
        className="about-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="about-card">
          <h2 className="about-title">Who Am I?</h2>
          <p className="about-paragraph">
            Hello! I'm Jeffrey Oduman, a passionate Computer Science and Robotics student at the University of Pennsylvania. 
            My journey into technology began in Uganda, where I developed a deep fascination with how computers and artificial 
            intelligence can solve real-world problems and create meaningful impact in people's lives.
          </p>
          
          <p className="about-paragraph">
            Currently pursuing a dual degree in BSE Computer Science and MSE Robotics with a focus on AI, I'm constantly 
            exploring the intersection of software engineering, machine learning, and robotics. My work spans from building 
            AI-powered social media platforms to developing autonomous robotic systems, always with an eye toward innovation 
            and practical application.
          </p>
          
          <p className="about-paragraph">
            When I'm not coding or working on research projects, you'll find me mentoring fellow students, contributing to 
            open-source projects, or diving deep into the latest advancements in artificial intelligence and robotics. 
            I believe in the power of technology to bridge gaps, create opportunities, and build a better future for everyone.
          </p>
          
          <p className="about-paragraph">
            My goal is to leverage my technical skills and diverse background to create solutions that not only demonstrate 
            technical excellence but also have a positive impact on society. Whether it's through developing intelligent 
            systems, conducting cutting-edge research, or building the next generation of autonomous technologies, I'm 
            committed to pushing the boundaries of what's possible.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
