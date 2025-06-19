import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarRange, Clock } from "lucide-react";
import { useMemo } from "react";

const getNewsBySlug = async ({ queryKey }) => {
  // React Query passes queryKey as ['news', slug]
  const [, slug] = queryKey;
  const res = await axios.get(`${baseUrl}/api/news/getNewsBySlug/${slug}`);
  return res.data;
};

const DasNewsDetail = () => {
  const { slug } = useParams();
  const nav = useNavigate()

  const { data: news, isLoading, error } = useQuery({
    queryKey: ["news", slug],
    queryFn: getNewsBySlug,
    enabled: !!slug,
    // You can set staleTime here if you want to control caching
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const createdAtDate = useMemo(() => {
    if (!news) return null;
    return new Date(news.updatedAt || news.createdAt);
  }, [news]);

  const formattedDate = useMemo(() => {
    if (!createdAtDate) return "";
    return createdAtDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [createdAtDate]);

  const formattedTime = useMemo(() => {
    if (!createdAtDate) return "";
    return createdAtDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }, [createdAtDate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load news</div>;
  if (!news) return <div>No news found.</div>;

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <button className="text-sm bg-blue-500 text-white flex items-center gap-1 py-1 px-2 rounded-sm cursor-pointer" onClick={() => nav(-1)}><ArrowLeft size={14} />Back</button>
      </div>
      <div className="bg-white p-6 rounded-lg h-full max-w-4xl mx-auto mt-5">
        <div className="border-b border-zinc-800/20 pb-3">
          <h1 className="text-2xl font-bold text-zinc-800">{news.title}</h1>
          <div className="flex gap-10 items-center mt-3 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <CalendarRange size={16} className="text-blue-600" />
              {formattedDate}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-600" />
              {formattedTime}
            </div>
          </div>
        </div>
        <p className="mt-5 text-zinc-700 whitespace-pre-line">{news.description}</p>
      </div>
    </div>
  );
};

export default DasNewsDetail;
