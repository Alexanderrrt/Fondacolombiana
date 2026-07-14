import { STORY, MENU_HIGHLIGHTS } from "@/config/restaurantData";
import { ScrollReveal } from "./ScrollReveal";

const heritageDish = MENU_HIGHLIGHTS.find((m) => m.isHeritage)!;

const TIMELINE = [
  {
    year: "2019",
    heading: "Todo empieza en la mesa de la cocina",
    body: STORY.origin.text,
    dot: "bg-amarillo",
    line: "bg-amarillo/20",
  },
  {
    year: "Enero 2020",
    heading: "Las puertas abren — el mundo se cierra",
    body: STORY.opening.text,
    dot: "bg-rojo",
    line: "bg-rojo/20",
  },
  {
    year: "Hoy",
    heading: "Dos fondas, una familia",
    body: STORY.today.text,
    dot: "bg-azul",
    line: "bg-azul/30",
  },
];

export function StorySection() {
  return (
    <section id="story" aria-label="Nuestra Historia" className="section-grain relative bg-carbon py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <ScrollReveal>
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-amarillo">{STORY.family}</p>
          <h2 className="mb-16 text-center font-serif text-4xl font-extrabold text-crema sm:text-5xl lg:text-6xl">
            Nuestra Historia
          </h2>
        </ScrollReveal>

        <div className="grid items-start gap-12 md:grid-cols-[1fr_360px] md:gap-14 lg:grid-cols-[1fr_400px] lg:gap-20">
          <div className="space-y-2">
            {TIMELINE.map((step, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="flex gap-5 sm:gap-7">
                  <div className="flex flex-col items-center gap-1 pt-1.5">
                    <div className={`h-4 w-4 shrink-0 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.3)] ${step.dot}`} aria-hidden="true" />
                    {i < TIMELINE.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[3rem] ${step.line}`} aria-hidden="true" />
                    )}
                  </div>
                  <div className="pb-10">
                    <span className="inline-block rounded-full bg-crema/6 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-crema/40">
                      {step.year}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl font-bold text-crema sm:text-3xl">{step.heading}</h3>
                    <p className="mt-3 text-base leading-relaxed text-crema/60">{step.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={350}>
              <blockquote className="mt-4 border-l-4 border-amarillo pl-6">
                <p className="font-serif text-xl italic text-crema/75 sm:text-2xl">
                  &ldquo;{STORY.motto}&rdquo;
                </p>
                <cite className="mt-2 block text-sm font-bold not-italic text-amarillo">&mdash; {STORY.family}</cite>
              </blockquote>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200}>
            <div className="md:sticky md:top-28">
              <div className="card-glow overflow-hidden rounded-3xl border border-crema/10 bg-negro shadow-2xl">
                <div className="bg-gradient-to-br from-amarillo to-amarillo-deep p-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-negro/70">Nuestras Raíces</span>
                  <p className="mt-1 font-serif text-2xl font-extrabold text-negro">
                    El plato que lo empezó todo
                  </p>
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-3xl font-extrabold text-crema">{heritageDish.name}</h3>
                  <p className="mt-3 text-base leading-relaxed text-crema/60">{heritageDish.description}</p>
                  <div className="my-6 flex items-center gap-3" aria-hidden="true">
                    <div className="h-px flex-1 bg-crema/8" />
                    <span className="text-xl">🇨🇴</span>
                    <div className="h-px flex-1 bg-crema/8" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl font-extrabold text-amarillo">{heritageDish.priceDisplay}</span>
                    <span className="rounded-full border border-crema/10 px-3 py-1.5 text-xs font-semibold text-crema/40">
                      Ambas ubicaciones
                    </span>
                  </div>
                  <p className="mt-5 text-center text-xs leading-relaxed text-crema/30 italic">
                    La misma receta. Sin cambios desde 2019.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
