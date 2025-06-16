import { useNavigate } from "react-router-dom"
import Title from "../../components/Title"
import aboutList from "../../constants/aboutList"
import AboutCard from "./AboutCard"
import CoreValues from "../Home/CoreValues"

const About = () => {
  const nav = useNavigate()
  return (
    <div className="">
      <Title tag="About" title="About Us" />
      <div className="relative py-10 md:py-20 overflow-hidden">
        <img src="/images/shapes/shape.png" alt="" className="absolute bottom-0 left-0 opacity-50" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="">
            <div className="relative">
              <p className="text-lg text-justify tracking-wide font-light"><span className="font-bold text-base md:text-2xl text-cyan-400">Prateek</span> is an AI R&D hub dedicated to empowering differently abled and underserved communities through inclusive, innovative and ethical AI solutions. With a focus on accessibility, inclusion, and real-world impact, we conduct deep interdisciplinary research and engineering in areas like sign language translation, cognitive support, and AI companionship, among many. Rooted in Nepal, we aim to create technologies that are accessible, affordable, and built with empathy, ensuring that every person, regardless of ability, has the tools to live with dignity and independence.</p>
              <button className="uppercase rounded-full py-3 md:py-5 px-6 md:px-10 cursor-pointer hover:shadow-xl text-white font-quicksand font-semibold md:text-white hover:bg-cyan-300  transition-all duration-500 ease-in-out hover:text-primary hover:px-9 mt-5 md:mt-10 bg-cyan-300" onClick={() => nav('/project')}>Our Projects</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-10 pb-20">

        <h3 className="font-quicksand font-bold text-3xl md:text-4xl text-cyan-400">Vision</h3>
        <p className="p-8 rounded mt-5 uppercase text-2xl font-semibold tracking-wide rounded leading-9 bg-gradient-to-t from-[#37ecba] to-[#72afd3] text-white">To become a global AI R&D hub focused on empowering differently abled and underserved communities through deep research, thoughtful engineering, and real-world innovation.</p>
      </div>

      <div className="bg-[#f9f7f6]">
        <div className="container mx-auto px-4 md:px-8 py-20">
          <div className="">
            <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-cyan-400">Mission</h2>
            <div className="flex flex-col md:flex-row gap-2 md:gap-10 py-5">
              <p className="font-semibold text-2xl pt-2 text-zinc-800 font-poppins uppercase  md:w-5/5">To create a future where inclusion is designed, and accessibility is the norm not the exception.</p>
              <p className="font-normal text-zinc-600 text-base">We aim for a world where inclusion is intentional, and accessibility is standard—where every human, regardless of ability, is considered by default in how we build our technologies and societies.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {
              aboutList?.map((item) => (
                <AboutCard item={item} key={item?.id} />
              ))
            }
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


      <CoreValues />
    </div>
  )
}
export default About