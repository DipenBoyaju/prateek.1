import BlogNewsCard from "../../components/BlogNewsCard";

const BlogsNews = () => {
  return (
    <section
      aria-labelledby="blogs-heading"
      className="py-20 relative"
    >
      {/* Decorative image with aria-hidden since it’s visual only */}
      <img
        src="/shape2.png"
        alt=""
        aria-hidden="true"
        className="absolute right-0 bottom-0 h-full"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <header className="text-center" role="banner">
          <p className="text-cyan-300 font-quicksand font-bold text-lg">
            Blog
          </p>
          <h2
            id="blogs-heading"
            className="font-quicksand font-bold tracking-wide uppercase text-4xl pt-7"
          >
            Blogs & Updates
          </h2>
        </header>

        <section
          aria-label="Latest blog posts"
          className="grid sm:grid-cols-2 md:grid-cols-3 pt-10 gap-5"
        >
          <BlogNewsCard />
          <BlogNewsCard />
          <BlogNewsCard />
        </section>
      </div>
    </section>
  );
};

export default BlogsNews;
