"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
}

/**
 * Wraps children in an element that fades + slides up when it enters the
 * viewport. Uses IntersectionObserver — no layout thrash, no library needed.
 * `delay` lets you stagger sibling items by passing e.g. delay={100 * index}.
 */
export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("sr-visible");
          observer.unobserve(el);
        }
      },
      // Fire early (before the element is actually visible) so the fade has
      // finished by the time it scrolls into view — no "popping in late"
      { threshold: 0, rootMargin: "0px 0px 14% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`sr-hidden ${className}`}>
      {children}
    </div>
  );
}
