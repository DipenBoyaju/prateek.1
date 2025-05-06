import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const FeaturedProject = () => {
  const nav = useNavigate()
  const sentence = "What do you like to do";
  const words = sentence.split(" ");
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev < words.length) {
          return prev + 1;
        } else {
          // Restart after short delay
          setTimeout(() => setVisibleWords(0), 1500);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visibleWords]);

  return (
    <div className="py-10 md:py-20 relative overflow-hidden">
      <img src="/bg.png" alt="" className="absolute left-0 top-0 opacity-25 h-full w-full object-cover" />
      <div className="container mx-auto px-4 md:px-8 relative ">
        <div className="grid md:grid-cols-10 gap-10">
          <div className="md:col-span-4">
            <div className="relative z-20 flex flex-col h-full">
              <p className="text-cyan-300 font-quicksand font-bold text-lg">What We Did</p>
              <h3 className="font-quicksand font-bold tracking-wide uppercase text-3xl  md:text-4xl pt-7">Featured Projects</h3>
              <p className="pt-3 text-zinc-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, praesentium voluptatibus fugit, soluta nemo minima quod natus quo nostrum ullam impedit sunt vitae, repudiandae quibusdam.</p>
              <button className="uppercase border-2 rounded-full py-3 md:py-5 px-6 md:px-10 cursor-pointer hover:shadow-2xl border-cyan-300 text-sm font-quicksand font-semibold text-zinc-700 hover:bg-cyan-300  transition-all duration-500 ease-in-out hover:text-primary hover:pb-4 hover:px-9 w-fit mt-5 md:mt-auto" onClick={() => nav('/project')}>View Projects</button>
            </div>
          </div>
          <div className="md:col-span-6 p-4 bg-secondary rounded-md">
            <div className="">
              <h4 className="font-semibold text-xl text-white">Sign Language Detection</h4>
              <p className="text-primary pt-2">AI-powered sign language detection to translate Nepali sign gestures in real-time.</p>
            </div>
            <div className="grid grid-cols-3 pt-5">
              <div className="w-full col-span-2 bg-zinc-50 h-full">
                <video src="/videos/sign.mp4" autoPlay loop muted className="w-full h-full object-right object-cover" />
              </div>
              <div className="col-span-1 bg-zinc-800 h-full p-4">
                <span className="bg-white p-1 md:leading-8 text-xs md:text-base">{words.slice(0, visibleWords).join(" ")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FeaturedProject