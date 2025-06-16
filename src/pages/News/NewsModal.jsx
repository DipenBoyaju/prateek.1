import { X } from "lucide-react"

const NewsModal = ({ news, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-full p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-zinc-500 hover:text-red-500 pt-4 text-xl cursor-pointer"
        >
          <X strokeWidth={1.25} />
        </button>
        <h2 className="text-xl font-bold mb-2">{news.title}</h2>
        <p className="text-sm text-zinc-600 mb-4">{news.date.day} {news.date.month}</p>
        <p className="text-zinc-700">{news.details}</p>
      </div>
    </div>
  )
}

export default NewsModal
