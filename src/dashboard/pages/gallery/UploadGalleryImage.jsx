import { useState, useCallback } from "react";
import axios from "axios";
import { X, UploadCloud, Loader } from "lucide-react";
import { baseUrl } from "../../../utils/baseUrl";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const uploadImages = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const res = await axios.post(`${baseUrl}/api/gallery/upload-multiple`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const UploadGalleryImage = ({ onClose }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadImages,
    onSuccess: () => {
      toast.success("Upload successful!");
      setFiles([]);
      setPreviews([]);
      queryClient.invalidateQueries(["gallery"]);
      onClose();
    },
    onError: () => {
      toast.error("Upload failed");
    },

  });

  const handleFiles = useCallback((selectedFiles) => {
    const filesArray = Array.from(selectedFiles);
    setFiles(filesArray);
    setPreviews(filesArray.map((file) => URL.createObjectURL(file)));
  }, []);

  const onFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    if (files.length === 0) {
      alert("Please select images");
      return;
    }
    mutation.mutate(files);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 z-50 max-w-xl w-full bg-white rounded-lg shadow-xl p-6 -translate-x-1/2 -translate-y-1/2"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">Upload Images</h2>
          <button
            onClick={onClose}
            aria-label="Close popup"
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div
          className="border-4 border-dashed border-blue-300 rounded-md cursor-pointer
            flex flex-col items-center justify-center
            h-48 text-center text-blue-500 hover:border-blue-500 transition"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <UploadCloud size={48} className="mb-2" />
          <p className="font-medium">Drag & drop images here, or click to select</p>
          <p className="text-xs text-gray-400 mt-1">
            Supports multiple image upload
          </p>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            multiple
            onChange={onFileChange}
            className="hidden"
          />
        </div>

        {/* Preview */}
        {previews.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-4 max-h-48 overflow-auto">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className="object-cover w-full h-24 rounded shadow"
              />
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            disabled={mutation.isPending}
          >
            Cancel
          </button>
          <button
            disabled={files.length === 0 || mutation.isPending}
            onClick={handleUpload}
            className={`px-4 py-2 rounded text-white ${files.length === 0 || mutation.isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {mutation.isPending ? <div className="flex justify-center">
              <Loader className="animate-spin" />
            </div> : "Upload"}
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadGalleryImage;
