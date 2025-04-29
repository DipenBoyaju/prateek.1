import NewsLetter from "../../components/NewsLetter"
import Title from "../../components/Title"

const Project = () => {
  return (
    <div>
      <Title tag="Project" title="Our Projects" />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid md:grid-cols-10 gap-10">
          <div className="md:col-span-4 flex flex-col">
            <h2 className="font-quicksand font-bold text-4xl text-zinc-800">Nepali Sign Language Detection</h2>
            <p className="text-lightGray pt-6">Use AI-powered sign language detection to translate Nepali sign gestures in real-time.</p>
            <button className="uppercase border-2 rounded-full py-5 px-10 cursor-pointer hover:shadow-2xl border-cyan-300 text-sm font-quicksand font-semibold text-zinc-700 hover:bg-cyan-300  transition-all duration-500 ease-in-out hover:text-primary hover:pb-4 hover:px-9 w-fit mt-auto">Try Our Demo</button>
          </div>
          <div className="md:col-span-6 w-full border-2 border-zinc-400 rounded-md overflow-hidden">
            <div className="grid grid-cols-3">
              <div className="w-full col-span-2 bg-zinc-300 h-[60vh] p-4">sdfg</div>
              <div className="col-span-1 bg-zinc-200 h-full p-4">sdfg</div>
            </div>
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}
export default Project