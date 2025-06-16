const NewsLetter = () => {
  return (
    <div className="pt-6 md:pt-12 pb-10 md:pb-20 px-4 md:px-0 bg-[#f9f7f6]">
      <div className="container mx-auto text-center">
        <div className="w-full md:w-fit mx-auto p-10 md:px-20">
          <p className="text-[12px] uppercase tracking-wider text-cyan-300">Stay Updated</p>
          <h2 className=" text-3xl md:text-5xl text-zinc-800 font-quicksand font-bold tracking-wider mt-2">Subscribe to our Newsletter!</h2>
          <div className="bg-zinc-200 w-fit mx-auto mt-8 rounded-full">
            <form action="" className="p-2 md:p-3 gap-2 flex items-center ">
              <input type="email" className="w-full md:w-[40vw] h-[40px] md:h-[50px] rounded-full focus:outline-none pl-4 font-ubuntu text-lightGray text-base md:text-xl" placeholder="Enter your mail..." required />
              <button className="bg-cyan-300 text-primary text-xs md:text-base font-geist py-3 md:py-4 px-6 md:px-8 rounded-full hover:bg-cyan-400 cursor-pointer transition-colors ease-in-out duration-300">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewsLetter