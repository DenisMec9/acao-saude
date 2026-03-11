// components/CursosHome.js
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BadgeDollarSign, Clock3 } from 'lucide-react';

export default function CursosHome({ cursos }) {
  // Mostra apenas cursos ativos com vagas disponíveis
  const cursosAtivos = cursos.filter(curso => curso.vagasDisponiveis > 0);

  if (cursosAtivos.length === 0) {
    return null; // Não mostra a seção se não há cursos
  }

  return (
    <section id="cursos" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            Nossos Cursos
          </h2>
          <div className="section-divider mb-5" />
          <p className="section-subtitle">
            Capacitação profissional e oportunidades de desenvolvimento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cursosAtivos.slice(0, 3).map((curso) => (
            <div
              key={curso.id}
              className="surface-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 curso-card"
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
                  <h3 className="text-xl font-bold text-slate-900">
                    {curso.titulo}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {curso.vagasDisponiveis} vagas
                  </span>
                </div>

                {curso.descricao && (
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {curso.descricao}
                  </p>
                )}

                <div className="space-y-2 mb-4 text-sm text-slate-600">
                  {curso.duracao && (
                    <div className="flex justify-between items-center gap-2">
                      <span className="inline-flex items-center gap-2"><Clock3 size={15} /> Duração</span>
                      <span className="font-semibold">{curso.duracao}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center gap-2">
                    <span className="inline-flex items-center gap-2"><BadgeDollarSign size={15} /> Investimento</span>
                    <span className="font-bold text-[#053980]">
                      {curso.investimento === 0 ? 'Gratuito' : `R$ ${curso.investimento.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* BOTÃO ALTERADO: Agora leva para a página de cursos */}
                <Link href="/cursos" className="block">
                  <button className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                    Saiba Mais
                    <ArrowRight size={15} />
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
            className="inline-flex items-center gap-2 bg-[#053980] text-white px-8 py-3 rounded-xl hover:bg-[#032a5f] transition font-semibold"
          >
            Ver Todos os Cursos ({cursosAtivos.length})
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}