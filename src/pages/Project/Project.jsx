import { useNavigate } from "react-router-dom"
import NewsLetter from "../../components/NewsLetter"
import Title from "../../components/Title"
import { useEffect, useState } from "react"

const Project = () => {
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
    <div>
      <Title tag="Project" title="Our Projects" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        <div className="grid md:grid-cols-10 gap-10">
          <div className="md:col-span-4 flex flex-col">
            <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-zinc-800">Nepali Sign Language Detection</h2>
            <p className="text-lightGray pt-6">Use AI-powered sign language detection to translate Nepali sign gestures in real-time.</p>
            <button className="uppercase border-2 rounded-full py-3 md:py-5 px-6 md:px-10 cursor-pointer hover:shadow-2xl border-cyan-300 text-sm font-quicksand font-semibold text-zinc-700 hover:bg-cyan-300  transition-all duration-500 ease-in-out hover:text-primary hover:pb-4 hover:px-9 w-fit mt-5 md:mt-auto" onClick={() => nav('/signlanguage')}>Try Our Demo</button>
          </div>
          <div className="md:col-span-6 w-full border-2 border-zinc-400 rounded-md overflow-hidden">
            <div className="grid grid-cols-3">
              <div className="w-full col-span-2 bg-zinc-800 h-[60vh]">
                <video src="/videos/sign.mp4" autoPlay loop muted className="w-full h-full object-right object-cover" />
              </div>
              <div className="col-span-1 bg-zinc-800 h-full p-4">
                <span className="bg-white p-1 leading-8">{words.slice(0, visibleWords).join(" ")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}
export default Project