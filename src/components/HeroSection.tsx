"use client";

import Image from "next/image";
import { STORY } from "@/config/restaurantData";
import { useOrderDrawer } from "./OrderDrawerContext";

// Subtle floating ember particles
const PARTICLES = [
  { left: "15%", dur: "6s",  delay: "0s",    drift: "20px" },
  { left: "30%", dur: "8s",  delay: "1.5s",  drift: "-15px" },
  { left: "50%", dur: "7s",  delay: "0.8s",  drift: "10px" },
  { left: "65%", dur: "9s",  delay: "2.2s",  drift: "-20px" },
  { left: "80%", dur: "6.5s",delay: "1s",    drift: "15px" },
  { left: "45%", dur: "8.5s",delay: "3s",    drift: "-8px" },
];

// Split headline into individually-animated word spans
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="word-reveal inline-block mr-[0.25em]">
          <span style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
            {word}
          </span>
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const { openDrawer } = useOrderDrawer();

  return (
    <section
      id="hero"
      className="section-grain relative flex min-h-[92dvh] items-center justify-center overflow-hidden"
      aria-label="Inicio — Fonda Colombiana"
    >
      {/* Ken Burns background image */}
      <div className="absolute inset-0 animate-ken-burns">
        <Image
          src="/media/hero.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Layered dark overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,61,98,0.5)_0%,transparent_60%),linear-gradient(to_bottom,rgba(26,20,16,0.5)_0%,rgba(26,20,16,0.82)_60%,rgba(43,35,28,1)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(26,20,16,0.55)_100%)]" />

      {/* Ember particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="particle"
          style={{
            left: p.left,
            "--dur": p.dur,
            "--delay": p.delay,
            "--drift": p.drift,
          } as React.CSSProperties}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center">

        {/* Eyebrow with pulsing border */}
        <div className="mb-6 flex justify-center"
          style={{ animation: "fade-up 0.6s 0.05s both" }}>
          <p className="border-pulse inline-flex items-center gap-2 rounded-full border bg-amarillo/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amarillo backdrop-blur-sm sm:text-xs"
            style={{ animation: "word-up 0.6s 0.05s both" }}>
            <span aria-hidden="true">🇨🇴</span>
            <span>San Jose, CA</span>
            <span aria-hidden="true" className="text-amarillo/40">·</span>
            <span>Desde 2018</span>
          </p>
        </div>

        {/* Animated headline */}
        <h1 className="font-serif text-5xl font-extrabold leading-[1.05] tracking-tight text-crema sm:text-6xl lg:text-7xl xl:text-8xl">
          <AnimatedHeadline text={STORY.heroSlogan} />
        </h1>

        {/* Sub-headline */}
        <p
          className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-crema/75 sm:text-xl"
          style={{ animation: "word-up 0.7s 0.7s both" }}
        >
          {STORY.heroSubSlogan}
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ animation: "word-up 0.6s 0.85s both" }}
        >
          <button
            type="button"
            onClick={openDrawer}
            className="btn-shine min-h-[54px] rounded-full bg-rojo px-9 text-base font-bold text-crema shadow-[0_8px_32px_rgba(214,38,43,0.45)] transition hover:bg-rojo-deep hover:shadow-[0_12px_40px_rgba(214,38,43,0.6)] active:scale-[0.98]"
          >
            Ordenar para Recoger
          </button>
          <a
            href="#story"
            className="btn-shine min-h-[54px] inline-flex items-center gap-2 rounded-full border border-crema/25 bg-crema/8 px-8 text-base font-semibold text-crema backdrop-blur-sm transition hover:bg-crema/16"
          >
            Nuestra Historia
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>

        {/* Motto */}
        <p
          className="mt-12 font-serif text-base italic text-crema/40 sm:text-lg"
          style={{ animation: "word-up 0.6s 1s both" }}
        >
          &ldquo;{STORY.motto}&rdquo; &mdash; {STORY.family}
        </p>
      </div>

    </section>
  );
}
