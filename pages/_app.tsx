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
    </>
  );
};

export default MyApp;
