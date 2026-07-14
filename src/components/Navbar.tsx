"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND, NAV_LINKS } from "@/config/restaurantData";
import { useOrderDrawer } from "./OrderDrawerContext";

export function Navbar() {
  const { openDrawer } = useOrderDrawer();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 12); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); }; window.addEventListener("resize", onResize); return () => window.removeEventListener("resize", onResize); }, []);
  const handleOrderClick = () => { setMenuOpen(false); openDrawer(); };
  return <header className={`absolute inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || menuOpen ? "border-b border-white/10 bg-negro/85 backdrop-blur" : "bg-transparent"}`}><nav aria-label="Navegación principal" className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-12"><a href="#top" aria-label={`${BRAND.name} — inicio`}><Image src="/media/logo.png" alt="Fonda Colombiana logo" width={112} height={112} className="h-20 w-20 rounded-full object-contain sm:h-24 sm:w-24" priority /></a><ul className="hidden items-center gap-10 md:flex">{NAV_LINKS.map((link) => <li key={link.href}><a href={link.href} className="text-sm font-bold uppercase text-white transition-colors hover:text-amarillo">{link.label}</a></li>)}</ul><button type="button" onClick={handleOrderClick} className="hidden items-center gap-2 rounded-lg bg-amarillo px-6 py-3 text-sm font-black uppercase tracking-wide text-negro shadow-sm transition hover:bg-yellow-300 md:inline-flex">☎ Ordena ahora</button><button type="button" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} aria-controls="mobile-menu" className="flex h-11 w-11 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden">{menuOpen ? "×" : "☰"}</button></nav>{menuOpen && <div id="mobile-menu" className="border-t border-white/10 bg-negro/95 md:hidden"><ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">{NAV_LINKS.map((link) => <li key={link.href}><a href={link.href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center text-base font-semibold text-white transition-colors hover:text-amarillo">{link.label}</a></li>)}<li className="py-3"><button type="button" onClick={handleOrderClick} className="flex min-h-12 w-full items-center justify-center rounded-lg bg-amarillo px-6 text-base font-bold text-negro transition hover:bg-yellow-300">Ordena ahora</button></li></ul></div>}</header>;
}
