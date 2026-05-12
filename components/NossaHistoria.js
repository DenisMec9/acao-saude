import { Lightbulb, HeartPulse, Expand, Globe } from "lucide-react";

export default function NossaHistoria() {
  const timelineItems = [
    {
      icon: Lightbulb,
      title: "2007 - O inicio",
      text: "O projeto nasceu do sonho do Dr. Abinadabe Pires ao ver a desigualdade no acesso a saude.",
    },
    {
      icon: HeartPulse,
      title: "Programa Acao Saude",
      text: "A primeira missao foi levar atendimento medico para quem nao tinha acesso ao basico.",
    },
    {
      icon: Expand,
      title: "Expansao",
      text: "Crescemos para um modelo de saude integral: fisica, mental, espiritual e social.",
    },
    {
      icon: Globe,
      title: "Hoje",
      text: "Atuamos em varias frentes e seguimos ampliando impacto com acoes comunitarias.",
    },
  ];

  return (
    <section className="pb-8 md:pb-12">
      <div className="site-container">
        <div className="surface-card-strong rounded-3xl p-6 md:p-10">
          <h3 className="section-title mb-8 text-center">Nossa Historia</h3>

          <div>
            {timelineItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`timeline-item relative pl-14 ${
                    index < timelineItems.length - 1 ? "pb-8" : ""
                  }`}
                >
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7415] to-[#ff934d] text-white shadow-md">
                    <Icon size={20} />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">
                    {item.title}
                  </h4>
                  <p className="text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
