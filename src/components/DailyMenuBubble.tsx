"use client";

import { useEffect, useState } from "react";
import { MENU_HIGHLIGHTS } from "@/config/restaurantData";
import { useOrderDrawer } from "./OrderDrawerContext";

// Rotate dishes by day of the week so every day feels fresh
const DISH_OF_THE_DAY = [
  MENU_HIGHLIGHTS[0], // Domingo   → Bandeja Paisa
  MENU_HIGHLIGHTS[1], // Lunes     → Cazuelita La Toxic
  MENU_HIGHLIGHTS[2], // Martes    → Churrasco Chichombiano
  MENU_HIGHLIGHTS[3], // Miércoles → Tamal Huilense
  MENU_HIGHLIGHTS[4], // Jueves    → Empanadas
  MENU_HIGHLIGHTS[5], // Viernes   → Pataconas con Hogao
  MENU_HIGHLIGHTS[0], // Sábado    → Bandeja Paisa
];

const DAYS_ES = [
  "Domingo", "Lunes", "Martes", "Miércoles",
  "Jueves", "Viernes", "Sábado",
];

const RESTAURANT_EMAIL = "fondacolombianasj@gmail.com"; // TODO: confirmar con la familia Ruiz

export function DailyMenuBubble() {
  const { openDrawer } = useOrderDrawer();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    setDayIndex(new Date().getDay());
    // Hide bubble until user scrolls past hero — prevents overlap with hero CTAs
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dish = DISH_OF_THE_DAY[dayIndex];
  const dayName = DAYS_ES[dayIndex];

  // Build mailto href for sharing today's menu
  const shareSubject = encodeURIComponent(
    `🍽️ Menú del Día - ${dayName} - Fonda Colombiana San Jose`
  );
  const shareBody = encodeURIComponent(
    `¡Hola!\n\n` +
    `El plato del día de hoy en Fonda Colombiana es:\n\n` +
    `🍴 ${dish.name} — ${dish.priceDisplay}\n` +
    `${dish.description}\n\n` +
    `📍 Fonda White: 1442 S White Rd, San Jose CA 95127\n` +
    `📍 Fonda Snell: 5585 Snell Ave, San Jose CA 95123\n` +
    `🕐 Abiertos todos los días de 11 AM a 9:30 PM\n\n` +
    `Ordena en línea: https://fonda-colombiana-sj.vercel.app\n\n` +
    `"Tan rico como en casa" — La Familia Ruiz 🇨🇴`
  );
  const shareHref = `mailto:?subject=${shareSubject}&body=${shareBody}`;

  // Subscribe mailto — sends to restaurant asking to add subscriber
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const subj = encodeURIComponent("Nueva suscripción al Menú del Día");
    const body = encodeURIComponent(
      `Hola equipo de Fonda Colombiana,\n\n` +
      `El/la cliente con correo ${email} desea recibir el recordatorio diario del almuerzo.\n\n` +
      `Por favor agrégralo/a a la lista de recordatorios.\n\n` +
      `Gracias!`
    );
    window.location.href = `mailto:${RESTAURANT_EMAIL}?subject=${subj}&body=${body}`;
    setSent(true);
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open]);

  return (
    <>
      {/* Floating bubble — only shows after scrolling past hero */}
      {!open && pastHero && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ver menú del día y suscribirse a recordatorios"
          className="fixed bottom-[5.5rem] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amarillo shadow-[0_6px_24px_rgba(245,183,0,0.45)] transition hover:bg-amarillo-deep hover:shadow-[0_8px_32px_rgba(245,183,0,0.55)] active:scale-95 md:bottom-6 md:right-6 md:h-16 md:w-16"
        >
          <span className="text-2xl leading-none" aria-hidden="true">🍽️</span>
        </button>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-end p-4 sm:items-center sm:justify-end sm:p-6">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => { setOpen(false); setSent(false); }}
            className="absolute inset-0 bg-negro/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <div className="relative w-full max-w-sm rounded-3xl bg-crema shadow-2xl overflow-hidden animate-drawer-up">
            {/* Gold header */}
            <div className="bg-gradient-to-br from-amarillo to-amarillo-deep px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-negro/60">
                    {dayName}
                  </p>
                  <h2 className="font-serif text-xl font-extrabold text-negro leading-tight">
                    Plato del Día
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => { setOpen(false); setSent(false); }}
                  aria-label="Cerrar"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-negro/10 text-negro/60 transition hover:bg-negro/20"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Dish of the day */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-bold text-ink leading-snug">
                    {dish.name}
                  </h3>
                  <span className="shrink-0 font-serif text-lg font-extrabold text-rojo">
                    {dish.priceDisplay}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {dish.description}
                </p>
              </div>

              {/* Order CTA */}
              <button
                type="button"
                onClick={() => { setOpen(false); openDrawer(); }}
                className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-rojo text-sm font-bold text-crema shadow-[0_4px_16px_rgba(214,38,43,0.3)] transition hover:bg-rojo-deep active:scale-[0.98]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 2.3A1 1 0 0 0 5.4 17H17"/>
                  <circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
                </svg>
                Pedir Ahora
              </button>

              {/* Share by email */}
              <a
                href={shareHref}
                className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border-2 border-ink/10 bg-blanco text-sm font-semibold text-ink transition hover:border-amarillo hover:bg-amarillo/8"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Compartir menú de hoy
              </a>

              {/* Daily reminder subscription */}
              <div className="border-t border-ink/8 pt-4">
                <p className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-3">
                  Recordatorio diario del almuerzo
                </p>

                {sent ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-center">
                    <p className="text-sm font-semibold text-emerald-700">
                      ✅ ¡Listo! Te avisaremos cada día.
                    </p>
                    <p className="mt-1 text-xs text-emerald-600">
                      Revisa tu correo para confirmar.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tucorreo@email.com"
                      required
                      aria-label="Tu correo electrónico para el recordatorio diario"
                      className="min-w-0 flex-1 rounded-lg border border-ink/15 bg-blanco px-3 py-2 text-sm text-ink placeholder:text-ink-muted/50 outline-none focus:border-amarillo focus:ring-2 focus:ring-amarillo/20"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-lg bg-amarillo px-4 py-2 text-sm font-bold text-negro transition hover:bg-amarillo-deep active:scale-95"
                    >
                      Suscribir
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
