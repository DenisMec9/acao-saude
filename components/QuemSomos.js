import Image from "next/image";

export default function QuemSomos() {
  const pilares = [
    {
      title: "Cuidado humano",
      text: "Acolhimento e escuta ativa em cada atendimento.",
    },
    {
      title: "Fe e dignidade",
      text: "Respeito as pessoas, culturas e historias de vida.",
    },
    {
      title: "Impacto social",
      text: "Projetos que geram transformacao continua na comunidade.",
    },
    {
      title: "Transparencia",
      text: "Etica e responsabilidade na gestao de cada acao.",
    },
  ];

  return (
    <section id="quem-somos" className="py-16 md:py-20">
      <div className="site-container">
        <div className="mb-12 text-center">
          <h2 className="section-title mb-4">Quem Somos</h2>
          <div className="section-divider" />
        </div>

        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <div className="surface-card-strong overflow-hidden rounded-3xl p-2">
            <Image
              src="/imagens/foto.oq.jpg"
              alt="Medico atendendo paciente"
              width={1280}
              height={853}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-[320px] w-full rounded-[1.2rem] border border-slate-100 object-cover md:h-[460px]"
            />
          </div>

          <div>
            <p className="mb-6 text-base leading-relaxed text-slate-700 md:text-lg">
              O <span className="font-semibold text-[#053980]">Instituto Acao Saude</span> e
              uma organizacao sem fins lucrativos que promove acesso a saude de
              forma integral, com foco em pessoas e resultado real.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {pilares.map((item) => (
                <article
                  key={item.title}
                  className="surface-card rounded-2xl border-l-4 border-[#ff7415] p-4"
                >
                  <h3 className="mb-1 text-sm font-bold text-[#053980] md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3">
              <p className="font-medium italic text-[#053980]">
                "Eu faco o bem" e o compromisso diario dos nossos voluntarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
