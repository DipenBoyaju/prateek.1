import { Plus } from 'lucide-react';
import { useState, useRef } from 'react';
import faqs from '../../utils/faqs';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="md:py-20 py-10 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/shapes/shape.png" alt="" className='' />
      </div>
      <div className="container mx-auto px-4 md:px-4 z-30 relative">
        <div className="grid md:grid-cols-9">
          <div className="col-span-4">
            <h2 className='font-quicksand text-3xl md:text-6xl text-zinc-800 font-bold'>
              Your questions, answered.
            </h2>
          </div>
          <div className="space-y-4 col-span-5 mt-5 md:mt-0">
            {faqs?.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden pb-4 tracking-wider text-zinc-700 border border-zinc-200 shadow-sm rounded-lg"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-4 transition-all flex items-start justify-between cursor-pointer md:text-lg"
                  >
                    <span className="flex-1 text-zinc-800">{faq.question}</span>
                    <Plus
                      className={`transition-transform duration-300 size-6 mt-1 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </button>

                  <div
                    ref={(el) => (contentRefs.current[index] = el)}
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: isOpen
                        ? `${contentRefs.current[index]?.scrollHeight}px`
                        : '0px',
                    }}
                  >
                    <div className="p-4 text-zinc-600 font-light">{faq.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
