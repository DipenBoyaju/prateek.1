import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { Loader } from 'lucide-react'

const ContactForm = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm()

  const { mutate, isPending } = useMutation({
    mutationFn: async (FormData) => {
      const response = await axios.post(`${baseUrl}/api/send-query`, FormData)
      return response.data;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      reset()
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message)
      console.log(err)
    }
  })

  const onSubmit = (data) => {
    mutate(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shadow-2xl p-8 space-y-4  border border-zinc-200 rounded-lg w-full">
      <div className="">
        <h3 className='text-3xl text-zinc-800 font-ubuntu font-medium'>Get in Touch</h3>
        <p className='text-sm text-zinc-600'>You can reach us anytime</p>
      </div>

      <div className="flex justify-between gap-3 w-full">
        <div className="w-full">
          <input
            type="text"
            {...register("firstname", { required: "Firstname is required" })}
            className="border p-3 pl-4 border-zinc-400 rounded-lg focus:border-zinc-500 focus:outline-none mt-1 w-full"
            placeholder="Firstname"
          />
          {errors.firstname && <p className='text-red-500 text-xs '>{errors.firstname.message}</p>}
        </div>
        <div className="w-full">
          <input
            type="text"
            {...register("lastname", { required: "Lastname is required" })}
            className="border p-3 pl-4 border-zinc-400 rounded-lg focus:border-zinc-500 focus:outline-none mt-1 w-full"
            placeholder="Lastname"
          />
          {errors.lastname && <p className='text-red-500 text-xs '>{errors.lastname.message}</p>}
        </div>
      </div>
      <div className="w-full">
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
          })}
          className="border border-zinc-400 p-3 pl-4 rounded-lg mt-1 w-full focus:border-zinc-500 focus:outline-none"
          placeholder="Enter your email"
        />
        {errors.email && <p className='text-red-500 text-xs '>{errors.email.message}</p>}
      </div>
      <div className="">
        <input
          type="tel"
          {...register("phone", {
            required: "Phone Number is required",
            pattern: { value: /^[0-9]+$/ },
            minLength: { value: 10, message: "Phone number must be at least 10 digits" },
            maxLength: { value: 10, message: "Phone number can't exceed 10 digits" }
          })} name='phone'
          className="border border-zinc-400 p-3 pl-4 rounded-lg mt-1 w-full focus:border-zinc-500 focus:outline-none"
          placeholder="Phone Number"
        />
        {errors.phone && <p className='text-red-500 text-xs '>{errors.phone.message}</p>}
      </div>

      <div className="">
        <select
          {...register("purpose", { required: "Please select the purpose of contact" })}
          className="border border-zinc-400 p-3 pl-4 rounded-lg mt-1 w-full focus:border-zinc-500 focus:outline-none text-zinc-500"
          defaultValue=""
        >
          <option value="" disabled>Select purpose of contact</option>
          <option value="Vacancy">Vacancy</option>
          <option value="Query">Query</option>
          <option value="Industrial Partnership">Industrial Partnership</option>
          <option value="Project Discussion">Project Discussion</option>
          <option value="Collaboration">Collaboration</option>
        </select>
        {errors.purpose && <p className='text-red-500 text-xs'>{errors.purpose.message}</p>}
      </div>

      <div className="">
        <textarea
          {...register('query', { required: "Query is required" })}
          className="border border-zinc-400 p-3 pl-4 rounded-lg w-full mt-1 resize-none focus:border-zinc-500 focus:outline-none" name='query'
          placeholder="Type your query here" rows={5}
        ></textarea>
        {errors.query && <p className='text-xs text-red-500'>{errors.query.message}</p>}
      </div>

      <button type="submit" className="bg-blue w-full text-lg bg-cyan-300 rounded-full text-primary cursor-pointer py-3 focus:outline-none px-4">
        {isPending ? <div className="flex justify-center">
          <Loader className="text-zinc-800 animate-spin" strokeWidth={1.5} />
        </div> : "Submit"}
      </button>
    </form>
  )
}
export default ContactForm