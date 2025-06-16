import { useEffect, useState } from "react";

const FeaturedProject = () => {
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
      <img src="/images/shapes/bg.png" alt="" className="absolute left-0 top-0 opacity-20 h-full w-full object-cover" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h3 className="font-quicksand font-bold tracking-wide uppercase text-3xl md:text-4xl text-cyan-400">
            Featured Projects
          </h3>
          <p className="text-zinc-600 mt-2 text-base md:text-lg">
            Explore our ongoing research and innovative solutions.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Project Card */}
          <div className="bg-white shadow-lg border border-zinc-200 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 md:col-start-2">
            <h4 className="text-xl font-semibold text-cyan-500 mb-2">Inclusive Real time Sign Language Translation Platform</h4>
            <p className="text-zinc-700 text-sm">
              Use AI-powered sign language detection to translate Nepali sign gestures in real-time.
            </p>
            <a href="/projects/signlanguage" className="inline-block hover:underline bg-zinc-800 text-white text-sm py-2 px-4 rounded-md mt-10">
              Learn More →
            </a>
          </div>

          {/* Repeat Project Cards as needed */}
        </div>
      </div>
    </div>
  )
}
export default FeaturedProject