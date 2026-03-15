import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GITHUB_REPO = "Iamjustrosh/Major-Project";

/* ── Markdown-lite renderer (handles bold, inline code, bullet lists) ── */
function RenderBody({ text }) {
  if (!text) return null;

  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;

        // Heading ## or ###
        if (/^###\s/.test(line)) {
          return (
            <p key={i} className="text-sm font-semibold mt-4 mb-1" style={{ color: "var(--cb-text)" }}>
              {line.replace(/^###\s/, "")}
            </p>
          );
        }
        if (/^##\s/.test(line)) {
          return (
            <p key={i} className="text-base font-bold mt-5 mb-1" style={{ color: "var(--cb-text)" }}>
              {line.replace(/^##\s/, "")}
            </p>
          );
        }

        // Bullet
        const isBullet = /^[-*]\s/.test(line);
        const raw = isBullet ? line.replace(/^[-*]\s/, "") : line;

        // Inline formatting: **bold** and `code`
        const parts = raw.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, j) => {
          if (/^\*\*/.test(part))
            return <strong key={j} style={{ color: "var(--cb-text)" }}>{part.replace(/\*\*/g, "")}</strong>;
          if (/^`/.test(part))
            return (
              <code key={j} className="px-1.5 py-0.5 rounded text-[11px]"
                    style={{ background: "var(--cb-accent-soft)", color: "var(--cb-accent)", fontFamily: "'Geist Mono', monospace" }}>
                {part.replace(/`/g, "")}
              </code>
            );
          return part;
        });

        if (isBullet) {
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--cb-accent)" }} />
              <p className="text-sm leading-relaxed" style={{ color: "var(--cb-text-soft)" }}>{parts}</p>
            </div>
          );
        }

        return (
          <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--cb-text-soft)" }}>{parts}</p>
        );
      })}
    </div>
  );
}

/* ── Tag badge ── */
function TagBadge({ tag }) {
  const isLatest = tag === "latest";
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
      style={{
        background: isLatest ? "var(--cb-emerald)" + "22" : "var(--cb-accent-soft)",
        color:      isLatest ? "var(--cb-emerald)"        : "var(--cb-accent)",
        border:     `1px solid ${isLatest ? "var(--cb-emerald)" : "var(--cb-accent)"}30`,
      }}
    >
      {isLatest && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
      {isLatest ? "Latest" : tag}
    </span>
  );
}

/* ── Single release card ── */
function ReleaseCard({ release, index, isLatest }) {
  const [open, setOpen] = useState(isLatest);

  const date = new Date(release.published_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "var(--cb-surface)",
        border:     "1px solid var(--cb-border-subtle)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      {/* Timeline dot — only visible on md+ */}
      <div
        className="hidden md:block absolute -left-[41px] top-7 h-3 w-3 rounded-full ring-4"
        style={{
          background:  isLatest ? "var(--cb-emerald)" : "var(--cb-accent)",
          ringColor:   "var(--cb-bg)",
        }}
      />

      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
        style={{ background: open ? "var(--cb-surface)" : "transparent" }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = "var(--cb-accent-soft)"; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = "transparent"; }}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-lg font-bold tracking-tight" style={{ color: "var(--cb-text)" }}>
            {release.name || release.tag_name}
          </span>
          {isLatest && <TagBadge tag="latest" />}
          {release.prerelease && <TagBadge tag="pre-release" />}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="text-xs hidden sm:block" style={{ color: "var(--cb-text-muted)" }}>
            {date}
          </span>
          <motion.svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            stroke="var(--cb-text-soft)" strokeWidth="2" strokeLinecap="round"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22 }}
          >
            <path d="M4 6l4 4 4-4"/>
          </motion.svg>
        </div>
      </button>

      {/* Divider */}
      {open && <div className="h-px mx-6" style={{ background: "var(--cb-border-subtle)" }} />}

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 py-5">
              {/* Date on mobile */}
              <p className="text-xs mb-4 sm:hidden" style={{ color: "var(--cb-text-muted)" }}>{date}</p>

              {release.body
                ? <RenderBody text={release.body} />
                : <p className="text-sm italic" style={{ color: "var(--cb-text-muted)" }}>No release notes provided.</p>
              }

              {/* Asset download links */}
              {release.assets?.length > 0 && (
                <div className="mt-5 pt-5 border-t" style={{ borderColor: "var(--cb-border-subtle)" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cb-text-muted)" }}>
                    Assets
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {release.assets.map(asset => (
                      <a
                        key={asset.id}
                        href={asset.browser_download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        style={{
                          background:     "var(--cb-bg)",
                          border:         "1px solid var(--cb-border-subtle)",
                          color:          "var(--cb-text-soft)",
                          textDecoration: "none",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = "var(--cb-accent)";
                          e.currentTarget.style.color       = "var(--cb-accent)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
                          e.currentTarget.style.color       = "var(--cb-text-soft)";
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                          <path d="M6 1v7M3.5 5.5L6 8l2.5-2.5M1 10h10"/>
                        </svg>
                        {asset.name}
                        <span className="opacity-60">·</span>
                        <span className="opacity-60">{(asset.size / 1024 / 1024).toFixed(1)} MB</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main page ── */
export default function Changelog() {
  const [releases, setReleases] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases`)
      .then(r => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        return r.json();
      })
      .then(data => { setReleases(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <div className="pt-24 pb-24 px-5" style={{ background: "var(--cb-bg)", minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto">

        {/* Hero */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold mb-5"
            style={{
              border:     "1px solid var(--cb-border-subtle)",
              background: "var(--cb-surface)",
              color:      "var(--cb-accent)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Pulled live from GitHub Releases
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3" style={{ color: "var(--cb-text)" }}>
            Changelog
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "var(--cb-text-soft)" }}>
            Every update, fix, and new feature — in one place.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-20 rounded-2xl animate-pulse"
                style={{ background: "var(--cb-surface)", border: "1px solid var(--cb-border-subtle)" }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="rounded-2xl px-6 py-5 text-sm"
            style={{
              background: "rgba(239,68,68,0.08)",
              border:     "1px solid rgba(239,68,68,0.2)",
              color:      "#ef4444",
            }}
          >
            <strong>Could not load releases:</strong> {error}
            <br />
            <a
              href={`https://github.com/${GITHUB_REPO}/releases`}
              target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-2 mt-1 inline-block"
            >
              View on GitHub →
            </a>
          </div>
        )}

        {/* Timeline */}
        {!loading && !error && releases.length > 0 && (
          <div className="relative md:pl-10">
            {/* Vertical line */}
            <div
              className="hidden md:block absolute left-0 top-4 bottom-4 w-px"
              style={{ background: "var(--cb-border-subtle)" }}
            />

            <div className="space-y-4">
              {releases.map((release, i) => (
                <ReleaseCard
                  key={release.id}
                  release={release}
                  index={i}
                  isLatest={i === 0}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && releases.length === 0 && (
          <div className="text-center py-20" style={{ color: "var(--cb-text-muted)" }}>
            <p className="text-4xl mb-4">📭</p>
            <p className="text-base">No releases published yet.</p>
          </div>
        )}

        {/* Footer link */}
        {!loading && !error && releases.length > 0 && (
          <div className="mt-10 text-center">
            <a
              href={`https://github.com/${GITHUB_REPO}/releases`}
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--cb-accent)", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
              onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
            >
              View all releases on GitHub →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}