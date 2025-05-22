import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../validators/auth';
import { useAuthStore } from '../../store/authStore';

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

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post('http://localhost:8000/api/login', data, { withCredentials: true });
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      navigate('/dashboard'); // Or wherever admin goes after login
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      {error && <p className="text-red-600 mb-2">{error.response?.data?.message || 'Login failed'}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className="p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className="p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
