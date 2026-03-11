import { Lightbulb, HeartPulse, Expand, Globe } from 'lucide-react';

export default function NossaHistoria() {
  const timelineItems = [
    {
      icon: Lightbulb,
      title: '2007 - O Início',
      text: 'No ano de 2007, nasceu o Ação Saúde, fruto de um sonho do Dr. Abinadabe Pires, um médico ainda jovem, um universitário inconformado com a gigantesca desigualdade social em nosso país.'
    },
    {
      icon: HeartPulse,
      title: 'O Programa Ação Saúde',
      text: 'Idealizou e iniciou o Programa Ação Saúde, com o objetivo inicial de levar atendimento médico à população sem condições de acesso à saúde básica.'
    },
    {
      icon: Expand,
      title: 'Expansão',
      text: 'De um simples projeto de atendimento médico, crescemos para uma organização que oferece saúde integral - física, mental, espiritual e social.'
    },
    {
      icon: Globe,
      title: 'Hoje',
      text: 'Atualmente, o Instituto Ação Saúde Internacional atua em múltiplas frentes, impactando milhares de vidas através de nossos programas e ações comunitárias.'
    }
  ];

  return (
    <div className="mt-20 rounded-3xl bg-white/70 border border-slate-200 p-8 md:p-12 shadow-sm">
      <h3 className="section-title text-center mb-12">
        Nossa História
      </h3>
      <div className="relative">
        {timelineItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`timeline-item relative pl-16 ${index < timelineItems.length - 1 ? 'pb-10' : ''}`}
            >
              <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff7415] to-[#ff934d] text-white shadow-md">
                <Icon size={20} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">
                {item.title}
              </h4>
              <p className="text-slate-600">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
