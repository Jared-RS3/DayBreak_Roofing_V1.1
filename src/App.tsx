import { ArrowRight, ShieldCheck } from "lucide-react";

import PortfolioTestimonials from "@/components/sections/portfolio-testimonials";

export default function App() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-bold">
              DB
            </div>
            <p className="font-semibold tracking-tight">DayBreak Systems</p>
          </div>
          <a
            href="#portfolio-section"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground"
          >
            Book a Strategy Call
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0">
          <img
            src="/images/ezgif-frame-120.jpg"
            alt="Roofing team at work"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>

        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl text-white">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Roofing Growth Systems
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Build a premium roofing brand that closes trust before sales calls.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">
              We design conversion-focused websites, automate follow-up, and build
              acquisition systems that help roofing operators scale with less chaos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#portfolio-section"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
              >
                View Case Studies
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <PortfolioTestimonials />

      <footer className="border-t border-border/70 py-10">
        <div className="container flex flex-col items-start justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 DayBreak Roofing Systems. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
