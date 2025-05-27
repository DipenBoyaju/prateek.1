import { Quote, Star } from "lucide-react";

const items = [
  { id: 1, title: "Impact Over Hype", description: "We build AI to solve real problems, not chase trends.", bgcolor: "bg-purple-400", bordercolor: "border-purple-400" },
  { id: 2, title: "Built With, Not For", description: "We co-create with the disabled and elderly communities. Their voices guide our design.", bgcolor: "bg-yellow-400", bordercolor: "border-yellow-400" },
  { id: 3, title: "Openness & Collaboration", description: "We share our research, code, and learnings. Progress accelerates when it's shared.", bgcolor: "bg-cyan-400", bordercolor: "border-cyan-400" },
  { id: 4, title: "Ethics by Default", description: "Privacy, transparency, fairness, and consent are not optional they’re core features.", bgcolor: "bg-blue-400", bordercolor: "border-blue-400" },
  { id: 5, title: " Learning Culture", description: "We are students of science, society, and humanity. Every failure is fuel for growth.", bgcolor: "bg-emerald-400", bordercolor: "border-emerald-400" },
  { id: 6, title: "Think Global, Act Local", description: "We start with low resource communities like in Nepal but we dream of global impact.", bgcolor: "bg-orange-400", bordercolor: "border-orange-400" },
];

const CoreValues = () => {
  return (
    <div className="bg-[#f6f9f6] py-10 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-quicksand font-bold text-cyan-300 uppercase tracking-wider">
            Core Values
          </h2>

          <p className="mt-2 text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            What drives us forward — our foundational principles and commitments.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              className={`bg-white rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out  border-b-4 border ${item.bordercolor}`}
              key={index}
            >
              <div className={`size-10 rounded-md ${item.bgcolor} mb-5 text-white items-center flex justify-center font-semibold tracking-wide text-lg`}> <Quote /></div>
              <h4 className="font-quicksand font-semibold text-xl text-zinc-800 uppercase mb-2 tracking-wide">
                {item.title}
              </h4>
              <p className="font-light text-gray-600 leading-relaxed pt-2">
                {item.description}
              </p>
            </div>

          ))}
        </div>
      </div>
    </div>
  )
}
export default CoreValues