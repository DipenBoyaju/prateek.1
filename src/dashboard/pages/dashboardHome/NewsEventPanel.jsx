import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';

const fetchEvents = async () => {
  const res = await axios.get(`${baseUrl}/api/events/getAllEvents`);
  return res.data.map(item => ({
    ...item,
    type: 'Event',
    createdAt: item.startDate,
  }));
};

const fetchNews = async () => {
  const res = await axios.get(`${baseUrl}/api/news/getAllNews`);
  return res.data.map(item => ({
    ...item,
    type: 'News',
    createdAt: item.createdAt,
  }));
};

const NewsEventsPanel = () => {
  const { data: events = [], isLoading: loadingEvents } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const { data: news = [], isLoading: loadingNews } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  });

  const combined = [...events, ...news].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="col-span-3 lg:col-span-1 bg-white shadow-md rounded-2xl pb-5">
      <h3 className="text-xl font-semibold text-blue-600 mb-5 px-6 pt-6">News & Events</h3>
      <ul className="space-y-4 text-sm text-gray-800 max-h-[60vh] overflow-auto px-6">
        {
          loadingEvents || loadingNews ? (
            <li className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow transition space-y-3">
              <div className='w-full bg-zinc-400 h-3 rounded-full animate-pulse'></div>
              <div className="flex justify-between items-center">
                <div className="w-[6vw] bg-zinc-300 h-2 rounded-full animate-pulse"></div>
                <div className="w-[5vw] bg-blue-200 h-2 rounded-full animate-pulse"></div>
              </div>
            </li>
          ) : combined?.slice(0, 5).map((item, i) => (
            <li
              key={i}
              className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow transition"
            >
              <p className="font-medium leading-snug">{item.type === 'Event' ? '📢' : '📰'} {item.title}</p>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full font-semibold ${item.type === 'Event'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                    }`}
                >
                  {item.type}
                </span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default NewsEventsPanel;
