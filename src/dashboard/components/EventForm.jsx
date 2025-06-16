import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Editor } from '@tinymce/tinymce-react'
import toast from 'react-hot-toast'

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  startDate: z.string().nonempty('Start date is required'),
  endDate: z.string().nonempty('End date is required'),
  time: z.string().nonempty('Time is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
}).refine(data => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'End date must be the same or after start date',
  path: ['endDate'],
})


const EventForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      time: '',
      description: '',
    },
  })

  const onSubmit = (data) => {
    console.log('Event Data:', data)
    toast.success('Event created successfully!')
    reset()
  }

  return (
    <div className='p-6'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
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

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
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
            <input type="time" {...register('time')} className="w-full p-2 border border-zinc-200 rounded-md focus:outline-none text-zinc-500" />
            {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time.message}</p>}
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-700 tracking-wide font-semibold">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Editor
                apiKey="v27d4gf1jn32vf2urksbv258ysq92atkehtjdiga6hrcam4m"
                value={value}
                init={{
                  height: 600,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic underline | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                }}
                onEditorChange={onChange}
              />
            )}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  )
}

export default EventForm
