const BlogNewsCard = () => {
  return (
    <article
      className="p-5 bg-white rounded-md shadow-lg border border-zinc-800/10"
      aria-labelledby="blog-title"
    >
      {/* Replace this div with <img> when real image is available */}
      <div className="w-full h-[35vh] bg-zinc-400" role="img" aria-label="Blog post cover image placeholder"></div>

      <div className="flex flex-col gap-4">
        <header className="flex justify-between items-center pt-4">
          <p className="font-quicksand font-semibold" aria-label="Author">
            John Doe
          </p>
          <time
            dateTime="2025-04-18"
            className="text-sm text-zinc-500"
            aria-label="Publication date"
          >
            Apr 18, 2025
          </time>
        </header>

        <div className="space-y-3">
          <h3 id="blog-title" className="text-xl font-semibold text-zinc-800">
            AI-Powered Innovation: The Future of Intelligent Solutions
          </h3>
          <p className="text-sm text-zinc-600">
            Explore how artificial intelligence is transforming industries, enhancing efficiency, and driving groundbreaking innovations...
          </p>
        </div>

        <div>
          <a
            href="#"
            className="inline-block rounded-full py-3 px-10 bg-cyan-300 text-sm font-quicksand font-semibold text-white hover:bg-cyan-400 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            aria-label="Read more about why consistent brand identity is key to business success"
          >
            Read More
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogNewsCard;
