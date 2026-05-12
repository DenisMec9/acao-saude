import { motion } from "framer-motion";
import { HandHeart, ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: HandHeart,
    title: "Cuidado humano",
    text: "Escuta, acolhimento e respeito no centro de cada acao.",
  },
  {
    icon: Sparkles,
    title: "Fe e dignidade",
    text: "Esperanca viva com dignidade para cada pessoa atendida.",
  },
  {
    icon: HeartHandshake,
    title: "Impacto social",
    text: "Projetos com resultado concreto e transformacao continua.",
  },
  {
    icon: ShieldCheck,
    title: "Transparencia",
    text: "Governanca clara, etica e compromisso com quem apoia.",
  },
];

export default function ValuesCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {values.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.article
            key={item.title}
            className="value-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            whileHover={{ y: -5, transition: { duration: 0.18 } }}
          >
            <span className="value-card-icon">
              <Icon size={18} />
            </span>
            <h3 className="value-card-title">{item.title}</h3>
            <p className="value-card-text">{item.text}</p>
          </motion.article>
        );
      })}
    </div>
  );
}
