import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

const statusClass = {
  upcoming: 'bg-blue-300 text-white',
  ongoing: 'bg-green-400 text-white',
  completed: 'bg-orange-400 text-white',
}

const getStatus = (startDate, endDate) => {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (now < start) return 'upcoming'
  if (now >= start && now <= end) return 'ongoing'
  return 'completed'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatTime = (timeString) => {
  const date = new Date(`1970-01-01T${timeString}:00`) // Convert time to Date object
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

const EventList = ({ event }) => {
  const nav = useNavigate()
  const status = getStatus(event.startDate, event.endDate)

  return (
    <tr onClick={() => nav(`/dashboard/events/${event?.slug}`)} className="hover:bg-zinc-50 transition duration-150 cursor-pointer">
      <td className={`px-6 py-4 font-semibold border-l-4 ${event?.publish ? 'border-emerald-400' : 'border-zinc-500'}`}>{event?.title}
      </td>
      <td className="px-6 py-4">{event?.location}</td>
      <td className="px-6 py-4">{formatDate(event?.startDate)}</td>
      <td className="px-6 py-4">{event?.endDate ? formatDate(event?.endDate) : (<p className='text-center'>-</p>)}</td>
      <td className="px-6 py-4">{formatTime(event?.time)}</td>
      <td className="px-6 py-4">
        <span
          className={clsx(
            'text-xs font-semibold px-2 py-1 rounded-full capitalize',
            statusClass[status]
          )}
        >
          {status}
        </span>
      </td>
    </tr>
  )
}

export default EventList
