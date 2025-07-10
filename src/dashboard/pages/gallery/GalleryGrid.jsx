import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import { Image, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const getGalleryImages = async (pageNum) => {
  const res = await axios.get(`${baseUrl}/api/gallery/all?page=${pageNum}&limit=20`);
  return res.data;
};

const deleteImage = async (id) => {
  await axios.delete(`${baseUrl}/api/gallery/${id}`);
};

const GalleryGrid = () => {
  const [page, setPage] = useState(1);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['gallery', page],
    queryFn: () => getGalleryImages(page),
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      toast.success("Image deleted!");
      queryClient.invalidateQueries(['gallery']);
      setShowPopUp(false);
      setSelectedImageId(null);
    },
    onError: () => {
      toast.error("Failed to delete image.");
    },
  });

  const handleDelete = () => {
    mutation.mutate(selectedImageId);
  };

  const handleCancel = () => {
    setShowPopUp(false);
    setSelectedImageId(null);
  };

  const images = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {
          isLoading ? (
            <div className="border border-zinc-800/20 rounded-md bg-white h-[30vh] flex justify-center items-center">
              <Image className="text-center text-zinc-300 mx-auto animate-pulse" size={90} strokeWidth={1} />
            </div>
          ) : data?.length > 0 ? (
            <p>No Images in Gallery</p>
          ) : (
            images.map((img) => (
              <div key={img._id} className="relative overflow-hidden rounded shadow group bg-white">
                <img
                  src={img.imageUrl}
                  alt="gallery"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => {
                    setSelectedImageId(img._id);
                    setShowPopUp(true);
                  }}
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-bl-md opacity-80 hover:opacity-100 transition"
                  title="Delete Image"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))
          )
        }
      </div>

      {/* Confirm Delete Popup */}
      {showPopUp && (
        <>
          <div
            className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40"
            onClick={handleCancel}
          ></div>

          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-80 max-w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Delete</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this image? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                disabled={mutation.isPending}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={mutation?.isPending}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {mutation?.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Pagination */}
      {
        data?.length > 0 && (
          <div className="flex justify-center mt-6 gap-2 items-center">
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

export default GalleryGrid;
