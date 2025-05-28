import Title from "../../components/Title"
import ResearchCard from "./ResearchCard"
import axios from "axios"
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from "../../utils/baseUrl";

const fetchResearchData = async () => {
  const res = await axios(`${baseUrl}/api/allResearch`);
  return res.data
}

const Research = () => {
  const { data } = useQuery({
    queryKey: ['research'],
    queryFn: fetchResearchData,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div>
      <Title tag="Research" title="Research Wing" />
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 py-20">
          {
            data?.map((item, index) => (
              <ResearchCard item={item} index={index} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default Research