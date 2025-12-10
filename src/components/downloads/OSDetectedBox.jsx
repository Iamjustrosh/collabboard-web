import { detectOS } from "../../utils/detectOS";
import Button from "../ui/Button";
import { useEffect, useState } from "react";

export default function OSDetectedBox() {
  const [os, setOs] = useState("Detecting...");

  useEffect(() => {
    setOs(detectOS());
  }, []);

  // Map OS → file links (you will update these real URLs later)
  const downloadLinks = {
    Windows: "/downloads/CollabBoard-Setup.exe",
    "macOS Intel": "/downloads/CollabBoard-Intel.dmg",
    "macOS ARM": "/downloads/CollabBoard-ARM.dmg",
    Linux: "/downloads/CollabBoard.AppImage",
    Unknown: "/downloads",
  };

  const recommendedLink = downloadLinks[os];

  return (
    <div className="w-full max-w-xl mx-auto mt-10 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-2">Detected Operating System</h2>

      <p className="text-gray-600 mb-4">
        We detected that you're using: <span className="font-medium">{os}</span>
      </p>

      <Button
        className="w-full "
        onClick={() => window.location.href = recommendedLink}
      >
        Download for {os}
      </Button>

      <p className="text-sm text-gray-500 mt-3 text-center">
        Not your OS? View all downloads below.
      </p>
    </div>
  );
}
