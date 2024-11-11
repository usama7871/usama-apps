// pages/index.tsx

// Importing dependencies
import Link from 'next/link'; // Importing Next.js Link component to handle client-side navigation
import React from 'react'; // Importing React to use JSX syntax and React components

// Declaring the main functional component for the Home page
const HomePage: React.FC = () => {
  // React functional component syntax is used here to define the HomePage component.
  // React.FC specifies that this is a functional component with props that are consistent with React.FC, like children.

  return (
    <div className="homepage">
      {/* Header with Navigation */}
      <header className="header">
        <h1 className="header-title">My IMS Projects</h1> 
        {/* Main title for the homepage. IMS likely stands for 'Information Management System' */}
        
        <nav className="nav">
          {/* Navigation links using Next.js Link component for fast, client-side navigation */}
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          {/* Each Link points to a different route ('/', '/about', '/contact') with a 'nav-link' class for styling */}
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">My Projects</h1>
        {/* Section heading for projects */}

        <ul className="project-list">
          {/* Using a list to display individual project links. Each list item represents a project. */}
          
          {/* Project 1 */}
          <li className="project-item">
            <Link href="/projects/project1">
              {/* Links to a page for Project 1 using client-side navigation */}
              <button className="project-button">📚 Prototype</button>
              {/* Using a button inside a Link for a clickable project entry, with an icon and title */}
            </Link>
          </li>

          {/* Project 2 */}
          <li className="project-item">
            <Link href="/projects/project2">
              {/* Links to a page for Project 2 using client-side navigation */}
              <button className="project-button">🔍 Project 2</button>
              {/* Another project button with an icon and title */}
            </Link>
          </li>

          {/* Additional projects can be added by following the same pattern: 
              <li> with <Link> and <button> components */}
        </ul>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© 2024 Usama. All rights reserved.</p>
        {/* Footer copyright notice */}

        <div className="social-links">
          {/* Social media links, each styled with a 'social-link' class and opening in a new tab */}
          <a href="https://x.com/usama7871?t=jpefjAMY9dedR7pYjaA1Tw&s=09" target="_blank" rel="noopener noreferrer" className="social-link">Twitter-X</a>
          <a href="https://github.com/usama7871" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
          <a href="https://www.linkedin.com/in/usama-abdullah-91b693201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
          <a href="https://wa.me/923154996438" target="_blank" rel="noopener noreferrer" className="social-link">WhatsApp</a>
          {/* Each anchor tag provides a link to social media or contact methods and uses 'noopener noreferrer' for security */}
        </div>
      </footer>
    </div>
  );
};

// Exporting the HomePage component as the default export
export default HomePage;
