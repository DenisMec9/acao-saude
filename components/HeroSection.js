import Image from 'next/image';

export default function HeroSection({ heroData }) {
  const imagemUrl = heroData?.imagemUrl || null;

  return (
    <section className="hero-gradient text-white relative overflow-hidden">
      <div className="absolute -top-24 -left-10 h-60 w-60 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-20 md:py-28 relative">
        <div className="flex flex-col md:flex-row items-center md:space-x-10">
          {/* LADO ESQUERDO - TEXTO FIXO */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold mb-6">
              Saude integral com impacto real
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Acao Saude
              <br />
              <span className="text-[#ffd1a8]">Eu faco o bem</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-xl">
              Levar acesso a saude integralmente a quem precisa e nossa missao.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#doacao"
                className="bg-white text-[#053980] px-6 py-3.5 rounded-xl font-bold text-center hover:bg-gray-100 hover:-translate-y-0.5 transition duration-300"
              >
                Faca uma doacao
              </a>
              <a
                href="#atuacao"
                className="border-2 border-white/70 text-white px-6 py-3.5 rounded-xl font-bold text-center hover:bg-white/15 transition duration-300"
              >
                Conheca nossas acoes
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
              <div className="surface-card rounded-xl p-3 text-left">
                <p className="text-xl font-extrabold text-[#053980]">+18</p>
                <p className="text-xs text-slate-600">Anos de historia</p>
              </div>
              <div className="surface-card rounded-xl p-3 text-left">
                <p className="text-xl font-extrabold text-[#053980]">+10k</p>
                <p className="text-xs text-slate-600">Vidas impactadas</p>
              </div>
              <div className="surface-card rounded-xl p-3 text-left">
                <p className="text-xl font-extrabold text-[#053980]">+100</p>
                <p className="text-xs text-slate-600">Acoes realizadas</p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO - IMAGEM DINAMICA */}
          <div className="md:w-1/2 flex justify-center">
            {imagemUrl ? (
              <Image
                src={imagemUrl}
                alt="Imagem principal da Acao Saude"
                width={768}
                height={960}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="rounded-2xl border border-white/25 shadow-2xl max-w-md w-full object-cover floating"
              />
            ) : (
              <div className="h-[360px] md:h-[420px] w-full max-w-md rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white/70">
                Imagem nao disponivel
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
