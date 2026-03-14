import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, var(--cb-accent) 0%, var(--cb-violet) 60%, #38bdf8 100%)",
          opacity: 0.9,
        }}
      />
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-3xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-6"
             style={{ background: "rgba(255,255,255,0.18)", color: "#fff", backdropFilter: "blur(8px)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Free to download · No account required
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to get started?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
            Download the desktop app and start collaborating with your team in seconds. Available for Windows, macOS, and Linux.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/downloads">
              <button
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-200"
                style={{
                  background:  "#fff",
                  color:       "var(--cb-accent-strong)",
                  boxShadow:   "0 4px 20px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.28)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M7 1v8M4 6l3 3 3-3M2 11h10"/>
                </svg>
                Download Now — It's Free
              </button>
            </Link>

            <Link to="/docs">
              <button
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200"
                style={{
                  border:      "1.5px solid rgba(255,255,255,0.35)",
                  background:  "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.20)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.10)"}
              >
                Read the docs
              </button>
            </Link>
          </div>

          {/* Platform badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-white/60">
            {["Windows", "macOS Intel", "macOS ARM", "Linux"].map(p => (
              <span key={p} className="px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }}>
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}