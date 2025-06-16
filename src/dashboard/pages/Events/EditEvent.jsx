const EditEvent = () => {
  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow mx-4 mt-4 rounded-md">
        <p className="font-semibold text-lg text-blue-600">Edit Event</p>
        <p className="text-sm text-zinc-800/90 flex items-center">Event <HiMiniSlash className="text-base" /> <span className="text-blue-500 ">Add Event</span></p>
      </div>
      <div className="px-5 py-8">
        <div className="bg-white rounded-lg">
          <EventForm />
        </div>
      </div>
    </div>
  )
}
export default EditEvent