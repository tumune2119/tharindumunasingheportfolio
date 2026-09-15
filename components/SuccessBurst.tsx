"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Particle = {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
};

const PARTICLE_COUNT = 14;
const COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent)",
];

// One-shot outward particle burst, mounted only while `trigger` is true —
// the parent flips it on for the moment a success state appears (see
// ContactForm's submit button). Requires a `relative` ancestor since
// particles are positioned absolute around this component's own origin.
// Purely celebratory, so it's skipped outright under reduced motion rather
// than offering a static alternative.
export function SuccessBurst({ trigger }: { trigger: boolean }) {
  const reducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger || reducedMotion) return;

    setParticles(
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (360 / PARTICLE_COUNT) * i + Math.random() * 20;
        const distance = 60 + Math.random() * 40;
        const radians = (angle * Math.PI) / 180;
        return {
          id: i,
          x: Math.cos(radians) * distance,
          y: Math.sin(radians) * distance,
          delay: Math.random() * 80,
          size: 5 + Math.random() * 4,
          color: COLORS[i % COLORS.length],
        };
      }),
    );
    const timeout = setTimeout(() => setParticles([]), 900);
    return () => clearTimeout(timeout);
  }, [trigger, reducedMotion]);

  if (particles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="animate-burst-particle absolute left-0 top-0 rounded-full"
          style={
            {
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}ms`,
              "--burst-x": `${particle.x}px`,
              "--burst-y": `${particle.y}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
