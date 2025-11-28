// pages/cursos.js
import { useEffect, useState } from "react";
import Parse from "../lib/parseConfig";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Image from "next/image";

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

  const formatDate = (dateString) => {
    if (!dateString) return "A definir";
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleWhatsApp = (curso) => {
    const message = `Olá! Gostaria de me inscrever no curso: ${curso.titulo}`;
    window.open(`https://wa.me/5581987455207?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInfoWhatsApp = () => {
    const message = `Olá! Gostaria de mais informações sobre os cursos disponíveis`;
    window.open(`https://wa.me/5581987455207?text=${encodeURIComponent(message)}`, '_blank');
  };

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Cursos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cursosAtivos.map((curso) => (
                      <div
                        key={curso.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 curso-card"
                      >
                        {curso.imagem && (
                          <div className="relative h-48">
                            <Image
                              src={curso.imagem}
                              alt={curso.titulo}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {curso.titulo}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              curso.vagasDisponiveis > 0 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {curso.vagasDisponiveis > 0 
                                ? `${curso.vagasDisponiveis} vagas` 
                                : 'Esgotado'
                              }
                            </span>
                          </div>

                          {curso.descricao && (
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {curso.descricao}
                            </p>
                          )}

                          <div className="space-y-2 mb-4 text-sm text-gray-500">
                            <div className="flex justify-between">
                              <span>📅 Período:</span>
                              <span>{formatDate(curso.dataInicio)} - {formatDate(curso.dataFim)}</span>
                            </div>
                            {curso.local && (
                              <div className="flex justify-between">
                                <span>📍 Local:</span>
                                <span>{curso.local}</span>
                              </div>
                            )}
                            {curso.duracao && (
                              <div className="flex justify-between">
                                <span>⏱️ Duração:</span>
                                <span>{curso.duracao}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span>💰 Investimento:</span>
                              <span className="font-semibold">
                                {curso.investimento === 0 ? 'Gratuito' : `R$ ${curso.investimento.toFixed(2)}`}
                              </span>
                            </div>
                          </div>

                          {curso.requisitos.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 mb-2 text-sm">Pré-requisitos:</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {curso.requisitos.slice(0, 3).map((requisito, index) => (
                                  <li key={index} className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    {requisito}
                                  </li>
                                ))}
                                {curso.requisitos.length > 3 && (
                                  <li className="text-blue-600 text-sm">
                                    + {curso.requisitos.length - 3} mais...
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}

                          <button
                            onClick={() => handleWhatsApp(curso)}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                              curso.vagasDisponiveis > 0
                                ? 'bg-orange-500 text-white hover:bg-orange-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={curso.vagasDisponiveis === 0}
                          >
                            {curso.vagasDisponiveis > 0 ? 'Inscrever-se' : 'Vagas Esgotadas'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cursos esgotados */}
              {cursosEsgotados.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Vagas Esgotadas ({cursosEsgotados.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cursosEsgotados.map((curso) => (
                      <div
                        key={curso.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 curso-card opacity-80"
                      >
                        {curso.imagem && (
                          <div className="relative h-48">
                            <Image
                              src={curso.imagem}
                              alt={curso.titulo}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                                VAGAS ESGOTADAS
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {curso.titulo}
                            </h3>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              Esgotado
                            </span>
                          </div>

                          {curso.descricao && (
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {curso.descricao}
                            </p>
                          )}

                          <button
                            onClick={handleInfoWhatsApp}
                            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            Informações
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Seção de contato */}
          <div className="text-center mt-12 bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Interessado em nossos cursos?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco para mais informações sobre inscrições, 
              conteúdos programáticos ou para propor novas parcerias.
            </p>
            <button
              onClick={handleInfoWhatsApp}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Entrar em Contato
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}