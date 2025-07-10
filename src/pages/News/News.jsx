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

const newsList = [
  {
    id: 1,
    date: { day: "21", month: "Jan" },
    title: "AI Breakthroughs: Weekly Roundup of Innovations & Impacts",
    summary: "Stay updated with the latest in artificial intelligence — from groundbreaking research and product launches to policy updates and ethical debates shaping the future of AI.",
    details: "Here’s the full in-depth article about this week’s AI breakthroughs, including OpenAI's latest model update, EU regulations, and accessibility-focused innovations.",
  },
  {
    id: 2,
    date: { day: "15", month: "Feb" },
    title: "Advances in AI-Powered Healthcare: Transforming Patient Care",
    summary: "AI is revolutionizing healthcare with new tools for diagnosis, personalized treatments, and patient management. Discover the latest trends in AI-driven medical innovations.",
    details: "This article explores how AI is being used to enhance medical diagnostics, streamline operations, and improve patient care, with real-world examples of AI applications in healthcare.",
  },
  {
    id: 3,
    date: { day: "10", month: "Mar" },
    title: "Ethical Challenges of Artificial Intelligence: Navigating the Future",
    summary: "As AI becomes more integrated into our daily lives, ethical concerns are on the rise. Learn about the key ethical challenges facing AI development and deployment.",
    details: "From bias and fairness in algorithms to the accountability of AI systems, this article discusses the ongoing challenges in creating ethical AI technologies that benefit all users.",
  },
  {
    id: 4,
    date: { day: "5", month: "Apr" },
    title: "The Future of AI in Education: Personalized Learning at Scale",
    summary: "AI has the potential to revolutionize education by providing personalized learning experiences. This article dives into the ways AI is shaping the future of education.",
    details: "Explore how AI is helping educators customize learning paths for students, making education more accessible and inclusive, and offering new opportunities for both learners and teachers.",
  },
]

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