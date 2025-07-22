import { Check, Loader, Mail, Pen, Phone, X } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../utils/baseUrl";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";

const changePassword = async (data) => {
  const res = await axios.patch(`${baseUrl}/api/changePassword`, data, {
    withCredentials: true
  })
  return res.data;
}

const changeUsername = async (data) => {
  const res = await axios.patch(`${baseUrl}/api/changeUsername`, data, {
    withCredentials: true
  })
  return res.data;
}

const uploadProfilePicFn = async (file) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const res = await axios.patch(`${baseUrl}/api/changeProfilePicture`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser)
  const nav = useNavigate();
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const passwordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password updated");
      nav("/login");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  })

  const usernameMutation = useMutation({
    mutationFn: changeUsername,
    onSuccess: () => {
      setEditing(false);
      setUser({ ...user, username: newUsername });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const profilePicMutation = useMutation({
    mutationFn: uploadProfilePicFn,
    onSuccess: (data) => {
      setUser({ ...user, profileImage: data.profileImage });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    passwordMutation.mutate(data);
  };

  const handleUsernameSave = () => {
    if (newUsername.trim() === "") {
      toast.error("Username cannot be empty");
      return;
    }
    usernameMutation.mutate({ username: newUsername });
  };

  const handleProfilePicClick = () => {
    if (!profilePicMutation.isLoading) {
      fileInputRef.current.click();
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    profilePicMutation.mutate(file);
  };

  return (
    <div>
      <div className="bg-blue-300 rounded-t-xl relative h-[30vh] md:h-[40vh] w-full">
        <img src="/images/shapes/grettings-pattern.png" alt="" className="object-cover w-full h-full" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-45 md:size-60 rounded-xl overflow-hidden shadow-lg ring-7 ring-white/40 bg-white">
          <img
            src={user?.profileImage ? user.profileImage : "/images/shapes/pp.jpg"}
            alt=""
            className="h-full w-full object-cover"
          />
          {profilePicMutation.isPending && (
            <div className="absolute inset-0 bg-zinc-800/40 bg-opacity-40 flex items-center justify-center z-10 rounded-xl">
              <Loader className="animate-spin text-white" size={34} />
            </div>
          )}
          <button
            onClick={handleProfilePicClick}
            className="absolute top-2 right-2 bg-white/80 p-2 rounded-xl cursor-pointer hover:bg-white/50 transition-all ease-in-out"
            title="Change Profile Picture"
          >
            <Pen size={16} className="text-zinc-800" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfilePicChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
      <div className="bg-white pt-12 pb-5 px-5">
        <div className="border-b border-zinc-800/30 w-full pb-5 flex justify-evenly flex-col md:flex-row">
          <div className="text-xs tracking-wider order-2 md:order-1">
            <p className="text-[#59667a] flex items-center gap-2 font-semibold"><Mail size={16} /> Email</p>
            <p className="pt-1 text-sm text-zinc-800">{user?.email}</p>
          </div>
          <div className="mx-auto text-center order-1 md:order-2">
            <div className="flex items-center gap-3">
              {editing ? (
                <>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="border border-zinc-300 px-2 py-1 rounded text-zinc-800"
                  />
                  <button
                    onClick={handleUsernameSave}
                    className="text-green-600 hover:text-green-800"
                    title="Save"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setNewUsername(user?.username);
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Cancel"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <p className="uppercase font-semibold text-zinc-800 text-xl">
                    {user?.username}
                  </p>
                  <span
                    onClick={() => setEditing(true)}
                    className="hover:bg-zinc-200 p-1 rounded-sm cursor-pointer transition-all ease-in-out"
                    title="Edit Username"
                  >
                    <Pen size={16} className="text-zinc-600" />
                  </span>
                </>
              )}
            </div>
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
              {...register('oldPassword', { required: "Old password is required" })}
              className="p-2 border border-zinc-800/30 focus:outline-none rounded h-[50px] text-zinc-700 md:w-[20vw]"
            /></div>
            {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
            <div className=""><input
              type="password"
              placeholder="New Password"
              {...register('newPassword', { required: "New password is required" })}
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