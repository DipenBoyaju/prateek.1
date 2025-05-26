import Title from "../../components/Title"

const ProjectDetails = () => {
  return (
    <div>
      <Title tag="Project" title="Inclusive Real time Sign Language Translation Platform" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        <div className="border-b pb-8 border-zinc-800/20">
          <h2 className="text-2xl font-bold font-quicksand">Objective</h2>
          <p className="font-poppins pt-5 text-zinc-800/90 text-lg font-light">Our Sign Language project bridges the communication gap between hearing and non-hearing communities through AI-powered real-time translation. We have started with Nepali Sign Language gradually aiming to connect with other versions. By converting Nepali Sign Language to speech and vice versa, the platform enables seamless interaction across web, mobile, and wearable devices like smart glasses. Designed in close collaboration with the Deaf community, it combines gesture recognition, speech processing, and emotion-aware avatars to ensure natural, accessible, and inclusive communication for all.
          </p>
        </div>
        <div className="grid grid-cols-6 mt-10 gap-8">
          <div className="col-span-4 shadow rounded-xl overflow-hidden border border-zinc-800/20">
            <img src="/images/signlanguage.png" alt="" />
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-semibold text-purple-500">Word Based Nepali Sign Language Dataset</h3>
            <p className="font-light mt-3">We created a first word based Nepali Sign Language Dataset that consisted of 4 words: Namaste (Hello), Dhanyabaad (Thank you), Ghar (House) and Ma (me), each word consisting of 5000 unique signed images. </p>
          </div>
        </div>


      </div>
    </div>
  )
}
export default ProjectDetails