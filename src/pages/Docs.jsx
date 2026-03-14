import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const NAVBAR_HEIGHT = 64;

const docsContent = {
  introduction: {
    title: "What is CollabBoard?",
    icon:  "🧩",
    body:  `CollabBoard is a real-time collaborative whiteboard + code editor built as a fast, offline‑ready desktop app.\n\nUse it to sketch diagrams, wireframes, lecture notes, and code snippets with your team – all in the same canvas.\n\nUnder the hood CollabBoard uses Electron, React, TLDraw for the canvas engine, and Supabase Realtime for multi‑cursor presence and syncing.`,
  },
  installation: {
    title: "Installation & first launch",
    icon:  "⚡",
    body:  `1. Go to the "Downloads" page on this site.\n2. Choose the installer for your operating system (Windows, macOS, or Linux).\n3. Download and install / extract the app:\n   • Windows: run the setup or extract the zip and launch the .exe\n   • macOS: open the .dmg, drag CollabBoard into Applications\n   • Linux: make the AppImage executable and run it\n4. Sign in or create an account if prompted.\n5. You'll land on the Home screen where you can create your first whiteboard.`,
  },
  features: {
    title: "Core features",
    icon:  "✨",
    body:  `• Infinite whiteboard canvas built on TLDraw – draw shapes, arrows, sticky notes, and freehand ink.\n• Real-time collaboration – see other users' cursors, selections, and edits live.\n• Integrated code editor – experiment with snippets right next to your diagrams.\n• Offline‑ready – keep drawing even when you briefly lose connection.\n• Multi‑platform – runs on Windows, macOS (Intel & Apple Silicon) and Linux.`,
  },
  whiteboardBasics: {
    title: "Whiteboard basics",
    icon:  "🎨",
    body:  `• Panning: click‑and‑drag on empty space or use the middle mouse button / trackpad drag.\n• Zooming: scroll / pinch to zoom in and out of the canvas.\n• Drawing: select the pen or shape tool in the toolbar, then click‑and‑drag on the canvas.\n• Text & sticky notes: choose the text or note tool, click anywhere and start typing.\n• Selecting: click an object to select it, or drag a selection box around multiple objects.\n• Grouping: select multiple items, then use Ctrl+G or ⌘G to group them.\n• Undo / Redo: Ctrl+Z / Ctrl+Y (Windows & Linux) or ⌘Z / ⇧⌘Z (macOS).`,
  },
  collaboration: {
    title: "Collaborating with others",
    icon:  "👥",
    body:  `• Share a board: click the "Share" button to copy an invite link.\n• Presence: each collaborator is shown with a colored cursor and name tag.\n• Live editing: everyone can draw, move objects, and edit text at the same time.\n• Best practice: create one board per topic (e.g. "Sprint planning – April").\n• Permissions: invite links may be view‑only, comment‑only, or full edit.`,
  },
  codeEditor: {
    title: "Code editor workflow",
    icon:  "💻",
    body:  `CollabBoard includes an embedded code editor for quick experiments next to your diagrams.\n\nTypical workflow:\n1. Open or create a board.\n2. Open the code panel from the toolbar or side panel.\n3. Paste or write a snippet you want to explain visually.\n4. Draw diagrams on the canvas that reference key parts of the code.\n5. (If enabled) run or evaluate the snippet inside the app to show the output.`,
  },
  tips: {
    title: "Tips & best practices",
    icon:  "💡",
    body:  `• Use frames or sections on the canvas to separate topics.\n• Name your boards clearly – e.g. "Design review 2026‑03‑14" instead of "Untitled".\n• Use colors consistently (e.g. blue for APIs, green for data, red for errors).\n• Take screenshots of important boards and attach them to tasks or documentation.\n• For big sessions, create a new board per week or per milestone to keep things fast.`,
  },
};

