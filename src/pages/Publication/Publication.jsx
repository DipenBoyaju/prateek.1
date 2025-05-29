import NoContent from "../../components/NoContent"
import Title from "../../components/Title"
import PublicationCard from "./PublicationCard"

const Publication = () => {
  return (
    <div>
      <Title tag="Publication" title="Our Publications" />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <NoContent title="Coming Soon" sub="" />
        {/* <div className="grid md:grid-cols-2 gap-10">
          <PublicationCard />
          <PublicationCard />
        </div> */}
      </div>
    </div>
  )
}
export default Publication