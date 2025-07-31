import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ChatbotPage from "./ChatbotPage";

const Section = ({ title, children, isExpanded, onToggle, sectionRef }) => (
  <motion.div
    ref={sectionRef}
    className={`interactive-section ${isExpanded ? 'expanded' : ''}`}
    onClick={onToggle}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="section-title">
      {title}
    </div>
    <div className="section-content">
      {children}
    </div>
  </motion.div>
);

const Card = ({ children, className = "" }) => (
  <motion.div 
    className={`card ${className}`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const EducationCard = ({ school, degree, gpa, years }) => (
  <motion.div 
    className="education-card"
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
  >
    <div className="school-name">{school}</div>
    <div className="degree-info">{degree}</div>
    <div className="gpa-info">{gpa}</div>
    <div className="degree-info">{years}</div>
  </motion.div>
);

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

const ExperienceCarousel = ({ experiences, isExpanded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasTeased, setHasTeased] = useState(false);
  const [isTeasing, setIsTeasing] = useState(false);

  // Tease effect: briefly show next card when first expanded
  useEffect(() => {
    if (isExpanded && !hasTeased) {
      setIsTeasing(true);
      const teaseTimer = setTimeout(() => {
        setIsTeasing(false);
        setHasTeased(true);
      }, 800); // Show tease for 800ms
      
      return () => clearTimeout(teaseTimer);
    }
  }, [isExpanded, hasTeased]);

  const nextExperience = (e) => {
    e.stopPropagation(); // Prevent event bubbling to section
    setCurrentIndex((prevIndex) => 
      prevIndex === experiences.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevExperience = (e) => {
    e.stopPropagation(); // Prevent event bubbling to section
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  const goToExperience = (index, e) => {
    e.stopPropagation(); // Prevent event bubbling to section
    setCurrentIndex(index);
  };

  return (
    <div className="experience-carousel" onClick={(e) => e.stopPropagation()}>
      <div className="experience-carousel-container">
        <div 
          className="experience-carousel-track"
          style={{ 
            transform: `translateX(-${isTeasing ? 15 : currentIndex * 100}%)`,
            transition: isTeasing ? 'transform 0.6s ease-out' : 'transform 0.3s ease-in-out'
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
const useBouncingGifs = (count) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setTick] = useState(0); // dummy state to force re-render
  const gifsRef = useRef(
    Array.from({ length: count }).map(() => ({
      x: Math.random() * (window.innerWidth - 80),
      y: Math.random() * (window.innerHeight - 80),
      dx: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
      dy: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
      rot: Math.random() * 360,
      drot: (Math.random() * 1 + 0.5) * (Math.random() > 0.5 ? 1 : -1)
    }))
  );

  useEffect(() => {
    let lastUpdate = Date.now();
    let frameId;
    const animate = () => {
      const gifs = gifsRef.current;
      for (let gif of gifs) {
        gif.x += gif.dx;
        gif.y += gif.dy;
        gif.rot += gif.drot;
        if (gif.x < 0) { gif.x = 0; gif.dx = -gif.dx; }
        if (gif.x > window.innerWidth - 80) { gif.x = window.innerWidth - 80; gif.dx = -gif.dx; }
        if (gif.y < 0) { gif.y = 0; gif.dy = -gif.dy; }
        if (gif.y > window.innerHeight - 80) { gif.y = window.innerHeight - 80; gif.dy = -gif.dy; }
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
    };
  }, []);

  return gifsRef.current;
};

export default function Portfolio() {
  const [expandedSections, setExpandedSections] = useState({
    education: false,
    experience: false,
    skills: false
  });
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Section refs for scroll-to
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);

  // Debug: Log when refs are ready
  useEffect(() => {
    console.log('Refs initialized:', {
      skills: skillsRef.current,
      education: educationRef.current,
      experience: experienceRef.current
    });
  }, []);

  // Debug: Log when refs change
  useEffect(() => {
    console.log('Refs updated:', {
      skills: skillsRef.current,
      education: educationRef.current,
      experience: experienceRef.current
    });
  });

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      // First expand the section, then scroll
      ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const education = [
    {
      school: "University of Pennsylvania",
      degree: "BSE Computer Science + MSE Robotics, AI Track",
      gpa: "GPA: 3.91 / 4.00",
      years: "2024–2028"
    },
    {
      school: "African Leadership Academy",
      degree: "A-Levels: Mathematics (97%), Computer Science (96%)",
      gpa: "Top 5% of Class",
      years: "2022–2024"
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

  const skills = [
    "Python", "Java", "JavaScript", "C++", "OCaml", "SQL", "HTML/CSS",
    "React", "Jetpack Compose", "Pandas", "Scikit-learn", "Git", "Docker",
    "Firebase", "WSL", "Tableau", "Arduino", "Raspberry Pi", "I2C", "UART"
  ];

  // GIFs: brain for skills, heart for education, penguin for experience
  const gifImages = [
    { src: "/brain.gif", alt: "Neon Brain", className: "brain", section: "skills", ref: skillsRef, title: "Jump to Skills!" },
    { src: "/heart.gif", alt: "Neon Heart", className: "heart", section: "education", ref: educationRef, title: "Jump to Education!" },
    { src: "/coding.gif", alt: "Coding Penguin", className: "penguin", section: "experience", ref: experienceRef, title: "Jump to Experience!" }
  ];
  const gifStates = useBouncingGifs(gifImages.length);

  // Handler for GIF click: expand first, then scroll with delay
  const handleGifClick = (gif, idx) => {
    console.log(`GIF clicked: ${gif.alt}, Section: ${gif.section}`);
    console.log('GIF ref:', gif.ref);
    console.log('GIF ref current:', gif.ref?.current);
    console.log('experienceRef:', experienceRef);
    console.log('experienceRef current:', experienceRef.current);
    
    // First expand the section
    setExpandedSections(prev => ({ ...prev, [gif.section]: true }));
    
    // Then scroll to it with a small delay to allow the section to expand
    setTimeout(() => {
      if (gif.ref && gif.ref.current) {
        console.log(`Scrolling to section: ${gif.section}`);
        gif.ref.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      } else {
        console.log(`No ref found for section: ${gif.section}`);
        console.log('Available refs:', { skillsRef, educationRef, experienceRef });
        console.log('Their current values:', { 
          skills: skillsRef.current, 
          education: educationRef.current, 
          experience: experienceRef.current 
        });
      }
    }, 200);
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
            transform: `rotate(${gifStates[i]?.rot ?? 0}deg)`
          }}
          onClick={() => handleGifClick(gif, i)}
          title={gif.title}
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
              {skills.slice(0, 7).join(' • ')} • {skills.slice(0, 7).join(' • ')}
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
      <Section 
        title="Education" 
        isExpanded={expandedSections.education}
        onToggle={() => toggleSection('education')}
        sectionRef={educationRef}
      >
        <div className="education-grid">
          {education.map((edu, index) => (
            <EducationCard key={`edu-${index}`} {...edu} />
          ))}
        </div>
      </Section>
      <Section 
        title="Experience" 
        isExpanded={expandedSections.experience}
        onToggle={() => toggleSection('experience')}
        sectionRef={experienceRef}
      >
        <ExperienceCarousel experiences={experience} isExpanded={expandedSections.experience} />
      </Section>
      <Section 
        title="Skills" 
        isExpanded={expandedSections.skills}
        onToggle={() => toggleSection('skills')}
        sectionRef={skillsRef}
      >
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <SkillItem key={`skill-${index}`} name={skill} />
          ))}
        </div>
      </Section>
      
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
        💬
      </motion.button>
      
      {/* Chatbot Page */}
      <ChatbotPage 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </main>
  );
}
