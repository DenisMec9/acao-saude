// pages/index.js
import Head from 'next/head';
import Parse from '../lib/parseConfig';

// Seus componentes
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import QuemSomos from '../components/QuemSomos';
import NossaHistoria from '../components/NossaHistoria';
import AreasAtuacao from '../components/AreasAtuacao';
import Galeria from '../components/Galeria';
import DoacaoContatoFooter from '../components/DoacaoContatoFooter';
import CursosHome from '../components/CursosHome';

// PARTE 1: O COMPONENTE DA PÁGINA
export default function Home({ heroData, galeriaData, cursosData }) {
  return (
    <>
      <Head>
        <title>AÇÃO SAÚDE - EU FAÇO O BEM</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/coracao-laranja.png" type="image/png" />
      </Head>

      <Navbar />
      
      <HeroSection heroData={heroData} />
      <QuemSomos />
      <NossaHistoria />
      <AreasAtuacao />
      
      {/* NOVA SEÇÃO: CURSOS NA PÁGINA PRINCIPAL */}
      <CursosHome cursos={cursosData} />
      
      <Galeria images={galeriaData} />
      <DoacaoContatoFooter />
    </>
  );
}

// PARTE 2: FUNÇÃO DE BUSCA DE DADOS
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

    // BUSCA DADOS PARA CURSOS (NOVO)
    const CursosItem = Parse.Object.extend('Cursos');
    const cursosQuery = new Parse.Query(CursosItem);
    cursosQuery.equalTo("ativo", true);
    cursosQuery.ascending("ordem");
    cursosQuery.limit(3); // Mostra apenas 3 cursos na página inicial
    const cursosObjs = await cursosQuery.find();
    const cursosData = cursosObjs.map(item => ({
      id: item.id,
      titulo: item.get('titulo') || '',
      descricao: item.get('descricao') || '',
      imagem: item.get('imagem')?.url() || '',
      vagas: item.get('vagas') || 0,
      vagasDisponiveis: item.get('vagasDisponiveis') || 0,
      dataInicio: item.get('dataInicio')?.toISOString() || '',
      dataFim: item.get('dataFim')?.toISOString() || '',
      local: item.get('local') || '',
      duracao: item.get('duracao') || '',
      requisitos: item.get('requisitos') || [],
      investimento: item.get('investimento') || 0,
    }));

    // Retorna os dados encontrados como props para o componente Home
    return {
      props: {
        heroData,
        galeriaData,
        cursosData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Erro ao buscar dados no getStaticProps:", error);
    return { 
        props: { 
            heroData: null, 
            galeriaData: [],
            cursosData: [],
        } 
    };
  }
}