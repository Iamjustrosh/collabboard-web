import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import s1  from "../../assets/s1.png";
import s2  from "../../assets/s2.png";
import s3  from "../../assets/s3.png";
import s4  from "../../assets/s4.png";
import s5  from "../../assets/s5.png";
import s6  from "../../assets/s6.png";
import s7  from "../../assets/s7.png";
import s8  from "../../assets/s8.png";
import s9  from "../../assets/s9.png";
import s10 from "../../assets/s10.png";
import s11 from "../../assets/s11.png";
import s12 from "../../assets/s12.png";

const images = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12];

const SLIDE_DURATION = 4500; // ms for auto-advance

export default function Showcase() {
  const [current,   setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [paused,    setPaused]    = useState(false);

  const go = useCallback((next, dir) => {
    setDirection(dir);
    setCurrent(next);
  }, []);

  const prev = useCallback(() => {
    go(current === 0 ? images.length - 1 : current - 1, -1);
  }, [current, go]);

  const next = useCallback(() => {
    go(current === images.length - 1 ? 0 : current + 1, 1);
  }, [current, go]);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(id);
  }, [current, paused, next]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const variants = {
    enter:  (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0   }),
    center:        ({ x: 0,                          opacity: 1   }),
    exit:   (d) => ({ x: d > 0 ? "-100%" : "100%",  opacity: 0   }),
  };

  return (
    <section className="py-24 px-5" style={{ background: "var(--cb-bg)" }}>
      <div className="max-w-5xl mx-auto">

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
            See CollabBoard in Action
          </motion.h2>
          <motion.p
            className="mt-3 text-base"
            style={{ color: "var(--cb-text-soft)" }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            Real screenshots from the desktop app.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          style={{
            aspectRatio:  "16/9",
            background:   "var(--cb-surface)",
            border:       "1px solid var(--cb-border-subtle)",
            boxShadow:    "0 24px 64px rgba(0,0,0,0.12)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {/* Slide */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={current}
              src={images[current]}
              alt={`CollabBoard screenshot ${current + 1}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.32, 0, 0.18, 1] }}
              className="absolute inset-0 w-full h-full object-contain"
              draggable={false}
            />
          </AnimatePresence>

          {/* Gradient edges (subtle) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16"
               style={{ background: "linear-gradient(to right, rgba(0,0,0,0.04), transparent)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16"
               style={{ background: "linear-gradient(to left, rgba(0,0,0,0.04), transparent)" }} />

          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous screenshot"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200"
            style={{
              background:  "var(--cb-surface)",
              border:      "1px solid var(--cb-border-subtle)",
              color:       "var(--cb-text)",
              boxShadow:   "0 2px 12px rgba(0,0,0,0.12)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background    = "var(--cb-accent)";
              e.currentTarget.style.color         = "#fff";
              e.currentTarget.style.borderColor   = "var(--cb-accent)";
              e.currentTarget.style.transform     = "translateY(-50%) scale(1.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background    = "var(--cb-surface)";
              e.currentTarget.style.color         = "var(--cb-text)";
              e.currentTarget.style.borderColor   = "var(--cb-border-subtle)";
              e.currentTarget.style.transform     = "translateY(-50%) scale(1)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8l4-4"/>
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200"
            style={{
              background:  "var(--cb-surface)",
              border:      "1px solid var(--cb-border-subtle)",
              color:       "var(--cb-text)",
              boxShadow:   "0 2px 12px rgba(0,0,0,0.12)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background    = "var(--cb-accent)";
              e.currentTarget.style.color         = "#fff";
              e.currentTarget.style.borderColor   = "var(--cb-accent)";
              e.currentTarget.style.transform     = "translateY(-50%) scale(1.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background    = "var(--cb-surface)";
              e.currentTarget.style.color         = "var(--cb-text)";
              e.currentTarget.style.borderColor   = "var(--cb-border-subtle)";
              e.currentTarget.style.transform     = "translateY(-50%) scale(1)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4l4 4-4 4"/>
            </svg>
          </button>

          {/* Counter badge */}
          <div
            className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full text-[11px] font-semibold tabular-nums"
            style={{
              background: "rgba(0,0,0,0.45)",
              color:      "#fff",
              backdropFilter: "blur(6px)",
            }}
          >
            {current + 1} / {images.length}
          </div>

          {/* Dot indicators + progress bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => go(idx, idx > current ? 1 : -1)}
                aria-label={`Go to screenshot ${idx + 1}`}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                style={{
                  width:      current === idx ? "28px" : "6px",
                  background: current === idx
                    ? "var(--cb-accent)"
                    : "rgba(255,255,255,0.35)",
                }}
              >
                {/* Auto-progress fill on active dot */}
                {current === idx && !paused && (
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "rgba(255,255,255,0.5)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                    key={current}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Thumbnail strip */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => go(idx, idx > current ? 1 : -1)}
              className="shrink-0 rounded-lg overflow-hidden transition-all duration-200"
              style={{
                width:      "72px",
                height:     "48px",
                border:     current === idx
                  ? "2px solid var(--cb-accent)"
                  : "2px solid var(--cb-border-subtle)",
                opacity:    current === idx ? 1 : 0.55,
                transform:  current === idx ? "scale(1.05)" : "scale(1)",
              }}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}