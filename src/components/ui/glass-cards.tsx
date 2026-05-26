import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { cardData } from "../../lib/portfolio-card-data";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  id: number;
  title: string;
  description: string;
  author: string;
  role: string;
  imageUrl: string;
  index: number;
  totalCards: number;
}

const Card = ({
  title,
  description,
  author,
  role,
  imageUrl,
  index,
  totalCards,
}: CardProps) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.05;

    gsap.set(card, {
      scale: 1,
      transformOrigin: "center top",
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);

        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
      }}
    >
      <article
        ref={cardRef}
        style={{
          position: "relative",
          width: "min(94%, 1120px)",
          height: "min(72vh, 640px)",
          borderRadius: "30px",
          isolation: "isolate",
          top: `calc(-4vh + ${index * 24}px)`,
          transformOrigin: "top",
          overflow: "hidden",
          border: "1px solid rgba(13, 59, 102, 0.2)",
          boxShadow:
            "0 34px 62px rgba(8, 27, 54, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.22) inset",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(8, 26, 52, 0.9) 0%, rgba(12, 36, 68, 0.8) 40%, rgba(12, 36, 68, 0.28) 74%, rgba(12, 36, 68, 0.08) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 22%, rgba(255, 255, 255, 0.22) 0%, transparent 56%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "min(92%, 600px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(1.5rem, 3vw, 2.8rem)",
            color: "#f8fafc",
            gap: "1.1rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.76rem",
              textTransform: "uppercase",
              letterSpacing: "0.17em",
              color: "rgba(229, 240, 255, 0.9)",
              fontWeight: 700,
            }}
          >
            Roofing Case Study
          </p>

          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display, 'Syne', sans-serif)",
              fontSize: "clamp(2rem, 4.2vw, 3.15rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              fontWeight: 700,
            }}
          >
            {title}
          </h2>

          <div
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "1px",
              background: "rgba(255,255,255,0.24)",
            }}
          />

          <p
            style={{
              margin: 0,
              maxWidth: "43ch",
              color: "rgba(240, 247, 255, 0.92)",
              fontSize: "clamp(1rem, 1.9vw, 1.12rem)",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>

          <div style={{ marginTop: "0.3rem", display: "grid", gap: "0.15rem" }}>
            <strong style={{ fontSize: "1rem", letterSpacing: "0.01em" }}>
              {author}
            </strong>
            <span
              style={{ color: "rgba(226, 237, 252, 0.78)", fontSize: "0.92rem" }}
            >
              {role}
            </span>
          </div>

          <button
            type="button"
            style={{
              marginTop: "0.5rem",
              width: "fit-content",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.85rem",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              borderRadius: "9999px",
              background: "#f8fafc",
              color: "#13243f",
              padding: "0.4rem 0.4rem 0.4rem 1.3rem",
              fontWeight: 700,
              fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            View Project
            <span
              style={{
                width: "2.8rem",
                height: "2.8rem",
                borderRadius: "9999px",
                background: "#f97316",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowUpRight size={24} />
            </span>
          </button>
        </div>
      </article>
    </div>
  );
};

export const StackedCards = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tween = gsap.fromTo(
      container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <main ref={containerRef} style={{ background: "transparent" }}>
      <section
        style={{
          height: "52vh",
          width: "100%",
          display: "grid",
          placeContent: "center",
          position: "relative",
          color: "#1b2538",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(29, 95, 168, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(29, 95, 168, 0.12) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
          }}
        />
        <h1
          style={{
            fontFamily: "var(--font-display, 'Syne', sans-serif)",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: "1.14",
            letterSpacing: "-0.02em",
            padding: "0 2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          Portfolio Highlights Built For Roofing Growth
        </h1>
      </section>

      <section
        style={{
          color: "inherit",
          width: "100%",
        }}
      >
        {cardData.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            author={card.author}
            role={card.role}
            imageUrl={card.imageUrl}
            index={index}
            totalCards={cardData.length}
          />
        ))}
      </section>
    </main>
  );
};
