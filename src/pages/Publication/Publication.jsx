import axios from "axios";
import NoContent from "../../components/NoContent"
import Title from "../../components/Title"
import PublicationCard from "./PublicationCard"
import { baseUrl } from "../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { Mosaic } from "react-loading-indicators"

const getAllPublications = async () => {
  const res = await axios.get(`${baseUrl}/api/publication/getAllPublication`);
  return res.data.data;
};

const Publication = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllPublications,
    queryKey: ['publication'],
  })

  const publication = Array.isArray(data) ? data : [];

  const publishedPublication = publication.filter((e) => e.publish) || [];

  return (
    <div>
      <Title tag="Publication" title="Our Publications" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        {
          isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Mosaic color="#0096FF" size="medium" text="" textColor="" />
            </div>
          ) : publishedPublication.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {
                publishedPublication.map((publicationitem, idx) => (
                  <PublicationCard key={idx} publicationitem={publicationitem} />
                ))
              }
            </div>
          ) : (
            <NoContent title="Publication on the Way" sub="Exciting research papers are on the way. Stay tuned for new insights and discoveries!" />
          )
        }
      </div>
    </div>
  )
}
export default Publication