import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-16 border-b flex items-center">
      <div className="max-w-6xl mx-auto w-full flex justify-between px-4">
        <Link to="/" className="text-xl font-semibold">CollabBoard</Link>

        <nav className="flex gap-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/downloads">Downloads</Link>
          <Link to="/docs">Docs</Link>
        </nav>
      </div>
    </header>
  );
}
