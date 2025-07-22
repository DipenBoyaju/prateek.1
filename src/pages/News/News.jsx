import { useState } from "react"
import NewsLetter from "../../components/NewsLetter"
import Title from "../../components/Title"
import NewsCard from "./NewsCard"
import NewsModal from "./NewsModal"
import NoContent from "../../components/NoContent"
import axios from "axios"
import { baseUrl } from "../../utils/baseUrl"
import { useQuery } from "@tanstack/react-query"
import { Mosaic } from "react-loading-indicators"

const getAllNews = async () => {
  const res = await axios.get(`${baseUrl}/api/news/getAllNews`);
  return res.data;
};

const News = () => {
  const [selectedNews, setSelectedNews] = useState(null)

  const { data, isLoading } = useQuery({
    queryFn: getAllNews,
    queryKey: ['event'],
  })

  const news = Array.isArray(data) ? data : [];

  const publishedNews = news.filter((e) => e.publish) || [];

  const handleCardClick = (newsItem) => {
    setSelectedNews(newsItem)
  }

  const closeModal = () => {
    setSelectedNews(null)
  }

  return (
    <div>
      <Title tag="News" title="News and Updates" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        {
          isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Mosaic color="#0096FF" size="medium" text="" textColor="" />
            </div>
          ) : publishedNews.length > 0 ? (
            <>
              {
                publishedNews.map((newsItem) => (
                  <NewsCard key={newsItem._id} news={newsItem} onClick={() => handleCardClick(newsItem)} />
                ))
              }
            </>
          ) : (
            <NoContent title="Updates on the Way" sub="We’re gathering the latest updates. Check back soon for exciting announcements and stories." />
          )
        }
      </div>
      {selectedNews && <NewsModal news={selectedNews} onClose={closeModal} />}
    </div>
  )
}
export default News