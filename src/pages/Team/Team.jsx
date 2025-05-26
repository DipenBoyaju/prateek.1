import NewsLetter from "../../components/NewsLetter"
import Title from "../../components/Title"
import TeamCard from "./TeamCard"


const teamList = [
  {
    id: 1,
    name: 'Sarah Brown',
    role: 'Co-Founder',
    image: '/img1.png'
  },
  {
    id: 2,
    name: 'Michael Anderson',
    role: 'Software Engineer',
    image: '/img2.png'
  },
  {
    id: 3,
    name: 'William Foster',
    role: 'Marketing Specialist',
    image: '/img3.png'
  },
  {
    id: 4,
    name: 'Emily Adams',
    role: 'Data Analyst',
    image: '/img4.png'
  }
]

const Team = () => {
  return (
    <div>
      <Title tag="Team" title="Meet Our Team" />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <h2 className="text-center font-quicksand font-semibold text-2xl md:text-3xl md:w-2/3 mx-auto">Meet the talented and passionate team members who drive our company forward every day.</h2>
        <div className="pt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {
            teamList.map((item) => (
              <TeamCard item={item} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default Team