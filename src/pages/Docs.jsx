import { useState } from "react";

export default function Docs() {
  const [selected, setSelected] = useState("introduction");

  const docsContent = {
    introduction: {
      title: "Introduction",
      body: `ColabBoard is a real-time collaborative whiteboard + code editor built using Electron, React, TLDraw, and Supabase.`
    },
    installation: {
      title: "Installation",
      body: `Download the latest version from the Downloads page.  
Run the installer and sign in using your account.`
    },
    features: {
      title: "Features",
      body: `• Real-time collaboration  
• Whiteboard  
• Offline mode  
• Code editor  
• Desktop app using Electron`
    },
    api: {
      title: "API Reference",
      body: `More API documentation coming soon.`
    }
  };

  // Simple color theme variables
  const sidebarBg = "bg-gray-100";
  const sidebarBorder = "border-r border-gray-300";
  const sidebarTitle = "text-gray-800";
  const sidebarBtn = "text-gray-700";
  const sidebarBtnActive = "bg-[#018FCC] text-white font-semibold";
  const sidebarBtnHover = "hover:bg-gray-200";
  const mainBg = "bg-white";
  const mainTitle = "text-2xl font-bold text-gray-900";
  const mainBody = "text-gray-800";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`w-64 ${sidebarBorder} p-6 ${sidebarBg}`}>
        <h2 className={`text-lg font-bold mb-5 ${sidebarTitle}`}>Docs</h2>
        <nav className="space-y-2">
          {Object.keys(docsContent).map(key => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`block w-full text-left px-3 py-2 rounded 
                transition
                ${sidebarBtn}
                ${selected === key ? sidebarBtnActive : sidebarBtnHover}
              `}
            >
              {docsContent[key].title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-10 ${mainBg}`}>
        <h1 className={`${mainTitle} mb-4`}>
          {docsContent[selected].title}
        </h1>
        <p className={`${mainBody} whitespace-pre-line`}>
          {docsContent[selected].body}
        </p>
      </main>
    </div>
  );
}
