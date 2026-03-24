// pages/_app.js
import '../styles/globals.css';
import Head from 'next/head';
import { Lexend } from 'next/font/google';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-lexend',
});

export default function App({ Component, pageProps }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.acaosaude.org.br';
  const defaultTitle = 'Acao Saude - Eu Faco o Bem';
  const defaultDescription =
    'A Acao Saude promove projetos sociais, cuidado em saude e formacao para fortalecer comunidades.';

  return (
    <div className={lexend.variable}>
      <Head>
        <title>{defaultTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={defaultDescription} key="description" />
        <meta name="robots" content="index,follow" key="robots" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:site_name" content="Acao Saude" key="og:site_name" />
        <meta property="og:title" content={defaultTitle} key="og:title" />
        <meta property="og:description" content={defaultDescription} key="og:description" />
        <meta property="og:url" content={siteUrl} key="og:url" />
        <meta property="og:locale" content="pt_BR" key="og:locale" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={defaultTitle} key="twitter:title" />
        <meta name="twitter:description" content={defaultDescription} key="twitter:description" />
        <link rel="icon" href="/coracao-laranja-32.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
