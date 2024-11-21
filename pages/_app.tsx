// pages/_app.tsx

import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css"; // Ensure this file includes global resets and utility classes

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Responsive and polished Next.js App" />
        <meta name="author" content="Usama Abdullah" />
        <meta charSet="UTF-8" />
        <title>My App</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflowX: "hidden",
          background: "linear-gradient(135deg, #005b96, #00bfff)", // Responsive gradient background
          color: "#fff", // Ensure text is readable
        }}
      >
        {/* Optional Header Placeholder */}
        <header
          style={{
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "rgba(0, 91, 150, 0.9)",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>My App</h1>
        </header>

        <main
          style={{
            flex: "1 0 auto",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Component {...pageProps} />
        </main>

        {/* Footer */}
        <footer
          style={{
            flexShrink: 0,
            width: "100%",
            padding: "10px 20px",
            textAlign: "center",
            backgroundColor: "rgba(0, 91, 150, 0.8)",
            color: "#fff",
            fontSize: "0.9rem",
          }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Usama Abdullah. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Add global styling for responsiveness */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          font-size: 16px;
          scroll-behavior: smooth;
        }

        body {
          font-family: "Roboto", Arial, sans-serif;
          background-color: #f9f9f9; /* Fallback background for older browsers */
          color: #333;
          overflow-x: hidden;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          padding: 0;
        }

        a {
          text-decoration: none;
          color: inherit;
          transition: color 0.2s ease-in-out;
        }

        a:hover {
          color: #00bfff; /* Add hover effect for links */
        }

        main {
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 768px) {
          html {
            font-size: 14px; /* Adjust font size for smaller screens */
          }
        }

        @media (max-width: 480px) {
          html {
            font-size: 13px;
          }

          header h1 {
            font-size: 1.2rem;
          }

          footer {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
};

export default MyApp;
