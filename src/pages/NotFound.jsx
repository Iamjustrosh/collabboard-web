import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 text-center"
      style={{ background: "var(--cb-bg)" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--cb-hero-glow), transparent 65%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* 404 number */}
        <span
          className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter select-none"
          style={{
            background:           "linear-gradient(135deg, var(--cb-accent) 0%, #a78bfa 55%, #38bdf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
          }}
        >
          404
        </span>

        <h1
          className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ color: "var(--cb-text)" }}
        >
          Page not found
        </h1>
        <p
          className="mt-3 text-base max-w-sm leading-relaxed"
          style={{ color: "var(--cb-text-soft)" }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: "var(--cb-accent)",
              boxShadow:  "0 4px 18px rgba(var(--cb-accent-rgb), 0.35)",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform  = "translateY(-2px)";
              e.currentTarget.style.boxShadow  = "0 8px 28px rgba(var(--cb-accent-rgb), 0.45)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform  = "translateY(0)";
              e.currentTarget.style.boxShadow  = "0 4px 18px rgba(var(--cb-accent-rgb), 0.35)";
            }}
          >
            ← Back to home
          </Link>

          <Link
            to="/docs"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200"
            style={{
              border:         "1px solid var(--cb-border-subtle)",
              background:     "var(--cb-surface)",
              color:          "var(--cb-text)",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--cb-accent)";
              e.currentTarget.style.color       = "var(--cb-accent)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
              e.currentTarget.style.color       = "var(--cb-text)";
            }}
          >
            Browse docs
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm"
             style={{ color: "var(--cb-text-muted)" }}>
          {[
            { to: "/downloads", label: "Downloads" },
            { to: "/changelog", label: "Changelog" },
            { to: "/docs",      label: "Docs" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="transition-colors"
              style={{ color: "var(--cb-text-muted)", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--cb-accent)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--cb-text-muted)"}
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}