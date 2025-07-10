import { Trash, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cloudName = "dyrzsqvx2";
const uploadPreset = "prateek";

const departments = [
  "Executive", "Research", "Product Development", "Management", "Consultants"
];

const divisions = [
  "Center for Human Mobility and Communications",
  "Center for Cognitive and Emotional Intelligence",
  "Center for Companion and Care Technologies",
  "Center for Inclusive Innovation & Assistive Tech Collaboration"
];

const categories = ["Staff", "Intern", "Consultant"];

const socialOptions = ["linkedin", "github", "googleScholar", "website", "researchGate"];

const TeamForm = ({ onSubmit, defaultValues = {}, isEditMode = false, loading }) => {
  const nav = useNavigate();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      designation: '',
      department: '',
      division: '',
      category: '',
      bio: '',
      socials: [],
      ...defaultValues,
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socials'
  });

  const [imageUrl, setImageUrl] = useState(defaultValues.image || '');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (defaultValues.socials?.length) {
      defaultValues.socials.forEach((s, i) => {
        setValue(`socials.${i}.platform`, s.platform);
        setValue(`socials.${i}.url`, s.url);
      });
    }
    if (defaultValues.image) setImageUrl(defaultValues.image);
  }, [defaultValues, setValue]);

  const handleImageUpload = async (file) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (err) {
      toast.error("Image upload failed!");
      console.log(err);

    } finally {
      setUploading(false);
    }
  };

  const internalSubmit = async (data) => {
    if (!imageUrl) {
      toast.error("Please upload an image.");
      return;
    }
    const submissionData = { ...data, image: imageUrl };
    const result = await onSubmit(submissionData);

    if (result !== false) {
      reset();
      setImageUrl('');
      navigate(-1)
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(internalSubmit)} className='flex flex-col gap-4'>
        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Full Name</label>
          <input {...register('name', { required: true })} placeholder='Full Name' className='w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500' />
          {errors.name && <p className="text-red-600 text-sm">Full Name is required.</p>}
        </div>
        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Designation</label>
          <input {...register('designation', { required: true })} placeholder="Designation" className='w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500' />
          {errors.designation && <p className="text-red-600 text-sm">Designation is required.</p>}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Department</label>
            <select {...register('department', { required: true })} className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500">
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
            {errors.department && <p className="text-red-600 text-sm">Department is required.</p>}
          </div>
          <div>
            <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Division</label>
            <select {...register('division')} className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500">
              <option value="">Select Division (optional)</option>
              {divisions.map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Staff/Intern</label>
            <select {...register('category')} className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Bio</label>
          <textarea {...register('bio')} placeholder="Bio" className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500" rows={4} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Image</label>
            <div
              onDrop={(e) => {
                e.preventDefault();
                handleImageUpload(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
              className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-blue-500 bg-blue-600/10 rounded-xl text-center cursor-pointer relative"
            >
              <UploadCloud className="w-8 h-8 text-gray-500 mb-1" />
              <p className="text-gray-600 font-medium">Upload project file</p>
              <p className="text-xs text-gray-400">Drop a file or click to browse</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {uploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
            {imageUrl && (
              <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover mt-4 rounded shadow" />
            )}
          </div>
          <div>
            <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Social Links</label>
            <div>
              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center flex-wrap gap-2 mb-2">
                  <select {...register(`socials.${index}.platform`)} className="p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500">
                    <option value="">Select</option>
                    {socialOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <input
                    {...register(`socials.${index}.url`)}
                    placeholder="https://example.com"
                    className="p-2 border flex-1 border-zinc-200 rounded-md focus:outline-none text-zinc-500"
                  />
                  <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white p-2 rounded-sm cursor-pointer"><Trash size={16} /></button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => append({ platform: '', url: '' })} className="bg-blue-600 text-sm py-1 px-4 rounded-sm text-white cursor-pointer">+ Add</button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 flex-col md:flex-row">
          <button
            type="submit"
            className={`py-2 px-4 rounded-sm text-white w-full cursor-pointer ${isEditMode ? 'bg-emerald-500' : 'bg-blue-600'
              }`}
          >
            {isEditMode ? "Save" : "Add Member"}
          </button>
          <p className='py-2 px-4 rounded-sm text-white w-full bg-zinc-500 cursor-pointer text-center' onClick={() => nav(-1)}>Cancel</p>
        </div>

      </form>
    </div>
  )
}

export default TeamForm;
