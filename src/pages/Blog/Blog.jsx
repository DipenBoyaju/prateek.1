import BlogNewsCard from "../../components/BlogNewsCard"
import NoContent from "../../components/NoContent"
import Title from "../../components/Title"

const Blog = () => {
  return (
    <div>
      <Title tag="Blog" title="Latest Blogs" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        <NoContent title="Blog Posts Coming Soon" sub="Our blog is getting ready! Fresh articles and insights will be published soon." />

        {/* <div className="flex gap-1">
          <span className="bg-cyan-300 text-white border border-cyan-300 rounded-full text-sm p-1 px-3 font-semibold">All</span>
          <span className="bg-white border border-zinc-500 rounded-full text-sm p-1 px-3 text-zinc-800">Intelligence</span>
          <span className="bg-white border border-zinc-500 rounded-full text-sm p-1 px-3 text-zinc-800">Technology</span>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 py-6">
          <BlogNewsCard />
          <BlogNewsCard />
          <BlogNewsCard />
        </div> */}
      </div>
    </div>
  )
}
export default Blog