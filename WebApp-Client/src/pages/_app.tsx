import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import '~/styles/globals.css';
import '~/styles/modal.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'tailwindcss/tailwind.css';
import AuthSync from '~/middlewares/authSync.middleware';

function App({ Component, ...rest }: AppProps) {
  const { pageProps } = rest;

  return (
    <React.Fragment>
      <Head>
        <title>Oganic Food</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </Head>
      <AuthSync>
        <Component {...pageProps} />
      </AuthSync>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          duration: 4000,
        }}
        containerStyle={{
          top: '100px',
        }}
      />
    </React.Fragment>
  );
}

export default App;
