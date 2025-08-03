import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ProjectsPage.css';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <div className="project-overlay">
          <div className="project-tech">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-actions">
          {project.githubUrl && project.githubUrl !== "#" && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-btn primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Code
            </a>
          )}
          {project.requestAccessUrl && (
            <a 
              href={project.requestAccessUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-btn primary"
              style={{ marginLeft: '0.5rem' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Request Access
            </a>
          )}
          {project.liveUrl && project.liveUrl !== "#" &&  (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-btn secondary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Quantum Trading Platform",
      description: "An autonomous trading platform using Alpaca API with advanced algorithms for market analysis and automated decision making. Features real-time data processing and machine learning predictions.",
      image: "/coding.gif", // Using existing gif as placeholder
      technologies: ["Python", "Alpaca API", "Machine Learning", "Real-time Data", "Web Framework"],
      category: "finance",
      secondaryCategory: "web", // Will appear in both finance and web categories
      githubUrl: "#",
      liveUrl: "https://drive.google.com/file/d/1ZeZWKnICL9XrwIo6pBjcjcVMbVb1Am2C/view?usp=sharing",
      requestAccessUrl: "mailto:odzjeffreyjr@gmail.com?subject=Access Request for Quantum Trading Platform&body=Hi Jeffrey,%0D%0A%0D%0AI would like to request access to the Quantum Trading Platform. Please let me know the next steps.%0D%0A%0D%0AThank you!"
    },
    {
      id: 2,
      title: "Transparency Now",
      description: "Android application designed for whistleblowers and audit reporting with secure communication channels and encrypted data storage. Built with modern Android architecture.",
      image: "/brain.gif", // Using existing gif as placeholder
      technologies: ["Android", "Kotlin", "Jetpack Compose", "Encryption"],
      category: "mobile",
      githubUrl: "https://github.com/odzjeffreyjr/transparency-now",
      liveUrl: "#"
    },
    {
      id: 3,
      title: "NBA Game Predictor",
      description: "Machine learning model using Logistic Regression with 0.93 AUC for predicting NBA game outcomes. Analyzes historical data and player statistics for accurate predictions.",
      image: "/heart.gif", // Using existing gif as placeholder
      technologies: ["Python", "Scikit-learn", "Pandas", "Data Analysis"],
      category: "ml",
      githubUrl: "https://github.com/odzjeffreyjr/NBA-Game-Prediction",
      liveUrl: "#"
    },
    {
      id: 4,
      title: "Wiki Olympics Data Engine",
      description: "Wikipedia scraping engine for Olympic data with comprehensive statistics and historical analysis capabilities. Processes large datasets for insights.",
      image: "/coding.gif", // Using existing gif as placeholder
      technologies: ["Python", "Web Scraping", "Data Processing", "Analytics"],
      category: "data",
      githubUrl: "https://github.com/odzjeffreyjr/Wiki-Olympics-Scraper",
      liveUrl: "#"
    },
    {
      id: 5,
      title: "Java Chess Game",
      description: "A complete PvP chess game built from scratch in Java with full rule implementation, intuitive user interface, and game state management.",
      image: "/brain.gif", // Using existing gif as placeholder
      technologies: ["Java", "Swing", "Game Development", "OOP"],
      category: "game",
      githubUrl: "https://github.com/odzjeffreyjr/chess",
      liveUrl: "#"
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "This responsive portfolio website built with React, featuring smooth animations, interactive components, and modern design principles.",
      image: "/heart.gif", // Using existing gif as placeholder
      technologies: ["React", "CSS3", "Framer Motion", "Responsive Design"],
      category: "web",
      githubUrl: "https://github.com/odzjeffreyjr/odzjeffreyjr.github.io",
      liveUrl: "https://www.jeffreyoduman.tech"
    },
    {
      id: 7,
      title: "BookMatch-App",
      description: "Java-based book recommendation system that helps users find books tailored to their preferences using a custom Vector Space Model (VSM). Features both CLI and GUI interfaces with preference matching for genres, authors, topics, and ratings.",
      image: "/brain.gif", // Using existing gif as placeholder
      technologies: ["Java", "Swing", "Vector Space Model", "Data Processing", "GUI Development"],
      category: "ml",
      githubUrl: "https://github.com/odzjeffreyjr/BookMatch-App",
      liveUrl: "#"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'finance', name: 'FinTech' },
    { id: 'data', name: 'Data Science' },
    { id: 'game', name: 'Game Development' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter || project.secondaryCategory === filter);

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <motion.section 
        className="projects-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">My Projects</h1>
          <p className="hero-subtitle">
            Exploring the intersection of AI, robotics, and software development through innovative solutions
          </p>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section 
        className="filter-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="filter-container">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section 
        className="projects-grid-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="projects-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="cta-content">
          <h2>Interested in Collaboration?</h2>
          <p>Let's work together to build something amazing</p>
          <div className="cta-buttons">
            <a href="mailto:odzjeffreyjr@gmail.com" className="cta-btn primary">
              Get In Touch
            </a>
            <a href="/Jeffrey_Oduman_Resume.pdf" download className="cta-btn secondary">
              Download Resume
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ProjectsPage;
