import BlogNewsCard from "../../components/BlogNewsCard"
import NewsLetter from "../../components/NewsLetter"
import Title from "../../components/Title"

const Blog = () => {
  return (
    <div>
      <Title tag="Blog" title="Latest Blogs" />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
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