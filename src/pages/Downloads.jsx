import OSDetectedBox from "../components/downloads/OSDetectedBox";
import Button from "../components/ui/Button";
import windowsIcon from "../assets/icons/windows.svg";
import macIcon from "../assets/icons/mac.svg";
import linuxIcon from "../assets/icons/linux.png";

export default function Downloads() {
  const downloads = [
    {
      os: "Windows",
      file: "CollabBoard-Setup.exe",
      size: "94 MB",
      icon: windowsIcon,
    },
    {
      os: "macOS (Intel)",
      file: "CollabBoard-Intel.dmg",
      size: "120 MB",
      icon: macIcon,
    },
    {
      os: "macOS (ARM)",
      file: "CollabBoard-ARM.dmg",
      size: "118 MB",
      icon: macIcon,
    },
    {
      os: "Linux",
      file: "CollabBoard.AppImage",
      size: "135 MB",
      icon: linuxIcon,
    },
  ];

  return (
    <div className="pt-20 pb-20 px-6 max-w-6xl mx-auto">
      {/* -------------------- Hero Section -------------------- */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Download CollabBoard</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Fast, secure, real-time collaborative whiteboard.  
          Available for Windows, macOS, and Linux.
        </p>
      </section>

      {/* -------------------- OS Detection -------------------- */}
      <OSDetectedBox />

      {/* -------------------- All Downloads Grid -------------------- */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold mb-6">All Downloads</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {downloads.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img src={item.icon} alt={item.os} className="w-10 h-10" />
                <div>
                  <h3 className="text-lg font-medium">{item.os}</h3>
                  <p className="text-gray-500 text-sm">
                    {item.file} • {item.size}
                  </p>
                </div>
              </div>

              <Button
                className=" "
                onClick={() =>
                  (window.location.href = `/downloads/${item.file}`)
                }
              >
                Download
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------- Release Notes -------------------- */}
      <section className="mt-20 text-center">
        <p className="text-gray-600 mb-2">Looking for previous versions?</p>
        <a
          href="https://github.com/YOUR_REPO/releases"
          target="_blank"
          className="text-blue-600 font-medium underline"
        >
          View Release Notes →
        </a>
      </section>
    </div>
  );
}
