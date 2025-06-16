import { MdAlternateEmail, MdSupportAgent } from "react-icons/md"
import Title from "../../components/Title"
import ContactForm from "./ContactForm"
import NewsLetter from "../../components/NewsLetter"
import { Facebook, Instagram, Linkedin, Mail, PhoneCall } from "lucide-react"

const Contact = () => {
  return (
    <div>
      <Title title="We look forward to hearing from you." tag="Contact Us" />
      <div className="container mx-auto ">
        <div className="grid md:grid-cols-2 gap-10 py-10 md:py-20 px-4 md:px-8">
          <div className="">
            <p className=" text-xl md:text-2xl font-light md:w-2/3">Please let us know if you have question, want to lave a comment, or would like further information about prateek.</p>
            <div className="mt-10 space-y-5">
              <div className="w-fit">
                <div className="bg-cyan-300 p-2 w-fit rounded-lg text-primary">
                  <MdAlternateEmail className="size-10" />
                </div>
                <p className="text-lg font-quicksand font-bold text-zinc-800 mt-3">Help Support</p>
                <p className="text-cyan-400 flex items-center gap-2"><Mail strokeWidth={1.5} size={18} /> connect@prateekinnovations.com</p>
                <p className="text-lightGray pt-2">For help with service or refer to FAQs.</p>
              </div>
              <div className="">
                <div className="bg-cyan-300 p-2 w-fit rounded-lg text-primary">
                  <MdSupportAgent className="size-10" />
                </div>
                <p className="text-lg font-bold font-quicksand text-zinc-800 mt-3">Call Us</p>
                <p className="text-cyan-400 flex items-center gap-2"><PhoneCall strokeWidth={1.5} size={18} /> +977 9813376093</p>
                <p className="text-lightGray pt-2">Call us to speak to a member of our team.</p>
              </div>
              <div className="">
                <p className="text-lg font-bold font-quicksand text-zinc-800 mt-3">Social Media</p>
                <div className="flex items-center gap-3 mt-2">
                  <a href="https://www.facebook.com/profile.php?id=100091857246327&_rdr" className="bg-zinc-200 p-2 rounded-sm text-[#1877F2] hover:text-white hover:bg-[#1877F2] transition-colors ease-linear" target="_blank"><Facebook strokeWidth={1.5} size={18} /></a>
                  {/* <a href="" className="bg-zinc-200 p-2 rounded-sm text-[#FD1D1D] hover:text-white hover:bg-[#FD1D1D] transition-colors ease-linear"><Instagram strokeWidth={1.5} size={18} /></a>
                  <a href="" className="bg-zinc-200 p-2 rounded-sm text-[#0077B5] hover:text-white hover:bg-[#0077B5] transition-colors ease-linear"><Linkedin strokeWidth={1.5} size={18} /></a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Contact