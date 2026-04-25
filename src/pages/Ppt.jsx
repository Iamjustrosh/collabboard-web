import { motion } from "framer-motion";

const FILES = [
  {
    label: "Download PPTX",
    desc: "Editable PowerPoint deck",
    href: "/Collabboard%20V2%20PPT.pptx",
  },
  {
    label: "Download PDF",
    desc: "Print-ready PDF export",
    href: "/Collabboard%20V2%20PPT.pdf",
  },
];

export default function Ppt() {
  return (
    <div className="pt-24 pb-24 px-5 max-w-5xl mx-auto" style={{ background: "var(--cb-bg)" }}>
      <section className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold mb-5"
            style={{
              border: "1px solid var(--cb-border-subtle)",
              background: "var(--cb-surface)",
              color: "var(--cb-accent)",
            }}
          >
            PPT resources
          </span>

          <h1
            className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--cb-text)" }}
          >
            CollabBoard V2 PPT
          </h1>
          <p className="max-w-xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: "var(--cb-text-soft)" }}>
            Download the presentation as PPTX or PDF.
          </p>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FILES.map((f, idx) => (
          <motion.a
            key={f.href}
            href={f.href}
            download
            className="group rounded-2xl p-6 transition-all duration-300"
            style={{
              background: "var(--cb-surface)",
              border: "1px solid var(--cb-border-subtle)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              textDecoration: "none",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.10)";
              e.currentTarget.style.borderColor = "var(--cb-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
              e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-[15px]" style={{ color: "var(--cb-text)" }}>
                  {f.label}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--cb-text-muted)" }}>
                  {f.desc}
                </p>
              </div>

              <span
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200"
                style={{
                  background: "var(--cb-accent)",
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(var(--cb-accent-rgb), 0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M6.5 1.5v7M4 6l2.5 2.5L9 6M2 10.5h9" />
                </svg>
                Download
              </span>
            </div>
          </motion.a>
        ))}
      </section>
    </div>
  );
}

