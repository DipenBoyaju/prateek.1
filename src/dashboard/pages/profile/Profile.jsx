import { Mail, Phone } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../utils/baseUrl";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const changePassword = async (data) => {
  const res = await axios.patch(`${baseUrl}/api/changePassword`, data, {
    withCredentials: true
  })
  return res.data;
}

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password updated");
      nav("/login");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  })

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <div className="bg-blue-300 rounded-t-xl relative h-[30vh] md:h-[40vh] w-full">
        <img src="/images/shapes/grettings-pattern.png" alt="" className="object-cover w-full h-full" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-45 md:size-60 rounded-xl overflow-hidden shadow-lg ring-7 ring-white/40">
          <img src={user?.profileImage ? user?.profileImage : '/images/shapes/pp.jpg'} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="bg-white pt-12 pb-5 px-5">
        <div className="border-b border-zinc-800/30 w-full pb-5 flex justify-evenly flex-col md:flex-row">
          <div className="text-xs tracking-wider order-2 md:order-1">
            <p className="text-[#59667a] flex items-center gap-2 font-semibold"><Mail size={16} /> Email</p>
            <p className="pt-1 text-sm text-zinc-800">{user?.email}</p>
          </div>
          <div className="mx-auto text-center order-1 md:order-2">
            <p className="uppercase font-semibold text-zinc-800 text-xl">{user?.username}</p>
            <p className="uppercase text-lightGray text-[14px] font-quicksand font-semibold">Admin</p>
          </div>
          <div className="text-xs tracking-wider order-3">
            <p className="text-[#59667a] flex items-center gap-2 font-semibold"><Phone size={16} /> Contact</p>
            <p className="pt-1 text-sm text-zinc-800">+977 9813376093</p>
          </div>
        </div>
        <div className="py-5 border-b border-zinc-800/20">
          <ul className="text-center flex items-center justify-center text-[#59667a] text-3xl gap-5">
            <li className="hover:text-blue-200 transition-colors ease-in-out">
              <a href="https://www.facebook.com/profile.php?id=100091857246327&_rdr">
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/profile.php?id=100091857246327&_rdr" className="hover:text-blue-200 transition-colors ease-in-out">
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </div>
        <div className="py-5">
          <p className="text-blue-500 font-semibold">Change Password</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-2">
            <div className=""><input
              type="password"
              placeholder="Old Password"
              {...register('oldPassword')} required
              className="p-2 border border-zinc-800/30 focus:outline-none rounded h-[50px] text-zinc-700 md:w-[20vw]"
            /></div>
            {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
            <div className=""><input
              type="password"
              placeholder="New Password"
              {...register('newPassword')} required
              className="p-2 border border-zinc-800/30 focus:outline-none rounded h-[50px] text-zinc-700 md:w-[20vw]"
            /></div>
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
            <button type="submit" className="bg-emerald-400 text-white px-4 py-2 rounded-sm cursor-pointer">Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Profile