import axios from "axios";
import NoContent from "../../components/NoContent"
import Title from "../../components/Title"
import { baseUrl } from "../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import NewsletterCard from "./NewsletterCard";
import { Mosaic } from "react-loading-indicators";

const fetchNewsletter = async () => {
  const res = await axios.get(`${baseUrl}/api/newsletter/all`);
  return res.data;
}

const Newsletter = () => {
  const { data, isLoading } = useQuery({
    queryFn: fetchNewsletter,
    queryKey: ['newsletter']
  })

  const newsletter = Array.isArray(data) ? data : [];

  const publishedNewsletter = newsletter.filter((e) => e.publish) || [];

  return (
    <div>
      <Title tag="Newsletter" title="Newsletter" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">

        {
          isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Mosaic color="#0096FF" size="medium" text="" textColor="" />
            </div>
          ) : publishedNewsletter?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedNewsletter.map((newsletter) => (
                <NewsletterCard key={newsletter._id} newsletter={newsletter} />
              ))}
            </div>
          ) : (
            <NoContent
              title="Newsletters Coming Soon"
              sub="Our newsletters are on the way! Soon you'll get regular updates, insights, and exclusive content."
            />
          )
        }
        {/* <NoContent title="Newsletters Coming Soon" sub="Our newsletters are on the way! Soon you'll get regular updates, insights, and exclusive content." /> */}
      </div>


    </div>
  )
}
export default Newsletter