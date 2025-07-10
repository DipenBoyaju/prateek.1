import { Plus } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import UploadGalleryImage from "./UploadGalleryImage";
import GalleryGrid from "./GalleryGrid";

const DasGallery = () => {
  const nav = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false)
  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="text-sm text-blue-500 flex items-center ">Gallery</p>
        <div className="">
          <button onClick={() => setShowPopUp(true)} className="bg-blue-500 text-white text-xs md:text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"><Plus size={16} />Add Images</button>
        </div>
      </div>

      {showPopUp && <UploadGalleryImage onClose={() => setShowPopUp(false)} />}

      <div className="">
        <GalleryGrid />
      </div>
    </div>
  )
}
export default DasGallery