"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

/**
 * Subtle, safe scroll-reveal.
 *
 * - Above-the-fold elements: animate in (opacity + small translate) on
 *   intersection — the intended entrance.
 * - Below-the-fold elements: shown immediately (no hiding), so there is
 *   never an empty "void" in static captures and never any risk of content
 *   being stuck invisible if an observer fails to fire.
 * - prefers-reduced-motion: the CSS no-ops the hidden state entirely.
 *
 * All setState calls happen inside the IntersectionObserver callback (never
 * synchronously in the effect body), which keeps renders cascading-free.
 */
export function Reveal({ delay = 0, className, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let firstObservation = true;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            return;
          }
          if (firstObservation) {
            // First observation and already out of view (below the fold on
            // load): show immediately so the section is never hidden/void.
            setVisible(true);
            obs.disconnect();
            return;
          }
        }
        firstObservation = false;
      },
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("cs-reveal", visible && "is-visible", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      {...props}
    >
      {children}
    </div>
  );
}
