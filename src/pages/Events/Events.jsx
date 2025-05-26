import NewsLetter from "../../components/NewsLetter"
import NoContent from "../../components/NoContent"
import Title from "../../components/Title"
import EventCards from "./EventCards"

const Events = () => {
  return (
    <div>
      <Title tag="Events" title="Latest Events" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        <NoContent title="Events Coming Soon" sub="There are no events scheduled right now, but exciting ones are coming soon. Stay tuned!" />
        {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
          <EventCards />
          <EventCards />
          <EventCards />
          <EventCards />
        </div> */}
      </div>
    </div>
  )
}
export default Events