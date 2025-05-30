import { Quote } from "lucide-react";
import coreValue from "../../utils/coreValues";

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
          {coreValue?.map((item, index) => (
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