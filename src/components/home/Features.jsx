
import { FaPenNib, FaUsers, FaBolt } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaPenNib size={24} />,
      title: "Powerful Whiteboard",
      text: "Fast, smooth drawing engine powered by tldraw."
    },
    {
      icon: <FaUsers size={24} />,
      title: "Real-time Collaboration",
      text: "Work together instantly using Supabase Realtime."
    },
    {
      icon: <FaBolt size={24} />,
      title: "Offline Mode",
      text: "Continue working even without internet — sync later."
    }
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-5">
      <h2 className="text-3xl font-bold text-center">Features to Boost Your Productivity</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
        {features.map((f, idx) => (
          <div key={idx} className="text-center p-6 border rounded-xl hover:shadow-md transition">
            <div className="mx-auto mb-4 text-gray-700">{f.icon}</div>
            <h3 className="font-bold text-xl mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
