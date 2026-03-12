export default function QuemSomos() {
  return (
    <section id="quem-somos" className="py-20 bg-white/70">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Quem Somos
          </h2>
          <div className="section-divider" />
        </div>

        <div className="md:flex items-center gap-10">
          {/* Imagem */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src="/imagens/foto.oq.jpg"
              alt="Médico atendendo paciente"
              className="rounded-2xl shadow-xl w-full border border-slate-200"
            />
          </div>

          {/* Texto */}
          <div className="md:w-1/2">
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              O <span className="font-semibold text-[#053980]">Instituto Ação Saúde</span> é uma
              organização sem fins lucrativos comprometida em ampliar o acesso à
              saúde de forma integral, com atuação baseada em valores humanos e
              impacto social real.
            </p>

            <ul className="space-y-4">
              <li className="surface-card rounded-xl p-4 border-l-4 border-[#053980]">
                <p className="text-[#053980] font-medium">
                  Acreditamos no poder transformador do amor.
                </p>
                <p className="text-slate-600">
                  Nossas ações colocam as pessoas no centro de cada decisão.
                </p>
              </li>

              <li className="surface-card rounded-xl p-4 border-l-4 border-[#ff7415]">
                <p className="text-[#ff7415] font-medium">
                  Valorizamos a força do afeto.
                </p>
                <p className="text-slate-600">
                  Cuidado, acolhimento e escuta ativa fazem parte do nosso método.
                </p>
              </li>

              <li className="surface-card rounded-xl p-4 border-l-4 border-[#053980]">
                <p className="text-[#053980] font-medium">
                  Cremos na imensidão da fé.
                </p>
                <p className="text-slate-600">
                  Respeitamos crenças e culturas, promovendo dignidade e esperança.
                </p>
              </li>

              <li className="surface-card rounded-xl p-4 border-l-4 border-[#ff7415]">
                <p className="text-[#ff7415] font-medium">
                  Defendemos o respeito ao ser humano.
                </p>
                <p className="text-slate-600">
                  Ética e transparência orientam nossos projetos e parcerias.
                </p>
              </li>

              <li className="surface-card rounded-xl p-4 border-l-4 border-[#053980]">
                <p className="text-[#053980] font-medium">
                  Promovemos engajamento cívico.
                </p>
                <p className="text-slate-600">
                  Conectamos voluntários, comunidades e instituições para gerar
                  transformações consistentes.
                </p>
              </li>

              <li className="surface-card rounded-xl p-4 border-l-4 border-[#ff7415]">
                <p className="text-[#ff7415] font-medium">
                  Levamos saúde integral a quem precisa.
                </p>
                <p className="text-slate-600">
                  Acesso, prevenção e educação em saúde para ampliar qualidade de vida.
                </p>
              </li>
            </ul>

            <div className="mt-8 bg-[#ff7415]/10 border-l-4 border-[#ff7415] p-4 rounded-xl">
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
