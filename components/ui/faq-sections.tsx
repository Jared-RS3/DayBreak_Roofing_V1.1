import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "How to use this component?",
    answer:
      "Start with a strategy call so we can map your service areas, offers, and conversion path before we build.",
  },
  {
    question: "Are there any other components available?",
    answer:
      "Yes. We can include additional sections such as financing, warranty details, project gallery, and trust badges.",
  },
  {
    question: "Are components responsive?",
    answer:
      "Yes, every layout is optimized to perform cleanly on mobile, tablet, and desktop devices.",
  },
  {
    question: "Can I customize the components?",
    answer:
      "Absolutely. Copy, imagery, structure, and CTA flow can all be tailored to your roofing brand and growth goals.",
  },
];

const App = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            FAQ&apos;s
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
            Looking for
            <span className="block text-orange-500">answers?</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            We keep every project clear from day one. These are the most common
            questions roofing owners ask before we begin.
          </p>

          <a
            href="#"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-slate-900 py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-[0.08em] text-white"
          >
            Book A Strategy Call
            <span className="grid h-11 w-11 place-content-center rounded-full bg-orange-500 text-lg">
              ↗
            </span>
          </a>
        </div>

        <div className="border-t border-slate-300">
          {faqs.map((faq, index) => (
            <div
              className="border-b border-slate-300"
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="grid cursor-pointer grid-cols-[52px_minmax(0,1fr)_24px] items-center gap-4 py-6">
                <span className="grid h-12 w-12 place-content-center rounded-full bg-orange-500 text-xl font-semibold text-white">
                  ?
                </span>
                <h3 className="text-2xl font-semibold leading-tight text-slate-800 md:text-4xl">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-slate-500 transition-all duration-300 ease-out",
                    openIndex === index ? "rotate-180" : "rotate-0"
                  )}
                />
              </div>
              <p
                className={cn(
                  "max-w-2xl overflow-hidden pl-[68px] text-base leading-8 text-slate-600 transition-all duration-300 ease-out",
                  openIndex === index
                    ? "max-h-44 pb-6 opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
