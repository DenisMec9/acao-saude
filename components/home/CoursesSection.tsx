import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  CalendarDays,
  Clock3,
  MessageCircle,
  MapPin,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type Curso = {
  id: string;
  titulo: string;
  descricao?: string;
  imagem?: string;
  vagasDisponiveis?: number;
  dataInicio?: string;
  dataFim?: string;
  local?: string;
  duracao?: string;
  investimento?: number;
};

type CoursesSectionProps = {
  cursos?: Curso[];
  loading?: boolean;
  sectionId?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
  compact?: boolean;
};

function formatDate(input?: string) {
  if (!input) return "a definir";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "a definir";
  return date.toLocaleDateString("pt-BR");
}

function formatCurrency(value?: number) {
  if (!value) return "Gratuito";
  return `R$ ${Number(value).toFixed(2)}`;
}

function WhatsAppCTA({ curso }: { curso?: Curso }) {
  const text = curso
    ? `Ola! Quero mais informacoes sobre o curso ${curso.titulo}.`
    : "Ola! Quero saber mais sobre os cursos da Acao Saude.";

  return (
    <Link
      href={`https://wa.me/5581987455207?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="premium-whatsapp-btn"
    >
      Falar no WhatsApp
      <MessageCircle size={16} />
    </Link>
  );
}

function CourseSkeletonCard() {
  return (
    <div className="course-card">
      <div className="skeleton h-44 rounded-2xl" />
      <div className="mt-5 space-y-3">
        <div className="skeleton h-5 rounded-lg" />
        <div className="skeleton h-4 rounded-lg" />
        <div className="skeleton h-4 w-4/5 rounded-lg" />
        <div className="skeleton mt-6 h-11 rounded-xl" />
      </div>
    </div>
  );
}

function EmptyCourseCards() {
  const placeholders = [
    "Trilha de Formacao em Saude Comunitaria",
    "Capacitacao para Cuidado Humanizado",
    "Programa de Lideranca Social em Saude",
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {placeholders.map((title, index) => (
        <motion.article
          key={title}
          className="course-card course-card--empty"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: index * 0.06 }}
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#053980] to-[#0f5fc2] text-white">
            <Sparkles size={18} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
          <p className="mb-6 text-sm text-slate-600">
            Em breve novas turmas com vagas abertas. Ja estamos montando os
            proximos ciclos formativos.
          </p>
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-[#d75f0a]">
            Em breve
          </span>
        </motion.article>
      ))}
    </div>
  );
}

function CourseCard({ curso }: { curso: Curso }) {
  return (
    <motion.article
      className="course-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      {curso.imagem ? (
        <div className="relative h-44 overflow-hidden rounded-2xl">
          <Image
            src={curso.imagem}
            alt={curso.titulo}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      ) : null}

      <div className="mt-5">
        <h3 className="mb-2 text-xl font-bold text-slate-900">{curso.titulo}</h3>
        {curso.descricao ? (
          <p className="mb-4 text-sm text-slate-600 line-clamp-3">{curso.descricao}</p>
        ) : null}

        <dl className="space-y-2 text-xs text-slate-600 sm:text-sm">
          <div className="flex items-center justify-between gap-2">
            <dt className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} /> Periodo
            </dt>
            <dd className="font-semibold text-slate-700">
              {formatDate(curso.dataInicio)} - {formatDate(curso.dataFim)}
            </dd>
          </div>
          {curso.local ? (
            <div className="flex items-center justify-between gap-2">
              <dt className="inline-flex items-center gap-1.5">
                <MapPin size={14} /> Local
              </dt>
              <dd className="line-clamp-1 text-right font-semibold text-slate-700">
                {curso.local}
              </dd>
            </div>
          ) : null}
          {curso.duracao ? (
            <div className="flex items-center justify-between gap-2">
              <dt className="inline-flex items-center gap-1.5">
                <Clock3 size={14} /> Duracao
              </dt>
              <dd className="font-semibold text-slate-700">{curso.duracao}</dd>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-2">
            <dt className="inline-flex items-center gap-1.5">
              <BadgeDollarSign size={14} /> Investimento
            </dt>
            <dd className="font-bold text-[#053980]">
              {formatCurrency(curso.investimento)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-5">
        <WhatsAppCTA curso={curso} />
      </div>
    </motion.article>
  );
}

export default function CoursesSection({
  cursos = [],
  loading = false,
  sectionId = "cursos",
  title = "Cursos com proposito",
  subtitle = "Formacao profissional com visao humana para gerar renda, autonomia e impacto social.",
  limit,
  compact = false,
}: CoursesSectionProps) {
  const normalized = cursos.map((curso) => ({
    ...curso,
    vagasDisponiveis: Number(curso.vagasDisponiveis || 0),
  }));
  const active = normalized.filter((curso) => Number(curso.vagasDisponiveis) > 0);
  const list = typeof limit === "number" ? active.slice(0, limit) : active;
  const showEmpty = !loading && list.length === 0;

  return (
    <section id={sectionId} className={`section-shell ${compact ? "py-14 md:py-16" : ""}`}>
      <div className="site-container">
        <Reveal className="section-header">
          <p className="section-kicker">Educacao transformadora</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </Reveal>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <CourseSkeletonCard />
            <CourseSkeletonCard />
            <CourseSkeletonCard />
          </div>
        ) : null}

        {!loading && list.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {list.map((curso) => (
              <CourseCard key={curso.id} curso={curso} />
            ))}
          </div>
        ) : null}

        {showEmpty ? (
          <Reveal>
            <div className="premium-empty-state">
              <h3 className="premium-empty-title">Novas turmas em preparacao</h3>
              <p className="premium-empty-text">
                Estamos estruturando os proximos cursos para ampliar impacto
                social com qualidade. Enquanto isso, nosso time pode te orientar
                sobre previsoes e pre-inscricao.
              </p>
              <div className="mt-6">
                <WhatsAppCTA />
              </div>
            </div>
            <div className="mt-7">
              <EmptyCourseCards />
            </div>
          </Reveal>
        ) : null}

        {!showEmpty ? (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/cursos" className="premium-link-btn">
              Ver pagina completa de cursos
              <ArrowRight size={16} />
            </Link>
            <WhatsAppCTA />
          </div>
        ) : null}
      </div>
    </section>
  );
}
