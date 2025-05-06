import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = ({ isOpen, scrolled, onLinkClick }) => {
  const handleClick = () => {
    if (window.innerWidth < 768 && onLinkClick) {
      onLinkClick();
    }
  };
  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`hidden md:flex space-x-8 uppercase tracking-wider text-sm items-center ${scrolled ? 'text-gray-800' : 'text-primary'}`}>
        <Link to="/" className="hover:text-cyan-300 transition" >Home</Link>
        <Link to="/about" className=" hover:text-cyan-300 transition">About</Link>
        <Link to="/research" className=" hover:text-cyan-300  transition">Research</Link>
        <Link to="/team" className="hover:text-cyan-300  transition">Team</Link>
        <Link to="/project" className="hover:text-cyan-300  transition">Project</Link>
        <Link to="/contact" className="hover:text-cyan-300  transition">Contact</Link>

        {/* Dropdown */}
        <FlyoutLink href="#" FlyoutContent={UpdatesContent}>
          Updates
        </FlyoutLink>
      </nav>

      {/* Mobile Navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-16 left-0 w-[80vw] h-screen bg-white shadow-md z-40 flex flex-col space-y-6 p-8 md:hidden"
          >
            <Link to="/" className="text-gray-700 hover:text-cyan-300  transition" onClick={handleClick}>Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-cyan-300  transition" onClick={handleClick}>About</Link>
            <Link to="/research" className="text-gray-700 hover:text-cyan-300  transition" onClick={handleClick}>Research</Link>
            <Link to="/team" className="text-gray-700 hover:text-cyan-300  transition" onClick={handleClick}>Team</Link>
            <Link to="/project" className="text-gray-700 hover:text-cyan-300  transition" onClick={handleClick}>Project</Link>
            <Link to="/contact" className="text-gray-700 hover:text-cyan-300 transition" onClick={handleClick}>Contact</Link>
            <Link to="/blog" className="text-gray-700 hover:text-cyan-300  transition" onClick={handleClick}>Blogs</Link>
            <Link to="/events" className="text-gray-700 hover:text-cyan-300  transition" onClick={handleClick}>Events</Link>
            <Link to="/news" className="text-gray-700 hover:text-cyan-300  transition" onClick={handleClick}>
              News
            </Link>
            <Link to="/newsletter" className="text-gray-700 hover:text-cyan-300  transition" onClick={handleClick}>
              NewsLetters
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <div className="flex items-center hover:text-cyan-300 cursor-pointer transition">
        {children}
        <ChevronDown size={20} className="ml-1" />
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </div>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black z-50"
          >
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UpdatesContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-xl rounded-md">
      <div className="space-y-3">
        <Link to="/blog" className="block text-sm text-gray-700 hover:underline">
          Blogs
        </Link>
        <Link to="/events" className="block text-sm text-gray-700 hover:underline">
          Events
        </Link>
        <Link to="/news" className="block text-sm text-gray-700 hover:underline">
          News
        </Link>
        <Link to="/newsletter" className="block text-sm text-gray-700 hover:underline">
          NewsLetters
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
