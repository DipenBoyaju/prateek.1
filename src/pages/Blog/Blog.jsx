import BlogNewsCard from "../../components/BlogNewsCard"
import NewsLetter from "../../components/NewsLetter"
import Title from "../../components/Title"

const Blog = () => {
  return (
    <div>
      <Title tag="Blog" title="Latest Blogs" />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="flex gap-1">
          <span className="bg-secondary border border-secondary rounded-full text-sm p-1 px-3 font-semibold text-darkBlack">All</span>
          <span className="bg-white border border-zinc-500 rounded-full text-sm p-1 px-3 text-zinc-800">Intelligence</span>
          <span className="bg-white border border-zinc-500 rounded-full text-sm p-1 px-3 text-zinc-800">Technology</span>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 py-6">
          <BlogNewsCard />
          <BlogNewsCard />
          <BlogNewsCard />
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}
export default Blog