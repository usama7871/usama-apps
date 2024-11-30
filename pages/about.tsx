"use client";
import React from 'react';
import { FaUserAlt, FaCode, FaProjectDiagram } from 'react-icons/fa';

// HighlightCard component for reusability
const HighlightCard = ({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) => (
  <div
    style={{
      background: '#f9f9f9',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    }}
  >
    {icon}
    <h3 style={{ margin: '10px 0', color: '#004d80' }}>{title}</h3>
    <p style={{ color: '#666' }}>{description}</p>
  </div>
);

const About = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            color: '#004d80',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FaUserAlt style={{ marginRight: '10px', color: '#00a3cc' }} /> About Me
        </h1>
        <hr style={{ width: '60px', border: '2px solid #00a3cc', margin: '0 auto' }} />
      </header>

      {/* Content Section */}
      <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#fff' }}>
        <p>
          Hello! My name is <strong>Usama</strong>, and I am a 3rd-year MBBS student. Although I initially chose to pursue
          a career as a doctor, I have decided to transition into the field of software development, driven by my passion for
          technology and its potential to transform medicine through advancements in AI and ML.
        </p>
        <p>
          I am a beginner-level learner in various fields, yet I am proficient in <strong>Python</strong>, <strong>TypeScript</strong>,
          and web and app development. Currently, I am focusing on <strong>Kubernetes</strong>, <strong>3D modeling</strong>, and{' '}
          <strong>machine learning techniques</strong> as my major interests.
        </p>
        <p>
          Through this project, I aim to showcase educational content that merges my interests in medicine and technology,
          providing valuable resources for learners like myself.
        </p>
      </div>

      {/* Highlight Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '40px',
          textAlign: 'center',
        }}
      >
        <HighlightCard
          icon={<FaCode size={50} color="#00a3cc" />}
          title="Tech Enthusiast"
          description="Exploring Kubernetes, ML, and 3D modeling."
        />
        <HighlightCard
          icon={<FaProjectDiagram size={50} color="#00a3cc" />}
          title="Project Showcase"
          description="Combining medicine and technology for educational resources."
        />
      </div>

      {/* CTA Section */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#fff',
            background: 'linear-gradient(135deg, #004d80, #00a3cc)',
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
        >
          View My Projects
        </a>
      </div>
    </div>
  );
};

export default About;
