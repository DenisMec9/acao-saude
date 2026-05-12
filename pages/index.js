import Head from "next/head";
import Parse from "../lib/parseConfig";
import PremiumNavbar from "../components/ui/PremiumNavbar";
import PremiumFooter from "../components/ui/PremiumFooter";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/institucional/AboutSection";
import AreasGrid from "../components/institucional/AreasGrid";
import CoursesSection from "../components/home/CoursesSection";
import GalleryGrid from "../components/home/GalleryGrid";
import DonationSection from "../components/institucional/DonationSection";

export default function Home({ heroData, galeriaData, cursosData }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.acaosaude.org.br";
  const pageUrl = `${siteUrl}/`;
  const seoTitle = "Acao Saude - Eu Faco o Bem";
  const seoDescription =
    "A Acao Saude fortalece comunidades com projetos sociais, cuidado integral e oportunidades de formacao.";

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={seoDescription} key="description" />
        <meta name="robots" content="index,follow" key="robots" />
        <link rel="canonical" href={pageUrl} key="canonical" />
        <meta property="og:title" content={seoTitle} key="og:title" />
        <meta property="og:description" content={seoDescription} key="og:description" />
        <meta property="og:url" content={pageUrl} key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <meta name="twitter:title" content={seoTitle} key="twitter:title" />
        <meta name="twitter:description" content={seoDescription} key="twitter:description" />
      </Head>

      <PremiumNavbar />
      <HeroSection heroData={heroData} />
      <AboutSection />
      <AreasGrid />
      <CoursesSection cursos={cursosData} limit={3} compact />
      <GalleryGrid images={galeriaData} mode="preview" title="Nossa Galeria" />
      <DonationSection />
      <PremiumFooter />
    </>
  );
}

export async function getStaticProps() {
  try {
    const HeroContent = Parse.Object.extend("HeroContent");
    const heroQuery = new Parse.Query(HeroContent);
    const heroObj = await heroQuery.first();
    const heroData = heroObj
      ? {
          titulo: heroObj.get("titulo") || null,
          subtitulo: heroObj.get("subtitulo") || null,
          descricao: heroObj.get("descricao") || null,
          imagemUrl: heroObj.get("imagem")?.url() || null,
        }
      : null;

    const GaleriaItem = Parse.Object.extend("Galeria");
    const galeriaQuery = new Parse.Query(GaleriaItem);
    galeriaQuery.descending("createdAt");
    const galeriaObjs = await galeriaQuery.find();
    const galeriaData = galeriaObjs.map((item) => ({
      id: item.id,
      url: item.get("imagem")?.url() || "",
      title: item.get("titulo") || "",
      description: item.get("descricao") || "",
    }));

    const CursosItem = Parse.Object.extend("Cursos");
    const cursosQuery = new Parse.Query(CursosItem);
    cursosQuery.equalTo("ativo", true);
    cursosQuery.ascending("ordem");
    const cursosObjs = await cursosQuery.find();
    const cursosData = cursosObjs.map((item) => ({
      id: item.id,
      titulo: item.get("titulo") || "",
      descricao: item.get("descricao") || "",
      imagem: item.get("imagem")?.url() || "",
      vagas: item.get("vagas") || 0,
      vagasDisponiveis: item.get("vagasDisponiveis") || 0,
      dataInicio: item.get("dataInicio")?.toISOString() || "",
      dataFim: item.get("dataFim")?.toISOString() || "",
      local: item.get("local") || "",
      duracao: item.get("duracao") || item.get("duração") || "",
      requisitos: item.get("requisitos") || [],
      investimento: item.get("investimento") || 0,
    }));

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
      },
      revalidate: 60,
    };
  }
}
