import { useState } from "react";
import Title from "../../components/Title";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import Masonry from "react-masonry-css";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const getGalleryImages = async (pageNum) => {
  const res = await axios.get(`${baseUrl}/api/gallery/all?page=${pageNum}&limit=15`);
  return res.data;
};

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['gallery', page],
    queryFn: () => getGalleryImages(page),
    keepPreviousData: true,
  });

  const images = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const openModal = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const prevImage = () =>
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    500: 1,
  };

  if (isError) {
    toast.error("Failed to load gallery.");
  }

  return (
    <div>
      <Title tag="Gallery" title="Our Journey in Pictures" />

      <div className="container mx-auto px-4 py-10">
        {isLoading ? (
          <p className="text-center text-zinc-500">Loading gallery...</p>
        ) : images.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {images.map((img, index) => (
              <div
                key={img._id}
                className="mb-4 overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img
                  src={img.imageUrl}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </Masonry>
        ) : (
          <p className="text-center text-zinc-500">No images found.</p>
        )}
      </div>

      {/* Modal */}
      {isOpen && images.length > 0 && (
        <div
          className="fixed inset-0 backdrop-blur bg-black/80 flex items-center justify-center z-50"
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
              src={images[activeIndex].imageUrl}
              alt={`Full Image ${activeIndex + 1}`}
              className="w-full rounded-lg shadow-lg max-h-[80vh] object-contain"
            />

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <button
                onClick={prevImage}
                className="text-white bg-white/30 hover:bg-white/50 p-3 rounded-r-md"
              >
                <ArrowLeft size={24} />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <button
                onClick={nextImage}
                className="text-white bg-white/30 hover:bg-white/50 p-3 rounded-l-md"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {
        data?.length > 15 && (
          <div className="flex justify-center mb-6 gap-2 items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {pages.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-4 py-2 rounded ${pageNum === page
                  ? "bg-blue-600 text-white cursor-default"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
                disabled={pageNum === page}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )
      }
    </div>
  );
};

export default Gallery;
