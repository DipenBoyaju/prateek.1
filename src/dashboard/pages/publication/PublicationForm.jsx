import { Plus, Trash, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const divisions = [
  "",
  "Center for Human Mobility and Communications",
  "Center for Cognitive and Emotional Intelligence",
  "Center for Companion and Care Technologies",
  "Center for Inclusive Innovation & Assistive Tech Collaboration",
];

const PublicationForm = ({ onSubmit, defaultValues = {}, loading, isEditMode = false }) => {
  const nav = useNavigate();
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      code: defaultValues.code || "",
      year: defaultValues.year || "",
      division: defaultValues.division || "",
      title: defaultValues.title || "",
      authors: defaultValues.authors?.length > 0 ? defaultValues.authors : [{ name: "" }],
      conference: defaultValues.conference || "",
      pdfUrl: defaultValues.pdfUrl || "",
    },
  });

  const { isDirty } = useFormState({ control });

  useEffect(() => {
    if (defaultValues && defaultValues._id) {
      reset({
        code: defaultValues.code || "",
        year: defaultValues.year || "",
        division: defaultValues.division || "",
        title: defaultValues.title || "",
        authors: defaultValues.authors?.length > 0 ? defaultValues.authors : [{ name: "" }],
        conference: defaultValues.conference || "",
        pdfUrl: defaultValues.pdfUrl || "",
      });
    }
  }, [defaultValues, reset]);

  const { fields: authorFields, append: addAuthor, remove: removeAuthor } = useFieldArray({
    control,
    name: "authors",
  });

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

  const handleFormSubmit = (data) => {
    if (authorFields.length === 0) {
      toast.error("At least one author is required");
      return;
    }
    onSubmit(data, file, () => {
      reset({
        code: "",
        year: "",
        division: "",
        title: "",
        authors: [{ name: "" }],
        conference: "",
        pdfUrl: "",
      });
      setFile(null);
    });
  };

  const handleCancel = () => {
    if (isDirty && !window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
      return;
    }
    nav(-1);
  };

  return (
    <div className="md:p-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <div className="flex items-center gap-5 w-full flex-wrap md:flex-nowrap">
          <div className="w-full">
            <label className="text-sm text-zinc-700 tracking-wide font-semibold" htmlFor="code">
              Code
            </label>
            <input
              id="code"
              {...register("code", { required: "Code is required" })}
              placeholder="Code"
              className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
            />
            {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
          </div>
          <div className="w-full">
            <label className="text-sm text-zinc-700 tracking-wide font-semibold" htmlFor="year">
              Year
            </label>
            <input
              id="year"
              {...register("year", { required: "Year is required" })}
              placeholder="Year"
              className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
            />
            {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
          </div>
          <div className="w-full">
            <label className="text-sm text-zinc-700 tracking-wide font-semibold" htmlFor="division">
              Division
            </label>
            <select
              id="division"
              {...register("division")}
              className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
            >
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div === "" ? "None" : div}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full">
          <label className="text-sm text-zinc-700 tracking-wide font-semibold" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="w-full">
          <label className="text-sm text-zinc-700 tracking-wide font-semibold" htmlFor="conference">
            Conference
          </label>
          <input
            id="conference"
            {...register("conference", { required: "Conference is required" })}
            placeholder="Conference"
            className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
          />
          {errors.conference && <p className="text-red-500 text-sm">{errors.conference.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <h3 className="text-sm text-zinc-700 tracking-wide font-semibold">Authors</h3>
            <div className="border border-zinc-800/20 p-4 rounded">
              {authorFields.map((member, index) => (
                <div key={member.id} className="mb-4 flex gap-3">
                  <input
                    {...register(`authors.${index}.name`, { required: "Author name is required" })}
                    placeholder="Name"
                    className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
                    aria-label={`Author ${index + 1} name`}
                  />
                  {errors.authors?.[index]?.name && (
                    <p className="text-red-500 text-sm">{errors.authors[index].name.message}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
                    aria-label={`Remove author ${index + 1}`}
                    disabled={authorFields.length === 1}
                  >
                    <Trash size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addAuthor({ name: "" })}
                className="bg-blue-600 text-white p-2 rounded flex items-center gap-1"
                aria-label="Add team member"
              >
                <Plus size={18} /> Add Authors
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-zinc-700 tracking-wide font-semibold" htmlFor="pdfUpload">
              Research Paper
            </label>
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
                  aria-label="Upload PDF file"
                />
              </label>
            </div>
            <p className="text-gray-500">
              {file
                ? `📄 ${file.name}`
                : (isEditMode && defaultValues.pdfUrl)
                  ? `📎 Current: ${defaultValues.pdfUrl.split('/').pop()}`
                  : "Drag & drop or click to upload PDF"}
            </p>

          </div>
        </div>

        <div className="flex items-center justify-between flex-col md:flex-row gap-5">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer w-full disabled:opacity-50"
            aria-label={isEditMode ? "Save publication" : "Add publication"}
          >
            {loading ? (
              <div className="flex justify-center">
                <Loader className="animate-spin" size={18} />
              </div>
            ) : isEditMode ? (
              "Save Publication"
            ) : (
              "Add Publication"
            )}
          </button>
          <p
            className="py-2 px-4 rounded-sm text-white w-full bg-zinc-500 cursor-pointer text-center"
            onClick={handleCancel}
            aria-label="Cancel form"
          >
            Cancel
          </p>
        </div>
      </form>
    </div>
  );
};

export default PublicationForm;