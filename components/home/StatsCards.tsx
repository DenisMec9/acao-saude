import { motion } from "framer-motion";
import { HeartPulse, HandHeart, Users } from "lucide-react";

const stats = [
  { icon: HeartPulse, value: "+18", label: "anos de historia" },
  { icon: Users, value: "+10k", label: "vidas impactadas" },
  { icon: HandHeart, value: "+100", label: "acoes realizadas" },
];

export default function StatsCards() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.article
            key={item.label}
            className="surface-card rounded-2xl p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 + index * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#053980] to-[#0f5fc2] text-white">
              <Icon size={17} />
            </div>
            <p className="text-2xl font-extrabold text-[#053980]">{item.value}</p>
            <p className="text-xs font-medium text-slate-600">{item.label}</p>
          </motion.article>
        );
      })}
    </div>
  );
}
