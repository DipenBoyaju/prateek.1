import { TiArrowRight } from "react-icons/ti"
import { Link } from "react-router-dom"

const Footer = () => {

  const arrowStyle = 'size-5 -translate-x-3 absolute group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500';

  const linkStyle = 'hover:text-zinc-800 transition-all ease-in-out duration-500 group-hover:translate-x-5';

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className="bg-[#f9f7f6]" style={{ backgroundImage: 'url("./images/shapes/line-bg.png")', backgroundRepeat: 'no-repeat', backgroundPosition: 'top center', }}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="md:grid md:grid-cols-12 border-b border-zinc-300 py-14 md:py-24">
          <div className="col-span-12 md:col-span-7">
            <div className="flex gap-1 py-1 items-center">
              <img src="/images/logo1.png" className="w-32" alt="" />
            </div>
            <p className="text-zinc-600 md:w-2/3 mt-8">Prateek is an AI R&D hub dedicated to empowering differently abled and underserved communities through inclusive, innovative and ethical AI solutions. </p>
          </div>
          <div className="md:col-span-5 mt-8 md:mt-0">
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <h3 className=" text-zinc-800 font-quicksand tracking-wider text-sm uppercase font-bold">Projects</h3>
                <ul className="mt-3 uppercase font-[400] text-zinc-700 text-sm space-y-3">
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/projects/signlanguage'} className={`${linkStyle}`}>Sign Language</Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-2">
                <h3 className=" text-zinc-800 font-quicksand tracking-wider text-sm uppercase font-bold">Company</h3>
                <ul className="mt-3 uppercase font-[400] font-ubuntu text-zinc-700 text-sm space-y-3 grid grid-cols-3">
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/about'} className={`${linkStyle}`}>About Us</Link>
                  </li>
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/division'} className={`${linkStyle}`}>Division</Link>
                  </li>
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/team'} className={`${linkStyle}`}>Team</Link>
                  </li>
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/project'} className={`${linkStyle}`}>Project</Link>
                  </li>
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/blog'} className={`${linkStyle}`}>Blog</Link>
                  </li>
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/contact'} className={`${linkStyle}`}>Contact</Link>
                  </li>
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/events'} className={`${linkStyle}`}>Events</Link>
                  </li>
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/news'} className={`${linkStyle}`}>News</Link>
                  </li>
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/newsletter'} className={`${linkStyle}`}>NewsLetter</Link>
                  </li>
                  <li className="flex gap-1 items-center group">
                    <TiArrowRight className={`${arrowStyle}`} />
                    <Link to={'/gallery'} className={`${linkStyle}`}>Gallery</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 md:py-8 flex flex-col md:flex md:flex-row justify-between items-center">
          <p className="uppercase text-[12px] text-zinc-700 font-ubuntu tracking-wider">© 2025 <span className="text-cyan-300">Prateek Innovations</span>. All rights reserved.</p>
          <p className="text-zinc-700 font-quicksand font-bold text-sm cursor-pointer hover:text-cyan-300 transition-colors ease-in-out duration-300" onClick={scrollTop}>Back to Top</p>
        </div>
      </div>
    </div>
  )
}
export default Footer