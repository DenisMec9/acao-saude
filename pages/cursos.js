import Head from "next/head";
import { useEffect, useState } from "react";
import Parse from "../lib/parseConfig";
import PremiumNavbar from "../components/ui/PremiumNavbar";
import PremiumFooter from "../components/ui/PremiumFooter";
import CoursesSection from "../components/home/CoursesSection";

export default function CursosPage() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarCursos() {
      try {
        const Cursos = Parse.Object.extend("Cursos");
        const query = new Parse.Query(Cursos);
        query.equalTo("ativo", true);
        query.ascending("ordem");
        const results = await query.find();

        const cursosData = results.map((item) => ({
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

        setCursos(cursosData);
      } catch (err) {
        console.error("Erro ao buscar cursos:", err);
      } finally {
        setLoading(false);
      }
    }

    carregarCursos();
  }, []);

  return (
    <>
      <Head>
        <title>Cursos | Acao Saude</title>
        <meta
          name="description"
          content="Cursos com proposito da Acao Saude para formacao profissional e desenvolvimento social."
        />
      </Head>

      <PremiumNavbar />

      <main className="min-h-screen pt-8 md:pt-10">
        <CoursesSection
          cursos={cursos}
          loading={loading}
          sectionId="cursos-lista"
          title="Cursos com proposito"
          subtitle="Formacao profissional para gerar renda, autonomia e transformacao social real."
        />
      </main>

      <PremiumFooter />
    </>
  );
}
