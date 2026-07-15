import Image from "next/image";
import { BRAND, LOCATIONS, NAV_LINKS, STORY } from "@/config/restaurantData";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="visit" aria-label="Pie de página" className="bg-negro text-crema/70">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#top" aria-label="Fonda Colombiana San Jose — volver al inicio" className="flex items-center gap-3">
              <Image
                src="/media/logo.png"
                alt="Fonda Colombiana logo"
                width={56}
                height={56}
                className="rounded-full"
              />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-xl font-extrabold text-crema">{BRAND.name}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-crema/40">{BRAND.legalCity}</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-crema/50">
              Cocina colombiana auténtica de la familia Ruiz desde 2018.
            </p>
            <p className="mt-2 font-serif text-base italic text-crema/40">
              &ldquo;{STORY.motto}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer"
                aria-label="Síguenos en Instagram (abre en una nueva pestaña)"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-crema/10 text-crema/50 transition hover:border-crema/30 hover:text-crema">
                <InstagramIcon />
              </a>
              <a href={BRAND.social.tiktok} target="_blank" rel="noopener noreferrer"
                aria-label="Síguenos en TikTok (abre en una nueva pestaña)"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-crema/10 text-crema/50 transition hover:border-crema/30 hover:text-crema">
                <TikTokIcon />
              </a>
            </div>
          </div>

          {LOCATIONS.map((loc) => (
            <div key={loc.id}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amarillo">{loc.label}</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(loc.mapsQuery)}`} target="_blank" rel="noopener noreferrer"
                    aria-label={`Cómo llegar a ${loc.label} — abre Google Maps en una nueva pestaña`}
                    className="leading-snug transition hover:text-crema">
                    {loc.address}<br />{loc.city}, {loc.state} {loc.zip}
                  </a>
                </li>
                <li>
                  <a href={loc.phoneHref} aria-label={`Llamar a ${loc.label} al ${loc.phone}`}
                    className="transition hover:text-crema">{loc.phone}</a>
                </li>
                <li className="text-crema/50">
                  Lun – Dom<br />11:00 AM – 9:30 PM
                </li>
                <li className="pt-1">
                  <a href={loc.orderUrl} target="_blank" rel="noopener noreferrer"
                    aria-label={`Ordenar recogida en ${loc.label} — abre SpotOn en una nueva pestaña`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rojo transition hover:text-crema">
                    Ordenar Recogida
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amarillo">Navegación</h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-crema">{link.label}</a>
                </li>
              ))}
              <li className="pt-2">
                <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" className="transition hover:text-crema">Instagram</a>
              </li>
              <li>
                <a href={BRAND.social.tiktok} target="_blank" rel="noopener noreferrer" className="transition hover:text-crema">TikTok</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-crema/8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-crema/30 sm:flex-row sm:px-6">
          <p>&copy; {year} {BRAND.name}. Todos los derechos reservados.</p>
          <p>San Jose, California &middot; Desde 2018</p>
        </div>
      </div>
    </footer>
  );
}
