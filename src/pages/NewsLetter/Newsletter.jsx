import NoContent from "../../components/NoContent"
import Title from "../../components/Title"

const Newsletter = () => {
  return (
    <div>
      <Title tag="Newsletter" title="Newsletter" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        <NoContent title="Newsletters Coming Soon" sub="Our newsletters are on the way! Soon you'll get regular updates, insights, and exclusive content." />
      </div>
    </div>
  )
}
export default Newsletter