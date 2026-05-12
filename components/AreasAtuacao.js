import {
  Baby,
  Accessibility,
  Leaf,
  Briefcase,
  Scale,
  Lightbulb,
  HandHeart,
  HelpingHand,
} from "lucide-react";

export default function AreasAtuacao() {
  const areas = [
    {
      icon: Baby,
      title: "Crianca e Adolescente",
      text: "Educacao infantil, lazer e acompanhamento de desenvolvimento.",
    },
    {
      icon: Accessibility,
      title: "Idoso e PCD",
      text: "Cuidado especializado com foco em autonomia e qualidade de vida.",
    },
    {
      icon: Leaf,
      title: "Meio Ambiente",
      text: "Educacao ambiental e praticas sustentaveis para a comunidade.",
    },
    {
      icon: Briefcase,
      title: "Emprego",
      text: "Capacitacao profissional para gerar renda e novas oportunidades.",
    },
    {
      icon: Scale,
      title: "Assessoria Juridica",
      text: "Orientacao legal para ampliar acesso a direitos essenciais.",
    },
    {
      icon: Lightbulb,
      title: "Inovacao",
      text: "Solucoes criativas para desafios sociais e de saude.",
    },
    {
      icon: HandHeart,
      title: "Capelania",
      text: "Acolhimento espiritual e emocional com respeito e escuta.",
    },
    {
      icon: HelpingHand,
      title: "Assistencia Social",
      text: "Suporte a familias em situacao de vulnerabilidade.",
    },
  ];

  return (
    <section id="atuacao" className="py-16 md:py-20">
      <div className="site-container">
        <div className="mb-12 text-center">
          <h2 className="section-title mb-4">Areas de Atuacao</h2>
          <div className="section-divider" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <article
                key={area.title}
                className="group surface-card-strong rounded-2xl p-5 transition hover:-translate-y-1"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#053980] to-[#0f5fc2] text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  {area.title}
                </h3>
                <p className="text-sm text-slate-600">{area.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
