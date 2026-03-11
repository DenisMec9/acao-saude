import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeDollarSign,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MapPin,
  MessageCircle,
  XCircle,
} from 'lucide-react';

function formatDate(dateString) {
  if (!dateString) return 'A definir';
  return new Date(dateString).toLocaleDateString('pt-BR');
}

function formatCurrency(value) {
  if (!value) return 'Gratuito';
  return `R$ ${Number(value).toFixed(2)}`;
}

function CursoCard({ curso, onPrimaryAction, onSecondaryAction }) {
  const isSoldOut = Number(curso.vagasDisponiveis || 0) <= 0;

  return (
    <article className="surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up">
      {curso.imagem ? (
        <div className="relative h-52">
          <Image src={curso.imagem} alt={curso.titulo} fill className="object-cover" />
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                isSoldOut ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {isSoldOut ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
              {isSoldOut ? 'Esgotado' : `${curso.vagasDisponiveis} vagas`}
            </span>
          </div>
          {isSoldOut && (
            <div className="absolute inset-0 bg-slate-900/45 flex items-center justify-center">
              <span className="rounded-xl bg-rose-600 px-4 py-2 text-white font-bold tracking-wide">
                VAGAS ESGOTADAS
              </span>
            </div>
          )}
        </div>
      ) : null}

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{curso.titulo}</h3>

        {curso.descricao ? (
          <p className="text-slate-600 mb-5 line-clamp-3">{curso.descricao}</p>
        ) : null}

        <dl className="space-y-2 text-sm mb-5">
          <div className="flex items-center justify-between gap-2 text-slate-600">
            <dt className="inline-flex items-center gap-2"><CalendarDays size={15} /> Período</dt>
            <dd className="font-medium text-slate-700 text-right">{formatDate(curso.dataInicio)} - {formatDate(curso.dataFim)}</dd>
          </div>
          {curso.local ? (
            <div className="flex items-center justify-between gap-2 text-slate-600">
              <dt className="inline-flex items-center gap-2"><MapPin size={15} /> Local</dt>
              <dd className="font-medium text-slate-700 text-right line-clamp-1">{curso.local}</dd>
            </div>
          ) : null}
          {curso.duracao ? (
            <div className="flex items-center justify-between gap-2 text-slate-600">
              <dt className="inline-flex items-center gap-2"><Clock3 size={15} /> Duração</dt>
              <dd className="font-medium text-slate-700">{curso.duracao}</dd>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-2 text-slate-600">
            <dt className="inline-flex items-center gap-2"><BadgeDollarSign size={15} /> Investimento</dt>
            <dd className="font-bold text-[#053980]">{formatCurrency(curso.investimento)}</dd>
          </div>
        </dl>

        {Array.isArray(curso.requisitos) && curso.requisitos.length > 0 ? (
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Pré-requisitos</h4>
            <ul className="space-y-1 text-sm text-slate-600">
              {curso.requisitos.slice(0, 3).map((item, index) => (
                <li key={`${curso.id}-req-${index}`} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff7415]" />
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
              {curso.requisitos.length > 3 ? (
                <li className="text-[#053980] text-xs font-semibold">+ {curso.requisitos.length - 3} mais</li>
              ) : null}
            </ul>
          </div>
        ) : null}

        {isSoldOut ? (
          <button
            onClick={() => onSecondaryAction(curso)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 text-white px-4 py-3 font-semibold hover:bg-slate-900 transition"
          >
            <MessageCircle size={16} />
            Lista de Espera
          </button>
        ) : (
          <button
            onClick={() => onPrimaryAction(curso)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff7415] text-white px-4 py-3 font-semibold hover:bg-[#e5670d] transition"
          >
            <GraduationCap size={16} />
            Quero me inscrever
          </button>
        )}
      </div>
    </article>
  );
}

function CursosSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[0, 1, 2].map((n) => (
        <div key={n} className="surface-card rounded-2xl overflow-hidden p-0">
          <div className="h-52 skeleton" />
          <div className="p-6 space-y-3">
            <div className="h-5 rounded skeleton" />
            <div className="h-4 rounded skeleton" />
            <div className="h-4 w-4/5 rounded skeleton" />
            <div className="h-10 mt-4 rounded skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CursosUnifiedSection({
  cursos = [],
  loading = false,
  sectionId = 'cursos',
  title = 'Nossos Cursos',
  subtitle = 'Capacitação profissional e desenvolvimento de habilidades para transformar vidas.',
  showBottomCta = false,
}) {
  const handlePrimaryAction = (curso) => {
    const message = `Olá! Gostaria de me inscrever no curso: ${curso.titulo}`;
    window.open(`https://wa.me/5581987455207?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSecondaryAction = (curso) => {
    const message = `Olá! Gostaria de entrar na lista de espera do curso: ${curso.titulo}`;
    window.open(`https://wa.me/5581987455207?text=${encodeURIComponent(message)}`, '_blank');
  };

  const active = cursos.filter((curso) => Number(curso.vagasDisponiveis || 0) > 0);
  const soldOut = cursos.filter((curso) => Number(curso.vagasDisponiveis || 0) <= 0);

  return (
    <section id={sectionId} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="section-title mb-4">{title}</h2>
          <div className="section-divider mb-5" />
          <p className="section-subtitle">{subtitle}</p>
        </div>

        {loading ? <CursosSkeleton /> : null}

        {!loading && cursos.length === 0 ? (
          <div className="surface-card rounded-2xl p-10 text-center">
            <p className="text-slate-600 text-lg mb-4">Em breve teremos novos cursos disponíveis.</p>
            <p className="text-slate-500">Acompanhe nossas redes sociais para novidades.</p>
          </div>
        ) : null}

        {!loading && active.length > 0 ? (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Vagas Abertas ({active.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {active.map((curso) => (
                <CursoCard
                  key={curso.id}
                  curso={curso}
                  onPrimaryAction={handlePrimaryAction}
                  onSecondaryAction={handleSecondaryAction}
                />
              ))}
            </div>
          </div>
        ) : null}

        {!loading && soldOut.length > 0 ? (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Lista de Espera ({soldOut.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {soldOut.map((curso) => (
                <CursoCard
                  key={curso.id}
                  curso={curso}
                  onPrimaryAction={handlePrimaryAction}
                  onSecondaryAction={handleSecondaryAction}
                />
              ))}
            </div>
          </div>
        ) : null}

        {!loading && showBottomCta ? (
          <div className="mt-12 text-center surface-card rounded-2xl p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Precisa de ajuda para escolher?</h3>
            <p className="text-slate-600 mb-6">Nossa equipe orienta você sobre inscrições, calendário e trilhas de aprendizado.</p>
            <Link
              href="https://wa.me/5581987455207?text=Olá! Gostaria de mais informações sobre os cursos disponíveis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#053980] text-white px-6 py-3 font-semibold hover:bg-[#032a5f] transition"
            >
              Falar no WhatsApp <ArrowRight size={16} />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
