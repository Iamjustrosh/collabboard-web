import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─── Mock collaborator data ─────────────────────────────────── */
const mockCursors = [
  { id: "alex",   color: "#7c7ce8", label: "Alex",   emoji: "🎨" },
  { id: "maya",   color: "#34d399", label: "Maya",   emoji: "💡" },
  { id: "jordan", color: "#f59e0b", label: "Jordan", emoji: "🚀" },
  { id: "sam",    color: "#f472b6", label: "Sam",    emoji: "⚡" },
  { id: "lee",    color: "#38bdf8", label: "Lee",    emoji: "🔥" },
];

/* ─── Realistic SVG cursor (macOS-style pointer) ─────────────── */
function CollabCursor({ color, label }) {
  return (
    <div
      className="pointer-events-none flex flex-col items-start"
      style={{ filter: "drop-shadow(0px 3px 6px rgba(0,0,0,0.15))" }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={color}
        stroke="#ffffff"
        strokeWidth="1.5"
        style={{ position: "relative", left: "-8px", top: "-8px" }}
      >
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L5.5 3.21Z" />
      </svg>
      <div
        className="px-2.5 py-1 rounded-md text-[11px] font-bold text-white shadow-sm"
        style={{ backgroundColor: color, marginTop: "-4px", marginLeft: "12px" }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── Collaborative board component ──────────────────────────── */
function CollaborativeBoard() {
  const boardRef   = useRef(null);
  const cursorsRef = useRef([]);

  /* GSAP floating motion */
  useEffect(() => {
    let ctx;
    import("gsap").then(({ gsap }) => {
      if (!boardRef.current) return;
      ctx = gsap.context(() => {
        const { width, height } = boardRef.current.getBoundingClientRect();

        mockCursors.forEach((cursor, index) => {
          const el = cursorsRef.current[index];
          if (!el) return;

          // Fixed spread positions across the whiteboard (as % of canvas width/height)
          // Canvas sits inside the card with ~20px padding on each side and ~80px top chrome
          // We use the canvas element's own rect so positions are always accurate
          const canvasEl = boardRef.current?.querySelector(".collab-canvas");
          const canvasRect = canvasEl
            ? canvasEl.getBoundingClientRect()
            : { width: width * 0.94, height: 270, left: 0, top: 0 };
          const cardRect = boardRef.current.getBoundingClientRect();

          // Offset of canvas top-left relative to the card top-left
          const offsetX = canvasRect.left - cardRect.left;
          const offsetY = canvasRect.top  - cardRect.top;

          const cW = canvasRect.width;
          const cH = canvasRect.height;

          // 5 deterministic anchor points spread across the canvas
          const anchors = [
            { x: cW * 0.08, y: cH * 0.12 },   // top-left area
            { x: cW * 0.55, y: cH * 0.08 },   // top-right area
            { x: cW * 0.30, y: cH * 0.55 },   // middle-left
            { x: cW * 0.72, y: cH * 0.48 },   // middle-right
            { x: cW * 0.18, y: cH * 0.78 },   // bottom-left
          ];

          const anchor = anchors[index] ?? anchors[0];
          const baseX = offsetX + anchor.x;
          const baseY = offsetY + anchor.y;

          gsap.set(el, { x: baseX, y: baseY });
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)", delay: index * 0.18 }
          );

          const fx = gsap.utils.random(18, 36);
          const fy = gsap.utils.random(12, 24);

          gsap.to(el, {
            x:        baseX + gsap.utils.random(-fx, fx),
            y:        baseY + gsap.utils.random(-fy, fy),
            rotation: gsap.utils.random(-3, 3),
            duration: gsap.utils.random(4, 8),
            ease:     "sine.inOut",
            repeat:   -1,
            yoyo:     true,
            delay:    index * 0.5,
          });
        });
      }, boardRef);
    }).catch(() => {});

    return () => ctx?.revert();
  }, []);

  /* 3D tilt */
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;

    let frame;
    let tX = 0, tY = 0;

    const onMove = (e) => {
      const r  = el.getBoundingClientRect();
      tX = ((e.clientY - r.top  - r.height / 2) / r.height) * -8;
      tY = ((e.clientX - r.left - r.width  / 2) / r.width)  *  10;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      tX = 0; tY = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const apply = () => {
      el.style.transform = `perspective(1200px) rotateX(${tX}deg) rotateY(${tY}deg)`;
      frame = null;
    };

    el.addEventListener("pointermove",  onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove",  onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <motion.div
      ref={boardRef}
      className="relative mx-auto w-full max-w-3xl rounded-3xl overflow-hidden"
      style={{
        background:    "var(--cb-surface-elevated)",
        border:        "1px solid var(--cb-border-subtle)",
        boxShadow:     "0 28px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(var(--cb-accent-rgb),0.08)",
        transformStyle: "preserve-3d",
        paddingTop:    "1rem",
        paddingBottom: "1.5rem",
        paddingLeft:   "1.25rem",
        paddingRight:  "1.25rem",
      }}
      initial={{ opacity: 0, scale: 0.92, y: 28 }}
      animate={{ opacity: 1, scale: 1,    y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400/90" />
          <span className="h-3 w-3 rounded-full bg-amber-300/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
        </div>
        <span className="text-[11px] font-medium" style={{ color: "var(--cb-text-muted)", fontFamily: "'Geist Mono', monospace" }}>
          collabboard.live/session/j4k2
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--cb-emerald)" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* Whiteboard canvas area */}
      <div className="relative h-[300px] flex items-center justify-center">
        <div
          className="collab-canvas relative w-full h-[270px] rounded-2xl overflow-hidden flex items-center justify-center mx-auto"
          style={{
            background:  "#ffffff",
            border:      "1px solid #e8e8f0",
            boxShadow:   "inset 0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)`,
              backgroundSize: "36px 36px",
            }}
          />

          {/* Decorative whiteboard content */}
          <div className="pointer-events-none absolute inset-0 p-5">
            {/* Flow diagram sketch */}
            <svg width="100%" height="100%" viewBox="0 0 540 200" preserveAspectRatio="xMidYMid meet" opacity="0.5">
              {/* Nodes */}
              <rect x="20"  y="70" width="90" height="40" rx="8" fill="#ede9fe" stroke="#7c7ce8" strokeWidth="1.5"/>
              <text x="65"  y="95" textAnchor="middle" fontSize="11" fill="#5b5bd6" fontFamily="Geist, sans-serif" fontWeight="600">Auth</text>

              <rect x="190" y="70" width="90" height="40" rx="8" fill="#dcfce7" stroke="#34d399" strokeWidth="1.5"/>
              <text x="235" y="95" textAnchor="middle" fontSize="11" fill="#059669" fontFamily="Geist, sans-serif" fontWeight="600">API</text>

              <rect x="360" y="70" width="90" height="40" rx="8" fill="#fef9c3" stroke="#f59e0b" strokeWidth="1.5"/>
              <text x="405" y="95" textAnchor="middle" fontSize="11" fill="#b45309" fontFamily="Geist, sans-serif" fontWeight="600">Database</text>

              {/* Arrows */}
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#9ca3af"/>
                </marker>
              </defs>
              <line x1="110" y1="90" x2="188" y2="90" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrowhead)" strokeDasharray="none"/>
              <line x1="280" y1="90" x2="358" y2="90" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>

              {/* Annotation */}
              <text x="144" y="84" textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily="Geist, sans-serif">JWT</text>
              <text x="314" y="84" textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily="Geist, sans-serif">query</text>

              {/* Sketch line (freehand feel) */}
              <path d="M60 140 Q180 120 300 145 Q400 160 480 135" stroke="#c4b5fd" strokeWidth="2" fill="none" strokeDasharray="4 3" opacity="0.7"/>
              <text x="270" y="165" textAnchor="middle" fontSize="9" fill="#a78bfa" fontFamily="Geist, sans-serif">data flow</text>
            </svg>
          </div>


          {/* ── Realistic collaborator cursors ── */}
          {mockCursors.map((cursor, idx) => (
            <div
              key={cursor.id}
              ref={el => { cursorsRef.current[idx] = el; }}
              className="pointer-events-none absolute top-0 left-0"
              style={{ zIndex: 20 }}
            >
              <CollabCursor color={cursor.color} label={cursor.label} />
            </div>
          ))}
        </div>
      </div>

      {/* Presence avatars bottom bar */}
      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-2">
            {mockCursors.map(c => (
              <div
                key={c.id}
                className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ring-2"
                style={{ background: c.color + "22", color: c.color, ringColor: "var(--cb-surface)" }}
                title={c.label}
              >
                {c.label[0]}
              </div>
            ))}
          </div>
          <span className="text-[11px]" style={{ color: "var(--cb-text-muted)" }}>
            {mockCursors.length} collaborating now
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px]" style={{ color: "var(--cb-text-muted)" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Auto-synced
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Hero section ────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[560px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--cb-hero-glow), transparent 65%)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-6 flex flex-col items-center text-center">

        {/* Pill badge */}
        <motion.span
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-sm"
          style={{
            border:      "1px solid var(--cb-border-subtle)",
            background:  "var(--cb-surface)",
            color:       "var(--cb-accent)",
          }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1,  y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Developed by The Team Roshan, Nikita and Happy 
        </motion.span>

        {/* Headline */}
        <motion.h1
          className="mt-6 text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight"
          style={{ color: "var(--cb-text)" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1,  y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
        >
          Think in whiteboard,
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, var(--cb-accent) 0%, #a78bfa 55%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ship like a code editor.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--cb-text-soft)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1,  y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.14 }}
        >
          CollabBoard combines an infinite canvas with real-time multi-cursor collaboration and an
          integrated code editor, so your team can sketch flows, annotate code, and make decisions
          in one place.
        </motion.p>

        {/* Board */}
        <div className="mt-10 w-full">
          <CollaborativeBoard />
        </div>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1,  y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.26 }}
        >
          <Link to="/downloads">
            <button
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200"
              style={{
                background:  "var(--cb-accent)",
                boxShadow:   "0 4px 18px rgba(var(--cb-accent-rgb),0.38)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(var(--cb-accent-rgb),0.48)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 18px rgba(var(--cb-accent-rgb),0.38)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
              </svg>
              Download the desktop app
            </button>
          </Link>

          <Link to="/docs">
            <button
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200"
              style={{
                border:      "1px solid var(--cb-border-subtle)",
                background:  "var(--cb-surface)",
                color:       "var(--cb-text)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--cb-accent)";
                e.currentTarget.style.color = "var(--cb-accent)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
                e.currentTarget.style.color = "var(--cb-text)";
              }}
            >
              See how it works
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10"/>
              </svg>
            </button>
          </Link>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="mt-7 flex flex-wrap items-center justify-center gap-4 text-xs"
          style={{ color: "var(--cb-text-muted)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1,  y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.32 }}
        >
          {[
            { dot: "bg-emerald-500", text: "Real-time cursors & presence" },
            { dot: "bg-sky-500",     text: "Offline-first canvas" },
            { dot: "bg-violet-500",  text: "Integrated code editor" },
          ].map(({ dot, text }) => (
            <span key={text} className="inline-flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}