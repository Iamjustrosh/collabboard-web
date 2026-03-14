import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/downloads", label: "Downloads" },
  { to: "/docs", label: "Docs" },
];

export default function Header() {
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  /* ── Theme init ── */
  useEffect(() => {
    const stored = window.localStorage.getItem("cb-theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("cb-theme", theme);
  }, [theme]);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleTheme = () => setTheme(p => p === "dark" ? "light" : "dark");

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300"
        style={{
          background: "var(--cb-nav-bg)",
          borderBottom: `1px solid var(--cb-nav-border)`,
          boxShadow: scrolled ? "var(--cb-nav-shadow)" : "none",
          backdropFilter: "blur(20px) saturate(1.6)",
          WebkitBackdropFilter: "blur(20px) saturate(1.6)",
        }}
      >
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-5">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group select-none"
            style={{ textDecoration: "none" }}
          >
            {/* Logo mark */}
            <div className="flex items-center justify-center">
              <img
                src={theme === "dark" ? "/logod.png" : "/logol.png"}
                alt="CollabBoard logo"
                className="h-12 w-12 object-contain"
                draggable={false}
                loading="eager"
              />
            </div>
            <span
              className="text-[15px] font-semibold tracking-tight transition-colors"
              style={{ color: "var(--cb-text)" }}
            >
              CollabBoard
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={{
                    color: active ? "var(--cb-accent)" : "var(--cb-text-soft)",
                    background: active ? "var(--cb-accent-soft)" : "transparent",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => !active && (e.currentTarget.style.color = "var(--cb-text)")}
                  onMouseLeave={e => !active && (e.currentTarget.style.color = "var(--cb-text-soft)")}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "var(--cb-accent-soft)", zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="relative h-9 w-9 flex items-center justify-center rounded-xl border transition-all duration-200"
              style={{
                border: "1px solid var(--cb-border-subtle)",
                background: "var(--cb-surface)",
                color: "var(--cb-text-soft)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--cb-accent)";
                e.currentTarget.style.color = "var(--cb-accent)";
                e.currentTarget.style.background = "var(--cb-accent-soft)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
                e.currentTarget.style.color = "var(--cb-text-soft)";
                e.currentTarget.style.background = "var(--cb-surface)";
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="absolute"
                >
                  {theme === "dark" ? <HiOutlineSun size={17} /> : <HiOutlineMoon size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* CTA */}
            <Link
              to="/downloads"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: "var(--cb-accent)",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 2px 10px rgba(var(--cb-accent-rgb), 0.35)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--cb-accent-strong)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(var(--cb-accent-rgb), 0.45)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "var(--cb-accent)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(var(--cb-accent-rgb), 0.35)";
              }}
            >
              Download
            </Link>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden h-9 w-9 flex items-center justify-center rounded-xl border transition-colors"
              style={{ border: "1px solid var(--cb-border-subtle)", color: "var(--cb-text)" }}
              onClick={() => setMobileOpen(p => !p)}
              aria-label="Toggle menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                {mobileOpen
                  ? <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  : <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                }
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-40 sm:hidden"
            style={{
              background: "var(--cb-nav-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--cb-nav-border)",
              boxShadow: "var(--cb-nav-shadow)",
            }}
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      color: active ? "var(--cb-accent)" : "var(--cb-text)",
                      background: active ? "var(--cb-accent-soft)" : "transparent",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link
                to="/downloads"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center"
                style={{
                  background: "var(--cb-accent)",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Download App
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}