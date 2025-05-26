import { useParams } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl.js";
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import Title from "../../components/Title.jsx";

const fetchResearchDetailBySlug = async (slug) => {
  const res = await axios(`${baseUrl}/api/division/slug/${slug}`);
  return res.data;
};


const ResearchDetails = () => {
  const { slug } = useParams()

  const { data } = useQuery({
    queryKey: ['researchDetail', slug],
    queryFn: () => fetchResearchDetailBySlug(slug),
    enabled: !!slug,
  });

  return (
    <div>
      <Title tag="Research Wing" title={data?.title} />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <p className="text-lg">{data?.description}</p>
      </div>
    </div>
  )
}
export default ResearchDetails