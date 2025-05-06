import NewsLetter from "../../components/NewsLetter"
import Title from "../../components/Title"
import EventCards from "./EventCards"

const Events = () => {
  return (
    <div>
      <Title tag="Events" title="Latest Events" />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-3 gap-x-6 gap-y-10">
          <EventCards />
          <EventCards />
          <EventCards />
          <EventCards />
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}
export default Events