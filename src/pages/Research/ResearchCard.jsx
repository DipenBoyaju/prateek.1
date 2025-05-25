import { Link } from 'react-router-dom'
import { MoveUpRight } from 'lucide-react'
import clsx from 'clsx';

const ResearchCard = ({ item, index }) => {
  return (
    <div className="shadow p-5 rounded-lg hover:shadow-lg transition-shadow duration-300 flex flex-col gap-3 border-b-8 border-2 border-purple-400">

      <span className="border border-purple-500 rounded-full text-2xl px-5 py-1 text-white tracking-widest w-fit font-semibold bg-purple-400">
        0{index + 1}
      </span>

      <div className="pb-5 mt-5">
        <h2 className="text-2xl font-quicksand font-bold">{item.title}</h2>
        <p className="pt-4 text-lightGray font-light line-clamp-7">{item.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto border-t border-zinc-800/10 pt-4">
        <p className="font-geist font-semibold text-lg text-purple-500">Explore</p>
        <Link className="bg-zinc-100 p-3 rounded-full duration-300 transition-all ease-linear hover:rotate-45 text-purple-400 hover:bg-purple-400 hover:text-white"><MoveUpRight /></Link>
      </div>
    </div>
  )
}

export default ResearchCard
