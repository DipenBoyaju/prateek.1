import { useNavigate } from "react-router-dom"

const AboutUs = () => {
  const nav = useNavigate()
  return (
    <div className="bg-[#f9f7f6] py-10 md:py-20 relative overflow-hidden">
      <img src="/images/shapes/shape.png" alt="" className="absolute bottom-30 right-0 rotate-180" />
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="grid md:grid-cols-11 gap-10">
          <div className="md:col-span-4">
            <p className="text-cyan-300 font-quicksand font-bold text-lg">About Us</p>
            <h3 className="font-quicksand font-bold tracking-wide uppercase text-2xl md:text-4xl pt-7">Empowering Communities with Inclusive and Ethical AI Solutions</h3>
          </div>
          <div className="md:col-span-7">
            <span className="font-semibold text-[#515266] text-lg">Prateek is an AI R&D hub dedicated to empowering differently abled and underserved communities through inclusive, innovative and ethical AI solutions.</span>
            <p className="text-zinc-500 pt-4 leading-8 font-light"> With a focus on accessibility, inclusion, and real-world impact, we conduct deep interdisciplinary research and engineering in areas like sign language translation, cognitive support, and AI companionship, among many. Rooted in Nepal, we aim to create technologies that are accessible, affordable, and built with empathy, ensuring that every person, regardless of ability, has the tools to live with dignity and independence.</p>
            <button className="uppercase rounded-full py-3 md:py-5 px-6 md:px-10 cursor-pointer hover:shadow-xl text-white font-quicksand font-semibold md:text-white hover:bg-cyan-300  transition-all duration-500 ease-in-out hover:text-primary hover:px-9 mt-5 md:mt-10 bg-cyan-300" onClick={() => nav('/about')}>More About</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutUs