import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ChatbotPage from "./ChatbotPage";

const Card = ({ children, className = "" }) => (
  <motion.div 
    className={`card ${className}`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const EducationCard = ({ school, degree, gpa, years, courses }) => {
  const [isCoursesExpanded, setIsCoursesExpanded] = useState(false);

  return (
    <motion.div 
      className="education-card"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="school-name">{school}</div>
      <div className="degree-info">{degree}</div>
      <div className="gpa-info">{gpa}</div>
      <div className="degree-info">{years}</div>
      
      {courses && courses.length > 0 && (
        <div className="courses-section">
          <div 
            className={`courses-toggle ${isCoursesExpanded ? 'expanded' : ''}`}
            onClick={() => setIsCoursesExpanded(!isCoursesExpanded)}
          >
            Courses Taken
          </div>
          <div className={`courses-dropdown ${isCoursesExpanded ? 'expanded' : ''}`}>
            <div className="courses-grid">
              {courses.map((course, index) => (
                <div key={index} className="course-item">
                  <div className="course-name">{course}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ExperienceCard = ({ company, role, description, duration, location, link }) => (
  <motion.div 
    className="experience-card"
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
  >
    <div className="company-name">{company}</div>
    <div className="role-title">{role}</div>
    <div className="experience-duration">{duration}</div>
    <div className="experience-location">{location}</div>
    <div className="role-description">{description}</div>
    {link && (
      <div className="experience-link">
        <a 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="experience-btn"
          onClick={(e) => e.stopPropagation()}
        >
          {link.text}
        </a>
      </div>
    )}
  </motion.div>
);

const ExperienceCarousel = ({ experiences }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextExperience = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === experiences.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevExperience = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  const goToExperience = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div className="experience-carousel" onClick={(e) => e.stopPropagation()}>
      <div className="experience-carousel-container">
        <div 
          className="experience-carousel-track"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>
      
      <button className="experience-nav prev" onClick={prevExperience}>
        <svg viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6v12z"/>
        </svg>
      </button>
      
      <button className="experience-nav next" onClick={nextExperience}>
        <svg viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6v12z"/>
        </svg>
      </button>
      
      <div className="experience-indicators">
        {experiences.map((_, index) => (
          <div
            key={index}
            className={`experience-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={(e) => goToExperience(index, e)}
          />
        ))}
      </div>
    </div>
  );
};

const SkillItem = ({ name }) => (
  <motion.div 
    className="skill-item"
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="skill-name">{name}</div>
  </motion.div>
);

const SkillSection = ({ title, skills }) => (
  <motion.div 
    className="skill-section"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="skill-section-title">{title}</h3>
    <div className="skills-grid">
      {skills.map((skill, index) => (
        <SkillItem key={`${title}-${index}`} name={skill} />
      ))}
    </div>
  </motion.div>
);

// Helper for animated pop letters
const PopLetters = ({ text, accentEvery = 0, className = "" }) => (
  <span className={`pop-letters ${className}`}>
    {text.split("").map((char, i) => (
      <span
        key={i}
        className={`pop-letter${accentEvery && i % accentEvery === 0 ? " accent" : ""}`}
        style={{ animationDelay: `${i * 0.12}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
);

// Reverted to original smooth GIF bouncing logic
// Refactored: use refs for animation state, only update state to trigger re-render every 40ms
// Added scroll detection to pause animations during scrolling
// Added hover detection to pause animations when hovering over GIFs
// Added drag functionality for interactive GIF positioning
const useBouncingGifs = (count) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setTick] = useState(0); // dummy state to force re-render
  // eslint-disable-next-line no-unused-vars
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredGifIndex, setHoveredGifIndex] = useState(null);
  const [draggedGifIndex, setDraggedGifIndex] = useState(null);
  const gifsRef = useRef(
    Array.from({ length: count }).map(() => ({
      x: Math.random() * (window.innerWidth - 80),
      y: Math.random() * (window.innerHeight - 80),
      dx: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
      dy: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
      rot: Math.random() * 360,
      drot: (Math.random() * 1 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
      isDragging: false
    }))
  );

  useEffect(() => {
    let scrollTimeout;
    let isScrollingRef = { current: false };
    
    // Handle scroll events
    const handleScroll = () => {
      isScrollingRef.current = true;
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
      }, 500); // Stop scrolling state after 500ms of no scroll events
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let lastUpdate = Date.now();
    let frameId;
    const animate = () => {
      // Only animate if not scrolling and no GIF is being hovered or dragged
      if (!isScrollingRef.current && hoveredGifIndex === null && draggedGifIndex === null) {
        const gifs = gifsRef.current;
        for (let gif of gifs) {
          if (!gif.isDragging) {
            gif.x += gif.dx;
            gif.y += gif.dy;
            gif.rot += gif.drot;
            if (gif.x < 0) { gif.x = 0; gif.dx = -gif.dx; }
            if (gif.x > window.innerWidth - 80) { gif.x = window.innerWidth - 80; gif.dx = -gif.dx; }
            if (gif.y < 0) { gif.y = 0; gif.dy = -gif.dy; }
            if (gif.y > window.innerHeight - 80) { gif.y = window.innerHeight - 80; gif.dy = -gif.dy; }
          }
        }
      } else if (!isScrollingRef.current && (hoveredGifIndex !== null || draggedGifIndex !== null)) {
        // Only animate non-hovered and non-dragged GIFs
        const gifs = gifsRef.current;
        for (let i = 0; i < gifs.length; i++) {
          if (i !== hoveredGifIndex && i !== draggedGifIndex && !gifs[i].isDragging) {
            const gif = gifs[i];
            gif.x += gif.dx;
            gif.y += gif.dy;
            gif.rot += gif.drot;
            if (gif.x < 0) { gif.x = 0; gif.dx = -gif.dx; }
            if (gif.x > window.innerWidth - 80) { gif.x = window.innerWidth - 80; gif.dx = -gif.dx; }
            if (gif.y < 0) { gif.y = 0; gif.dy = -gif.dy; }
            if (gif.y > window.innerHeight - 80) { gif.y = window.innerHeight - 80; gif.dy = -gif.dy; }
          }
        }
      }
      
      // Only force re-render every ~40ms (25fps)
      if (Date.now() - lastUpdate > 40) {
        setTick(tick => tick + 1);
        lastUpdate = Date.now();
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [hoveredGifIndex, draggedGifIndex]); // Add draggedGifIndex to dependency array

  // Drag handlers
  const handleMouseDown = (index, e) => {
    e.preventDefault();
    setDraggedGifIndex(index);
    gifsRef.current[index].isDragging = true;
    
    const startX = e.clientX - gifsRef.current[index].x;
    const startY = e.clientY - gifsRef.current[index].y;

    const handleMouseMove = (e) => {
      gifsRef.current[index].x = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - startX));
      gifsRef.current[index].y = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - startY));
    };

    const handleMouseUp = () => {
      setDraggedGifIndex(null);
      gifsRef.current[index].isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Touch handlers for mobile
  const handleTouchStart = (index, e) => {
    e.preventDefault();
    setDraggedGifIndex(index);
    gifsRef.current[index].isDragging = true;
    
    const touch = e.touches[0];
    const startX = touch.clientX - gifsRef.current[index].x;
    const startY = touch.clientY - gifsRef.current[index].y;

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      gifsRef.current[index].x = Math.max(0, Math.min(window.innerWidth - 80, touch.clientX - startX));
      gifsRef.current[index].y = Math.max(0, Math.min(window.innerHeight - 80, touch.clientY - startY));
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      setDraggedGifIndex(null);
      gifsRef.current[index].isDragging = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  return { 
    gifs: gifsRef.current, 
    setHoveredGif: setHoveredGifIndex,
    handleMouseDown,
    handleTouchStart
  };
};

export default function Portfolio() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Section refs for scroll-to
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);

  const education = [
    {
      school: "University of Pennsylvania",
      degree: "BSE Computer Science + MSE Robotics, AI Track",
      gpa: "GPA: 3.91 / 4.00",
      years: "2024–2028",
      courses: [
        "Discrete Mathematics",
        "Programming Languages and Techniques",
        "Multivariable Calculus",
        "Social Networks",
        "Probability",
        "Algorithms and Data Structures",
        "Automata, Complexity, Computability",
        "Big Data Analytics",
        "Linear Algebra"
      ]
    },
    {
      school: "African Leadership Academy",
      degree: "Cambridge A Levels",
      gpa: "Best in South Africa: A Level Mathematics (97%) \nBest in South Africa: A Level Computer Science (96%) \nNational High School Chess Gold medal",
      years: "2022–2024",
      courses: [
        "Mathematics",
        "Computer Science",
        "Physics",
        "Number Theory",
        "Game Theory"
      ]
    }
  ];

  const experience = [
    {
      company: "JoyNet Project - SafeLab",
      role: "Full-stack Web Developer | Undergraduate Researcher",
      duration: "Jan 2025 - Present",
      location: "Philadelphia",
      description: "Engineered an AI-powered social media platform with automated content analysis and real-time sentiment classification. Built infinite-scroll feeds integrating Instagram, TikTok, and Threads using advanced web scraping and BERT-based ML models for content categorization.",
      link: {
        url: "https://joynet-99b18.web.app/",
        text: "Visit JoyNet"
      }
    },
    {
      company: "Penn Electric Racing",
      role: "Electrical Software Engineer",
      duration: "Sep 2024 - Present",
      location: "Philadelphia",
      description: "Developed PERDA, the team's custom data visualization library using matplotlib and NumPy. Implemented C++ sensor integration for aerodynamic analysis and created automated battery charging systems using PySerial and precision power supplies."
    },
    {
      company: "Sung Robotics Group",
      role: "Undergraduate Researcher | Research Award Recipient",
      duration: "Apr 2025 - Present",
      location: "Philadelphia",
      description: "Pioneered 3D CSC Dubins Path algorithms for robotic arm kinematics using advanced robotics libraries. Developed gradient descent-based inverse kinematics solvers for optimal path planning in compliant origami robot systems."
    },
    {
      company: "University of Pennsylvania",
      role: "Teaching Assistant, CIS 1200",
      duration: "Jan 2025 - Present",
      location: "Philadelphia",
      description: "Mentored 200+ students in programming fundamentals, leading weekly recitations and debugging sessions for OCaml and Java. Enhanced course materials and provided personalized support to improve student comprehension and coding skills."
    },
    {
      company: "Google Africa Developer Scholarship",
      role: "Associate Android Development Trainee",
      duration: "Jun 2022 – May 2023",
      location: "Remote",
      description: "Mastered full-stack Android development through intensive training program. Built 6 production-ready apps with advanced features including SQLite/Room databases, REST API integration, Firebase backend, and MVVM architecture following Material Design principles."
    }
  ];

  const skills = {
    languages: ["Python", "Kotlin", "Java", "C++", "OCaml", "SQL", "HTML", "CSS", "JavaScript"],
    librariesFrameworks: [
      "Java Swing", "Node.js", "React.js", "Pandas", "Polars", "Scikit-learn", 
      "Scikit-optimize", "PyTorch", "Matplotlib", "Plotly", "PySerial", "Alpaca-Py", 
      "JSoup", "Jetpack Compose", "Robotics-Toolbox", "Spatial-Math"
    ],
    protocols: ["CAN", "UART", "I2C", "SSH"],
    tools: [
      "Visual Studio Code", "Android Studio", "IntelliJ", "Canva", "Git", "Tableau", 
      "Room", "Docker", "Confluence", "Windows Subsystem for Linux (WSL)", "Ubuntu",
      "Raspberry Pi 4 (RP4)", "Arduino", "Firebase"
    ],
    machineLearning: [
      "Bert", "Finbert", "Faster-whisper", "Random Forest", "Logistic Regression", 
      "Multiple Linear Regression", "Gradient Boost"
    ]
  };

  // GIFs: brain for skills, heart for education, penguin for experience
  const gifImages = [
    { src: "/brain.gif", alt: "Neon Brain", className: "brain", section: "skills", ref: skillsRef, title: "Jump to Skills!" },
    { src: "/heart.gif", alt: "Neon Heart", className: "heart", section: "education", ref: educationRef, title: "Jump to Education!" },
    { src: "/coding.gif", alt: "Coding Penguin", className: "penguin", section: "experience", ref: experienceRef, title: "Jump to Experience!" }
  ];
  const { gifs: gifStates, setHoveredGif, handleMouseDown, handleTouchStart } = useBouncingGifs(gifImages.length);

  // Handler for GIF click: scroll to section
  const handleGifClick = (gif, idx) => {
    if (gif.ref && gif.ref.current) {
      gif.ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <main className="quantum-trader">
      {/* Liquid Crystal Grid Background */}
      <div className="liquid-grid"></div>
      
      {/* Floating GIFs (reverted to original smooth version) */}
      {gifImages.map((gif, i) => (
        <img
          key={gif.alt}
          src={gif.src}
          alt={gif.alt}
          className={`floating-gif ${gif.className}`}
          style={{
            left: gifStates[i]?.x ?? 0,
            top: gifStates[i]?.y ?? 0,
            transform: `rotate(${gifStates[i]?.rot ?? 0}deg)`,
            cursor: gifStates[i]?.isDragging ? 'grabbing' : 'grab',
            transition: gifStates[i]?.isDragging ? 'none' : 'filter 0.3s ease',
            userSelect: 'none'
          }}
          onClick={() => handleGifClick(gif, i)}
          onMouseEnter={() => setHoveredGif(i)}
          onMouseLeave={() => setHoveredGif(null)}
          onMouseDown={(e) => handleMouseDown(i, e)}
          onTouchStart={(e) => handleTouchStart(i, e)}
          title={gif.title}
          draggable={false}
        />
      ))}
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
        key="header"
      >
        <div className="header-content">
          <div className="title-section">
            <div className="main-title">
              <h1 className="title-text">Jeffrey Oduman</h1>
              <p className="title-subtitle">AI + Robotics Engineer | Web + Android Developer</p>
            </div>
          </div>
          <div className="status-panel">
            <div className="connection-status">
              <span className="status-indicator"></span>
              <span>Available for Hire</span>
            </div>
            <div className="download-buttons-bar">
              <a className="download-btn" href="/Jeffrey_Oduman_Resume.pdf" download>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      <motion.div 
        className="stats-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        key="stats"
      >
        <Card>
          <div className="stat-label">Languages</div>
          <div className="languages-marquee">
            <div className="languages-marquee-inner">
              {skills.languages.join(' • ')} • {skills.languages.join(' • ')}
            </div>
          </div>
        </Card>
        <div className="stat-card-pop">
          <div className="stat-label">Research Areas</div>
          <PopLetters text="AI, Robotics" accentEvery={3} />
        </div>
        <div className="stat-card-pop">
          <div className="stat-label">GPA</div>
          <PopLetters text="3.91 / 4.00" accentEvery={3} />
        </div>
      </motion.div>
      <motion.div 
        className="education-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        ref={educationRef}
      >
        <motion.h2 
          className="section-main-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>
        <div className="education-grid">
          {education.map((edu, index) => (
            <EducationCard key={`edu-${index}`} {...edu} />
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="experience-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        ref={experienceRef}
      >
        <motion.h2 
          className="section-main-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>
        <ExperienceCarousel experiences={experience} />
      </motion.div>
      <motion.div 
        className="skills-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        ref={skillsRef}
      >
        <motion.h2 
          className="section-main-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>
        
        <SkillSection title="Languages" skills={skills.languages} />
        <SkillSection title="Libraries and Frameworks" skills={skills.librariesFrameworks} />
        <SkillSection title="Protocols" skills={skills.protocols} />
        <SkillSection title="Tools" skills={skills.tools} />
        <SkillSection title="Machine Learning Models" skills={skills.machineLearning} />
      </motion.div>
      
      {/* Floating Action Button */}
      <motion.button
        className="fab"
        onClick={() => setIsChatbotOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <img 
          src={`${process.env.PUBLIC_URL}/logo.png`} 
          alt="Chat with Jeffrey" 
          onError={(e) => {
            e.target.src = `${process.env.PUBLIC_URL}/funJeffrey.png`; // Fallback image
          }} 
        />
      </motion.button>
      
      {/* Chatbot Page */}
      <ChatbotPage 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </main>
  );
}
