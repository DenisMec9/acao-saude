import Head from 'next/head';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import QuemSomos from '../components/QuemSomos';
import NossaHistoria from '../components/NossaHistoria';
import AreasAtuacao from '../components/AreasAtuacao';
import DoacaoContatoFooter from '../components/DoacaoContatoFooter';

export default function Home() {
  return (
    <>
      <Head>
        <title>AÇÃO SAÚDE - EU FAÇO O BEM</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
              body {
                font-family: 'Poppins', sans-serif;
                scroll-behavior: smooth;
              }
              .hero-gradient {
                background: linear-gradient(135deg, #053980 0%, #053980 50%, #053980 100%);
              }
              .floating {
                animation: floating 3s ease-in-out infinite;
              }
              @keyframes floating {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-15px); }
                100% { transform: translateY(0px); }
              }
              .pulse {
                animation: pulse 2s infinite;
              }
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
              }
              .timeline-item:not(:last-child)::after {
                content: '';
                position: absolute;
                left: 24px;
                top: 32px;
                height: calc(100% - 32px);
                width: 2px;
                background: #ff7415;
              }
              .whatsapp-float {
                position: fixed;
                width: 60px;
                height: 60px;
                bottom: 40px;
                right: 40px;
                background-color: #25d366;
                color: #FFF;
                border-radius: 50px;
                text-align: center;
                font-size: 30px;
                box-shadow: 2px 2px 3px #999;
                z-index: 100;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            `
          }}
        />
      </Head>

      <Navbar />
      <HeroSection />
      <QuemSomos />
      <NossaHistoria />
      <AreasAtuacao />
      <DoacaoContatoFooter />
    </>
  );
}
