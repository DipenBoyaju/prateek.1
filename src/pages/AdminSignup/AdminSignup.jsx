import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const createAdmin = async (data) => {
  const res = await axios.post('http://localhost:8000/api/signup-admin', data, {
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

  const { mutate, isLoading, error } = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      alert("Admin created!");
      navigate('/login');
    },
    onError: (err) => {
      console.error("Signup error:", err);
    }
  });


  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create Admin</h2>
      {error && <p className="text-red-500 mb-2">{error.response?.data?.message || 'Something went wrong'}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLoading ? 'Creating...' : 'Create Admin'}
        </button>
      </form>
    </div>
  );
}
