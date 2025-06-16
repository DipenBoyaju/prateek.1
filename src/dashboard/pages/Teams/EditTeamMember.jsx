import { HiMiniSlash } from "react-icons/hi2"
import TeamForm from "../../components/TeamForm"
import axios from 'axios'
import { baseUrl } from "../../../utils/baseUrl";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const EditTeamMember = () => {
  const { slug } = useParams();
  console.log(slug)
  const queryClient = useQueryClient();

  const { data: member } = useQuery({
    queryKey: ["memberDetails", slug],
    queryFn: () => axios.get(`${baseUrl}/api/team/member/${slug}`).then(res => res.data),
    enabled: !!slug,
  });

  const prepareDefaultValues = (member) => {
    let socialsArray = [];
    if (member.socials && typeof member.socials === 'object' && !Array.isArray(member.socials)) {
      socialsArray = Object.entries(member.socials).map(([platform, url]) => ({
        platform,
        url
      }));
    }

    return {
      ...member,
      socials: socialsArray
    };
  };


  const handleUpdate = async (data) => {
    try {
      await axios.put(`${baseUrl}/api/team/editMember/${slug}`, data);
      toast.success("Member updated!");
      queryClient.invalidateQueries(["memberDetails", slug]);
    } catch (error) {
      toast.error("Update failed");
      console.log(error)
    }
  };

  if (!member) return <p>Member not found.</p>;

  // ✅ Properly return the component UI here:
  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow mx-4 mt-4 rounded-md">
        <p className="font-semibold text-lg text-blue-600">Edit Member</p>
        <p className="text-sm text-zinc-800/90 flex items-center">
          Team <HiMiniSlash className="text-base" /> <span className="text-blue-500">Edit Member</span>
        </p>
      </div>
      <div className="px-5 py-8">
        <div className="bg-white rounded-lg">
          <TeamForm onSubmit={handleUpdate} defaultValues={prepareDefaultValues(member)} isEditMode />
        </div>
      </div>
    </div>
  );
};

export default EditTeamMember