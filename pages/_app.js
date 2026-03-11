// pages/_app.js
import '../styles/globals.css';
import Head from 'next/head';
import { Manrope, Sora } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sora',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${manrope.variable} ${sora.variable}`}>
      <Head>
        <title>Ação Saúde - Eu Faço o Bem</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/coracao-laranja-32.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}