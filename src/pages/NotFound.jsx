import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      className="pt-24 pb-24 px-5 max-w-6xl mx-auto min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--cb-bg)" }}
    >
      <motion.section
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold mb-6"
          style={{
            border:     "1px solid var(--cb-border-subtle)",
            background: "var(--cb-surface)",
            color:      "var(--cb-text-muted)",
          }}
        >
          404
        </span>

        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          style={{ color: "var(--cb-text)" }}
        >
          Page not found
        </h1>
        <p
          className="text-base sm:text-lg leading-relaxed mb-8"
          style={{ color: "var(--cb-text-soft)" }}
        >
          This page doesn’t exist or may have been moved. Head back to the home
          page or try one of the links below.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200"
            style={{
              background:  "var(--cb-accent)",
              color:       "#fff",
              boxShadow:   "0 2px 8px rgba(var(--cb-accent-rgb), 0.3)",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <Link
            to="/downloads"
            className="inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{
              border:           "1px solid var(--cb-border-subtle)",
              background:       "var(--cb-surface)",
              color:            "var(--cb-accent)",
              textDecoration:   "none",
            }}
          >
            Downloads
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
