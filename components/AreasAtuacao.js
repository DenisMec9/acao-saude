import {
  Baby,
  Accessibility,
  Leaf,
  Briefcase,
  Scale,
  Lightbulb,
  HandHeart,
  HelpingHand,
} from 'lucide-react';

export default function AreasAtuacao() {
  const areas = [
    {
      icon: Baby,
      title: 'Criança e Adolescente',
      text: 'Educação infantil, atividades recreativas e acompanhamento do desenvolvimento.'
    },
    {
      icon: Accessibility,
      title: 'Idoso e PCD',
      text: 'Cuidados especiais, atividades adaptadas e promoção da qualidade de vida.'
    },
    {
      icon: Leaf,
      title: 'Meio Ambiente',
      text: 'Educação ambiental e práticas sustentáveis para comunidades mais saudáveis.'
    },
    {
      icon: Briefcase,
      title: 'Emprego',
      text: 'Capacitação profissional e apoio à empregabilidade para geração de renda.'
    },
    {
      icon: Scale,
      title: 'Assessoria Jurídica',
      text: 'Orientação legal e acesso à justiça para garantia de direitos fundamentais.'
    },
    {
      icon: Lightbulb,
      title: 'Inovação',
      text: 'Soluções criativas e tecnológicas para desafios sociais e de saúde.'
    },
    {
      icon: HandHeart,
      title: 'Capelania',
      text: 'Acolhimento espiritual e apoio emocional através da fé e valores humanos.'
    },
    {
      icon: HelpingHand,
      title: 'Assistência Social',
      text: 'Apoio às famílias em situação de vulnerabilidade social.'
    }
  ];

  return (
    <section id="atuacao" className="py-20 bg-slate-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Áreas de Atuação
          </h2>
          <div className="section-divider" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, index) => {
            const Icon = area.icon;

            return (
            <div
              key={index}
              className="bg-gradient-to-br from-[#053980] via-[#0a4ca4] to-[#0d60cb] text-white p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition duration-300 border border-white/20"
            >
              <div className="mb-4 h-12 w-12 rounded-xl bg-white/15 flex items-center justify-center">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{area.title}</h3>
              <p className="text-blue-50/90">{area.text}</p>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
