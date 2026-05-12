import Image from "next/image";

export default function HeroSection({ heroData }) {
  const imagemUrl = heroData?.imagemUrl || null;

  return (
    <section className="hero-gradient relative overflow-hidden text-white">
      <div className="absolute -left-16 top-14 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute -right-14 bottom-10 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="site-container relative py-14 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="text-center md:text-left">
            <span className="mb-6 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold">
              Saude integral com impacto real
            </span>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
              Acao Saude
              <br />
              <span className="text-[#ffd1a8]">Eu faco o bem</span>
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-base text-blue-100 md:mx-0 md:text-xl">
              Levamos acesso a saude com acolhimento, projetos sociais e
              formacao para fortalecer comunidades.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <a
                href="#doacao"
                className="rounded-xl bg-white px-6 py-3.5 text-center font-bold text-[#053980] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Fazer doacao
              </a>
              <a
                href="#atuacao"
                className="rounded-xl border-2 border-white/70 px-6 py-3.5 text-center font-bold text-white transition duration-300 hover:bg-white/15"
              >
                Ver nossas acoes
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
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

          <div className="flex justify-center md:justify-end">
            {imagemUrl ? (
              <div className="surface-card-strong w-full max-w-md rounded-[1.8rem] p-2">
                <Image
                  src={imagemUrl}
                  alt="Imagem principal da Acao Saude"
                  width={768}
                  height={960}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  loading="eager"
                  fetchPriority="high"
                  className="h-[460px] w-full rounded-[1.3rem] object-cover md:h-[540px]"
                />
              </div>
            ) : (
              <div className="flex h-[360px] w-full max-w-md items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white/70">
                Imagem nao disponivel
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
