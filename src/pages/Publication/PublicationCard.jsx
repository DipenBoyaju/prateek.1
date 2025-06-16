const PublicationCard = () => {
  return (
    <div className="flex items-stretch shadow-md border border-zinc-300 rounded bg-white w-full">
      {/* Left vertical tag */}
      <div className="bg-emerald-500 text-white font-semibold px-4 flex items-center justify-center">
        <p className="text-xl">C1</p>
      </div>

      {/* Right content area */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 font-medium border-b border-zinc-900/20 pb-1 pl-4 pt-4">2023, CHMC</p>
        <p className="text-lg font-semibold text-zinc-800 leading-snug pl-4 py-2">
          Finger Spelling Gesture Recognition For Nepali Sign Language Using Hybrid Classical Quantum Deep Learning Model
        </p>
        <ul className="flex flex-wrap gap-x-4 text-sm font-medium text-gray-600 pl-4 py-3">
          <li>Bhusal.J</li>
          <li>Boyaju.D</li>
          <li>Dhaubhadel.S</li>
          <li>Shakya.N</li>
          <li>Pokhrel.M</li>
        </ul>
        <p className="text-sm pl-4 py-3 bg-emerald-300 text-white">International Conference on Technologies for Computer, Electrical, Electronics & Communication (ICT-CEEL 2023)</p>
      </div>
    </div>
  );
};
export default PublicationCard;
