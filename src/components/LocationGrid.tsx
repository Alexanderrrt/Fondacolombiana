"use client";

import { useEffect, useState } from "react";
import { LOCATIONS, type Location } from "@/config/restaurantData";
import { isOpenNow, todayHoursDisplay, formatTime, getTodayHours } from "@/lib/hours";
import { useOrderDrawer } from "./OrderDrawerContext";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

function LiveStatusBadge({ location }: { location: Location }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(isOpenNow(location));
    const id = setInterval(() => setOpen(isOpenNow(location)), 60_000);
    return () => clearInterval(id);
  }, [location]);

  const today = getTodayHours(location);
  const opensAt = today ? formatTime(today.open) : null;

  if (open === null) return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-crema/10 px-3 py-1 text-xs font-semibold text-crema/40">
      <span className="h-2 w-2 rounded-full bg-crema/20" />
      Verificando…
    </span>
  );

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
      open ? "bg-emerald-500/15 text-emerald-400" : "bg-crema/8 text-crema/40"
    }`}>
      <span className={`h-2 w-2 rounded-full ${open ? "animate-pulse bg-emerald-400" : "bg-crema/25"}`} />
      {open ? "Abierto Ahora" : opensAt ? `Abre a las ${opensAt}` : "Cerrado"}
    </span>
  );
}

function LocationCard({ location, index }: { location: Location; index: number }) {
  return (
    <ScrollReveal delay={index * 120}>
      <TiltCard intensity={5}>
      <article className="card-glow group flex flex-col overflow-hidden rounded-3xl border border-crema/10 bg-carbon/80 backdrop-blur-sm shadow-xl transition-shadow duration-300">
        <div aria-hidden="true" className="flex h-1.5 w-full">
          <div className="flex-1 bg-amarillo" />
          <div className="flex-1 bg-rojo" />
          <div className="flex-1 bg-azul" />
        </div>

        <div className="flex flex-1 flex-col gap-5 p-7 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="font-serif text-2xl font-extrabold text-crema">{location.label}</h3>
            <LiveStatusBadge location={location} />
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm text-crema/60">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0 text-rojo" aria-hidden="true">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(location.mapsQuery)}`} target="_blank" rel="noopener noreferrer"
                aria-label={`Cómo llegar a ${location.label}`}
                className="leading-snug underline-offset-2 transition hover:text-crema hover:underline">
                {location.address}<br />{location.city}, {location.state} {location.zip}
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm text-crema/60">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-rojo" aria-hidden="true">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9z"/>
              </svg>
              <a href={location.phoneHref} className="transition hover:text-crema" aria-label={`Llamar a ${location.label}`}>{location.phone}</a>
            </div>

            <div className="flex items-center gap-3 text-sm text-crema/60">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-rojo" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <span>Hoy: {todayHoursDisplay(location)}</span>
            </div>
          </div>

          <div className="flex-1" />

          <a
            href={location.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ordenar recogida en ${location.label} — abre SpotOn en una nueva pestaña`}
            className="btn-shine flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-rojo text-base font-bold text-crema shadow-[0_4px_20px_rgba(214,38,43,0.35)] transition hover:bg-rojo-deep hover:shadow-[0_6px_28px_rgba(214,38,43,0.45)] active:scale-[0.98]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 2.3A1 1 0 0 0 5.4 17H17"/>
              <circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
            </svg>
            Ordenar para Recoger
          </a>

          <p className="text-center text-xs text-crema/30">
            o llámanos al <a href={location.phoneHref} className="font-semibold text-crema/50 hover:text-crema">{location.phone}</a>
          </p>
        </div>
      </article>
      </TiltCard>
    </ScrollReveal>
  );
}

export function LocationGrid() {
  return (
    <section id="locations" aria-label="Nuestras ubicaciones" className="section-grain relative bg-negro py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amarillo">Dos Ubicaciones</p>
            <h2 className="font-serif text-3xl font-extrabold text-crema sm:text-4xl lg:text-5xl">Encuentra Tu Fonda</h2>
            <p className="mt-3 text-base text-crema/50">Abiertos todos los días 11 AM – 9:30 PM &middot; San Jose, CA</p>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {LOCATIONS.map((loc, i) => (
            <LocationCard key={loc.id} location={loc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
