import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import StatsCards from "./StatsCards";

type HeroData = {
  titulo?: string | null;
  subtitulo?: string | null;
  descricao?: string | null;
  imagemUrl?: string | null;
};

type HeroSectionProps = {
  heroData: HeroData | null;
};

export default function HeroSection({ heroData }: HeroSectionProps) {
  const title = heroData?.titulo || "Acao Saude";
  const subtitle = heroData?.subtitulo || "Eu faco o bem";
  const description =
    heroData?.descricao ||
    "Levamos cuidado integral, projetos sociais e oportunidades de formacao para fortalecer comunidades em situacao de vulnerabilidade.";

  return (
    <section className="hero-premium">
      <div className="hero-glow hero-glow--left" aria-hidden="true" />
      <div className="hero-glow hero-glow--right" aria-hidden="true" />
      <div className="hero-dot hero-dot--one" aria-hidden="true" />
      <div className="hero-dot hero-dot--two" aria-hidden="true" />

      <div className="site-container relative py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <span className="premium-chip">
              Saude integral com acolhimento real
            </span>

            <h1 className="hero-title mt-6">
              {title}
              <br />
              <span className="hero-title-accent">{subtitle}</span>
            </h1>

            <p className="hero-description mt-6 max-w-2xl">{description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#doacao" className="premium-cta premium-cta--solid">
                Apoiar o instituto
                <ArrowRight size={16} />
              </a>
              <a href="#atuacao" className="premium-cta premium-cta--ghost">
                Conhecer atuacao
              </a>
            </div>

            <StatsCards />
          </motion.div>

          <motion.div
            className="hero-figure-wrap"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.1 }}
          >
            <motion.div
              className="hero-figure-float"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="hero-figure-card">
                {heroData?.imagemUrl ? (
                  <Image
                    src={heroData.imagemUrl}
                    alt="Acoes da Acao Saude"
                    width={860}
                    height={1030}
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="hero-figure-image"
                  />
                ) : (
                  <div className="hero-figure-fallback">
                    Imagem institucional indisponivel
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
