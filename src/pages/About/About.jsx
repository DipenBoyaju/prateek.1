import { useNavigate } from "react-router-dom"
import NewsLetter from "../../components/NewsLetter"
import Title from "../../components/Title"
import aboutList from "../../constants/aboutList"
import AboutCard from "./AboutCard"

const About = () => {
  const nav = useNavigate()
  return (
    <div className="">
      <Title tag="About" title="About Us" />
      <div className="relative py-10 md:py-20 overflow-hidden">
        <img src="/shape.png" alt="" className="absolute bottom-0 left-0 opacity-50" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative">
              <p className="text-lg text-justify tracking-wide"><span className="font-bold text-base md:text-xl text-cyan-400 ">Prateek AI</span> is an AI R&D hub dedicated to empowering differently abled and underserved communities through inclusive, innovative and ethical AI solutions. With a focus on accessibility, inclusion, and real-world impact, we conduct deep interdisciplinary research and engineering in areas like sign language translation, cognitive support, and AI companionship, among many. Rooted in Nepal, we aim to create technologies that are accessible, affordable, and built with empathy, ensuring that every person, regardless of ability, has the tools to live with dignity and independence.</p>
              <button className="uppercase border-2 rounded-full py-3 md:py-5 px-6 md:px-10 cursor-pointer hover:shadow-2xl border-cyan-300 text-sm font-quicksand font-semibold md:text-zinc-700 hover:bg-cyan-300  transition-all duration-500 ease-in-out hover:text-primary hover:pb-4 hover:px-9 mt-5 md:mt-10 bg-cyan-300 md:bg-transparent text-white" onClick={() => nav('/research')}>Our Research</button>
            </div>
            <div className="w-full h-[60vh] overflow-hidden bg-cyan-500 rounded-md">
              <img src="/flow-bg.webp" alt="" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f9f7f6] py-10 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto w-full h-full flex justify-center items-center ">
            <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Fzxre3r_-ys"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8">

        <div className="grid md:grid-cols-9 py-10 md:py-20 gap-10">
          <div className="col-span-4">
            <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-zinc-800">Mission</h2>
            <p className="font-semibold text-2xl pt-2 text-cyan-400">To create a future where inclusion is designed, and accessibility is the norm not the exception.</p>
            <p className="pt-3 font-semibold text-zinc-700">We aim for a world where inclusion is intentional, and accessibility is standard—where every human, regardless of ability, is considered by default in how we build our technologies and societies.</p>
          </div>
          <div className="md:col-span-1 md:block hidden">
            <div className="border-8 bg-zinc-900 border-zinc-800 h-full w-full rounded-full relative">
              <div className=" flex justify-center items-center h-full">
                <img src="/images/prateek.png" className="w-20 h-20 object-cover rounded-full" alt="Prateek" />
                {/* <h2 className="font-quicksand font-bold text-5xl text-[#1796AE]">Prateek</h2> */}
              </div>
            </div>


          </div>
          <div className="col-span-4">
            <h3 className="font-quicksand font-bold text-3xl md:text-4xl text-zinc-800">Vision</h3>
            <p className="text-2xl md:text-3xl font-semibold text-cyan-400 tracking-wide leading-10 pt-3 bg-zinc-900 border-cyan-600 border-4 rounded-md rounded-br-[120px] p-4 mt-4 shadow-2xl">To become a global AI R&D hub focused on empowering differently abled and underserved communities through deep research, thoughtful engineering, and real-world innovation.</p>
          </div>
        </div>
      </div>
      <div className="bg-[#f9f7f6]">
        <div className="container mx-auto px-4 md:px-8 py-20">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {
              aboutList.map((item) => (
                <AboutCard item={item} key={item.id} />
              ))
            }
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}
export default About