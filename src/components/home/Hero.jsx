import Button from "../ui/Button";
import { Link } from "react-router-dom";
import previewImg from "../../assets/hero-preview.png"; // Ensure this image exists

export default function Hero() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-5xl font-bold leading-tight">
        Real-time Collaboration.<br /> Offline-ready Whiteboard.
      </h1>

      <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
        Work together instantly on drawings, documents, ideas and code — all inside a fast, modern desktop app.
      </p>

      <div className="flex justify-center gap-4 mt-8">
        <Link to="/downloads">
          <Button>Download App</Button>
        </Link>

        <Link to="/docs">
          <button className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition">
            Read Docs
          </button>
        </Link>
      </div>

      {/* Responsive screenshot preview, fits container */}
      <div className="mt-16 p-4">
        <div className="w-full max-w-4xl mx-auto bg-gray-100 border rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={previewImg}
            alt="CollabBoard App Preview"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center" }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
