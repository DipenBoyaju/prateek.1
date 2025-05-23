import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
import toast from 'react-hot-toast'

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const createAdmin = async (data) => {
  const res = await axios.post(`${baseUrl}/api/signup-admin`, data, {
    withCredentials: true,
  });
  return res.data;
};

export default function AdminSignup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      toast.success("Admin created!")
      navigate('/login');
    },
    onError: (err) => {
      console.error("Signup error:", err);
      const message =
        err?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  });


  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="py-20 bg-zinc-300">
      <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-zinc-800">Create Admin</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="p-2 border border-zinc-800/30 focus:outline-none rounded h-[50px] text-zinc-700"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="p-2 border border-zinc-800/30 focus:outline-none rounded h-[50px] text-zinc-700"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            {isLoading ? 'Creating...' : 'Create Admin'}
          </button>
        </form>
      </div>
    </div >
  );
}
