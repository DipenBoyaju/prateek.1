import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const UploadNewsletter = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const queryClient = useQueryClient();

  const uploadNewsletter = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);

      const res = await axios.post(`${baseUrl}/api/newsletter/upload`, formData);
      return res.data;
    },
    mutationKey: ['newsletters'],
    onSuccess: () => {
      toast.success("Newsletter uploaded!");
      setTitle("");
      setFile(null);
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries(["newsletters"]);
      if (onClose) onClose();
    },
    onError: () => {
      toast.error("Upload failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !file) return toast.error("Title and PDF required!");
    uploadNewsletter.mutate();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      toast.error("Only PDF files are allowed");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Upload Newsletter PDF
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Newsletter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border rounded border-zinc-800/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label htmlFor="pdfUpload" className="block cursor-pointer">
              <p className="text-gray-500">
                {file ? `📄 ${file.name}` : "Drag & drop or click to upload PDF"}
              </p>
              <input
                id="pdfUpload"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploadNewsletter.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {uploadNewsletter.isPending ? <div className="flex justify-center">
                <Loader className="animate-spin" />
              </div> : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadNewsletter;