export default function Docs() {
  const [selected, setSelected] = useState("introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const keys = Object.keys(docsContent);
  const current = docsContent[selected];

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "var(--cb-bg)", paddingTop: NAVBAR_HEIGHT }}
    >
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden md:flex flex-col w-64 shrink-0"
        style={{
          position:    "sticky",
          top:         NAVBAR_HEIGHT,
          height:      `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          background:  "var(--cb-surface)",
          borderRight: "1px solid var(--cb-border-subtle)",
          padding:     "1.5rem 1rem",
          overflowY:   "auto",
          zIndex:      10,
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-4 px-2"
           style={{ color: "var(--cb-text-muted)" }}>
          Documentation
        </p>
        <nav className="flex flex-col gap-0.5">
          {keys.map(key => {
            const active = selected === key;
            return (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className="flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  background:   active ? "var(--cb-accent-soft)"    : "transparent",
                  color:        active ? "var(--cb-accent)"          : "var(--cb-text-soft)",
                  fontWeight:   active ? 600 : 400,
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--cb-text)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--cb-text-soft)"; }}
              >
                <span>{docsContent[key].icon}</span>
                {docsContent[key].title}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Mobile menu button ── */}
      <div
        className="md:hidden fixed left-4 z-30"
        style={{ top: NAVBAR_HEIGHT + 12 }}
      >
        <button
          aria-label="Open docs menu"
          onClick={() => setSidebarOpen(true)}
          className="h-9 w-9 flex items-center justify-center rounded-xl shadow-md"
          style={{
            background: "var(--cb-surface)",
            border:     "1px solid var(--cb-border-subtle)",
            color:      "var(--cb-text)",
          }}
        >
          <HiMenu size={20} />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.4)", top: NAVBAR_HEIGHT, backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed left-0 z-50 md:hidden flex flex-col w-72 p-5"
              style={{
                top:         NAVBAR_HEIGHT,
                height:      `calc(100vh - ${NAVBAR_HEIGHT}px)`,
                background:  "var(--cb-surface)",
                borderRight: "1px solid var(--cb-border-subtle)",
                overflowY:   "auto",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4"
                style={{ color: "var(--cb-text-soft)" }}
              >
                <IoMdClose size={22} />
              </button>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4"
                 style={{ color: "var(--cb-text-muted)" }}>
                Documentation
              </p>
              <nav className="flex flex-col gap-0.5 mt-2">
                {keys.map(key => {
                  const active = selected === key;
                  return (
                    <button
                      key={key}
                      onClick={() => { setSelected(key); setSidebarOpen(false); }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                      style={{
                        background: active ? "var(--cb-accent-soft)" : "transparent",
                        color:      active ? "var(--cb-accent)"       : "var(--cb-text-soft)",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      <span>{docsContent[key].icon}</span>
                      {docsContent[key].title}
                    </button>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <main
        className="flex-1 min-w-0 p-6 md:p-12"
        style={{ background: "var(--cb-bg)" }}
      >
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
            >
              {/* Breadcrumb */}
              <p className="text-xs mb-4" style={{ color: "var(--cb-text-muted)" }}>
                Docs / <span style={{ color: "var(--cb-accent)" }}>{current.title}</span>
              </p>

              {/* Title */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{current.icon}</span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--cb-text)" }}>
                  {current.title}
                </h1>
              </div>

              {/* Divider */}
              <div className="h-px mb-8" style={{ background: "var(--cb-border-subtle)" }} />

              {/* Body */}
              <div
                className="text-[15px] leading-relaxed whitespace-pre-line space-y-2"
                style={{ color: "var(--cb-text-soft)" }}
              >
                {current.body.split("\n").map((line, i) => (
                  <p key={i} className={line.startsWith("•") || /^\d\./.test(line) ? "ml-2" : ""}>
                    {line || <br />}
                  </p>
                ))}
              </div>

              {/* Navigation between pages */}
              <div className="mt-16 flex items-center justify-between">
                {keys.indexOf(selected) > 0 ? (
                  <button
                    onClick={() => setSelected(keys[keys.indexOf(selected) - 1])}
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                    style={{ color: "var(--cb-text-soft)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--cb-accent)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--cb-text-soft)"}
                  >
                    ← {docsContent[keys[keys.indexOf(selected) - 1]].title}
                  </button>
                ) : <span />}

                {keys.indexOf(selected) < keys.length - 1 ? (
                  <button
                    onClick={() => setSelected(keys[keys.indexOf(selected) + 1])}
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                    style={{ color: "var(--cb-text-soft)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--cb-accent)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--cb-text-soft)"}
                  >
                    {docsContent[keys[keys.indexOf(selected) + 1]].title} →
                  </button>
                ) : <span />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}