import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../validators/auth';
import { useAuthStore } from '../../store/authStore';
import { baseUrl } from '../../utils/baseUrl';
import toast from 'react-hot-toast';

export default function UserLogin() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${baseUrl}/api/login`, data, { withCredentials: true });
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      navigate('/dashboard');
      toast.success("User Logged In")
    },
    onError: (err) => {
      console.error("Signup error:", err);
      const message =
        err?.response?.data?.message || 'Login failed';
      toast.error(message);
    }
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="py-20 bg-zinc-300">
      <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-zinc-800 mb-4">User Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="p-2 border border-zinc-800/30 focus:outline-none rounded h-[50px] text-zinc-700"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="p-2 border border-zinc-800/30 focus:outline-none rounded h-[50px] text-zinc-700"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
