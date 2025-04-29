import BlogNewsCard from "../../components/BlogNewsCard"

const BlogsNews = () => {
  return (
    <div className="py-20 relative">
      <img src="/shape2.png" alt="" className="absolute right-0 bottom-0 h-full" />
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="text-center">
          <p className="text-cyan-300 font-quicksand font-bold text-lg">Blog</p>
          <h3 className="font-quicksand font-bold tracking-wide uppercase text-4xl pt-7">Blogs & Updates</h3>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 pt-10 gap-5">
          <BlogNewsCard />
          <BlogNewsCard />
          <BlogNewsCard />
        </div>
      </div>
    </div>
  )
}
export default BlogsNews