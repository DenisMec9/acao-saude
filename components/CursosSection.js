// components/CursosSection.js
import { useEffect, useState } from "react";
import Parse from "../lib/parseConfig";
import CursoCard from "./CursoCard";

export default function CursosSection() {
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
          duracao: item.get("duracao") || "",
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const cursosAtivos = cursos.filter(curso => curso.vagasDisponiveis > 0);
  const cursosEsgotados = cursos.filter(curso => curso.vagasDisponiveis === 0);

  return (
    <section id="cursos" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nossos Cursos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Capacitação profissional e desenvolvimento de habilidades para transformar vidas
          </p>
        </div>

        {cursos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Em breve teremos novos cursos disponíveis.
            </p>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md mx-auto">
              Fique ligado nas nossas redes sociais para novidades!
            </div>
          </div>
        ) : (
          <>
            {/* Cursos com vagas disponíveis */}
            {cursosAtivos.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Vagas Abertas ({cursosAtivos.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cursosAtivos.map((curso) => (
                    <CursoCard key={curso.id} curso={curso} />
                  ))}
                </div>
              </div>
            )}

            {/* Cursos esgotados */}
            {cursosEsgotados.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Vagas Esgotadas ({cursosEsgotados.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cursosEsgotados.map((curso) => (
                    <CursoCard key={curso.id} curso={curso} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}