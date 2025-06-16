const NoContent = ({ title, sub }) => {
  return (
    <div>
      <div className="text-center pb-10 text-zinc-600">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p>{sub}</p>
      </div>
      <div className="flex justify-center">
        <img src="/images/commingsoon1.svg" alt="" className="w-lg" />
      </div>
    </div>
  )
}
export default NoContent