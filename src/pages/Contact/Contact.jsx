import { MdAlternateEmail, MdSupportAgent } from "react-icons/md"
import Title from "../../components/Title"
import ContactForm from "./ContactForm"
import NewsLetter from "../../components/NewsLetter"

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
                <p className="text-lightGray">Email: prateek@gmail.com</p>
                <p className="text-lightGray pt-5">For help with service or refer to FAQs.</p>
              </div>
              <div className="">
                <div className="bg-cyan-300 p-2 w-fit rounded-lg text-primary">
                  <MdSupportAgent className="size-10" />
                </div>
                <p className="text-lg font-bold font-quicksand text-zinc-800 mt-3">Call Us</p>
                <p className="text-lightGray">Phone: 01-664578</p>
                <p className="text-lightGray">Phone: +977-9875647898</p>
                <p className="text-lightGray">Call us to speak to a member of our team.</p>
              </div>
            </div>
          </div>
          <div className="">
            <ContactForm />
          </div>
        </div>
        <NewsLetter />
      </div>
    </div>
  )
}
export default Contact