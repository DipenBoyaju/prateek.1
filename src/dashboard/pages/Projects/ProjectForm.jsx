import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const divisions = [
  "",
  "Center for Human Mobility and Communications",
  "Center for Cognitive and Emotional Intelligence",
  "Center for Companion and Care Technologies",
  "Center for Inclusive Innovation & Assistive Tech Collaboration",
];

const ProjectForm = ({ onSubmit, defaultValues = {}, isEditMode = false, loading }) => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultValues.title || '',
      description: defaultValues.description || '',
      division: defaultValues.division || '',
    },
  });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset({
        title: defaultValues.title || '',
        description: defaultValues.description || '',
        division: defaultValues.division || '',
      });
    }
  }, [defaultValues, reset]);

  const internalSubmit = async (data) => {
    const result = await onSubmit(data);
    if (result !== false) {
      reset();
    }
  };

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit(internalSubmit)}
        className="flex flex-col gap-4"
      >
        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className='w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500'
          />
          {errors.title && <p className="text-red-600 text-xs">Title is required.</p>}
        </div>

        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Description</label>
          <textarea
            {...register("description")}
            className='w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500'
            rows={4}
          />
        </div>

        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Division</label>
          <select
            {...register("division")}
            className='w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500'
          >
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div === "" ? "None" : div}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row gap-5">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded w-full ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 cursor-pointer"
              }`}
          >
            {loading ? <div className="flex justify-center">
              <Loader className="animate-spin" />
            </div> : isEditMode ? "Update Project" : "Add Project"}
          </button>
          <p className='py-2 px-4 rounded-sm text-white w-full bg-zinc-500 cursor-pointer text-center' onClick={() => nav(-1)}>Cancel</p>
        </div>
      </form>
    </div>
  );
}


export default ProjectForm;
