import { HiMiniSlash } from "react-icons/hi2";
import PublicationForm from "./PublicationForm";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const addPublication = async (formData) => {
  const res = await axios.post(`${baseUrl}/api/publication/addPublication`, formData);
  return res.data;
};

const AddPublication = () => {
  const nav = useNavigate()
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPublication,
    onSuccess: () => {
      toast.success("Publication added successfully!");
      queryClient.invalidateQueries(["publication"]);
    },
    onError: () => {
      toast.error("Failed to add publication");
    },
  });

  const handleCreate = (data, file, resetForm) => {
    if (!file) {
      toast.error("Please upload a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("year", data.year);
    formData.append("division", data.division);
    formData.append("title", data.title);
    formData.append("conference", data.conference);
    formData.append("authors", JSON.stringify(data.authors));
    formData.append("pdf", file);

    mutation.mutate(formData, {
      onSuccess: () => {
        resetForm();
        nav(-1)
      },
    });
  };

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="font-semibold text-lg text-blue-600">Add Publication</p>
        <p
          className="text-sm text-zinc-800/90 flex items-center"
          aria-label="Breadcrumb navigation"
        >
          Publication <HiMiniSlash className="text-base" />{" "}
          <span className="text-blue-500">Add Publication</span>
        </p>
      </div>

      <div className="py-6">
        <div className="bg-white rounded-lg">
          <PublicationForm onSubmit={handleCreate} loading={mutation.isPending} />
        </div>
      </div>
    </div>
  );
};

export default AddPublication;