import { Facebook, Instagram, Linkedin } from "lucide-react";
import BlogNewsCard from "../../components/BlogNewsCard";

const BlogsNews = () => {
  return (
    <section
      aria-labelledby="blogs-heading"
      className="py-10 md:py-20 relative"
    >
      {/* Decorative image with aria-hidden since it’s visual only */}
      <img
        src="/images/shapes/shape2.png"
        alt=""
        aria-hidden="true"
        className="hidden md:block md:absolute right-0 bottom-0 md:h-full"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <header className="text-center" role="banner">
          <p className="text-cyan-300 font-quicksand font-bold text-lg">
            Blog
          </p>
          <h2
            id="blogs-heading"
            className="font-quicksand font-bold tracking-wide uppercase text-3xl md:text-4xl pt-3 md:pt-7"
          >
            Blogs & Updates
          </h2>
        </header>

        <div className="pt-16 flex flex-col items-center text-center text-zinc-500">
          <div className="text-6xl animate-pulse">✍️</div>
          <p className="text-xl md:text-2xl font-semibold text-zinc-700 mt-4">
            Blog Posts Coming Soon
          </p>
          <p className="text-sm md:text-base text-zinc-500 max-w-md mt-2">
            We're working on some insightful content for you. Stay tuned for updates, stories, and more!
          </p>
          <div className="flex items-center gap-4 mt-4">
            <p className="font-semibold text-cyan-400">Follow for Updates</p>
            <div className="flex items-center gap-2 border-l pl-3">
              <a href="https://www.facebook.com/profile.php?id=100091857246327&_rdr" target="_blank"><Facebook strokeWidth={1.5} size={20} /></a>
              {/* <a href=""><Instagram strokeWidth={1.5} size={20} /></a>
              <a href=""><Linkedin strokeWidth={1.5} size={20} /></a> */}
            </div>
          </div>
        </div>
        {/* <section
          aria-label="Latest blog posts"
          className="grid sm:grid-cols-2 md:grid-cols-3 pt-10 gap-5"
        >
          <BlogNewsCard />
          <BlogNewsCard />
          <BlogNewsCard />
        </section> */}
      </div>
    </section>
  );
};

export default BlogsNews;
