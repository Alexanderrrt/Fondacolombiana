"use client";

import { useEffect, useRef } from "react";
import { LOCATIONS } from "@/config/restaurantData";

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDrawer({ isOpen, onClose }: OrderDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" aria-hidden={false}>
      <button
        type="button"
        aria-label="Cerrar menú de pedido"
        onClick={onClose}
        className="animate-overlay-in absolute inset-0 h-full w-full cursor-default bg-negro/60 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-drawer-title"
        className="animate-drawer-up relative w-full max-w-lg rounded-t-3xl bg-crema p-6 pb-8 shadow-2xl outline-none sm:rounded-3xl sm:p-8"
      >
        <div aria-hidden="true" className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-ink/15 sm:hidden" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-ink/60 transition hover:bg-ink/5 hover:text-ink"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 id="order-drawer-title" className="font-serif text-2xl font-bold text-ink sm:text-3xl">
          ¿Desde cuál Fonda pedimos?
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Selecciona tu ubicación para empezar tu pedido.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <a
              key={loc.id}
              href={loc.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ordenar recogida en ${loc.label}, ${loc.address}, ${loc.city} — abre SpotOn en una nueva pestaña`}
              className="group flex flex-col rounded-2xl border-2 border-ink/10 bg-blanco p-5 text-left transition hover:border-rojo hover:shadow-lg focus-visible:border-rojo"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-rojo">
                Ordenar para Recoger
              </span>
              <span className="mt-1 font-serif text-xl font-bold text-ink">{loc.label}</span>
              <span className="mt-1 text-sm text-ink-muted">
                {loc.address}<br />{loc.city}, {loc.state} {loc.zip}
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rojo">
                Hacer pedido
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
