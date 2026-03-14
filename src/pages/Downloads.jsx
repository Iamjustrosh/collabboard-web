import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import windowsIcon from "../assets/icons/windows.svg";
import macIcon from "../assets/icons/mac.svg";
import linuxIcon from "../assets/icons/linux.png";

const GITHUB_REPO = "Iamjustrosh/Major-Project";

const downloads = [
  {
    os:   "Windows",
    file: "Collaborative.Whiteboard.V2-win32-x64-1.0.0.zip",
    size: "130 MB",
    icon: windowsIcon,
    desc: "Windows 10 / 11 · x64",
    accent: "#0078d4",
  },
  {
    os:   "macOS (Intel)",
    file: "CollabBoard-Intel.dmg",
    size: "120 MB",
    icon: macIcon,
    desc: "macOS 12+ · Intel x64",
    accent: "#555",
  },
  {
    os:   "macOS (Apple Silicon)",
    file: "CollabBoard-ARM.dmg",
    size: "118 MB",
    icon: macIcon,
    desc: "macOS 12+ · M1/M2/M3",
    accent: "#555",
  },
  {
    os:   "Linux",
    file: "CollabBoard.AppImage",
    size: "135 MB",
    icon: linuxIcon,
    desc: "Ubuntu 20.04+ · AppImage",
    accent: "#f97316",
  },
];

export default function Downloads() {
  const [releaseData, setReleaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`)
      .then(res => res.json())
      .then(data => { setReleaseData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getDownloadUrl = (filename) => {
    if (!releaseData?.assets) {
      return `https://github.com/${GITHUB_REPO}/releases/latest/download/${filename}`;
    }
    const asset = releaseData.assets.find(a => a.name === filename);
    return asset?.browser_download_url ?? `https://github.com/${GITHUB_REPO}/releases/latest/download/${filename}`;
  };

  const handleDownload = (filename) => window.open(getDownloadUrl(filename), "_blank");

  return (
    <div className="pt-24 pb-24 px-5 max-w-6xl mx-auto" style={{ background: "var(--cb-bg)" }}>

      {/* Hero */}
      <section className="text-center mb-20">
        <motion.div
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
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for Windows, macOS &amp; Linux
          </span>

          <h1
            className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--cb-text)" }}
          >
            Download CollabBoard
          </h1>
          <p className="max-w-xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: "var(--cb-text-soft)" }}>
            Get the latest stable build. Real-time collaboration, offline-ready canvas, and an integrated
            code editor — all in one desktop app.
          </p>

          {releaseData && (
            <p className="text-sm mt-4" style={{ color: "var(--cb-text-muted)" }}>
              Latest:{" "}
              <span className="font-semibold" style={{ color: "var(--cb-accent)" }}>
                {releaseData.tag_name}
              </span>
              {" "}· Published {new Date(releaseData.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          )}
        </motion.div>
      </section>

      {/* Downloads grid */}
      <section>
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--cb-text)" }}>All platforms</h2>
        <p className="text-sm mb-8" style={{ color: "var(--cb-text-soft)" }}>
          Pick the installer for your OS. Older builds are available in the release archive below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {downloads.map((item, idx) => (
            <motion.div
              key={idx}
              className="group flex items-center justify-between rounded-2xl p-6 transition-all duration-300"
              style={{
                background: "var(--cb-surface)",
                border:     "1px solid var(--cb-border-subtle)",
                boxShadow:  "0 2px 10px rgba(0,0,0,0.04)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.10)";
                e.currentTarget.style.borderColor = "var(--cb-accent)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--cb-accent-soft)" }}
                >
                  <img src={item.icon} alt={item.os} className="w-7 h-7 object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-[15px]" style={{ color: "var(--cb-text)" }}>
                    {item.os}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--cb-text-muted)" }}>
                    {item.desc} · {item.size}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDownload(item.file)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-50"
                style={{
                  background:  "var(--cb-accent)",
                  color:       "#fff",
                  boxShadow:   "0 2px 8px rgba(var(--cb-accent-rgb), 0.3)",
                  minWidth:    "110px",
                  justifyContent: "center",
                }}
                onMouseEnter={e => {
                  if (!loading) {
                    e.currentTarget.style.background = "var(--cb-accent-strong)";
                    e.currentTarget.style.transform = "scale(1.03)";
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--cb-accent)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                      <path d="M6 1a5 5 0 0 1 5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Loading
                  </span>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                      <path d="M6.5 1.5v7M4 6l2.5 2.5L9 6M2 10.5h9"/>
                    </svg>
                    Download
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Release notes link */}
      <section className="mt-16 text-center">
        <div
          className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl px-8 py-6"
          style={{ background: "var(--cb-surface)", border: "1px solid var(--cb-border-subtle)" }}
        >
          <div className="text-left">
            <p className="font-medium text-sm" style={{ color: "var(--cb-text)" }}>Looking for older versions?</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--cb-text-muted)" }}>
              Previous releases and pre-releases are available on GitHub.
            </p>
          </div>
          <a
            href={`https://github.com/${GITHUB_REPO}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors"
            style={{
              border:      "1px solid var(--cb-border-subtle)",
              background:  "var(--cb-bg)",
              color:       "var(--cb-accent)",
              textDecoration: "none",
            }}
          >
            View release archive →
          </a>
        </div>
      </section>
    </div>
  );
}