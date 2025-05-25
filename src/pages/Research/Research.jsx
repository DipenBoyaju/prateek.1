import NewsLetter from "../../components/NewsLetter"
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
  });

  const colors = [
    'purple-400',
    'green-400',
    'red-400',
    'blue-400',
    'yellow-400',
    'pink-500',
  ];

  return (
    <div>
      <Title tag="Research" title="Research Wing" />
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 py-20">
          {
            data?.map((item, index) => (
              <ResearchCard item={item} index={index} color={colors[index]} />
            ))
          }
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}
export default Research