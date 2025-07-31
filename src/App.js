import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";
import ChatbotPage from "./ChatbotPage";

const Section = ({ title, children, isExpanded, onToggle, sectionRef }) => (
  <motion.div
    ref={sectionRef}
    className={`interactive-section ${isExpanded ? 'expanded' : ''}`}
    onClick={onToggle}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
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

const ProjectCard = ({ title, description, links }) => (
  <motion.div 
    className="project-card"
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
  >
    <div className="project-title">{title}</div>
    <div className="project-description">{description}</div>
    <div className="project-links">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className="project-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </div>
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

const ExperienceCard = ({ company, role, description }) => (
  <motion.div 
    className="experience-card"
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
  >
    <div className="company-name">{company}</div>
    <div className="role-title">{role}</div>
    <div className="role-description">{description}</div>
  </motion.div>
);

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
    projects: false,
    education: false,
    experience: false,
    skills: false
  });
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Section refs for scroll-to
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const projects = [
    {
      title: "Quantum Trading",
      description: "Autonomous trading platform using Alpaca API with advanced algorithms for market analysis and automated decision making.",
      links: [
        { label: "GitHub", url: "https://github.com/odzjeffreyjr/quantum-trading" },
        { label: "Live Demo", url: "#" }
      ]
    },
    {
      title: "Transparency Now",
      description: "Android app for whistleblowers and audit reporting with secure communication channels and encrypted data storage.",
      links: [
        { label: "GitHub", url: "https://github.com/odzjeffreyjr/transparency-now" },
        { label: "Play Store", url: "#" }
      ]
    },
    {
      title: "NBA Predictor",
      description: "Machine learning model using Logistic Regression with 0.93 AUC for predicting NBA game outcomes based on historical data.",
      links: [
        { label: "GitHub", url: "https://github.com/odzjeffreyjr/nba-predictor" },
        { label: "Analysis", url: "#" }
      ]
    },
    {
      title: "Wiki Olympics",
      description: "Wikipedia scraping engine for Olympic data with comprehensive statistics and historical analysis capabilities.",
      links: [
        { label: "GitHub", url: "https://github.com/odzjeffreyjr/wiki-olympics" },
        { label: "Live Data", url: "#" }
      ]
    },
    {
      title: "Chess Game",
      description: "PvP Java chess game built from scratch with complete rule implementation and intuitive user interface.",
      links: [
        { label: "GitHub", url: "https://github.com/odzjeffreyjr/chess-game" },
        { label: "Download", url: "#" }
      ]
    }
  ];

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
      company: "JoyNet Research",
      role: "Machine Learning Researcher",
      description: "Developed ML algorithms and social network features using Firebase, implementing advanced recommendation systems and user behavior analysis."
    },
    {
      company: "Penn Electric Racing",
      role: "Software Engineer",
      description: "Built C++ applications and PySerial interfaces for aero & battery engineering, optimizing performance and data collection systems."
    },
    {
      company: "Sung Robotics Group",
      role: "Robotics Engineer",
      description: "Implemented 3D Dubins path inverse kinematics algorithms for autonomous navigation and path planning systems."
    },
    {
      company: "University of Pennsylvania",
      role: "Teaching Assistant, CIS 1200",
      description: "Led debugging sessions for OCaml & Java, conducted recitations, and provided one-on-one student support for programming concepts."
    }
  ];

  const skills = [
    "Python", "Java", "JavaScript", "C++", "OCaml", "SQL", "HTML/CSS",
    "React", "Jetpack Compose", "Pandas", "Scikit-learn", "Git", "Docker",
    "Firebase", "WSL", "Tableau", "Arduino", "Raspberry Pi", "I2C", "UART"
  ];

  // Social media icons using PNG files
  const socialIcons = [
    { src: "/github.png", alt: "GitHub", url: "https://github.com/odzjeffreyjr" },
    { src: "/linkedin.png", alt: "LinkedIn", url: "https://linkedin.com/in/jeffrey-oduman-533094216" },
    { src: "/africa.png", alt: "Africa", url: "https://your-blog-url.com" } // Placeholder - change this
  ];

  // GIFs: penguin, brain, heart (added back heart for Education)
  const gifImages = [
    { src: "/coding.gif", alt: "Coding Penguin", className: "penguin", section: "projects", ref: projectsRef, title: "Jump to Projects!" },
    { src: "/brain.gif", alt: "Neon Brain", className: "brain", section: "skills", ref: skillsRef, title: "Jump to Skills!" },
    { src: "/heart.gif", alt: "Neon Heart", className: "heart", section: "education", ref: educationRef, title: "Jump to Education!" }
  ];
  const gifStates = useBouncingGifs(gifImages.length);

  // Handler for GIF click: scroll and expand
  const handleGifClick = (gif, idx) => {
    scrollToSection(gif.ref);
    setExpandedSections(prev => ({ ...prev, [gif.section]: true }));
  };

  return (
    <main className="quantum-trader">
      {/* Liquid Crystal Grid Background */}
      <div className="liquid-grid"></div>
      
      {/* Social Media Icons - Top Right */}
      <div className="top-social-icons">
        {socialIcons.map((icon, index) => (
          <a
            key={index}
            href={icon.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={icon.src}
              alt={icon.alt}
              className="social-icon"
            />
          </a>
        ))}
      </div>

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
        title="Projects" 
        isExpanded={expandedSections.projects}
        onToggle={() => toggleSection('projects')}
        sectionRef={projectsRef}
      >
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </Section>
      <Section 
        title="Education" 
        isExpanded={expandedSections.education}
        onToggle={() => toggleSection('education')}
        sectionRef={educationRef}
      >
        <div className="education-grid">
          {education.map((edu, index) => (
            <EducationCard key={index} {...edu} />
          ))}
        </div>
      </Section>
      <Section 
        title="Experience" 
        isExpanded={expandedSections.experience}
        onToggle={() => toggleSection('experience')}
      >
        <div className="experience-grid">
          {experience.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </Section>
      <Section 
        title="Skills" 
        isExpanded={expandedSections.skills}
        onToggle={() => toggleSection('skills')}
        sectionRef={skillsRef}
      >
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <SkillItem key={index} name={skill} />
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
