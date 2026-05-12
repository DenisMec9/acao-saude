import Head from "next/head";
import Parse from "../lib/parseConfig";
import PremiumNavbar from "../components/ui/PremiumNavbar";
import PremiumFooter from "../components/ui/PremiumFooter";
import GalleryGrid from "../components/home/GalleryGrid";

type Foto = {
  id: string;
  url: string;
  title: string;
  description: string;
};

type PObj = {
  id: string;
  get: (key: string) => unknown;
};

export default function FotosPage({ fotos }: { fotos: Foto[] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.acaosaude.org.br";
  const pageUrl = `${siteUrl}/fotos`;
  const seoTitle = "Galeria de Fotos | Acao Saude";
  const seoDescription =
    "Registros das acoes, projetos e iniciativas da Acao Saude em diferentes comunidades.";

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

      <main className="min-h-screen pt-6 md:pt-10">
        <GalleryGrid
          images={fotos}
          mode="full"
          title="Galeria Acao Saude"
          subtitle="Cada registro carrega uma historia real de cuidado, dignidade e transformacao social."
        />
      </main>

      <PremiumFooter />
    </>
  );
}

export async function getStaticProps() {
  try {
    const GaleriaClass = Parse.Object.extend("Galeria");
    const query = new Parse.Query(GaleriaClass);
    query.descending("createdAt");

    const results = (await query.find()) as unknown as PObj[];
    const fotos: Foto[] = results
      .map((obj: PObj) => ({
        id: obj.id,
        url: String((obj.get("imagem") as { url?: () => string })?.url?.() || ""),
        title: String(obj.get("titulo") || ""),
        description: String(obj.get("descricao") || ""),
      }))
      .filter((f) => Boolean(f.url));

    return {
      props: { fotos },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Erro ao carregar galeria no getStaticProps:", error);
    return {
      props: { fotos: [] },
      revalidate: 60,
    };
  }
}
