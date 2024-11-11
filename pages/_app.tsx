// pages/_app.tsx

import { AppProps } from 'next/app';
import Head from 'next/head'; // Add Head for proper metadata
import '../styles/globals.css';
import BackgroundLines from '../components/BackgroundLines';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My App</title> {/* Update title if needed */}
      </Head>
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <BackgroundLines />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
};

export default MyApp;
