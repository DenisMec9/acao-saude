import Head from 'next/head';
import Parse from '../lib/parseConfig'; // Importe a configuração do Parse

// Seus componentes
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import QuemSomos from '../components/QuemSomos';
import NossaHistoria from '../components/NossaHistoria';
import AreasAtuacao from '../components/AreasAtuacao';
import Galeria from '../components/Galeria';
import DoacaoContatoFooter from '../components/DoacaoContatoFooter';

// PARTE 1: O COMPONENTE DA PÁGINA
// Esta função é o que o Next.js renderiza na tela.
// Ela recebe os dados buscados pelo getStaticProps.
export default function Home({ heroData, galeriaData }) {
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
              body { font-family: 'Poppins', sans-serif; scroll-behavior: smooth; }
              .hero-gradient { background: linear-gradient(135deg, #053980 0%, #053980 50%, #053980 100%); }
              .floating { animation: floating 3s ease-in-out infinite; }
              @keyframes floating { 0%{transform:translateY(0)} 50%{transform:translateY(-15px)} 100%{transform:translateY(0)} }
              .pulse { animation: pulse 2s infinite; }
              @keyframes pulse { 0%{transform:scale(1)} 50%{transform:scale(1.05)} 100%{transform:scale(1)} }
              .timeline-item:not(:last-child)::after {
                content:'';position:absolute;left:24px;top:32px;height:calc(100% - 32px);width:2px;background:#ff7415;
              }
              .whatsapp-float{
                position:fixed;width:60px;height:60px;bottom:40px;right:40px;background:#25d366;color:#fff;border-radius:50px;
                text-align:center;font-size:30px;box-shadow:2px 2px 3px #999;z-index:100;display:flex;align-items:center;justify-content:center;
              }
              section[id]{ scroll-margin-top: 88px; }
            `,
          }}
        />
      </Head>

      <Navbar />
      
      <HeroSection heroData={heroData} />
      <QuemSomos />
      <NossaHistoria />
      <AreasAtuacao />
      <Galeria images={galeriaData} />
      <DoacaoContatoFooter />
    </>
  );
}

// PARTE 2: FUNÇÃO DE BUSCA DE DADOS
// Esta função roda NO SERVIDOR antes da página ser enviada para o navegador.
export async function getStaticProps() {
  try {
    // Busca dados para a Hero Section
    const HeroContent = Parse.Object.extend('HeroContent');
    const heroQuery = new Parse.Query(HeroContent);
    const heroObj = await heroQuery.first();
    const heroData = heroObj ? {
      titulo: heroObj.get('titulo') || null,
      subtitulo: heroObj.get('subtitulo') || null,
      descricao: heroObj.get('descricao') || null,
      imagemUrl: heroObj.get('imagem')?.url() || null,
    } : null;

    // Busca dados para a Galeria
    const GaleriaItem = Parse.Object.extend('Galeria');
    const galeriaQuery = new Parse.Query(GaleriaItem);
    galeriaQuery.descending("createdAt");
    const galeriaObjs = await galeriaQuery.find();
    const galeriaData = galeriaObjs.map(item => ({
      id: item.id,
      url: item.get('imagem')?.url() || '',
      title: item.get('titulo') || '',
      description: item.get('descricao') || '',
    }));

    // Retorna os dados encontrados como props para o componente Home
    return {
      props: {
        heroData,
        galeriaData,
      },
      revalidate: 60, // Tenta atualizar os dados a cada 60 segundos
    };
  } catch (error) {
    console.error("Erro ao buscar dados no getStaticProps:", error);
    // Em caso de erro, retorna dados vazios para a página não quebrar
    return { 
        props: { 
            heroData: null, 
            galeriaData: [] 
        } 
    };
  }
}