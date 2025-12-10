import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="py-24 text-center bg-black text-white">
      <h2 className="text-4xl font-bold">Ready to get started?</h2>
      <p className="text-gray-300 max-w-xl mx-auto mt-3">
        Download the desktop app and start collaborating in seconds.
      </p>

      <Link to="/downloads">
        <Button className="mt-8">Download Now</Button>
      </Link>
    </section>
  );
}
