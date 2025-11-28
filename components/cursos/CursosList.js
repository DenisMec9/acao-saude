import Link from "next/link";
import Image from "next/image";

export default function CursosList({ cursos }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const cursosAtivos = cursos.filter(curso => curso.ativo);

  return (
    <section id="cursos" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Nossos Cursos
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Capacitação profissional e desenvolvimento de habilidades para transformar vidas.
        </p>
        
        {cursosAtivos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Em breve teremos novos cursos disponíveis.</p>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md mx-auto">
              Fique ligado nas nossas redes sociais para novidades!
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cursosAtivos.map((curso) => (
                <div 
                  key={curso.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 flex-1">
                        {curso.titulo}
                      </h3>
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                        curso.vagasDisponiveis > 0 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {curso.vagasDisponiveis > 0 ? `${curso.vagasDisponiveis} vagas` : 'Esgotado'}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {curso.descricao}
                    </p>

                    <div className="space-y-2 mb-4 text-sm text-gray-500">
                      <div className="flex justify-between">
                        <span>📅 Período:</span>
                        <span>{formatDate(curso.dataInicio)} - {formatDate(curso.dataFim)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>📍 Local:</span>
                        <span>{curso.local}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>⏱️ Duração:</span>
                        <span>{curso.duracao}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>💰 Investimento:</span>
                        <span className="font-semibold">
                          {curso.investimento === 0 ? 'Gratuito' : `R$ ${curso.investimento.toFixed(2)}`}
                        </span>
                      </div>
                    </div>

                    {curso.requisitos.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Pré-requisitos:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {curso.requisitos.slice(0, 3).map((req, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                              {req}
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
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                        curso.vagasDisponiveis > 0
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={curso.vagasDisponiveis === 0}
                    >
                      {curso.vagasDisponiveis > 0 ? 'Quero me inscrever' : 'Vagas Esgotadas'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Interessado em nossos cursos? Entre em contato para mais informações!
              </p>
              <Link 
                href="/contato" 
                className="inline-block bg-azulInstitucional text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
              >
                Entrar em Contato
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}