import { useState } from "react";

import s1 from "../../assets/s1.png";
import s2 from "../../assets/s2.png";
import s3 from "../../assets/s3.png";
import s4 from "../../assets/s4.png";
import s5 from "../../assets/s5.png";
import s6 from "../../assets/s6.png";
import s7 from "../../assets/s7.png";
import s8 from "../../assets/s8.png";
import s9 from "../../assets/s9.png";
import s10 from "../../assets/s10.png";
import s11 from "../../assets/s11.png";
import s12 from "../../assets/s12.png";

const images = [
  s1,
  s2,
  s3,
  s4,
  s5,
  s6,
  s7,
  s8,
  s9,
  s10,
  s11,
  s12,
];

export default function Showcase() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center">
          See CollabBoard in Action
        </h2>
        <div className="mt-14 flex flex-col items-center">
          <div className="relative w-full max-w-3xl" style={{ aspectRatio: '16/9' }}>
            <div className="absolute inset-0 bg-gray-100 border rounded-xl flex items-center justify-center overflow-hidden" />
            <button
              onClick={prevSlide}
              aria-label="Previous screenshot"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full shadow p-2 hover:bg-opacity-100 transition z-10"
              style={{ zIndex: 20 }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <img
              src={images[current]}
              alt={`CollabBoard Screenshot ${current + 1}`}
              className="object-contain h-full w-full rounded-xl relative"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                margin: "0 auto",
                display: "block",
                zIndex: 10,
                position: "relative"
              }}
            />
            <button
              onClick={nextSlide}
              aria-label="Next screenshot"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full shadow p-2 hover:bg-opacity-100 transition z-10"
              style={{ zIndex: 20 }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to screenshot ${idx + 1}`}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 w-2 rounded-full ${current === idx ? "bg-blue-600" : "bg-gray-300"} transition`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}