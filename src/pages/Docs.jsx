import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

export default function Docs() {
  const [selected, setSelected] = useState("introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const docsContent = {
    introduction: {
      title: "Introduction",
      body: `CollabBoard is a real-time collaborative whiteboard + code editor built using Electron, React, TLDraw, and Supabase.`
    },
    installation: {
      title: "Installation",
      body: `Download the latest version from the Downloads page.  
Extract the zip and run the application.`
    },
    features: {
      title: "Features",
      body: `• Real-time collaboration  
• Whiteboard  
• Code editor  
• Desktop app using Electron`
    },
    api: {
      title: "API Reference",
      body: `More API documentation coming soon.`
    }
  };

  // Color/theme vars
  const sidebarBg = "bg-gray-100";
  const sidebarBorder = "border-r border-gray-300";
  const sidebarTitle = "text-gray-800";
  const sidebarBtn = "text-gray-700";
  const sidebarBtnActive = "bg-[#018FCC] text-white font-semibold";
  const sidebarBtnHover = "hover:bg-gray-200";
  const mainBg = "bg-white";
  const mainTitle = "text-2xl font-bold text-gray-900";
  const mainBody = "text-gray-800";

  // Navbar height (should match your navbar's height if you have one, or make this a prop/context)
  const NAVBAR_HEIGHT = 72; // px, e.g. h-16 is 64px, h-20 is 80px, pick suitable value

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden
          md:block
          w-64
          ${sidebarBorder}
          p-6
          ${sidebarBg}
          flex-shrink-0
          h-[calc(100vh-0px)]
          sticky
          top-0
        `}
        style={{
          top: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          zIndex: 10
        }}
      >
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

      {/* Mobile menu button, positioned below navbar */}
      <div
        className="md:hidden fixed left-4 z-30"
        style={{ top: NAVBAR_HEIGHT + 12 }} // slightly below navbar
      >
        <button
          aria-label="Open documentation menu"
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md bg-white border border-gray-300 shadow"
        >
          <HiMenu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 flex"
          style={{
            // prevent overlay over navbar
            top: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
          }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside
            className={`
              w-64
              ${sidebarBorder}
              p-6
              ${sidebarBg}
              h-full
              relative
              animate-[slideIn_0.2s_ease]
              z-50
            `}
            style={{
              boxShadow: "2px 0 12px rgba(0,0,0,0.07)"
            }}
          >
            {/* Close button */}
            <button
              aria-label="Close documentation menu"
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-500 focus:outline-none"
            >
              <IoMdClose size={26} />
            </button>
            <h2 className={`text-lg font-bold mb-5 ${sidebarTitle}`}>Docs</h2>
            <nav className="space-y-2 mt-6">
              {Object.keys(docsContent).map(key => (
                <button
                  key={key}
                  onClick={() => {
                    setSelected(key);
                    setSidebarOpen(false);
                  }}
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
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-4 md:p-10 ${mainBg} w-0 min-w-0`}
        style={{ marginTop: NAVBAR_HEIGHT }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className={`${mainTitle} mb-4`}>
            {docsContent[selected].title}
          </h1>
          <p className={`${mainBody} whitespace-pre-line`}>
            {docsContent[selected].body}
          </p>
        </div>
      </main>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
