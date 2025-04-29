import NewsLetter from "../../components/NewsLetter"
import AboutUs from "./AboutUs"
import BlogsNews from "./BlogsNews"
import CoreValues from "./CoreValue"
import EventHome from "./EventHome"
import FAQSection from "./FaqSection"
import FeaturedProject from "./FeaturedProject"
import Hero from "./Hero"
import VideoPlayer from "./VideoPlayer"

const Home = () => {
  return (
    <div>
      <div className="h-screen">
        <Hero />
      </div>
      <AboutUs />
      <CoreValues />
      <VideoPlayer />
      <FeaturedProject />
      <BlogsNews />
      <FAQSection />
      <EventHome />
      <NewsLetter />
    </div>
  )
}
export default Home