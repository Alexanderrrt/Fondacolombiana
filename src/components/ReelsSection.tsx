"use client";

import { useState } from "react";
import Image from "next/image";
import { BRAND } from "@/config/restaurantData";

const INSTAGRAM_REELS = [
  { id: "DZ70vgVoDEr", thumb: "/media/ig-1.jpg", label: "Platos auténticos colombianos" },
  { id: "DArFcVoIaSj", thumb: "/media/ig-2.jpg", label: "Cocina y menú destacado" },
  { id: "DZDXC2kIsrG", thumb: "/media/ig-3.jpg", label: "Preparación y experiencia" },
  { id: "DYqPzqyC5iV", thumb: "/media/ig-4.jpg", label: "Platos especiales de la casa" },
];

const TIKTOK_VIDEOS = [
  { id: "7504332060853701934", thumb: "/media/tiktok-1.jpg", label: "Nuestro video más viral" },
  { id: "7507752367538982190", thumb: "/media/tiktok-2.jpg", label: "Destacado de la cocina" },
  { id: "7496962637532515626", thumb: "/media/tiktok-3.jpg", label: "Lo que se viene cada día" },
];

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

const PlayIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

type Platform = "instagram" | "tiktok";

/**
 * Lite-embed pattern: a real thumbnail is shown as a cheap lazy <Image> poster,
 * and the heavy Instagram/TikTok iframe is only mounted after the user taps it.
 * Visitors see the preview immediately, but nothing third-party loads until they
 * actually want to watch — which is what keeps the page fast on mobile.
 */
function ReelCard({
  platform,
  id,
  thumb,
  label,
  loaded,
  onLoad,
}: {
  platform: Platform;
  id: string;
  thumb: string;
  label: string;
  loaded: boolean;
  onLoad: () => void;
}) {
  const isIG = platform === "instagram";
  const embedSrc = isIG
    ? `https://www.instagram.com/p/${id}/embed/`
    : `https://www.tiktok.com/embed/v2/${id}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-carbon shadow-lg">
      <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
        {loaded ? (
          <iframe
            src={embedSrc}
            title={label}
            aria-label={label}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        ) : (
          <button
            type="button"
            onClick={onLoad}
            aria-label={`Reproducir reel: ${label}`}
            className="absolute inset-0 block text-left"
          >
            {/* Real thumbnail preview — lazy, optimized */}
            <Image
              src={thumb}
              alt={label}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Legibility gradient */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-negro/85 via-negro/10 to-negro/35"
            />

            {/* Platform badge */}
            <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-negro/45 text-white backdrop-blur-sm">
              {isIG ? <InstagramIcon size={16} /> : <TikTokIcon size={16} />}
            </span>

            {/* Play button */}
            <span
              className={`absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-negro shadow-xl transition group-hover:scale-110 ${
                isIG ? "" : "shadow-[0_0_0_2px_rgba(37,244,238,0.7),0_0_22px_rgba(254,44,85,0.55)]"
              }`}
            >
              <span className="ml-0.5">
                <PlayIcon size={26} />
              </span>
            </span>

            {/* Caption */}
            <span className="absolute inset-x-0 bottom-0 p-3.5">
              <span className="block text-sm font-semibold leading-snug text-white drop-shadow">
                {label}
              </span>
              <span className="mt-0.5 block text-[11px] font-bold uppercase tracking-[0.15em] text-white/70">
                Toca para ver
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export function ReelsSection() {
  const [active, setActive] = useState<Platform>("instagram");
  // IDs the user has opted to load — facade keeps the page fast on mobile
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const load = (id: string) => setLoaded((prev) => new Set(prev).add(id));

  const cols =
    active === "instagram" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3";

  return (
    <section id="reels" aria-label="Videos en redes sociales" className="bg-negro py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amarillo">Síguenos</p>
          <h2 className="font-serif text-3xl font-extrabold text-crema sm:text-4xl">Mira la Magia</h2>
          <p className="mt-3 text-base text-crema/60">Siente los sabores, vive la cocina.</p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-crema/10 bg-carbon p-1">
            <button
              type="button"
              onClick={() => setActive("instagram")}
              aria-pressed={active === "instagram"}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                active === "instagram"
                  ? "bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white shadow-md"
                  : "text-crema/60 hover:text-crema"
              }`}
            >
              <InstagramIcon size={15} />
              Instagram
            </button>
            <button
              type="button"
              onClick={() => setActive("tiktok")}
              aria-pressed={active === "tiktok"}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                active === "tiktok"
                  ? "bg-[#010101] text-white shadow-md ring-1 ring-crema/20"
                  : "text-crema/60 hover:text-crema"
              }`}
            >
              <TikTokIcon size={15} />
              TikTok
              <span className="rounded-full bg-amarillo/90 px-1.5 py-0.5 text-[10px] font-black text-negro leading-none">
                64.5K ♥
              </span>
            </button>
          </div>
        </div>

        <div className={`grid gap-3 sm:gap-4 ${cols}`}>
          {active === "instagram"
            ? INSTAGRAM_REELS.map((reel) => (
                <ReelCard
                  key={reel.id}
                  platform="instagram"
                  id={reel.id}
                  thumb={reel.thumb}
                  label={reel.label}
                  loaded={loaded.has(reel.id)}
                  onLoad={() => load(reel.id)}
                />
              ))
            : TIKTOK_VIDEOS.map((video) => (
                <ReelCard
                  key={video.id}
                  platform="tiktok"
                  id={video.id}
                  thumb={video.thumb}
                  label={video.label}
                  loaded={loaded.has(video.id)}
                  onLoad={() => load(video.id)}
                />
              ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={BRAND.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-crema/20 bg-crema/8 px-6 py-3 text-sm font-semibold text-crema/80 transition hover:bg-crema/15 hover:text-crema"
          >
            <InstagramIcon />
            Síguenos en Instagram
          </a>
          <a
            href={BRAND.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-crema/20 bg-crema/8 px-6 py-3 text-sm font-semibold text-crema/80 transition hover:bg-crema/15 hover:text-crema"
          >
            <TikTokIcon />
            Síguenos en TikTok
          </a>
        </div>
      </div>
    </section>
  );
}
