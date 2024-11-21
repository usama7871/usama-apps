import React from 'react';
import { FaEnvelope, FaWhatsapp, FaGithub, FaInstagram, FaArrowLeft } from 'react-icons/fa';

const Contact = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#004d80', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FaEnvelope style={{ marginRight: '10px', color: '#00a3cc' }} /> Contact Me
        </h1>
        <hr style={{ width: '80px', border: '2px solid #00a3cc', margin: '0 auto' }} />
      </div>

      {/* Introduction */}
      <p style={{ fontSize: '1.2rem', color: '#333', textAlign: 'center', marginBottom: '20px' }}>
        If you would like to get in touch with me, feel free to reach out through any of the following platforms:
      </p>

      {/* Contact List */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {/* Email */}
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f9f9f9',
            borderRadius: '10px',
            padding: '15px',
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
          <FaEnvelope size={25} color="#004d80" style={{ marginRight: '10px' }} />
          <a
            href="mailto:kusamakhan1234@gmail.com"
            style={{ color: '#004d80', textDecoration: 'none', fontWeight: 'bold' }}
          >
            kusamakhan1234@gmail.com
          </a>
        </li>

        {/* WhatsApp */}
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f9f9f9',
            borderRadius: '10px',
            padding: '15px',
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
          <FaWhatsapp size={25} color="#25D366" style={{ marginRight: '10px' }} />
          <a
            href="https://wa.me/923154996438"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#004d80', textDecoration: 'none', fontWeight: 'bold' }}
          >
            +92 315 4996438
          </a>
        </li>

        {/* GitHub */}
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f9f9f9',
            borderRadius: '10px',
            padding: '15px',
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
          <FaGithub size={25} color="#171515" style={{ marginRight: '10px' }} />
          <a
            href="https://github.com/usama7871"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#004d80', textDecoration: 'none', fontWeight: 'bold' }}
          >
            github.com/usama7871
          </a>
        </li>

        {/* Instagram */}
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f9f9f9',
            borderRadius: '10px',
            padding: '15px',
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
          <FaInstagram size={25} color="#E4405F" style={{ marginRight: '10px' }} />
          <a
            href="https://instagram.com/usama.1072"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#004d80', textDecoration: 'none', fontWeight: 'bold' }}
          >
            instagram.com/usama.1072
          </a>
        </li>
      </ul>

      {/* Back to Home Button */}
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
          <FaArrowLeft style={{ marginRight: '10px' }} />
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default Contact;
