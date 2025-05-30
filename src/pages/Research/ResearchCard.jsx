import { Link, useNavigate } from 'react-router-dom'
import { MoveUpRight } from 'lucide-react'
import { slugify } from '../../utils/slugify'

const ResearchCard = ({ item, index }) => {
  const slug = slugify(item.title)
  const nav = useNavigate();
  return (
    <Link to={`/division/${slug}`} className="shadow p-5 rounded-lg hover:shadow-lg transition-shadow duration-300 flex flex-col gap-3 border-b-8 border-2 border-cyan-400">

      <span className="border border-cyan-500 rounded-full text-2xl px-5 py-1 text-white tracking-widest w-fit font-semibold bg-cyan-400">
        0{index + 1}
      </span>

      <div className="pb-5 mt-5">
        <h2 className="text-2xl font-quicksand font-bold">{item.title}</h2>
      </div>

      <div className="flex items-center justify-between mt-auto border-t border-zinc-800/10 pt-4">
        <button onClick={() => nav(`/division/${slug}`)} className="bg-zinc-100 p-3 rounded-full duration-300 transition-all ease-linear hover:rotate-45 text-cyan-400 hover:bg-cyan-400 hover:text-white ml-auto cursor-pointer"><MoveUpRight /></button>
      </div>
    </Link>
  )
}

export default ResearchCard
