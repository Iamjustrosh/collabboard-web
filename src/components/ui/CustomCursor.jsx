/**
 * CustomCursor.jsx
 *
 * Drop this component once at the root of your app (e.g. inside App.jsx).
 * It replaces the native cursor with:
 *  – An outer "ring" that follows with a smooth spring lag
 *  – An inner "dot" that snaps exactly to the pointer
 *  – A subtle color-fill on hover over interactive elements
 *  – A scale-down press animation on click
 *  – A faint trail of ghost dots that fade out
 *
 * Usage:
 *   import CustomCursor from "./components/ui/CustomCursor";
 *   // inside your root render:
 *   <CustomCursor />
 */

import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 6;

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const trailRef = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200, alpha: 0 }))
  );
  const trailElsRef = useRef([]);

  const [visible, setVisible]     = useState(false);
  const [clicking, setClicking]   = useState(false);
  const [hovering, setHovering]   = useState(false);
  const [textHover, setTextHover] = useState(false);

  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const raf  = useRef(null);

  /* ── Hide native cursor ── */
  useEffect(() => {
    document.body.classList.add("custom-cursor-active");
    return () => document.body.classList.remove("custom-cursor-active");
  }, []);

  /* ── Track pointer ── */
  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const target = e.target;
      const isInteractive =
        target.closest("a, button, [role='button'], input, select, textarea, label") !== null ||
        getComputedStyle(target).cursor === "pointer";
      const isText =
        ["P","SPAN","H1","H2","H3","H4","LI","TD"].includes(target.tagName) &&
        !isInteractive;

      setHovering(isInteractive);
      setTextHover(isText);
    };

    const onLeave = () => setVisible(false);
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
    };
  }, [visible]);

  /* ── RAF animation loop ── */
  useEffect(() => {
    const ease = 0.14;

    const tick = () => {
      const { x, y } = pos.current;

      /* Snap dot */
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }

      /* Spring ring */
      ring.current.x += (x - ring.current.x) * ease;
      ring.current.y += (y - ring.current.y) * ease;
      if (ringRef.current) {
        const size = hovering ? 44 : textHover ? 28 : 36;
        const half = size / 2;
        ringRef.current.style.transform = `translate(${ring.current.x - half}px, ${ring.current.y - half}px)`;
        ringRef.current.style.width  = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }

      /* Trail */
      const trail = trailRef.current;
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        trail[i].x = trail[i - 1].x + (trail[i].x - trail[i - 1].x) * 0.55;
        trail[i].y = trail[i - 1].y + (trail[i].y - trail[i - 1].y) * 0.55;
      }
      trail[0].x = x;
      trail[0].y = y;

      trailElsRef.current.forEach((el, i) => {
        if (!el) return;
        const alpha = (1 - (i + 1) / TRAIL_LENGTH) * 0.25;
        const size = Math.max(2, 7 - i);
        el.style.transform = `translate(${trail[i].x - size / 2}px, ${trail[i].y - size / 2}px)`;
        el.style.opacity = String(alpha);
        el.style.width  = `${size}px`;
        el.style.height = `${size}px`;
      });

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [hovering, textHover]);

  const opacity = visible ? 1 : 0;

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailElsRef.current[i] = el; }}
          style={{
            position:      "fixed",
            top:           0,
            left:          0,
            borderRadius:  "50%",
            background:    "var(--cb-accent)",
            pointerEvents: "none",
            zIndex:        9998,
            opacity:       0,
            transition:    "opacity 0.1s",
            willChange:    "transform",
          }}
        />
      ))}

      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         clicking ? "6px" : "8px",
          height:        clicking ? "6px" : "8px",
          borderRadius:  "50%",
          background:    hovering ? "var(--cb-accent)" : "var(--cb-text)",
          pointerEvents: "none",
          zIndex:        10000,
          opacity,
          transition:    "opacity 0.2s, width 0.1s, height 0.1s, background 0.2s",
          willChange:    "transform",
          mixBlendMode:  "normal",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          borderRadius:  "50%",
          border:        hovering
                           ? "1.5px solid var(--cb-accent)"
                           : "1.5px solid var(--cb-text-soft)",
          background:    hovering
                           ? "var(--cb-accent-soft)"
                           : "transparent",
          pointerEvents: "none",
          zIndex:        9999,
          opacity:       clicking ? 0.5 : opacity,
          transition:    "opacity 0.2s, border-color 0.2s, background 0.2s, width 0.2s, height 0.2s",
          willChange:    "transform",
          backdropFilter: hovering ? "blur(2px)" : "none",
        }}
      />
    </>
  );
}