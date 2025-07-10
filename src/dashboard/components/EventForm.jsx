// EventForm.jsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UploadCloud } from 'lucide-react';

const cloudName = "dyrzsqvx2";
const uploadPreset = "prateek";

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  startDate: z.string().nonempty('Start date is required'),
  endDate: z.string().optional(),
  time: z.string().nonempty('Time is required'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  image: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
}).refine(data => !data.endDate || new Date(data.endDate) >= new Date(data.startDate), {
  message: 'End date must be the same or after start date',
  path: ['endDate'],
});

const EventForm = ({ onSubmit, defaultValues = {}, isEditMode = false, loading }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: defaultValues.title || '',
      startDate: defaultValues.startDate
        ? new Date(defaultValues.startDate).toISOString().split('T')[0]
        : '',
      endDate: defaultValues.endDate
        ? new Date(defaultValues.endDate).toISOString().split('T')[0]
        : '',
      time: defaultValues.time
        ? defaultValues.time.slice(0, 5) // Ensure HH:mm format (e.g., "14:30")
        : '',
      location: defaultValues.location || '',
      image: defaultValues.image || '',
      description: defaultValues.description || '',
    },
  });
  console.log(errors)
  const [imageUrl, setImageUrl] = useState(defaultValues.image || '');
  const [uploading, setUploading] = useState(false);

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
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Image upload failed!");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      const formatDate = (value) => {
        if (!value) return '';
        try {
          const date = new Date(value);
          if (isNaN(date.getTime())) return ''; // Handle invalid dates
          return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
        } catch {
          return '';
        }
      };

      const formatTime = (value) => {
        if (!value) return '';
        // Assume time is in "HH:mm:ss" or "HH:mm" format
        return value.slice(0, 5); // Convert to "HH:mm"
      };

      const formattedValues = {
        title: defaultValues.title || '',
        startDate: formatDate(defaultValues.startDate),
        endDate: formatDate(defaultValues.endDate),
        time: formatTime(defaultValues.time),
        location: defaultValues.location || '',
        image: defaultValues.image || '',
        description: defaultValues.description || '',
      };
      reset(formattedValues);
      setImageUrl(defaultValues.image || '');
    }
  }, [defaultValues, reset]);

  const internalSubmit = async (data) => {
    // if (!imageUrl) {
    //   toast.error("Please upload an image.");
    //   return false;
    // }
    const submissionData = { ...data, image: imageUrl };
    const result = await onSubmit(submissionData);
    navigate(-1)

    if (result !== false) {
      reset();
      setImageUrl('');
      navigate(-1);
    }
  };

  return (
    <div className='p-6'>
      <form onSubmit={handleSubmit(internalSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Title</label>
          <input
            type="text"
            {...register('title')}
            className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
            placeholder="Event Title"
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Dates & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-700 tracking-wide font-semibold">Start Date</label>
              <input
                type="date"
                {...register('startDate')}
                className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
              />
              {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate.message}</p>}
            </div>

            <div>
              <label className="text-sm text-zinc-700 tracking-wide font-semibold">End Date</label>
              <input
                type="date"
                {...register('endDate')}
                className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
              />
              {errors.endDate && <p className="text-red-600 text-sm mt-1">{errors.endDate.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm text-zinc-700 tracking-wide font-semibold">Time</label>
            <input
              type="time"
              {...register('time')}
              className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
            />
            {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time.message}</p>}
          </div>
        </div>

        {/* Location & Image Upload */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-700 tracking-wide font-semibold">Location</label>
            <input
              type="text"
              {...register('location')}
              className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500"
              placeholder="Event Location"
            />
            {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
          </div>

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
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-zinc-700 tracking-wide font-semibold">Description</label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Editor
                apiKey="v27d4gf1jn32vf2urksbv258ysq92atkehtjdiga6hrcam4m"
                value={field.value}
                onEditorChange={(content) => field.onChange(content)}
                init={{
                  height: 600,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                    'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'paste', 'help', 'wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic underline | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | image | removeformat | help',
                  images_upload_handler: async (blobInfo, progress) => {
                    try {
                      const formData = new FormData();
                      formData.append('file', blobInfo.blob());
                      formData.append('upload_preset', 'prateek'); // Use your upload preset

                      const res = await fetch(`https://api.cloudinary.com/v1_1/dyrzsqvx2/image/upload`, {
                        method: 'POST',
                        body: formData,
                      });

                      if (!res.ok) throw new Error('Image upload failed');

                      const data = await res.json();
                      return data.secure_url; // Return the image URL for TinyMCE
                    } catch (err) {
                      toast.error('Failed to upload image in editor!');
                      throw err; // TinyMCE expects an error to be thrown on failure
                    }
                  },
                }}
              />
            )}
          />

          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between gap-5 flex-col md:flex-row">
          <button
            type="submit"
            disabled={loading || uploading}
            className={`${isEditMode ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded transition w-full`}
          >
            {loading ? "Please wait..." : isEditMode ? 'Update Event' : 'Create Event'}
          </button>
          <p className='py-2 px-4 rounded-sm text-white w-full bg-zinc-500 cursor-pointer text-center' onClick={() => navigate(-1)}>Cancel</p>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
