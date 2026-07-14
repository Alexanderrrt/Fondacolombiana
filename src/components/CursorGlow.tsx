"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Warm amber cursor glow that follows the mouse on desktop.
 * Purely decorative — never mounts on touch devices or for reduced-motion
 * users, so phones don't pay for a large blurred GPU layer they can't see.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Decide once on the client whether this device should get the glow at all
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !reduce) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = glowRef.current;
    if (!el) return;

    let raf: number;
    let x = -200, y = -200;
    let cx = -200, cy = -200;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const animate = () => {
      cx += (x - cx) * 0.1;
      cy += (y - cy) * 0.1;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] h-[600px] w-[600px] rounded-full opacity-[0.06] blur-[80px] will-change-transform"
      style={{
        background:
          "radial-gradient(circle, #f5b700 0%, #d6262b 40%, transparent 70%)",
      }}
    />
  );
}
