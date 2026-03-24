import Image from 'next/image';

export default function QuemSomos() {
  return (
    <section id="quem-somos" className="py-20 bg-white/70">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Titulo */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Quem Somos</h2>
          <div className="section-divider" />
        </div>

        <div className="md:flex items-center gap-10">
          {/* Imagem */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Image
              src="/imagens/foto.oq.jpg"
              alt="Medico atendendo paciente"
              width={1280}
              height={853}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl shadow-xl w-full border border-slate-200"
            />
          </div>

          {/* Texto */}
          <div className="md:w-1/2">
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              O <span className="font-semibold text-[#053980]">Instituto Acao Saude</span> e uma
              organizacao sem fins lucrativos comprometida em ampliar o acesso a saude de forma
              integral, com atuacao baseada em valores humanos e impacto social real.
            </p>

            <ul className="space-y-4">
              <li className="surface-card rounded-xl p-4 border-l-4 border-[#053980]">
                <p className="text-[#053980] font-medium">Acreditamos no poder transformador do amor.</p>
                <p className="text-slate-600">Nossas acoes colocam as pessoas no centro de cada decisao.</p>
              </li>

              <li className="surface-card rounded-xl p-4 border-l-4 border-[#ff7415]">
                <p className="text-[#ff7415] font-medium">Valorizamos a forca do afeto.</p>
                <p className="text-slate-600">Cuidado, acolhimento e escuta ativa fazem parte do nosso metodo.</p>
              </li>

              <li className="surface-card rounded-xl p-4 border-l-4 border-[#053980]">
                <p className="text-[#053980] font-medium">Cremos na imensidao da fe.</p>
                <p className="text-slate-600">
                  Respeitamos crencas e culturas, promovendo dignidade e esperanca.
                </p>
              </li>

              <li className="surface-card rounded-xl p-4 border-l-4 border-[#ff7415]">
                <p className="text-[#ff7415] font-medium">Defendemos o respeito ao ser humano.</p>
                <p className="text-slate-600">Etica e transparencia orientam nossos projetos e parcerias.</p>
              </li>

              <li className="surface-card rounded-xl p-4 border-l-4 border-[#053980]">
                <p className="text-[#053980] font-medium">Promovemos engajamento civico.</p>
                <p className="text-slate-600">
                  Conectamos voluntarios, comunidades e instituicoes para gerar transformacoes
                  consistentes.
                </p>
              </li>

              <li className="surface-card rounded-xl p-4 border-l-4 border-[#ff7415]">
                <p className="text-[#ff7415] font-medium">Levamos saude integral a quem precisa.</p>
                <p className="text-slate-600">
                  Acesso, prevencao e educacao em saude para ampliar qualidade de vida.
                </p>
              </li>
            </ul>

            <div className="mt-8 bg-[#ff7415]/10 border-l-4 border-[#ff7415] p-4 rounded-xl">
              <p className="text-[#053980] font-medium italic">
                "Eu faco o bem." - nosso lema e a razao de cada voluntario estar aqui.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
