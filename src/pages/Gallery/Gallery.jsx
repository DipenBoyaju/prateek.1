import { useState } from "react";
import Title from "../../components/Title"
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

const images = [
  '/images/galleries/Product.jpeg',
  '/images/galleries/prateek4.jpg',
  '/images/galleries/prateek5.jpg',
  '/images/galleries/prateek1.jpg',
  '/images/galleries/prateek2.jpg',
  '/images/galleries/prateek3.jpg',
  '/images/galleries/prateek6.jpg',
];

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const prevImage = () =>
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div>
      <Title tag="Gallery" title="Our Journey in Pictures" />

      {/* Image Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 break-inside-avoid cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full z-50"
              onClick={closeModal}
            >
              <X size={24} />
            </button>

            <img
              src={images[activeIndex]}
              alt={`Full Image ${activeIndex + 1}`}
              className="w-full rounded-lg shadow-lg max-h-[80vh] object-contain"
            />

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <button
                onClick={prevImage}
                className="text-zinc-800 bg-white/30 bg-opacity-50 hover:bg-opacity-80 p-3 rounded-r-md"
              >
                <ArrowLeft size={24} />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <button
                onClick={nextImage}
                className="text-zinc-800 bg-white/30 bg-opacity-50 hover:bg-opacity-80 p-3 rounded-l-md"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Gallery