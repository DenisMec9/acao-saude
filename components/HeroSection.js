// components/HeroSection.js
export default function HeroSection({ heroData }) {
  const imagemUrl = heroData?.imagemUrl || null;

  return (
    <section className="bg-[#053980] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center md:space-x-10">

          {/* LADO ESQUERDO — TEXTO FIXO */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Ação Saúde
              <br />
              <span className="text-[#ffd1a8]">Eu faço o bem</span>
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Levar acesso à saúde integralmente a quem precisa é nossa missão.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#doacao"
                className="bg-white text-[#053980] px-6 py-3 rounded-md font-bold text-center hover:bg-gray-100 transition duration-300"
              >
                Faça uma doação
              </a>
              <a
                href="#atuacao"
                className="border-2 border-white text-white px-6 py-3 rounded-md font-bold text-center hover:bg-white/20 transition duration-300"
              >
                Conheça nossas ações
              </a>
            </div>
          </div>

          {/* LADO DIREITO — IMAGEM DINÂMICA */}
          <div className="md:w-1/2 flex justify-center">
            {imagemUrl ? (
              <img
                src={imagemUrl}
                alt="Imagem principal da Ação Saúde"
                className="rounded-lg shadow-2xl max-w-md w-full object-cover floating"
              />
            ) : (
              <div className="h-[360px] md:h-[420px] w-full max-w-md rounded-lg bg-white/10 flex items-center justify-center text-white/70">
                Imagem não disponível
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
