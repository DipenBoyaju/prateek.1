import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios'

const postEvent = async (data) => {
  try {
    const response = await axios.post("/api/events", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to add event";
    throw new Error(message);
  }
};

const EventForm = ({ closeModal }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      reset();
      closeModal();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmit = data => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label className="block font-semibold">Title*</label>
        <input {...register("title", { required: "Title is required" })} className="input" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Description*</label>
        <textarea {...register("description", { required: "Description is required" })} className="input" rows={4} />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Date*</label>
        <input type="date" {...register("date", { required: "Date is required" })} className="input" />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Time*</label>
        <input type="time" placeholder="10:00 AM – 5:00 PM" {...register("time", { required: "Time is required" })} className="input" />
        {errors.time && <p className="text-red-500">{errors.time.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Location*</label>
        <input {...register("location", { required: "Location is required" })} className="input" />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Image URL</label>
        <input {...register("image")} className="input" />
      </div>

      <div>
        <label className="block font-semibold">Category</label>
        <input {...register("category")} className="input" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Event"}
      </button>
    </form>
  );
};

export default EventForm;
