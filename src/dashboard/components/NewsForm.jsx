import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Loader } from 'lucide-react'

const NewsForm = ({ onSubmit, defaultValues = {}, isEditMode = false, loading }) => {
  const nav = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultValues.title || '',
      description: defaultValues.description || '',
    },
  });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset({
        title: defaultValues.title || '',
        description: defaultValues.description || '',
      });
    }
  }, [defaultValues, reset]);

  const internalSubmit = async (data) => {
    const result = await onSubmit(data);
    if (result !== false) {
      reset();
      nav(-1)
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(internalSubmit)} className='flex flex-col gap-4' >
        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Title</label>
          <input {...register('title', { required: true })} placeholder='Title' className='w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500' />
          {errors.title && <p className="text-red-600 text-xs">Title Name is required.</p>}
        </div>
        <div>
          <label className='text-sm text-zinc-700 tracking-wide font-semibold'>Description</label>
          <textarea {...register('description', { required: true })} placeholder="Description" className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500" rows={6} />
          {errors.description && <p className="text-red-600 text-sm">Description Name is required.</p>}
        </div>
        <div className="flex items-center justify-between gap-5 flex-col md:flex-row">
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 rounded-sm cursor-pointer w-full text-white ${isEditMode ? 'bg-emerald-500' : 'bg-blue-600'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? <div className="flex justify-center">
              <Loader className="animate-spin" />
            </div> : isEditMode ? "Save" : "Add News"}
          </button>
          <p className='py-2 px-4 rounded-sm text-white w-full bg-zinc-500 cursor-pointer text-center' onClick={() => nav(-1)}>Cancel</p>
        </div>
      </form >
    </div >
  )
}
export default NewsForm