import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    src: "/sign/ghar-happy.jpeg",
    name: "Ghar (घर)",
  },
  {
    src: "/sign/thanks-happy.png",
    name: "Thanks (धन्यवाद)",
  },
  {
    src: "/sign/namaste-happy.jpeg",
    name: "Namaste (नमस्कार)",
  },
  {
    src: "/sign/me-happy.jpeg",
    name: "Me (म)",
  },
];

const CardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const { src, name } = slides[currentIndex];

  return (
    <div className="relative w-1/2 md:w-80 mx-auto mt-10 md:pr-10">
      {/* Image */}
      <div className="w-full rounded-xl overflow-hidden shadow-xl">
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="text-center py-3 text-white bg-emerald-400">
          {name}
        </div>
      </div>


      {/* Controls */}
      <div className="top-1/3 absolute md:relative">
        <div className="absolute md:bottom-[-4rem] md:left-1/2 md:-translate-x-1/2 flex gap-4 ">
          <button
            onClick={prevSlide}
            className="px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-gray-700 transition absolute md:relative -left-15 md:left-auto"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            className="px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-gray-700 transition absolute md:relative -right-60 md:right-auto"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
