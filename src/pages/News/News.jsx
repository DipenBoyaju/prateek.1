import NewsLetter from "../../components/NewsLetter"
import Title from "../../components/Title"
import NewsCard from "./NewsCard"

const News = () => {
  return (
    <div>
      <Title tag="News" title="News and Updates" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        <div className="flex flex-col gap-8">
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}
export default News