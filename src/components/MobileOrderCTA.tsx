"use client";

import { useOrderDrawer } from "./OrderDrawerContext";

export function MobileOrderCTA() {
  const { openDrawer, isOpen } = useOrderDrawer();
  if (isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 md:hidden">
      <button
        type="button"
        onClick={openDrawer}
        aria-label="Pedir en línea — elige una ubicación"
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-rojo text-base font-bold text-crema shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition active:scale-[0.99]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 2.3A1 1 0 0 0 5.4 17H17" />
          <circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" />
        </svg>
        Pedir Ya
      </button>
    </div>
  );
}
