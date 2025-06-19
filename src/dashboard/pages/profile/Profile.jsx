import { Mail, Phone } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user)
  return (
    <div>
      <div className="bg-blue-300 rounded-t-xl relative h-[40vh] w-full">
        <img src="/images/shapes/grettings-pattern.png" alt="" className="object-cover w-full h-full" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-60 rounded-xl overflow-hidden shadow-lg ring-7 ring-white/40">
          <img src={user?.profileImage ? user?.profileImage : '/images/shapes/pp.jpg'} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="bg-white pt-12 pb-5 px-5">
        <div className="border-b border-zinc-800/30 w-full pb-5 flex justify-evenly">
          <div className="text-xs tracking-wider">
            <p className="text-[#59667a] flex items-center gap-2 font-semibold"><Mail size={16} /> Email</p>
            <p className="pt-1 text-sm text-zinc-800">{user?.email}</p>
          </div>
          <div className="mx-auto text-center">
            <p className="uppercase font-semibold text-zinc-800 text-xl">{user?.username}</p>
            <p className="uppercase text-lightGray text-[14px] font-quicksand font-semibold">Admin</p>
          </div>
          <div className="text-xs tracking-wider">
            <p className="text-[#59667a] flex items-center gap-2 font-semibold"><Phone size={16} /> Contact</p>
            <p className="pt-1 text-sm text-zinc-800">+977 9813376093</p>
          </div>
        </div>
        <div className="py-5">
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
      </div>
    </div>
  )
}
export default Profile