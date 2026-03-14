import { motion } from "framer-motion";
import { FaPenNib, FaUsers, FaBolt } from "react-icons/fa";

const features = [
  {
    icon:  <FaPenNib size={20} />,
    title: "Powerful Whiteboard",
    text:  "Fast, smooth infinite drawing engine powered by tldraw. Shapes, arrows, sticky notes, and freehand ink.",
    color: "var(--cb-violet)",
    bg:    "rgba(139, 92, 246, 0.10)",
  },
  {
    icon:  <FaUsers size={20} />,
    title: "Real-time Collaboration",
    text:  "Work together instantly with live multi-cursor presence and sync powered by Supabase Realtime.",
    color: "var(--cb-emerald)",
    bg:    "rgba(52, 211, 153, 0.10)",
  },
  {
    icon:  <FaBolt size={20} />,
    title: "Integrated Code Editor",
    text:  "Write and run code snippets right next to your diagrams. No context switching needed.",
    color: "var(--cb-sky)",
    bg:    "rgba(56, 189, 248, 0.10)",
  },
];

export default function Features() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-5">
      {/* Heading */}
      <div className="text-center mb-14">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ color: "var(--cb-text)" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Features to boost your productivity
        </motion.h2>
        <motion.p
          className="mt-3 text-base max-w-xl mx-auto"
          style={{ color: "var(--cb-text-soft)" }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          Everything your team needs to go from idea to implementation without switching tabs.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            className="relative rounded-2xl p-7 group transition-all duration-300"
            style={{
              background:   "var(--cb-surface)",
              border:       "1px solid var(--cb-border-subtle)",
              boxShadow:    "0 2px 12px rgba(0,0,0,0.04)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.10), 0 0 0 1px ${f.color}30`;
              e.currentTarget.style.borderColor = f.color + "50";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
              e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
            }}
          >
            {/* Icon */}
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: f.bg, color: f.color }}
            >
              {f.icon}
            </div>

            {/* Accent line */}
            <div
              className="absolute top-0 left-7 right-7 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)` }}
            />

            <h3
              className="font-semibold text-lg mb-2 tracking-tight"
              style={{ color: "var(--cb-text)" }}
            >
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--cb-text-soft)" }}>
              {f.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}