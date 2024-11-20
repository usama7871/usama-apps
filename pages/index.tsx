import Link from 'next/link';
import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <div className="homepage" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header with Navigation */}
      <header
        style={{
          background: 'linear-gradient(135deg, #004d80, #00a3cc)',
          color: '#ppp',
          padding: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>My IMS Projects</h1>
          <nav>
            <Link href="/" className="nav-link" style={navLinkStyle}>
              Home
            </Link>
            <Link href="/about" className="nav-link" style={navLinkStyle}>
              About
            </Link>
            <Link href="/contact" className="nav-link" style={navLinkStyle}>
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          padding: '40px 20px',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: 'auto',
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>
          Explore My Projects
        </h2>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <li style={projectItemStyle}>
            <Link href="/projects/project1">
              <button style={projectButtonStyle}>
                <span role="img" aria-label="Prototype">📚</span> Prototype
              </button>
            </Link>
          </li>
          <li style={projectItemStyle}>
            <Link href="/projects/project2">
              <button style={projectButtonStyle}>
                <span role="img" aria-label="Project 2">🔍</span> Project 2
              </button>
            </Link>
          </li>
        </ul>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: '#004d80',
          color: '#fff',
          padding: '20px 10px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '10px 0' }}>© 2024 Usama. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
          <a href="https://x.com/usama7871?t=jpefjAMY9dedR7pYjaA1Tw&s=09" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}>
            <FaTwitter size={20} /> Twitter-X
          </a>
          <a href="https://github.com/usama7871" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}>
            <FaGithub size={20} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/usama-abdullah-91b693201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            style={socialLinkStyle}
          >
            <FaLinkedin size={20} /> LinkedIn
          </a>
          <a href="https://wa.me/923154996438" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}>
            <FaWhatsapp size={20} /> WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
};

const navLinkStyle = {
  margin: '0 15px',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'color 0.3s',
  fontSize: '1rem',
};

const projectItemStyle = {
  margin: '10px',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  background: '#fff',
  cursor: 'pointer',
};

const projectButtonStyle = {
  background: 'linear-gradient(135deg, #004d80, #00a3cc)',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'transform 0.3s',
};

const socialLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  transition: 'color 0.3s',
};

export default HomePage;
