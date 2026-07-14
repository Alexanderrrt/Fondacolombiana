"use client";

import Image from "next/image";
import { BRAND, STORY } from "@/config/restaurantData";
import { useOrderDrawer } from "./OrderDrawerContext";

function LocationIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2.5a7 7 0 0 0-7 7c0 5 7 12 7 12s7-7 7-12a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" /></svg>; }

export function HeroSection() {
  const { openDrawer } = useOrderDrawer();
  return (
    <section id="hero" aria-label="Inicio — Fonda Colombiana" className="hero-reference section-grain relative isolate overflow-visible">
      <div className="absolute inset-0 -z-20"><Image src="/media/food-3.jpg" alt="Plato colombiano de carne con hogao" fill priority sizes="100vw" className="object-cover object-center" /></div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,10,8,.94)_0%,rgba(18,13,8,.78)_34%,rgba(18,13,8,.2)_70%,rgba(10,8,6,.5)_100%),linear-gradient(0deg,rgba(10,8,5,.72),transparent_55%)]" />
      <div className="hero-inner relative mx-auto flex min-h-[680px] max-w-[1280px] flex-col px-5 pb-28 pt-28 sm:px-8 lg:px-12">
        <div className="hero-copy relative z-10 mt-auto max-w-[540px] pb-2 lg:mb-5">
          <p className="hero-script text-3xl text-amarillo sm:text-4xl">Bienvenidos a</p>
          <h1 className="mt-2 font-sans text-6xl font-black uppercase leading-[.88] tracking-[-.055em] text-white sm:text-8xl">Fonda<br /><span className="text-amarillo">Colombiana</span></h1>
          <p className="mt-5 text-2xl font-bold tracking-wide text-[#1687d4] sm:text-3xl">Food &amp; Drinks</p>
          <div className="hero-brush mt-2 h-2 w-[330px] max-w-full" aria-hidden="true" />
          <p className="mt-5 max-w-[390px] text-base leading-relaxed text-white/90 sm:text-lg">Disfruta los sabores auténticos de Colombia. Comida casera, hecha con amor y los mejores ingredientes. Tan rico como en casa.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button type="button" onClick={openDrawer} className="btn-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-amarillo px-7 text-sm font-black uppercase tracking-wide text-negro shadow-lg transition hover:bg-yellow-300 active:scale-[.98]"><span aria-hidden="true">✣</span> Ver menú</button>
            <a href="#locations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/80 px-7 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-negro"><LocationIcon /> Cómo llegar</a>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-24 right-4 hidden max-w-[300px] rotate-[-5deg] text-right lg:block"><p className="hero-script text-4xl leading-[.9] text-white">“Tan Rico<br />Como en Casa”</p><div className="mt-2 h-1 rotate-[-2deg] bg-amarillo" /></div>
      </div>
      <div className="hero-vignette pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <span className="sr-only">{STORY.motto} — {BRAND.name}</span>
    </section>
  );
}
