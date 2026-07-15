import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

export function CinematicCollage() {
  return (
    <section aria-label="Sabores de la Fonda" className="section-grain relative overflow-hidden bg-negro py-10 sm:py-14">
      <ScrollReveal>
        <div className="relative mx-auto max-w-[1400px] overflow-hidden border-y border-crema/10 bg-carbon shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:rounded-2xl sm:border">
          <div className="relative aspect-[3.18/1] min-h-[250px] overflow-hidden sm:min-h-[330px]">
            <Image
              src="/media/fonda-cinematographic-collage.png"
              alt="Collage cinematográfico de platos y momentos de Fonda Colombiana"
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.025]"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-negro/75 via-negro/10 to-negro/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-negro/70 via-transparent to-negro/10" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amarillo sm:text-xs">
                  Hecho para compartir
                </p>
                <h2 className="mt-2 max-w-md font-serif text-3xl font-extrabold leading-none text-crema sm:text-5xl">
                  Sabor que se queda contigo
                </h2>
              </div>
              <span className="hidden rounded-full border border-crema/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-crema/75 sm:block">
                Fonda Colombiana
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
