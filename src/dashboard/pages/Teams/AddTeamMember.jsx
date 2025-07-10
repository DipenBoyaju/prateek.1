import { HiMiniSlash } from "react-icons/hi2"
import TeamForm from "../../components/TeamForm"
import axios from 'axios'
import { baseUrl } from "../../../utils/baseUrl";
import toast from "react-hot-toast";

const AddTeamMember = () => {
  const handleCreate = async (data) => {
    try {
      await axios.post(`${baseUrl}/api/team/addMember`, data);
      toast.success("Member added successfully!");
    } catch (error) {
      toast.error("Failed to add member");
    }
  };
  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow md:mx-4 md:mt-4 rounded-md">
        <p className="font-semibold md:text-lg text-blue-600">Add Member</p>
        <p className="text-xs md:text-sm text-zinc-800/90 flex items-center">Team <HiMiniSlash className="text-base" /> <span className="text-blue-500 ">Add Member</span></p>
      </div>
      <div className="md:px-5 py-4 md:py-8">
        <div className="bg-white rounded-lg">
          <TeamForm onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  )
}
export default AddTeamMember