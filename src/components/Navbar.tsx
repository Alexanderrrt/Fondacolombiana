"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND, NAV_LINKS } from "@/config/restaurantData";
import { useOrderDrawer } from "./OrderDrawerContext";

export function Navbar() {
  const { openDrawer } = useOrderDrawer();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleOrderClick = () => { setMenuOpen(false); openDrawer(); };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-ink/10 bg-crema md:bg-crema/90 md:backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Navegación principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${BRAND.name} — inicio`}>
          <Image
            src="/media/logo.png"
            alt="Fonda Colombiana logo"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-extrabold tracking-tight text-rojo sm:text-xl">
              {BRAND.name}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-ink-muted sm:text-[10px]">
              {BRAND.legalCity}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-semibold text-ink transition-colors hover:text-rojo">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleOrderClick}
          className="hidden rounded-full bg-rojo px-6 py-2.5 text-sm font-bold text-crema shadow-sm transition hover:bg-rojo-deep md:inline-flex"
        >
          Pedir Ya
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-ink transition hover:bg-ink/5 md:hidden"
        >
          {menuOpen ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-ink/10 bg-crema md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center text-base font-semibold text-ink transition-colors hover:text-rojo"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <button
                type="button"
                onClick={handleOrderClick}
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-rojo px-6 text-base font-bold text-crema transition hover:bg-rojo-deep"
              >
                Pedir Ya
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
