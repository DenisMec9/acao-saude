import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeDollarSign, Clock3 } from "lucide-react";

export default function CursosHome({ cursos }) {
  const cursosAtivos = cursos.filter((curso) => curso.vagasDisponiveis > 0);

  if (cursosAtivos.length === 0) {
    return null;
  }

  return (
    <section id="cursos" className="py-16 md:py-20">
      <div className="site-container">
        <div className="mb-12 text-center">
          <h2 className="section-title mb-4">Nossos Cursos</h2>
          <div className="section-divider mb-5" />
          <p className="section-subtitle">
            Capacitacao profissional para gerar renda e autonomia.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cursosAtivos.slice(0, 3).map((curso) => (
            <article
              key={curso.id}
              className="surface-card-strong curso-card overflow-hidden rounded-2xl"
            >
              {curso.imagem ? (
                <div className="relative h-48">
                  <Image src={curso.imagem} alt={curso.titulo} fill className="object-cover" />
                </div>
              ) : null}

              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{curso.titulo}</h3>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {curso.vagasDisponiveis} vagas
                  </span>
                </div>

                {curso.descricao ? (
                  <p className="mb-4 text-slate-600 line-clamp-2">{curso.descricao}</p>
                ) : null}

                <div className="mb-5 space-y-2 text-sm text-slate-600">
                  {curso.duracao ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2">
                        <Clock3 size={15} /> Duracao
                      </span>
                      <span className="font-semibold">{curso.duracao}</span>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2">
                      <BadgeDollarSign size={15} /> Investimento
                    </span>
                    <span className="font-bold text-[#053980]">
                      {curso.investimento === 0
                        ? "Gratuito"
                        : `R$ ${curso.investimento.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <Link
                  href="/cursos"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff7415] px-4 py-3 font-semibold text-white transition hover:bg-[#e5670d]"
                >
                  Saiba mais
                  <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 rounded-xl bg-[#053980] px-8 py-3 font-semibold text-white transition hover:bg-[#032a5f]"
          >
            Ver todos os cursos ({cursosAtivos.length})
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
