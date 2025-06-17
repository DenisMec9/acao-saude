export default function NossaHistoria() {
  const eventos = [
    {
      icon: 'fas fa-lightbulb',
      title: '2007 - O Início',
      desc: 'No ano de 2007, nasceu o Ação Saúde, fruto de um sonho do Dr. Abinadabe Pires, um médico ainda jovem, um universitário inconformado com a gigantesca desigualdade social em nosso país.'
    },
    {
      icon: 'fas fa-heartbeat',
      title: 'O Programa Ação Saúde',
      desc: 'Idealizou e iniciou o Programa Ação Saúde, com o objetivo inicial de levar atendimento médico à população sem condições de acesso à saúde básica.'
    },
    {
      icon: 'fas fa-expand',
      title: 'Expansão',
      desc: 'De um simples projeto de atendimento médico, crescemos para uma organização que oferece saúde integral - física, mental, espiritual e social.'
    },
    {
      icon: 'fas fa-globe',
      title: 'Hoje',
      desc: 'Atualmente, o Instituto Ação Saúde Internacional atua em múltiplas frentes, impactando milhares de vidas através de nossos programas e ações comunitárias.'
    }
  ];

  return (
    <section className="py-20 bg-white px-6 md:px-20">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Nossa História
      </h3>
      <div className="relative">
        {eventos.map((item, i, arr) => (
          <div
            key={i}
            className={`timeline-item relative pl-16 pb-10 ${
              i !== arr.length - 1
                ? 'after:block after:absolute after:left-6 after:top-8 after:h-full after:w-1 after:bg-[#ff7415]'
                : ''
            }`}
          >
            <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#ff7415] text-white shadow-md">
              <i className={`${item.icon} text-xl`}></i>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
