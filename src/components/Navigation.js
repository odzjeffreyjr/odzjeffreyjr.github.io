import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      className="navigation"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="nav-container">
        {/* Logo and Navigation Links */}
        <div className="nav-logo-links">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <img src="/logo.png" alt="Jeffrey Oduman" />
            <span className="nav-logo-text">Jeffrey Oduman</span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
            >
              Projects
            </Link>
            <Link 
              to="/me" 
              className={`nav-link ${location.pathname === '/me' ? 'active' : ''}`}
            >
              Me
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-content">
          {/* Social Icons */}
          <div className="nav-social-icons">
            <a
              href="https://github.com/odzjeffreyjr"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-icon"
            >
              <img src="/github.png" alt="GitHub" />
            </a>
            <a
              href="https://linkedin.com/in/jeffrey-oduman-533094216"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-icon"
            >
              <img src="/linkedin.png" alt="LinkedIn" />
            </a>
            <a
              href="https://letstalkafrika.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-icon"
            >
              <img src="/africa.png" alt="Africa" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
        initial={false}
        animate={{ height: isMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mobile-menu-content">
          <Link 
            to="/" 
            className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/projects" 
            className={`mobile-nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Projects
          </Link>
          <Link 
            to="/me" 
            className={`mobile-nav-link ${location.pathname === '/me' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Me
          </Link>
          
          {/* Mobile Social Icons */}
          <div className="mobile-social-icons">
            <a
              href="https://github.com/odzjeffreyjr"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-icon"
              onClick={closeMenu}
            >
              <img src="/github.png" alt="GitHub" />
            </a>
            <a
              href="https://linkedin.com/in/jeffrey-oduman-533094216"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-icon"
              onClick={closeMenu}
            >
              <img src="/linkedin.png" alt="LinkedIn" />
            </a>
            <a
              href="https://letstalkafrika.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-icon"
              onClick={closeMenu}
            >
              <img src="/africa.png" alt="Africa" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
