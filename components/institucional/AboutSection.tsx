import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ValuesCards from "./ValuesCards";

export default function AboutSection() {
  return (
    <section id="quem-somos" className="section-shell">
      <div className="site-container">
        <Reveal className="section-header">
          <p className="section-kicker">Instituto Acao Saude</p>
          <h2 className="section-title">Quem Somos</h2>
          <p className="section-subtitle">
            Somos uma organizacao sem fins lucrativos que une saude,
            desenvolvimento humano e acao social com gestao profissional.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <Reveal>
            <div className="about-image-card">
              <Image
                src="/imagens/foto.oq.jpg"
                alt="Atendimento da Acao Saude"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="about-image"
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="about-content">
              <p className="about-text">
                Levamos acesso a saude integral para comunidades em
                vulnerabilidade com cuidado tecnico, escuta humana e presenca
                territorial. Nosso trabalho une voluntariado, profissionais e
                parceiros para gerar mudanca consistente.
              </p>
              <ValuesCards />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
