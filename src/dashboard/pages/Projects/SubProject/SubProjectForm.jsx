import { useForm, useFieldArray } from "react-hook-form";
import { Loader, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;


const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Cloudinary upload failed");

  const data = await res.json();
  return data.secure_url;
};

const divisions = [
  "",
  "Center for Human Mobility and Communications",
  "Center for Cognitive and Emotional Intelligence",
  "Center for Companion and Care Technologies",
  "Center for Inclusive Innovation & Assistive Tech Collaboration",
];

const SubProjectForm = ({ onSubmit, defaultValues = {}, loading, isEditMode = false }) => {
  const nav = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: defaultValues.title || "",
      description: defaultValues.description || "",
      division: defaultValues.division || "",
      datasetLink: defaultValues.datasetLink || "",
      image: defaultValues.image || "",
      teamMember:
        defaultValues.teamMember?.length > 0 ? defaultValues.teamMember : [{ name: "", role: "", image: "" }],
      partnerOrganization:
        defaultValues.partnerOrganization?.length > 0 ? defaultValues.partnerOrganization : [{ name: "", website: "", logo: "", address: "" }],
    },
  });

  useEffect(() => {
    if (defaultValues && defaultValues._id) {
      reset({
        title: defaultValues.title || "",
        description: defaultValues.description || "",
        division: defaultValues.division || "",
        datasetLink: defaultValues.datasetLink || "",
        image: defaultValues.image || "",
        teamMember:
          defaultValues.teamMember?.length > 0
            ? defaultValues.teamMember
            : [{ name: "", role: "", image: "" }],
        partnerOrganization:
          defaultValues.partnerOrganization?.length > 0
            ? defaultValues.partnerOrganization
            : [{ name: "", website: "", logo: "", address: "" }],
      });
    }
  }, [defaultValues, reset]);

  const { fields: teamFields, append: addTeam, remove: removeTeam } = useFieldArray({
    control,
    name: "teamMember",
  });

  const { fields: partnerFields, append: addPartner, remove: removePartner } = useFieldArray({
    control,
    name: "partnerOrganization",
  });

  const [uploading, setUploading] = useState(false);

  const handleMainImageUpload = async (file) => {
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setValue("image", url);
      toast.success("Image uploaded");
    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleTeamImageUpload = async (file, index) => {
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setValue(`teamMember.${index}.image`, url);
      toast.success("Team member image uploaded");
    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handlePartnerLogoUpload = async (file, index) => {
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setValue(`partnerOrganization.${index}.logo`, url);
      toast.success("Partner logo uploaded");
    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="md:p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Title</label>
          <input
            {...register("title", { required: true })}
            placeholder="Subproject Title"
            className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
          />
          {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        </div>

        {/* Division & Dataset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Division</label>
            <select {...register("division", { required: true })} className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500">
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div === "" ? "None" : div}
                </option>
              ))}
            </select>
            {errors.division && <p className="text-red-500 text-sm">Division is required</p>}
          </div>

          <div>
            <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Dataset Link</label>
            <input
              {...register("datasetLink")}
              placeholder="https://example.com"
              className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Description</label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            placeholder="Description"
            className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
          />
          {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
        </div>

        {/* Team Members */}
        <div>
          <h3 className='text-sm text-zinc-700 tracking-wide font-semibold'>Team Members</h3>
          {teamFields.map((member, index) => (
            <div key={member.id} className="border border-zinc-800/20 p-4 rounded mb-4 grid md:grid-cols-13 gap-5">
              <input
                {...register(`teamMember.${index}.name`, { required: true })}
                placeholder="Name"
                className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500 col-span-4"
              />
              <input
                {...register(`teamMember.${index}.role`)}
                placeholder="Role"
                className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500 col-span-4"
              />
              <input
                type="file"
                onChange={(e) => handleTeamImageUpload(e.target.files[0], index)}
                className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500 col-span-4"
              />
              <input {...register(`teamMember.${index}.image`)} type="hidden" />
              <button
                type="button"
                onClick={() => removeTeam(index)}
                className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addTeam({ name: "", role: "", image: "" })}
            className="bg-blue-600 text-white p-2 rounded flex items-center gap-1"
          >
            <Plus size={18} /> Add Team Member
          </button>
        </div>

        {/* Partner Orgs */}
        <div>
          <h3 className='text-sm text-zinc-700 tracking-wide font-semibold'>Partner Organizations</h3>
          {partnerFields.map((partner, index) => (
            <div key={partner.id} className="border border-zinc-800/20 p-4 rounded mb-4 grid md:grid-cols-13 gap-5">
              <input
                {...register(`partnerOrganization.${index}.name`)}
                placeholder="Name"
                className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500 col-span-3"
              />
              <input
                {...register(`partnerOrganization.${index}.website`)}
                placeholder="Website"
                className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500 col-span-3"
              />
              <input
                type="file"
                onChange={(e) => handlePartnerLogoUpload(e.target.files[0], index)}
                className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500 col-span-3"
              />
              <input {...register(`partnerOrganization.${index}.logo`)} type="hidden" />
              <input
                {...register(`partnerOrganization.${index}.address`)}
                placeholder="Address"
                className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500 col-span-3"
              />
              <button
                type="button"
                onClick={() => removePartner(index)}
                className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addPartner({ name: "", website: "", logo: "", address: "" })}
            className="bg-blue-600 text-white p-2 rounded flex items-center gap-1"
          >
            <Plus size={18} /> Add Partner Organization
          </button>
        </div>

        {/* Main Image */}
        <div>
          <label className="text-sm text-zinc-700 font-semibold">Main Image</label>
          <input
            type="file"
            onChange={(e) => handleMainImageUpload(e.target.files[0])}
            className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
          />
          <input {...register("image")} type="hidden" />

          {defaultValues?.image && (
            <img
              src={defaultValues.image}
              alt="Current"
              className="mt-2 h-32 rounded object-contain border"
            />
          )}
        </div>


        <div className="flex items-center justify-between flex-col md:flex-row gap-5">
          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer w-full"
          >
            {loading ? <div className="flex justify-center">
              <Loader className="animate-spin" />
            </div> : isEditMode ? "Save Project" : "Add Project"}
          </button>
          <p className='py-2 px-4 rounded-sm text-white w-full bg-zinc-500 cursor-pointer text-center' onClick={() => nav(-1)}>Cancel</p>
        </div>
      </form>
    </div>
  );
};

export default SubProjectForm;
