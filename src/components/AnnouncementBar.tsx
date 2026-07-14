"use client";

import { useState } from "react";
import { BRAND } from "@/config/restaurantData";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      role="banner"
      aria-label="Anuncio especial — Cambiaton del Mundial"
      className="relative z-[60] bg-azul px-4 py-2 text-crema"
    >
      {/* Tricolor top stripe */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-0.5 w-full">
        <div className="flex-1 bg-amarillo" />
        <div className="flex-1 bg-rojo" />
        <div className="flex-1 bg-azul" />
      </div>

      {/* Single tight row */}
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 pr-6">
        <span className="shrink-0 text-sm" aria-hidden="true">⚽🇨🇴</span>
        <p className="text-center text-xs font-semibold leading-snug sm:text-sm">
          <span className="font-black text-amarillo">¡Cambiaton del Mundial!</span>
          {" · "}
          <a
            href={BRAND.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver horarios en Instagram"
            className="underline underline-offset-2 transition hover:text-amarillo"
          >
            Ver horarios en Instagram ↗
          </a>
        </p>
      </div>

      {/* Dismiss */}
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Cerrar anuncio"
        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-crema/50 transition hover:bg-blanco/10 hover:text-crema"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
