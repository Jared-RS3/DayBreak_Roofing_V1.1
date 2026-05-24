"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export type TestimonialCardItem = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

type TestimonialProps = {
  items: TestimonialCardItem[];
  className?: string;
};

function StarsRow() {
  return (
    <div className="flex justify-center pt-4" aria-label="5 star rating">
      <div className="flex gap-0.5 text-[#FF532E]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialCards({ items, className }: TestimonialProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-6 pt-14", className)}>
      {items.map((item) => (
        <article
          key={item.name}
          className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5"
        >
          <div className="flex flex-col items-center px-5 py-4 relative">
            <img
              className="h-24 w-24 absolute -top-14 rounded-full object-cover"
              src={item.image}
              alt={item.name}
              loading="lazy"
            />
            <div className="pt-8 text-center">
              <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
              <p className="text-gray-800/80">{item.role}</p>
            </div>
          </div>
          <p className="text-gray-500 px-6 text-center">{item.quote}</p>
          <StarsRow />
        </article>
      ))}
    </div>
  );
}
