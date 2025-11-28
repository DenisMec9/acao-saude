// components/CursosHome.js
import Link from 'next/link';
import Image from 'next/image';

export default function CursosHome({ cursos }) {
  const formatDate = (dateString) => {
    if (!dateString) return "A definir";
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Mostra apenas cursos ativos com vagas disponíveis
  const cursosAtivos = cursos.filter(curso => curso.vagasDisponiveis > 0);

  if (cursosAtivos.length === 0) {
    return null; // Não mostra a seção se não há cursos
  }

  return (
    <section id="cursos" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nossos Cursos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Capacitação profissional e oportunidades de desenvolvimento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cursosAtivos.slice(0, 3).map((curso) => (
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
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {curso.vagasDisponiveis} vagas
                  </span>
                </div>

                {curso.descricao && (
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {curso.descricao}
                  </p>
                )}

                <div className="space-y-2 mb-4 text-sm text-gray-500">
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

                {/* BOTÃO ALTERADO: Agora leva para a página de cursos */}
                <Link href="/cursos" className="block">
                  <button className="w-full py-3 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                    Saiba Mais
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Link para ver todos os cursos */}
        <div className="text-center">
          <Link 
            href="/cursos" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Ver Todos os Cursos ({cursosAtivos.length})
          </Link>
        </div>
      </div>
    </section>
  );
}