import { marqueeItems } from "../content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Hero } from "../sections/Hero";
import { Work } from "../sections/Work";
import { About } from "../sections/About";
import { Stack } from "../sections/Stack";
import { Process } from "../sections/Process";
import { Contact } from "../sections/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Stack />
      <Process />
      <Contact />
    </>
  );
}

function Marquee() {
  const reduced = useReducedMotion();
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative z-[1] border-y border-[var(--color-line)] py-3 overflow-hidden bg-[var(--color-bg)]/50" aria-hidden="true">
      <div className={`flex gap-8 whitespace-nowrap ${reduced ? "" : "marquee-track"}`} style={{ width: "max-content" }}>
        {items.map((item, i) => (
          <span key={i} className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] flex items-center gap-8">
            {item}
            <span className="text-[var(--color-accent)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
