export default function QuemSomos() {
  return (
    <section id="quem-somos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quem Somos
          </h2>
          <div className="w-20 h-1 bg-[#ff7415] mx-auto" />
        </div>

        <div className="md:flex items-center">
          {/* Imagem */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <img
              src="/imagens/foto.oq.jpg"
              alt="Médico atendendo paciente"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          {/* Texto */}
          <div className="md:w-1/2">
            <p className="text-lg text-gray-700 mb-6">
              O <span className="font-semibold text-[#053980]">Instituto Ação Saúde</span> é uma
              organização sem fins lucrativos comprometida em ampliar o acesso à
              saúde de forma integral, com atuação baseada em valores humanos e
              impacto social real.
            </p>

            <ul className="space-y-4">
              <li className="border-l-4 border-[#053980] pl-4">
                <p className="text-[#053980] font-medium">
                  Acreditamos no poder transformador do amor.
                </p>
                <p className="text-gray-600">
                  Nossas ações colocam as pessoas no centro de cada decisão.
                </p>
              </li>

              <li className="border-l-4 border-[#ff7415] pl-4">
                <p className="text-[#ff7415] font-medium">
                  Valorizamos a força do afeto.
                </p>
                <p className="text-gray-600">
                  Cuidado, acolhimento e escuta ativa fazem parte do nosso método.
                </p>
              </li>

              <li className="border-l-4 border-[#053980] pl-4">
                <p className="text-[#053980] font-medium">
                  Cremos na imensidão da fé.
                </p>
                <p className="text-gray-600">
                  Respeitamos crenças e culturas, promovendo dignidade e esperança.
                </p>
              </li>

              <li className="border-l-4 border-[#ff7415] pl-4">
                <p className="text-[#ff7415] font-medium">
                  Defendemos o respeito ao ser humano.
                </p>
                <p className="text-gray-600">
                  Ética e transparência orientam nossos projetos e parcerias.
                </p>
              </li>

              <li className="border-l-4 border-[#053980] pl-4">
                <p className="text-[#053980] font-medium">
                  Promovemos engajamento cívico.
                </p>
                <p className="text-gray-600">
                  Conectamos voluntários, comunidades e instituições para gerar
                  transformações consistentes.
                </p>
              </li>

              <li className="border-l-4 border-[#ff7415] pl-4">
                <p className="text-[#ff7415] font-medium">
                  Levamos saúde integral a quem precisa.
                </p>
                <p className="text-gray-600">
                  Acesso, prevenção e educação em saúde para ampliar qualidade de vida.
                </p>
              </li>
            </ul>

            <div className="mt-8 bg-[#ff7415]/10 border-l-4 border-[#ff7415] p-4 rounded">
              <p className="text-[#053980] font-medium italic">
                “Eu faço o bem.” — nosso lema e a razão de cada voluntário estar aqui.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
