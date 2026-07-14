"use client";

import { MENU_HIGHLIGHTS, type MenuBadge } from "@/config/restaurantData";
import { useOrderDrawer } from "./OrderDrawerContext";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

const BADGE_STYLES: Record<NonNullable<MenuBadge>, { bar: string; text: string }> = {
  "Más Popular":      { bar: "bg-amarillo",  text: "text-negro" },
  "Especial del Chef":{ bar: "bg-rojo",      text: "text-crema" },
  "Nuestras Raíces":  { bar: "bg-azul",      text: "text-crema" },
};

const DISH_ACCENTS: Record<string, string> = {
  "bandeja-paisa":           "🍳",
  "cazuelita-la-toxic":      "🌶️",
  "churrasco-chichombiano":  "🥩",
  "tamal-huilense":          "🫔",
  "empanadas-x3":            "🥟",
  "pataconas-con-hogao-x4":  "🍌",
};

function MenuCard({ item, index }: { item: typeof MENU_HIGHLIGHTS[number]; index: number }) {
  const { openDrawer } = useOrderDrawer();
  const badge = item.badge ? BADGE_STYLES[item.badge] : null;

  return (
    <ScrollReveal delay={index * 80}>
      <TiltCard intensity={6}>
      <article className="card-glow group flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-blanco shadow-sm transition-shadow duration-300">
        {badge ? (
          <div className={`flex items-center gap-2 px-4 py-2 ${badge.bar}`}>
            <span className="text-base leading-none">{DISH_ACCENTS[item.id]}</span>
            <span className={`text-[11px] font-black uppercase tracking-[0.18em] ${badge.text}`}>{item.badge}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-crema-deep px-4 py-2">
            <span className="text-base leading-none">{DISH_ACCENTS[item.id]}</span>
          </div>
        )}

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-lg font-bold leading-snug text-ink sm:text-xl">{item.name}</h3>
            <span className="shrink-0 font-serif text-xl font-extrabold text-rojo">{item.priceDisplay}</span>
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{item.description}</p>
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Ordenar ${item.name} — elige tu ubicación`}
            className="btn-shine mt-5 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-rojo text-sm font-bold text-crema shadow-[0_4px_16px_rgba(214,38,43,0.3)] transition hover:bg-rojo-deep hover:shadow-[0_6px_20px_rgba(214,38,43,0.4)] active:scale-[0.98]"
          >
            Pedir Ahora
          </button>
        </div>
      </article>
      </TiltCard>
    </ScrollReveal>
  );
}

export function MenuSection() {
  const { openDrawer } = useOrderDrawer();

  return (
    <section id="menu" aria-label="Platos especiales" className="bg-crema py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-rojo">Platos Especiales</p>
            <h2 className="font-serif text-4xl font-extrabold text-ink sm:text-5xl lg:text-6xl">
              Lo Mejor de la Fonda
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-ink-muted">
              Cada plato se prepara desde cero — las mismas recetas que llevaban al vecindario
              a la puerta de la familia Ruiz.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {MENU_HIGHLIGHTS.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-ink-muted">
              Explora nuestro menú completo al ordenar — hay mucho más esperándote.
            </p>
            <button
              type="button"
              onClick={openDrawer}
              className="inline-flex min-h-[54px] items-center gap-2 rounded-full bg-rojo px-9 text-base font-bold text-crema shadow-[0_8px_32px_rgba(214,38,43,0.35)] transition hover:bg-rojo-deep hover:shadow-[0_12px_40px_rgba(214,38,43,0.45)] active:scale-[0.98]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 2.3A1 1 0 0 0 5.4 17H17"/>
                <circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
              </svg>
              Ver Menú Completo
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
