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
      "To use this component, you need to import it in your project and use it in your JSX code. Here's an example of how to use it:",
  },
  {
    question: "Are there any other components available?",
    answer:
      "Yes, there are many other components available in this library. You can find them in the 'Components' section of the website.",
  },
  {
    question: "Are components responsive?",
    answer:
      "Yes, all components are responsive and can be used on different screen sizes.",
  },
  {
    question: "Can I customize the components?",
    answer:
      "Yes, you can customize the components by passing props to them. You can find more information about customizing components in the 'Customization' section of the website.",
  },
];

const App = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-0">
      <img
        className="max-w-sm w-full rounded-xl h-auto"
        src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
        alt="FAQ visual"
      />
      <div>
        <p className="text-indigo-600 text-sm font-medium">FAQ&apos;s</p>
        <h1 className="text-3xl font-semibold">Looking for answer?</h1>
        <p className="text-sm text-slate-500 mt-2 pb-4">
          Ship Beautiful Frontends Without the Overhead - Customizable, Scalable
          and Developer-Friendly UI Components.
        </p>
        {faqs.map((faq, index) => (
          <div
            className="border-b border-slate-200 py-4 cursor-pointer"
            key={index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">{faq.question}</h3>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-all duration-500 ease-in-out",
                  openIndex === index ? "rotate-180" : "rotate-0"
                )}
              />
            </div>
            <p
              className={cn(
                "text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md",
                openIndex === index
                  ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                  : "opacity-0 max-h-0 -translate-y-2"
              )}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
