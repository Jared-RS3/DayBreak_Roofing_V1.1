"use client";

import { motion } from "motion/react";

import { Testimonial } from "@/components/ui/design-testimonial";

export default function PortfolioTestimonials() {
  return (
    <section className="bg-background my-20 relative" id="portfolio-section">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[680px] mx-auto"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center">
            Case Studies
          </h2>
        </motion.div>

        <Testimonial />
      </div>
    </section>
  );
}
