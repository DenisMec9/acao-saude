export default function NossaHistoria() {
  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">
        Nossa História
      </h3>
      <div className="relative">
        {/* Timeline Item 1 */}
        <div className="timeline-item relative pl-16 pb-10">
          <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#ff7415] text-white">
            <i className="fas fa-lightbulb text-xl" />
          </div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            2007 - O Início
          </h4>
          <p className="text-gray-600">
            No ano de 2007, nasceu o Ação Saúde, fruto de um sonho do Dr.
            Abinadabe Pires, um médico ainda jovem, um universitário inconformado
            com a gigantesca desigualdade social em nosso país.
          </p>
        </div>

        {/* Timeline Item 2 */}
        <div className="timeline-item relative pl-16 pb-10">
          <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#ff7415] text-white">
            <i className="fas fa-heartbeat text-xl" />
          </div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            O Programa Ação Saúde
          </h4>
          <p className="text-gray-600">
            Idealizou e iniciou o Programa Ação Saúde, com o objetivo inicial
            de levar atendimento médico à população sem condições de acesso à
            saúde básica.
          </p>
        </div>

        {/* Timeline Item 3 */}
        <div className="timeline-item relative pl-16 pb-10">
          <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#ff7415] text-white">
            <i className="fas fa-expand text-xl" />
          </div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">Expansão</h4>
          <p className="text-gray-600">
            De um simples projeto de atendimento médico, crescemos para uma
            organização que oferece saúde integral - física, mental,
            espiritual e social.
          </p>
        </div>

        {/* Timeline Item 4 */}
        <div className="timeline-item relative pl-16">
          <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#ff7415] text-white">
            <i className="fas fa-globe text-xl" />
          </div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">Hoje</h4>
          <p className="text-gray-600">
            Atualmente, o Instituto Ação Saúde Internacional atua em múltiplas
            frentes, impactando milhares de vidas através de nossos programas
            e ações comunitárias.
          </p>
        </div>
      </div>
    </div>
  );
}
