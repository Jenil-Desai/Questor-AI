import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer style={footerStyles} className=''>
      <motion.div
        initial={{ opacity: 0.5, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="footer-content"
        style={footerContentStyles}
      >
        {/* Footer Top: Logo and Description */}
        <div style={footerTopStyles}>
          <div style={logoContainer}>
            <h1 style={brandStyle}>Questior-Ai</h1>
          </div>
          <p style={descriptionStyle}>
            Elevate your experience with the most innovative tools at your fingertips. Designed for efficiency, built for the future.
          </p>
        </div>

        {/* Social Links with Hover Effects */}
        <div style={socialLinksContainer}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}>
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}>
            Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}>
            LinkedIn
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}>
            Instagram
          </a>
        </div>
      </motion.div>

      {/* Animated Human Waving Bye */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={humanContainer}
      >
        <img
          src="https://i.imgur.com/OyNnhHB.png" // Replace with a human illustration waving goodbye
          alt="human waving bye"
          style={humanImage}
        />
        <motion.p
          style={byeText}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: 'easeInOut' }}
        >
          Bye! See you soon!
        </motion.p>
      </motion.div>

      {/* Footer Bottom Section */}
      <motion.div
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="footer-bottom"
        style={footerBottomStyles}
      >
        <p style={footerTextStyles}>© 2024 Your Brand. All Rights Reserved.</p>
        <p>
          <a href="/privacy" style={linkStyle} onMouseEnter={hoverLink} onMouseLeave={unhoverLink}>
            Privacy Policy
          </a>
          |
          <a href="/terms" style={linkStyle} onMouseEnter={hoverLink} onMouseLeave={unhoverLink}>
            Terms of Service
          </a>
        </p>
      </motion.div>
    </footer>
  );
};

// Footer Styles
const footerStyles = {
  backgroundColor: '#111111', // Dark background
  padding: '60px 20px',
  color: '#E0E0E0',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  borderTop: '1px solid #333',
  marginTop: '40px',
};

const footerContentStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const footerTopStyles = {
  marginBottom: '30px',
};

const logoContainer = {
  display: 'inline-block',
  padding: '10px 30px',
  borderRadius: '30px',
  background: 'linear-gradient(145deg, #121212, #0A0A0A)',
  boxShadow: '12px 12px 24px #0a0a0a, -12px -12px 24px #121212',
};

const brandStyle = {
  fontSize: '32px',
  color: '#00FFFF', // Neon blue
  fontWeight: '700',
  letterSpacing: '1px',
  background: 'linear-gradient(45deg, #6c63ff, #00ffff)', // Gradient text
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

const descriptionStyle = {
  color: '#aaa',
  maxWidth: '500px',
  marginTop: '20px',
  fontSize: '16px',
  lineHeight: '1.5',
  textAlign: 'center',
};

const socialLinksContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  marginTop: '20px',
};

const socialLinkStyle = {
  fontSize: '18px',
  color: '#E0E0E0',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
};

const footerBottomStyles = {
  borderTop: '1px solid #444',
  paddingTop: '15px',
  marginTop: '30px',
  fontSize: '14px',
  letterSpacing: '1px',
};

const footerTextStyles = {
  marginBottom: '5px',
  color: '#888',
};

const linkStyle = {
  color: '#00ffff', // Neon blue
  marginLeft: '10px',
  marginRight: '10px',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
};

// Human Figure Styles
const humanContainer = {
  position: 'relative',
  marginTop: '30px',
  textAlign: 'center',
};

const humanImage = {
  width: '120px',
  height: 'auto',
};

const byeText = {
  color: '#00FFFF',
  fontSize: '20px',
  fontWeight: '600',
  marginTop: '10px',
  fontFamily: 'Arial, sans-serif',
};

// Hover effect
const hoverLink = (e) => {
  e.target.style.color = '#6c63ff'; // Neon purple on hover
};

const unhoverLink = (e) => {
  e.target.style.color = '#00ffff'; // Back to neon blue
};

export default Footer;
