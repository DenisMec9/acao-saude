// pages/cursos.js
import { useEffect, useState } from "react";
import Parse from "../lib/parseConfig";
import Navbar from "../components/Navbar";
import CursosUnifiedSection from "../components/cursos/CursosUnifiedSection";

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
        
        const cursosData = results.map(item => ({
          id: item.id,
          titulo: item.get("titulo") || "",
          descricao: item.get("descricao") || "",
          imagem: item.get("imagem")?.url() || "",
          vagas: item.get("vagas") || 0,
          vagasDisponiveis: item.get("vagasDisponiveis") || 0,
          dataInicio: item.get("dataInicio")?.toISOString() || "",
          dataFim: item.get("dataFim")?.toISOString() || "",
          local: item.get("local") || "",
          duracao: item.get("duração") || "",
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
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20 pb-12">
        <CursosUnifiedSection
          cursos={cursos}
          loading={loading}
          showBottomCta
          title="Cursos com propósito"
          subtitle="Capacitação profissional para gerar renda, autonomia e transformação social real."
        />
      </main>
    </div>
  );
}