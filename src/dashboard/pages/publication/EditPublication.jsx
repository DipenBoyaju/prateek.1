import axios from "axios";
import { HiMiniSlash } from "react-icons/hi2";
import { baseUrl } from "../../../utils/baseUrl.js";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PublicationForm from "./PublicationForm.jsx";

const fetchPublicationBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/publication/getPublicationBySlug/${slug}`);
  return res.data;
};

const updatePublicationById = async ({ id, data, file }) => {
  const formData = new FormData();
  formData.append("code", data.code || "");
  formData.append("year", data.year || "");
  formData.append("division", data.division || "");
  formData.append("title", data.title || "");
  formData.append("conference", data.conference || "");
  formData.append("authors", JSON.stringify(data.authors || []));
  if (file) {
    formData.append("pdf", file);
  }

  // Log FormData contents
  for (let [key, value] of formData.entries()) {
    console.log(`FormData ${key}:`, value);
  }

  const res = await axios.put(`${baseUrl}/api/publication/updatePublication/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const EditPublication = () => {
  const { slug } = useParams();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const { data: publication, isLoading, error } = useQuery({
    queryKey: ["publication", slug],
    queryFn: () => fetchPublicationBySlug(slug),
    enabled: !!slug,
  });

  const mutation = useMutation({
    mutationFn: updatePublicationById,
    onSuccess: () => {
      toast.success("Publication updated successfully!");
      queryClient.invalidateQueries(["publication", slug]);
      nav(-1);
    },
    onError: (error) => {
      console.error("Mutation error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update publication");
    },
  });

  const handleUpdate = (data, file, resetForm) => {
    const id = publication?._id;
    if (!id) {
      toast.error("Publication ID not found");
      return;
    }
    console.log("Updating:", { id, data, file });
    mutation.mutate({ id, data, file }, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="font-semibold text-lg text-blue-600">Edit Publication</p>
        <p className="text-sm text-zinc-800/90 flex items-center">
          Publication <HiMiniSlash className="text-base" />{" "}
          <span className="text-blue-500">Edit Publication</span>
        </p>
      </div>

      <div className="py-6">
        <div className="bg-white rounded-lg">
          <PublicationForm
            onSubmit={handleUpdate}
            loading={mutation.isPending}
            defaultValues={publication || {}}
            isEditMode
          />
        </div>
      </div>
    </div>
  );
};

export default EditPublication;