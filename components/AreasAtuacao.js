import { 
  FaChild, 
  FaWheelchair, 
  FaLeaf, 
  FaBriefcase, 
  FaBalanceScale, 
  FaLightbulb, 
  FaPrayingHands, 
  FaHandsHelping 
} from 'react-icons/fa';

const cards = [
  {
    icon: <FaChild size={32} />, title: 'Criança e Adolescente',
    desc: 'Educação infantil, atividades recreativas e acompanhamento do desenvolvimento.'
  },
  {
    icon: <FaWheelchair size={32} />, title: 'Idoso e PCD',
    desc: 'Cuidados especiais, atividades adaptadas e promoção da qualidade de vida.'
  },
  {
    icon: <FaLeaf size={32} />, title: 'Meio Ambiente',
    desc: 'Educação ambiental e práticas sustentáveis para comunidades mais saudáveis.'
  },
  {
    icon: <FaBriefcase size={32} />, title: 'Emprego',
    desc: 'Capacitação profissional e apoio à empregabilidade para geração de renda.'
  },
  {
    icon: <FaBalanceScale size={32} />, title: 'Assessoria Jurídica',
    desc: 'Orientação legal e acesso à justiça para garantia de direitos fundamentais.'
  },
  {
    icon: <FaLightbulb size={32} />, title: 'Inovação',
    desc: 'Soluções criativas e tecnológicas para desafios sociais e de saúde.'
  },
  {
    icon: <FaPrayingHands size={32} />, title: 'Capelania',
    desc: 'Acolhimento espiritual e apoio emocional através da fé e valores humanos.'
  },
  {
    icon: <FaHandsHelping size={32} />, title: 'Assistência Social',
    desc: 'Apoio às famílias em situação de vulnerabilidade social.'
  }
];

export default function AreasAtuacao() {
  return (
    <section id="atuacao" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Áreas de Atuação</h2>
          <div className="w-20 h-1 bg-[#ff7415] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-[#053980] text-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
