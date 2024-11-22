import Link from 'next/link';
import React from 'react';
import { FaTwitter, FaGithub,FaInstagram,FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      {/* Header with Navigation */}
      <header className="header">
        <div className="header-content">
          <h1 className="site-title">My IMS Projects</h1>
          <nav>
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="main-title">Explore My Projects</h2>
        <ul className="projects-list">
          <li className="project-item">
            <Link href="/id">
              <button className="project-button">
                <span role="img" aria-label="Prototype">📚</span> Prototype
              </button>
            </Link>
          </li>          
        </ul>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© 2024 Usama. All rights reserved.</p>
        <div className="social-links">
          <a href="https://x.com/usama7871?t=jpefjAMY9dedR7pYjaA1Tw&s=09" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaTwitter size={20} /> Twitter-X
          </a>
          <a href="https://github.com/usama7871" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaGithub size={20} /> GitHub
          </a>
          <a href="https://instagram.com/usama.1072" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaInstagram size={20} /> Instagram
          </a>
          <a href="https://www.linkedin.com/in/usama-abdullah-91b693201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin size={20} /> LinkedIn
          </a>
          <a href="https://wa.me/923154996438" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaWhatsapp size={20} /> WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
