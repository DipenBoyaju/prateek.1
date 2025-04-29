import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 py-3">
        <div className="flex gap-1 items-center">
          <img src="/images/prateek.png" alt="" className="w-10 md:w-12" />
          <img src="/images/logotext.png" alt="" className="w-32 md:w-42" />
        </div>
        <div className="">
          <Navbar isOpen={isOpen} scrolled={scrolled} onLinkClick={() => setIsOpen(false)} />
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="cross"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <RxCross2 size={26} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiOutlineMenuAlt3 size={30} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  )
}
export default Header