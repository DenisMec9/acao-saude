export default function AreasAtuacao() {
  return (
    <section id="atuacao" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Áreas de Atuação
          </h2>
          <div className="w-20 h-1 bg-[#ff7415] mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: 'fas fa-child',
              title: 'Criança e Adolescente',
              text: 'Educação infantil, atividades recreativas e acompanhamento do desenvolvimento.'
            },
            {
              icon: 'fas fa-wheelchair',
              title: 'Idoso e PCD',
              text: 'Cuidados especiais, atividades adaptadas e promoção da qualidade de vida.'
            },
            {
              icon: 'fas fa-leaf',
              title: 'Meio Ambiente',
              text: 'Educação ambiental e práticas sustentáveis para comunidades mais saudáveis.'
            },
            {
              icon: 'fas fa-briefcase',
              title: 'Emprego',
              text: 'Capacitação profissional e apoio à empregabilidade para geração de renda.'
            },
            {
              icon: 'fas fa-balance-scale',
              title: 'Assessoria Jurídica',
              text: 'Orientação legal e acesso à justiça para garantia de direitos fundamentais.'
            },
            {
              icon: 'fas fa-lightbulb',
              title: 'Inovação',
              text: 'Soluções criativas e tecnológicas para desafios sociais e de saúde.'
            },
            {
              icon: 'fas fa-hands-praying',
              title: 'Capelania',
              text: 'Acolhimento espiritual e apoio emocional através da fé e valores humanos.'
            },
            {
              icon: 'fas fa-hands-holding-child',
              title: 'Assistência Social',
              text: 'Apoio às famílias em situação de vulnerabilidade social.'
            }
          ].map((area, index) => (
            <div
              key={index}
              className="bg-[#053980] text-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300"
            >
              <div className="text-4xl mb-4">
                <i className={area.icon} />
              </div>
              <h3 className="text-xl font-bold mb-3">{area.title}</h3>
              <p>{area.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
