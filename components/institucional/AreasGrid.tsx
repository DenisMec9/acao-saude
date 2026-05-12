import { motion } from "framer-motion";
import {
  Baby,
  Accessibility,
  Leaf,
  Briefcase,
  Scale,
  Lightbulb,
  HandHeart,
  HelpingHand,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const areas = [
  {
    icon: Baby,
    title: "Crianca e adolescente",
    text: "Desenvolvimento social e educacional com acolhimento continuo.",
  },
  {
    icon: Accessibility,
    title: "Idoso e PCD",
    text: "Atendimento focado em autonomia, cuidado e dignidade.",
  },
  {
    icon: Leaf,
    title: "Meio ambiente",
    text: "Educacao ambiental conectada com saude e bem-estar coletivo.",
  },
  {
    icon: Briefcase,
    title: "Emprego e renda",
    text: "Capacitacao profissional para ampliar oportunidades locais.",
  },
  {
    icon: Scale,
    title: "Assessoria juridica",
    text: "Orientacao para garantia de direitos fundamentais.",
  },
  {
    icon: Lightbulb,
    title: "Inovacao",
    text: "Solucoes praticas para desafios sociais e de saude.",
  },
  {
    icon: HandHeart,
    title: "Capelania",
    text: "Apoio espiritual e emocional com escuta sensivel.",
  },
  {
    icon: HelpingHand,
    title: "Assistencia social",
    text: "Suporte a familias em vulnerabilidade com acoes integradas.",
  },
];

export default function AreasGrid() {
  return (
    <section id="atuacao" className="section-shell section-shell--alt">
      <div className="site-container">
        <Reveal className="section-header">
          <p className="section-kicker">Frentes estrategicas</p>
          <h2 className="section-title">Areas de Atuacao</h2>
          <p className="section-subtitle">
            Cada area foi desenhada para gerar impacto real e desenvolvimento
            continuo nas comunidades atendidas.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.article
                key={area.title}
                className="area-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.04 * index }}
                whileHover={{ y: -6, transition: { duration: 0.18 } }}
              >
                <span className="area-card-icon">
                  <Icon size={20} />
                </span>
                <h3 className="area-card-title">{area.title}</h3>
                <p className="area-card-text">{area.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
