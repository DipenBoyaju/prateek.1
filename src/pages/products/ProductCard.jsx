import { Grab, Hand, MoveUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = () => {
  const sentence = "Text of the Detected Sign language is shown here";
  const words = sentence.split(" ");
  const [visibleWords, setVisibleWords] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev < words.length) {
          return prev + 1;
        } else {
          // Restart after short delay
          setTimeout(() => setVisibleWords(0), 1000);
          return prev;
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, [visibleWords]);

  return (
    <Link to="/signlanguageplatform" className="w-full h-[500px] p-2 rounded-xl shadow-lg relative z-20 overflow-hidden">
      <div className="absolute size-50 bg-green-200  -z-10 inset-0 rounded-rb-full"></div>
      <div className="absolute size-50 bg-pink-300  -z-10 right-0 bottom-0 rounded-lt-full"></div>
      <div className="h-full border border-black/20 hover:border-black/50 cursor-pointer transition-colors ease-in-out duration-500 rounded-lg p-6 flex flex-col group backdrop-blur-2xl">
        <div className="">
          <h3 className="text-2xl font-geist tracking-wider font-semibold text-zinc-800">Nepali Sign Language Translation Platform</h3>
        </div>
        <div className="grid grid-cols-5 h-[150px] border-t border-black/20 mt-20 border-b">
          <div className="border-r col-span-3 border-black/20 py-3 pr-3">
            <div className="bg-darkBlack w-full h-full flex justify-center items-center gap-5">
              <Hand className="text-white animate-bounce" strokeWidth={1.5} size={60} />
              <Grab className="text-white animate-bounce" strokeWidth={1.5} size={60} />
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-darkBlack w-full h-full">
              <h1 className="text-white/60 text-xs font-light p-2 font-geist leading-5 tracking-wider">
                {words.slice(0, visibleWords).join(" ")}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto border-t border-zinc-800/10 pt-4">
          <p className="font-geist font-semibold text-lg text-cyan-400">Try Our Demo</p>
          <button onClick={() => nav(`/signlanguageplatform`)} className="bg-zinc-100 p-3 rounded-full duration-300 transition-all ease-linear hover:rotate-45 text-cyan-400 hover:bg-cyan-400 hover:text-white"><MoveUpRight /></button>
        </div>
      </div>
    </Link>
  )
}
export default ProductCard